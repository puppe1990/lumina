import { beforeEach, describe, expect, it } from 'vitest'

import type { Db } from '#/db/client'
import {
  addHighlight,
  completeBook,
  getContinueListening,
  getLibrary,
  getLibraryStats,
  getRecommendations,
  listHighlights,
  removeBook,
  removeHighlight,
  saveBook,
  updateProgress,
} from '#/domain/library/service'
import {
  createTestDb,
  faker,
  makeBook,
  makeCategory,
  makeInterest,
  makeLibraryItem,
  makeUser,
} from '#/test/factories'

let db: Db

beforeEach(() => {
  db = createTestDb()
  faker.seed(99)
})

describe('saveBook', () => {
  it('saves a book and is idempotent', () => {
    const user = makeUser(db)
    const category = makeCategory(db)
    const book = makeBook(db, { categoryId: category.id })

    const first = saveBook(db, user.id, book.id, 100)
    const second = saveBook(db, user.id, book.id, 200)

    expect(first.status).toBe('saved')
    expect(second.id).toBe(first.id)
    expect(getLibrary(db, user.id)).toHaveLength(1)
  })

  it('rejects unknown books', () => {
    const user = makeUser(db)
    expect(() => saveBook(db, user.id, 'livro-fantasma')).toThrowError()
  })
})

describe('updateProgress', () => {
  it('moves a book to in_progress and clamps out-of-range values', () => {
    const user = makeUser(db)
    const category = makeCategory(db)
    const book = makeBook(db, { categoryId: category.id })

    const item = updateProgress(db, user.id, book.id, {
      progressPercent: 65.4,
      lastPositionSeconds: 255,
      lastChapterPosition: 3,
    })

    expect(item.status).toBe('in_progress')
    expect(item.progressPercent).toBe(65)
    expect(item.lastPositionSeconds).toBe(255)
    expect(item.lastChapterPosition).toBe(3)
  })

  it('clamps progress above 100 and marks it completed', () => {
    const user = makeUser(db)
    const category = makeCategory(db)
    const book = makeBook(db, { categoryId: category.id })

    const item = updateProgress(db, user.id, book.id, { progressPercent: 140 })

    expect(item.progressPercent).toBe(100)
    expect(item.status).toBe('completed')
    expect(item.completedAt).not.toBeNull()
  })

  it('keeps the original completion timestamp when re-saving', () => {
    const user = makeUser(db)
    const category = makeCategory(db)
    const book = makeBook(db, { categoryId: category.id })

    const completed = completeBook(db, user.id, book.id, 500)
    const again = completeBook(db, user.id, book.id, 900)

    expect(again.completedAt).toBe(completed.completedAt)
  })
})

describe('getLibrary', () => {
  it('filters entries by status', () => {
    const user = makeUser(db)
    const category = makeCategory(db)
    const saved = makeBook(db, { categoryId: category.id, title: 'Salvo' })
    const reading = makeBook(db, { categoryId: category.id, title: 'Lendo' })
    const done = makeBook(db, { categoryId: category.id, title: 'Concluído' })

    saveBook(db, user.id, saved.id)
    makeLibraryItem(db, {
      userId: user.id,
      bookId: reading.id,
      status: 'in_progress',
    })
    makeLibraryItem(db, {
      userId: user.id,
      bookId: done.id,
      status: 'completed',
    })

    expect(
      getLibrary(db, user.id)
        .map((e) => e.book.title)
        .sort(),
    ).toEqual(['Concluído', 'Lendo', 'Salvo'])
    expect(
      getLibrary(db, user.id, 'in_progress').map((e) => e.book.title),
    ).toEqual(['Lendo'])
    expect(getLibrary(db, user.id, 'completed')).toHaveLength(1)
  })

  it('includes category metadata', () => {
    const user = makeUser(db)
    const category = makeCategory(db, { name: 'Finanças', slug: 'financas' })
    const book = makeBook(db, { categoryId: category.id })
    saveBook(db, user.id, book.id)

    const [entry] = getLibrary(db, user.id)
    expect(entry.categoryName).toBe('Finanças')
    expect(entry.categorySlug).toBe('financas')
  })
})

describe('getContinueListening', () => {
  it('returns only unfinished in-progress items ordered by recency', () => {
    const user = makeUser(db)
    const category = makeCategory(db)
    const older = makeBook(db, { categoryId: category.id, title: 'Antigo' })
    const newer = makeBook(db, { categoryId: category.id, title: 'Recente' })
    const done = makeBook(db, { categoryId: category.id, title: 'Feito' })

    makeLibraryItem(db, {
      userId: user.id,
      bookId: older.id,
      status: 'in_progress',
      progressPercent: 30,
      updatedAt: 100,
    })
    makeLibraryItem(db, {
      userId: user.id,
      bookId: newer.id,
      status: 'in_progress',
      progressPercent: 65,
      updatedAt: 200,
    })
    makeLibraryItem(db, {
      userId: user.id,
      bookId: done.id,
      status: 'completed',
      progressPercent: 100,
    })

    expect(getContinueListening(db, user.id).map((e) => e.book.title)).toEqual([
      'Recente',
      'Antigo',
    ])
  })
})

