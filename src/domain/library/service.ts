import { and, desc, eq, inArray, ne, notInArray, sql } from 'drizzle-orm'

import type { Db } from '#/db/client'
import { books, categories, libraryItems, userHighlights, userInterests } from '#/db/schema'
import { AppError } from '#/domain/errors'

import type { Book, LibraryItem } from '#/test/factories'

export type LibraryStatus = 'saved' | 'in_progress' | 'completed'

export type LibraryEntry = LibraryItem & {
  book: Book
  categoryName: string
  categorySlug: string
}

export type HighlightEntry = {
  id: string
  text: string
  createdAt: number
  bookId: string
  bookTitle: string
  bookAuthor: string
}

export type RecommendedBook = Book & {
  categoryName: string
  categorySlug: string
}

export type LibraryStats = {
  completedCount: number
  inProgressCount: number
  savedCount: number
  audioMinutes: number
  audioHours: number
  highlightsCount: number
}

const MAX_PROGRESS = 100

function clampProgress(value: number): number {
  if (Number.isNaN(value)) {
    return 0
  }
  return Math.min(MAX_PROGRESS, Math.max(0, Math.round(value)))
}

function ensureBook(db: Db, bookId: string): Book {
  const book = db.select().from(books).where(eq(books.id, bookId)).get()
  if (!book) {
    throw new AppError('NOT_FOUND', 'Resumo não encontrado.')
  }
  return book
}

function findItem(db: Db, userId: string, bookId: string): LibraryItem | undefined {
  return db
    .select()
    .from(libraryItems)
    .where(and(eq(libraryItems.userId, userId), eq(libraryItems.bookId, bookId)))
    .get()
}

export function getLibraryItem(db: Db, userId: string, bookId: string): LibraryItem | null {
  return findItem(db, userId, bookId) ?? null
}

export function saveBook(db: Db, userId: string, bookId: string, now = Date.now()): LibraryItem {
  ensureBook(db, bookId)

  const existing = findItem(db, userId, bookId)
  if (existing) {
    return existing
  }

  const item: LibraryItem = {
    id: crypto.randomUUID(),
    userId,
    bookId,
    status: 'saved',
    progressPercent: 0,
    lastPositionSeconds: 0,
    lastChapterPosition: 1,
    completedAt: null,
    updatedAt: now,
  }
  db.insert(libraryItems).values(item).run()
  return item
}

export function removeBook(db: Db, userId: string, bookId: string): void {
  db.delete(libraryItems)
    .where(and(eq(libraryItems.userId, userId), eq(libraryItems.bookId, bookId)))
    .run()
}

export type ProgressInput = {
  progressPercent: number
  lastPositionSeconds?: number
  lastChapterPosition?: number
}

export function updateProgress(
  db: Db,
  userId: string,
  bookId: string,
  input: ProgressInput,
  now = Date.now(),
): LibraryItem {
  ensureBook(db, bookId)

  const progressPercent = clampProgress(input.progressPercent)
  const status: LibraryStatus = progressPercent >= MAX_PROGRESS ? 'completed' : 'in_progress'
  const existing = findItem(db, userId, bookId)

  if (!existing) {
    const item: LibraryItem = {
      id: crypto.randomUUID(),
      userId,
      bookId,
      status,
      progressPercent,
      lastPositionSeconds: input.lastPositionSeconds ?? 0,
      lastChapterPosition: input.lastChapterPosition ?? 1,
      completedAt: status === 'completed' ? now : null,
      updatedAt: now,
    }
    db.insert(libraryItems).values(item).run()
    return item
  }

  const completedAt =
    status === 'completed' ? (existing.completedAt ?? now) : existing.completedAt

  db.update(libraryItems)
    .set({
      status,
      progressPercent,
      lastPositionSeconds: input.lastPositionSeconds ?? existing.lastPositionSeconds,
      lastChapterPosition: input.lastChapterPosition ?? existing.lastChapterPosition,
      completedAt,
      updatedAt: now,
    })
    .where(eq(libraryItems.id, existing.id))
    .run()

  return findItem(db, userId, bookId)!
}

export function completeBook(db: Db, userId: string, bookId: string, now = Date.now()): LibraryItem {
  const book = ensureBook(db, bookId)
  return updateProgress(
    db,
    userId,
    bookId,
    {
      progressPercent: MAX_PROGRESS,
      lastPositionSeconds: book.audioMinutes * 60,
      lastChapterPosition: existingLastChapter(db, userId, bookId),
    },
    now,
  )
}

function existingLastChapter(db: Db, userId: string, bookId: string): number {
  return findItem(db, userId, bookId)?.lastChapterPosition ?? 1
}

function libraryQuery(db: Db) {
  return db
    .select({
      item: libraryItems,
      book: books,
      categoryName: categories.name,
      categorySlug: categories.slug,
    })
    .from(libraryItems)
    .innerJoin(books, eq(books.id, libraryItems.bookId))
    .innerJoin(categories, eq(categories.id, books.categoryId))
}

