import { beforeEach, describe, expect, it } from 'vitest'

import type { Db } from '#/db/client'
import {
  countBooks,
  getBookDetail,
  listBooks,
  listCategories,
  listCollections,
} from '#/domain/catalog/service'
import { getLibraryItem } from '#/domain/library/service'
import { listPlans } from '#/domain/plans/service'
import {
  ensureSeeded,
  isSeeded,
  resetDatabase,
  seedDatabase,
  syncCatalog,
} from '#/db/seed'
import {
  createTestDb,
  faker,
  makeBook,
  makeCategory,
  makeLibraryItem,
  makeUser,
} from '#/test/factories'

let db: Db

beforeEach(() => {
  db = createTestDb()
  faker.seed(1)
})

describe('seedDatabase', () => {
  it('creates a rich, interconnected catalog', () => {
    const summary = seedDatabase(db)

    expect(summary.categories).toBeGreaterThanOrEqual(9)
    expect(summary.books).toBeGreaterThanOrEqual(26)
    expect(countBooks(db)).toBe(summary.books)
    expect(listCategories(db).length).toBe(summary.categories)
    expect(listPlans(db).length).toBeGreaterThanOrEqual(2)
  })

  it('gives every book chapters, insights and quotes', () => {
    seedDatabase(db)

    for (const book of listBooks(db)) {
      const detail = getBookDetail(db, book.id)
      expect(detail.chapters).toHaveLength(4)
      expect(detail.insights).toHaveLength(4)
      expect(detail.quotes).toHaveLength(2)
      expect(detail.description.length).toBeGreaterThan(80)
    }

    const allCollections = listCollections(db)
    expect(allCollections.length).toBeGreaterThanOrEqual(2)
    for (const collection of allCollections) {
      expect(collection.books.length).toBeGreaterThan(0)
    }
  })

  it('makes books searchable without accents or casing', () => {
    seedDatabase(db)
    const detail = getBookDetail(db, 'habitos-atomicos')
    expect(detail.searchIndex).toContain('habitos atomicos')
    expect(detail.chapters.length).toBeGreaterThan(0)
    expect(detail.insights.length).toBeGreaterThan(0)
    expect(detail.quotes.length).toBeGreaterThan(0)
  })

  it('is idempotent and keeps deterministic book ids across syncs', () => {
    seedDatabase(db)
    const first = getBookDetail(db, 'habitos-atomicos')
    seedDatabase(db)
    const second = getBookDetail(db, 'habitos-atomicos')

    expect(second.id).toBe(first.id)
    expect(second.chapters[0].id).toBe(first.chapters[0].id)
    expect(countBooks(db)).toBe(26)
  })

  it('updates legacy rows in place, preserving ids and user progress', () => {
    const legacyCategory = makeCategory(db, {
      slug: 'produtividade-foco',
      name: 'Categoria Antiga',
    })
    const legacyBook = makeBook(db, {
      categoryId: legacyCategory.id,
      slug: 'habitos-atomicos',
      title: 'Título Antigo',
    })
    const user = makeUser(db)
    makeLibraryItem(db, {
      userId: user.id,
      bookId: legacyBook.id,
      status: 'in_progress',
      progressPercent: 40,
    })

    const summary = syncCatalog(db)

    expect(summary.books).toBe(26)
    const detail = getBookDetail(db, 'habitos-atomicos')
    expect(detail.id).toBe(legacyBook.id)
    expect(detail.title).toBe('Hábitos Atômicos')
    expect(detail.category.id).toBe(legacyCategory.id)
    expect(countBooks(db)).toBe(26)
    expect(getLibraryItem(db, user.id, legacyBook.id)?.progressPercent).toBe(40)
  })

  it('resets the catalog safely', () => {
    seedDatabase(db)
    resetDatabase(db)
    expect(isSeeded(db)).toBe(false)
  })
})

describe('ensureSeeded', () => {
  it('seeds once and then reports no-op', () => {
    expect(ensureSeeded(db)).not.toBeNull()
    expect(ensureSeeded(db)).toBeNull()
  })
})
