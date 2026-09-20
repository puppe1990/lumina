import { beforeEach, describe, expect, it } from 'vitest'

import type { Db } from '#/db/client'
import * as schema from '#/db/schema'
import {
  countBooks,
  getBookDetail,
  getCollection,
  getFeaturedBook,
  listBooks,
  listCategories,
  listCollections,
  listTrendingBooks,
  searchBooks,
} from '#/domain/catalog/service'
import { isAppError } from '#/domain/errors'
import {
  createTestDb,
  faker,
  makeBook,
  makeCategory,
  makeChapter,
  makeCollection,
  makeInsight,
  makeQuote,
} from '#/test/factories'

let db: Db

beforeEach(() => {
  db = createTestDb()
  faker.seed(11)
})

describe('listCategories', () => {
  it('returns categories alphabetically', () => {
    makeCategory(db, { name: 'Finanças' })
    makeCategory(db, { name: 'Carreira' })
    makeCategory(db, { name: 'Negócios' })

    expect(listCategories(db).map((c) => c.name)).toEqual(['Carreira', 'Finanças', 'Negócios'])
  })
})

describe('listBooks', () => {
  it('filters by category slug and ignores the "todos" sentinel', () => {
    const focus = makeCategory(db, { slug: 'foco', name: 'Foco' })
    const money = makeCategory(db, { slug: 'financas', name: 'Finanças' })
    makeBook(db, { categoryId: focus.id, title: 'Deep Work', rating: 4.9 })
    makeBook(db, { categoryId: money.id, title: 'Psicologia Financeira', rating: 5 })

    expect(listBooks(db, { categorySlug: 'foco' }).map((b) => b.title)).toEqual(['Deep Work'])
    expect(listBooks(db, { categorySlug: 'todos' })).toHaveLength(2)
  })

  it('orders by rating and respects the limit', () => {
    const category = makeCategory(db)
    makeBook(db, { categoryId: category.id, title: 'A', rating: 4.1 })
    makeBook(db, { categoryId: category.id, title: 'B', rating: 4.9 })
    makeBook(db, { categoryId: category.id, title: 'C', rating: 4.5 })

    expect(listBooks(db, { limit: 2 }).map((b) => b.title)).toEqual(['B', 'C'])
  })
})

describe('getFeaturedBook', () => {
  it('prefers the featured book', () => {
    const category = makeCategory(db)
    makeBook(db, { categoryId: category.id, title: 'Comum', rating: 5 })
    makeBook(db, { categoryId: category.id, title: 'Destaque', isFeatured: true, rating: 4.2 })

    expect(getFeaturedBook(db)?.title).toBe('Destaque')
  })

  it('falls back to the best rated book', () => {
    const category = makeCategory(db)
    makeBook(db, { categoryId: category.id, title: 'Top', rating: 5 })
    makeBook(db, { categoryId: category.id, title: 'Meia', rating: 4 })

    expect(getFeaturedBook(db)?.title).toBe('Top')
  })

  it('returns null when the catalog is empty', () => {
    expect(getFeaturedBook(db)).toBeNull()
  })
})

describe('listTrendingBooks', () => {
  it('orders by ratings count', () => {
    const category = makeCategory(db)
    makeBook(db, { categoryId: category.id, title: 'Pouco', ratingsCount: 10 })
    makeBook(db, { categoryId: category.id, title: 'Muito', ratingsCount: 9000 })

    expect(listTrendingBooks(db, 1).map((b) => b.title)).toEqual(['Muito'])
  })
})

