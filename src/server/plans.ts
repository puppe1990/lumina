import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

import { countBooks } from '#/domain/catalog/service'
import {
  cancelSubscription,
  getSubscription,
  listPlans,
  subscribe,
} from '#/domain/plans/service'

import { requireUser } from './context'
import { db } from './db'
import { runAction } from './result'

export const getPlansData = createServerFn({ method: 'GET' }).handler(
  async () => {
    const user = requireUser()
    const database = db()
    return {
      totalBooks: countBooks(database),
      plans: listPlans(database),
      subscription: getSubscription(database, user.id),
    }
  },
)

export const subscribeToPlan = createServerFn({ method: 'POST' })
  .validator(z.object({ planSlug: z.string().min(1) }))
  .handler(async ({ data }) =>
    runAction(() => {
      const user = requireUser()
      const database = db()
      const subscription = subscribe(database, user.id, data.planSlug)
      return { subscription, view: getSubscription(database, user.id) }
    }),
  )

export const cancelPlan = createServerFn({ method: 'POST' }).handler(async () =>
  runAction(() => {
    const user = requireUser()
    const database = db()
    cancelSubscription(database, user.id)
    return { subscription: getSubscription(database, user.id) }
  }),
)
