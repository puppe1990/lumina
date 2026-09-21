import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

import {
  countBooks,
  countBooksMatching,
  getBookDetail,
  getFeaturedBook,
  listBooks,
  listCategories,
  listCollections,
  listTrendingBooks,
  searchBooks,
} from '#/domain/catalog/service'
import { getContinueListening, getLibraryItem } from '#/domain/library/service'
import { DEFAULT_SORT, SORT_VALUES } from '#/lib/filters'

import { requireUser } from './context'
import { db } from './db'

const PAGE_SIZE = 12

export const getExploreData = createServerFn({ method: 'GET' })
  .validator(
    z
      .object({
        categorySlug: z.string().optional(),
        query: z.string().optional(),
        minRating: z.number().optional(),
        minMinutes: z.number().optional(),
        maxMinutes: z.number().optional(),
        sort: z.enum(SORT_VALUES).optional(),
        view: z.enum(['all']).optional(),
        page: z.number().optional(),
      })
      .optional(),
  )
  .handler(async ({ data }) => {
    const database = db()
    const hasQuery = Boolean(data?.query?.trim())
    const categorySlug = data?.categorySlug
    const sort = data?.sort
    const hasAdvanced =
      typeof data?.minRating === 'number' ||
      typeof data?.minMinutes === 'number' ||
      typeof data?.maxMinutes === 'number' ||
      (sort !== undefined && sort !== DEFAULT_SORT)
    const isFiltered =
      data?.view === 'all' ||
      hasQuery ||
      Boolean(categorySlug && categorySlug !== 'todos') ||
      hasAdvanced

    const filters = {
      query: data?.query,
      categorySlug,
      minRating: data?.minRating,
      minMinutes: data?.minMinutes,
      maxMinutes: data?.maxMinutes,
      sort,
    }

    let results = null
    let pagination = null
    if (isFiltered) {
      const total = countBooksMatching(database, filters)
      const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))
      const page = Math.min(Math.max(1, data?.page ?? 1), totalPages)
      results = searchBooks(database, {
        ...filters,
        limit: PAGE_SIZE,
        offset: (page - 1) * PAGE_SIZE,
      })
      pagination = { page, pageSize: PAGE_SIZE, total, totalPages }
    }

    return {
      totalBooks: countBooks(database),
      categories: listCategories(database),
      featured: getFeaturedBook(database),
      trending: listTrendingBooks(database, 8),
      collections: listCollections(database),
      results,
      pagination,
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

export const getDownloadableBooks = createServerFn({ method: 'GET' }).handler(
  async () => {
    requireUser()
    return { books: listBooks(db()) }
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