describe('searchBooks', () => {
  it('matches title, author and tagline case-insensitively', () => {
    const category = makeCategory(db, { slug: 'habitos' })
    makeBook(db, {
      categoryId: category.id,
      title: 'Hábitos Atômicos',
      author: 'James Clear',
      tagline: 'Pequenas mudanças, resultados enormes',
    })
    makeBook(db, { categoryId: category.id, title: 'Outro Livro', author: 'Zé Ninguém' })

    expect(searchBooks(db, { query: 'atómicos' }).map((b) => b.title)).toEqual([
      'Hábitos Atômicos',
    ])
    expect(searchBooks(db, { query: 'james' })).toHaveLength(1)
    expect(searchBooks(db, { query: 'resultados' })).toHaveLength(1)
    expect(searchBooks(db, { query: 'inexistente' })).toHaveLength(0)
  })

  it('combines the text query with a category filter', () => {
    const habits = makeCategory(db, { slug: 'habitos' })
    const money = makeCategory(db, { slug: 'dinheiro' })
    makeBook(db, { categoryId: habits.id, title: 'Hábitos Atômicos' })
    makeBook(db, { categoryId: money.id, title: 'Hábitos de Riqueza' })

    const results = searchBooks(db, { query: 'hábitos', categorySlug: 'dinheiro' })
    expect(results.map((b) => b.title)).toEqual(['Hábitos de Riqueza'])
  })
})

describe('collections', () => {
  it('returns collections ordered with their books', () => {
    const category = makeCategory(db)
    const first = makeBook(db, { categoryId: category.id, title: 'Primeiro' })
    const second = makeBook(db, { categoryId: category.id, title: 'Segundo' })
    const collection = makeCollection(db, { title: 'Foco Profundo', position: 1 })
    const earlier = makeCollection(db, { title: 'Liderança', position: 0 })

    db.insert(schema.collectionBooks)
      .values([
        { collectionId: collection.id, bookId: second.id, position: 2 },
        { collectionId: collection.id, bookId: first.id, position: 1 },
      ])
      .run()

    const result = listCollections(db)
    expect(result.map((c) => c.title)).toEqual(['Liderança', 'Foco Profundo'])
    expect(result[1].books.map((b) => b.title)).toEqual(['Primeiro', 'Segundo'])
    expect(earlier).toBeTruthy()
  })

  it('throws a typed error for an unknown collection', () => {
    try {
      getCollection(db, 'nao-existe')
      throw new Error('expected failure')
    } catch (error) {
      expect(isAppError(error) && error.code).toBe('NOT_FOUND')
    }
  })
})

describe('getBookDetail', () => {
  it('hydrates chapters, insights and quotes in order', () => {
    const category = makeCategory(db)
    const book = makeBook(db, { categoryId: category.id, title: 'Hábitos Atômicos' })
    makeChapter(db, { bookId: book.id, position: 2, title: 'Capítulo 2' })
    makeChapter(db, { bookId: book.id, position: 1, title: 'Capítulo 1' })
    makeInsight(db, { bookId: book.id, position: 2, title: 'Segunda ideia' })
    makeInsight(db, { bookId: book.id, position: 1, title: 'Primeira ideia' })
    makeQuote(db, { bookId: book.id, position: 1, text: 'Citação marcante' })

    const detail = getBookDetail(db, book.slug)

    expect(detail.title).toBe('Hábitos Atômicos')
    expect(detail.category.name).toBe(category.name)
    expect(detail.chapters.map((c) => c.title)).toEqual(['Capítulo 1', 'Capítulo 2'])
    expect(detail.insights.map((i) => i.title)).toEqual(['Primeira ideia', 'Segunda ideia'])
    expect(detail.quotes[0].text).toBe('Citação marcante')
  })

  it('supports lookup by id as well as slug', () => {
    const category = makeCategory(db)
    const book = makeBook(db, { categoryId: category.id })

    expect(getBookDetail(db, book.id).id).toBe(book.id)
    expect(() => getBookDetail(db, 'faltante')).toThrowError()
  })
})

describe('countBooks', () => {
  it('counts the catalog', () => {
    const category = makeCategory(db)
    makeBook(db, { categoryId: category.id })
    makeBook(db, { categoryId: category.id })

    expect(countBooks(db)).toBe(2)
  })
})
