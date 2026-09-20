import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

import { listCategories } from '#/domain/catalog/service'
import {
  completeOnboarding,
  getOnboardingState,
  getPreferences,
  projectAnnualBooks,
  replaceInterests,
  saveGoal as saveGoalCommand,
} from '#/domain/onboarding/service'

import { currentUser, requireUser, toPublicUser } from './context'
import { db } from './db'
import { runAction } from './result'

export const getOnboardingData = createServerFn({ method: 'GET' }).handler(async () => {
  const database = db()
  const user = currentUser()
  const categories = listCategories(database)

  if (!user) {
    return {
      user: null,
      categories,
      preferences: null,
      interests: [],
      annualBooks: 36,
    }
  }

  const state = getOnboardingState(database, user.id)
  return {
    user: toPublicUser(user),
    categories,
    preferences: state.preferences,
    interests: state.interests,
    annualBooks: projectAnnualBooks(state.preferences.dailyGoalMinutes),
  }
})

export const saveInterests = createServerFn({ method: 'POST' })
  .validator(z.object({ categoryIds: z.array(z.string()).min(1) }))
  .handler(async ({ data }) =>
    runAction(() => {
      const user = requireUser()
      return { interests: replaceInterests(db(), user.id, data.categoryIds) }
    }),
  )

export const saveGoal = createServerFn({ method: 'POST' })
  .validator(
    z.object({
      dailyGoalMinutes: z.number(),
      preferredFormat: z.string(),
      reminderEnabled: z.boolean(),
      reminderTime: z.string(),
    }),
  )
  .handler(async ({ data }) =>
    runAction(() => {
      const user = requireUser()
      const preferences = saveGoalCommand(db(), user.id, data)
      return { preferences, annualBooks: projectAnnualBooks(preferences.dailyGoalMinutes) }
    }),
  )

export const finishOnboarding = createServerFn({ method: 'POST' }).handler(async () =>
  runAction(() => {
    const user = requireUser()
    return { preferences: completeOnboarding(db(), user.id) }
  }),
)

export const getPreferencesData = createServerFn({ method: 'GET' }).handler(async () => {
  const user = requireUser()
  return getPreferences(db(), user.id)
})
