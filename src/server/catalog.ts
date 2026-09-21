import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

import {
  countBooks,
  getBookDetail,
  getFeaturedBook,
  listCategories,
  listCollections,
  listTrendingBooks,
  searchBooks,
} from '#/domain/catalog/service'
import { getContinueListening, getLibraryItem } from '#/domain/library/service'

import { requireUser } from './context'
import { db } from './db'

export const getExploreData = createServerFn({ method: 'GET' })
  .validator(
    z
      .object({
        categorySlug: z.string().optional(),
        query: z.string().optional(),
      })
      .optional(),
  )
  .handler(async ({ data }) => {
    const database = db()
    const hasQuery = Boolean(data?.query?.trim())
    const categorySlug = data?.categorySlug
    const isFiltered =
      hasQuery || Boolean(categorySlug && categorySlug !== 'todos')

    return {
      totalBooks: countBooks(database),
      categories: listCategories(database),
      featured: getFeaturedBook(database),
      trending: listTrendingBooks(database, 8),
      collections: listCollections(database),
      results: isFiltered
        ? searchBooks(database, { query: data?.query, categorySlug, limit: 40 })
        : null,
    }
  })

export const getCatalogStats = createServerFn({ method: 'GET' }).handler(
  async () => {
    const database = db()
    return {
      totalBooks: countBooks(database),
      totalCategories: listCategories(database).length,
      totalCollections: listCollections(database).length,
    }
  },
)

export const getBookDetailData = createServerFn({ method: 'GET' })
  .validator(z.object({ idOrSlug: z.string().min(1) }))
  .handler(async ({ data }) => {
    const database = db()
    const user = requireUser()
    const book = getBookDetail(database, data.idOrSlug)
    return {
      book,
      entry: getLibraryItem(database, user.id, book.id),
    }
  })

export const getReaderIndex = createServerFn({ method: 'GET' }).handler(
  async () => {
    const database = db()
    const user = requireUser()
    const inProgress = getContinueListening(database, user.id, 1)
    if (inProgress.length > 0) {
      return { bookId: inProgress[0].book.id }
    }
    const trending = listTrendingBooks(database, 1)
    return { bookId: trending.length > 0 ? trending[0].id : null }
  },
)