export function getLibrary(db: Db, userId: string, status?: LibraryStatus): LibraryEntry[] {
  const rows = libraryQuery(db)
    .where(
      status
        ? and(eq(libraryItems.userId, userId), eq(libraryItems.status, status))
        : eq(libraryItems.userId, userId),
    )
    .orderBy(desc(libraryItems.updatedAt))
    .all()

  return rows.map((row) => ({
    ...row.item,
    book: row.book,
    categoryName: row.categoryName,
    categorySlug: row.categorySlug,
  }))
}

export function getContinueListening(db: Db, userId: string, limit = 3): LibraryEntry[] {
  const rows = libraryQuery(db)
    .where(
      and(
        eq(libraryItems.userId, userId),
        eq(libraryItems.status, 'in_progress'),
        ne(libraryItems.progressPercent, MAX_PROGRESS),
      ),
    )
    .orderBy(desc(libraryItems.updatedAt))
    .limit(limit)
    .all()

  return rows.map((row) => ({
    ...row.item,
    book: row.book,
    categoryName: row.categoryName,
    categorySlug: row.categorySlug,
  }))
}

export function getLibraryStats(db: Db, userId: string): LibraryStats {
  const rows = db
    .select({ item: libraryItems, audioMinutes: books.audioMinutes })
    .from(libraryItems)
    .innerJoin(books, eq(books.id, libraryItems.bookId))
    .where(eq(libraryItems.userId, userId))
    .all()

  const highlights = db
    .select({ value: sql<number>`count(*)` })
    .from(userHighlights)
    .where(eq(userHighlights.userId, userId))
    .get()

  const audioMinutes = rows.reduce(
    (total, row) => total + (row.item.progressPercent / 100) * row.audioMinutes,
    0,
  )

  return {
    completedCount: rows.filter((row) => row.item.status === 'completed').length,
    inProgressCount: rows.filter((row) => row.item.status === 'in_progress').length,
    savedCount: rows.filter((row) => row.item.status === 'saved').length,
    audioMinutes: Math.round(audioMinutes),
    audioHours: Math.round((audioMinutes / 60) * 10) / 10,
    highlightsCount: highlights?.value ?? 0,
  }
}

export function addHighlight(
  db: Db,
  userId: string,
  bookId: string,
  text: string,
  now = Date.now(),
): HighlightEntry {
  ensureBook(db, bookId)
  const trimmed = text.trim()
  if (!trimmed) {
    throw new AppError('VALIDATION', 'Escreva uma anotação antes de salvar.')
  }

  const id = crypto.randomUUID()
  db.insert(userHighlights)
    .values({ id, userId, bookId, text: trimmed, createdAt: now })
    .run()

  const book = ensureBook(db, bookId)
  return {
    id,
    text: trimmed,
    createdAt: now,
    bookId,
    bookTitle: book.title,
    bookAuthor: book.author,
  }
}

export function listHighlights(db: Db, userId: string, limit = 20): HighlightEntry[] {
  return db
    .select({
      id: userHighlights.id,
      text: userHighlights.text,
      createdAt: userHighlights.createdAt,
      bookId: books.id,
      bookTitle: books.title,
      bookAuthor: books.author,
    })
    .from(userHighlights)
    .innerJoin(books, eq(books.id, userHighlights.bookId))
    .where(eq(userHighlights.userId, userId))
    .orderBy(desc(userHighlights.createdAt))
    .limit(limit)
    .all()
}

export function removeHighlight(db: Db, userId: string, highlightId: string): void {
  db.delete(userHighlights)
    .where(and(eq(userHighlights.userId, userId), eq(userHighlights.id, highlightId)))
    .run()
}

export function getRecommendations(db: Db, userId: string, limit = 4): RecommendedBook[] {
  const interests = db
    .select({ categoryId: userInterests.categoryId })
    .from(userInterests)
    .where(eq(userInterests.userId, userId))
    .all()

  const completed = db
    .select({ bookId: libraryItems.bookId })
    .from(libraryItems)
    .where(and(eq(libraryItems.userId, userId), eq(libraryItems.status, 'completed')))
    .all()
    .map((row) => row.bookId)

  const conditions = []
  if (interests.length > 0) {
    conditions.push(
      inArray(
        books.categoryId,
        interests.map((row) => row.categoryId),
      ),
    )
  }
  if (completed.length > 0) {
    conditions.push(notInArray(books.id, completed))
  }

  return db
    .select({ book: books, categoryName: categories.name, categorySlug: categories.slug })
    .from(books)
    .innerJoin(categories, eq(categories.id, books.categoryId))
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(desc(books.rating))
    .limit(limit)
    .all()
    .map((row) => ({ ...row.book, categoryName: row.categoryName, categorySlug: row.categorySlug }))
}