describe('getLibraryStats', () => {
  it('aggregates counts, audio hours and reading hours', () => {
    const user = makeUser(db)
    const category = makeCategory(db)
    const a = makeBook(db, {
      categoryId: category.id,
      audioMinutes: 20,
      readingMinutes: 10,
    })
    const b = makeBook(db, {
      categoryId: category.id,
      audioMinutes: 30,
      readingMinutes: 20,
    })
    const c = makeBook(db, { categoryId: category.id, readingMinutes: 5 })

    makeLibraryItem(db, {
      userId: user.id,
      bookId: a.id,
      status: 'completed',
      progressPercent: 100,
    })
    makeLibraryItem(db, {
      userId: user.id,
      bookId: b.id,
      status: 'in_progress',
      progressPercent: 50,
    })
    makeLibraryItem(db, {
      userId: user.id,
      bookId: c.id,
      status: 'saved',
      progressPercent: 0,
    })
    addHighlight(db, user.id, a.id, 'Grande ideia')

    const stats = getLibraryStats(db, user.id)
    expect(stats.completedCount).toBe(1)
    expect(stats.inProgressCount).toBe(1)
    expect(stats.savedCount).toBe(1)
    expect(stats.audioMinutes).toBe(35)
    expect(stats.audioHours).toBe(0.6)
    expect(stats.readingMinutes).toBe(20)
    expect(stats.readingHours).toBe(0.3)
    expect(stats.highlightsCount).toBe(1)
  })
})

describe('removeBook', () => {
  it('removes an entry', () => {
    const user = makeUser(db)
    const category = makeCategory(db)
    const book = makeBook(db, { categoryId: category.id })
    saveBook(db, user.id, book.id)

    removeBook(db, user.id, book.id)

    expect(getLibrary(db, user.id)).toHaveLength(0)
  })
})

describe('highlights', () => {
  it('adds and lists highlights with book metadata', () => {
    const user = makeUser(db)
    const category = makeCategory(db)
    const book = makeBook(db, {
      categoryId: category.id,
      title: 'Essencialismo',
      author: 'Greg McKeown',
    })

    addHighlight(db, user.id, book.id, '  Menos é mais.  ', 123)

    const highlights = listHighlights(db, user.id)
    expect(highlights).toHaveLength(1)
    expect(highlights[0].text).toBe('Menos é mais.')
    expect(highlights[0].bookTitle).toBe('Essencialismo')
    expect(highlights[0].createdAt).toBe(123)
  })

  it('rejects empty notes and unknown books', () => {
    const user = makeUser(db)
    const category = makeCategory(db)
    const book = makeBook(db, { categoryId: category.id })

    expect(() => addHighlight(db, user.id, book.id, '   ')).toThrowError()
    expect(() =>
      addHighlight(db, user.id, 'nao-existe', 'texto'),
    ).toThrowError()
  })

  it('removes only the own highlight', () => {
    const user = makeUser(db)
    const other = makeUser(db)
    const category = makeCategory(db)
    const book = makeBook(db, { categoryId: category.id })
    const highlight = addHighlight(db, user.id, book.id, 'Minha nota')

    removeHighlight(db, other.id, highlight.id)
    expect(listHighlights(db, user.id)).toHaveLength(1)

    removeHighlight(db, user.id, highlight.id)
    expect(listHighlights(db, user.id)).toHaveLength(0)
  })
})

describe('getRecommendations', () => {
  it('prioritizes books from the user interests', () => {
    const user = makeUser(db)
    const focus = makeCategory(db, { slug: 'foco' })
    const money = makeCategory(db, { slug: 'financas' })
    makeInterest(db, user.id, focus.id)
    const focusBook = makeBook(db, {
      categoryId: focus.id,
      title: 'Deep Work',
      rating: 4.2,
    })
    makeBook(db, { categoryId: money.id, title: 'Riqueza', rating: 5 })

    expect(getRecommendations(db, user.id).map((b) => b.title)).toEqual([
      'Deep Work',
    ])
    expect(getRecommendations(db, user.id)[0].categorySlug).toBe('foco')
    expect(focusBook).toBeTruthy()
  })

  it('excludes completed books', () => {
    const user = makeUser(db)
    const category = makeCategory(db)
    makeInterest(db, user.id, category.id)
    const done = makeBook(db, {
      categoryId: category.id,
      title: 'Já Li',
      rating: 5,
    })
    makeBook(db, { categoryId: category.id, title: 'Próximo', rating: 4.5 })
    makeLibraryItem(db, {
      userId: user.id,
      bookId: done.id,
      status: 'completed',
      progressPercent: 100,
    })

    expect(getRecommendations(db, user.id).map((b) => b.title)).toEqual([
      'Próximo',
    ])
  })

  it('falls back to top rated books without interests', () => {
    const user = makeUser(db)
    const category = makeCategory(db)
    makeBook(db, { categoryId: category.id, title: 'Top', rating: 5 })
    makeBook(db, { categoryId: category.id, title: 'Meia', rating: 4 })

    expect(getRecommendations(db, user.id, 1).map((b) => b.title)).toEqual([
      'Top',
    ])
  })
})
