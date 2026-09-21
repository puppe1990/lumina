import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

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
import { getPreferences } from '#/domain/onboarding/service'
import { getSubscription } from '#/domain/plans/service'

import { requireUser, toPublicUser } from './context'
import { db } from './db'
import { runAction } from './result'

export const getLibraryData = createServerFn({ method: 'GET' }).handler(
  async () => {
    const user = requireUser()
    const database = db()

    return {
      user: toPublicUser(user),
      stats: getLibraryStats(database, user.id),
      continueListening: getContinueListening(database, user.id, 3),
      items: getLibrary(database, user.id),
      highlights: listHighlights(database, user.id, 20),
      recommendations: getRecommendations(database, user.id, 4),
      subscription: getSubscription(database, user.id),
      preferences: getPreferences(database, user.id),
    }
  },
)

export const saveBookAction = createServerFn({ method: 'POST' })
  .validator(z.object({ bookId: z.string().min(1) }))
  .handler(async ({ data }) =>
    runAction(() => {
      const user = requireUser()
      return { entry: saveBook(db(), user.id, data.bookId) }
    }),
  )

export const removeBookAction = createServerFn({ method: 'POST' })
  .validator(z.object({ bookId: z.string().min(1) }))
  .handler(async ({ data }) =>
    runAction(() => {
      const user = requireUser()
      removeBook(db(), user.id, data.bookId)
      return { removed: true }
    }),
  )

export const updateProgressAction = createServerFn({ method: 'POST' })
  .validator(
    z.object({
      bookId: z.string().min(1),
      progressPercent: z.number(),
      lastPositionSeconds: z.number().optional(),
      lastChapterPosition: z.number().optional(),
    }),
  )
  .handler(async ({ data }) =>
    runAction(() => {
      const user = requireUser()
      const { bookId, ...progress } = data
      return { entry: updateProgress(db(), user.id, bookId, progress) }
    }),
  )

export const completeBookAction = createServerFn({ method: 'POST' })
  .validator(z.object({ bookId: z.string().min(1) }))
  .handler(async ({ data }) =>
    runAction(() => {
      const user = requireUser()
      return { entry: completeBook(db(), user.id, data.bookId) }
    }),
  )

export const addHighlightAction = createServerFn({ method: 'POST' })
  .validator(z.object({ bookId: z.string().min(1), text: z.string().min(1) }))
  .handler(async ({ data }) =>
    runAction(() => {
      const user = requireUser()
      return { highlight: addHighlight(db(), user.id, data.bookId, data.text) }
    }),
  )

export const removeHighlightAction = createServerFn({ method: 'POST' })
  .validator(z.object({ highlightId: z.string().min(1) }))
  .handler(async ({ data }) =>
    runAction(() => {
      const user = requireUser()
      removeHighlight(db(), user.id, data.highlightId)
      return { removed: true }
    }),
  )
