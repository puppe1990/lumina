import { and, asc, desc, eq, like, or, sql } from 'drizzle-orm'

import type { Db } from '#/db/client'
import {
  bookChapters,
  bookInsights,
  bookQuotes,
  books,
  categories,
  collectionBooks,
  collections,
} from '#/db/schema'
import { AppError } from '#/domain/errors'
import { normalizeForSearch } from '#/lib/text'

import type {
  Book,
  Category,
  Chapter,
  Collection,
  Insight,
  Quote,
} from '#/test/factories'

export type BookCard = Book & {
  categoryName: string
  categorySlug: string
}

export type BookDetail = Book & {
  category: Category
  chapters: Chapter[]
  insights: Insight[]
  quotes: Quote[]
}

export type CollectionWithBooks = Collection & {
  books: BookCard[]
}

type BookRow = {
  book: Book
  categoryName: string
  categorySlug: string
}

function mapCard(row: BookRow): BookCard {
  return {
    ...row.book,
    categoryName: row.categoryName,
    categorySlug: row.categorySlug,
  }
}

function bookCardQuery(db: Db) {
  return db
    .select({
      book: books,
      categoryName: categories.name,
      categorySlug: categories.slug,
    })
    .from(books)
    .innerJoin(categories, eq(categories.id, books.categoryId))
}

export function listCategories(db: Db): Category[] {
  return db.select().from(categories).orderBy(asc(categories.name)).all()
}

export function listBooks(
  db: Db,
  options: { categorySlug?: string; limit?: number } = {},
): BookCard[] {
  const conditions = []
  if (options.categorySlug && options.categorySlug !== 'todos') {
    conditions.push(eq(categories.slug, options.categorySlug))
  }

  const query = bookCardQuery(db)
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(desc(books.rating), desc(books.ratingsCount))

  const rows = options.limit ? query.limit(options.limit).all() : query.all()
  return rows.map(mapCard)
}

export function getFeaturedBook(db: Db): BookCard | null {
  const featured = bookCardQuery(db)
    .where(eq(books.isFeatured, true))
    .orderBy(desc(books.publishedAt))
    .limit(1)
    .get()

  if (featured) {
    return mapCard(featured)
  }

  const fallback = bookCardQuery(db).orderBy(desc(books.rating)).limit(1).get()
  return fallback ? mapCard(fallback) : null
}

export function listTrendingBooks(db: Db, limit = 6): BookCard[] {
  return bookCardQuery(db)
    .orderBy(desc(books.ratingsCount))
    .limit(limit)
    .all()
    .map(mapCard)
}

export function searchBooks(
  db: Db,
  options: { query?: string; categorySlug?: string; limit?: number } = {},
): BookCard[] {
  const conditions = []
  const term = options.query?.trim()

  if (term) {
    const pattern = `%${normalizeForSearch(term)}%`
    conditions.push(like(books.searchIndex, pattern))
  }

  if (options.categorySlug && options.categorySlug !== 'todos') {
    conditions.push(eq(categories.slug, options.categorySlug))
  }

  const query = bookCardQuery(db)
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(desc(books.rating))

  const rows = options.limit ? query.limit(options.limit).all() : query.all()
  return rows.map(mapCard)
}

export function listCollections(db: Db): CollectionWithBooks[] {
  const allCollections = db
    .select()
    .from(collections)
    .orderBy(asc(collections.position))
    .all()

  return allCollections.map((collection) => ({
    ...collection,
    books: listCollectionBooks(db, collection.id),
  }))
}

function listCollectionBooks(db: Db, collectionId: string): BookCard[] {
  return db
    .select({
      book: books,
      categoryName: categories.name,
      categorySlug: categories.slug,
    })
    .from(collectionBooks)
    .innerJoin(books, eq(books.id, collectionBooks.bookId))
    .innerJoin(categories, eq(categories.id, books.categoryId))
    .where(eq(collectionBooks.collectionId, collectionId))
    .orderBy(asc(collectionBooks.position))
    .all()
    .map(mapCard)
}

export function getCollection(db: Db, slug: string): CollectionWithBooks {
  const collection = db
    .select()
    .from(collections)
    .where(eq(collections.slug, slug))
    .get()
  if (!collection) {
    throw new AppError('NOT_FOUND', 'Coleção não encontrada.')
  }
  return { ...collection, books: listCollectionBooks(db, collection.id) }
}

export function getBookDetail(db: Db, idOrSlug: string): BookDetail {
  const row = bookCardQuery(db)
    .where(or(eq(books.id, idOrSlug), eq(books.slug, idOrSlug)))
    .limit(1)
    .get()

  if (!row) {
    throw new AppError('NOT_FOUND', 'Resumo não encontrado.')
  }

  const category = db
    .select()
    .from(categories)
    .where(eq(categories.id, row.book.categoryId))
    .get()!

  const chapters = db
    .select()
    .from(bookChapters)
    .where(eq(bookChapters.bookId, row.book.id))
    .orderBy(asc(bookChapters.position))
    .all()

  const insights = db
    .select()
    .from(bookInsights)
    .where(eq(bookInsights.bookId, row.book.id))
    .orderBy(asc(bookInsights.position))
    .all()

  const quotes = db
    .select()
    .from(bookQuotes)
    .where(eq(bookQuotes.bookId, row.book.id))
    .orderBy(asc(bookQuotes.position))
    .all()

  return {
    ...mapCard(row),
    category,
    chapters,
    insights,
    quotes,
  }
}

export function countBooks(db: Db): number {
  const result = db
    .select({ value: sql<number>`count(*)` })
    .from(books)
    .get()
  return result?.value ?? 0
}
