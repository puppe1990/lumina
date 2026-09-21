import { beforeEach, describe, expect, it } from 'vitest'

import type { Db } from '#/db/client'
import { isAppError } from '#/domain/errors'
import {
  completeOnboarding,
  getOnboardingState,
  getPreferences,
  getUserInterests,
  projectAnnualBooks,
  replaceInterests,
  saveGoal,
  updateReminder,
} from '#/domain/onboarding/service'
import {
  createTestDb,
  faker,
  makeCategory,
  makeInterest,
  makeUser,
} from '#/test/factories'

let db: Db

beforeEach(() => {
  db = createTestDb()
  faker.seed(7)
})

describe('preferences', () => {
  it('creates sensible defaults on first access', () => {
    const user = makeUser(db)

    const preferences = getPreferences(db, user.id)

    expect(preferences.dailyGoalMinutes).toBe(15)
    expect(preferences.preferredFormat).toBe('audio')
    expect(preferences.reminderEnabled).toBe(true)
    expect(preferences.reminderTime).toBe('07:30')
    expect(preferences.onboardingCompleted).toBe(false)
  })

  it('is idempotent', () => {
    const user = makeUser(db)
    const first = getPreferences(db, user.id, 100)
    const second = getPreferences(db, user.id, 200)

    expect(second).toEqual(first)
  })
})

describe('interests', () => {
  it('replaces and dedupes selections', () => {
    const user = makeUser(db)
    const a = makeCategory(db)
    const b = makeCategory(db)

    const interests = replaceInterests(db, user.id, [a.id, a.id, b.id])

    expect(interests.map((c) => c.id).sort()).toEqual([a.id, b.id].sort())
  })

  it('rejects an empty selection', () => {
    const user = makeUser(db)

    try {
      replaceInterests(db, user.id, [])
      throw new Error('expected validation failure')
    } catch (error) {
      expect(isAppError(error) && error.code).toBe('VALIDATION')
    }
  })

  it('rejects unknown categories', () => {
    const user = makeUser(db)

    expect(() =>
      replaceInterests(db, user.id, ['categoria-fantasma']),
    ).toThrowError()
  })

  it('returns interests joined with category data, sorted by name', () => {
    const user = makeUser(db)
    const zebra = makeCategory(db, { name: 'Zebra' })
    const alfa = makeCategory(db, { name: 'Alfa' })
    makeInterest(db, user.id, zebra.id)
    makeInterest(db, user.id, alfa.id)

    expect(getUserInterests(db, user.id).map((c) => c.name)).toEqual([
      'Alfa',
      'Zebra',
    ])
  })
})

describe('goal', () => {
  it('persists a valid goal', () => {
    const user = makeUser(db)

    const preferences = saveGoal(db, user.id, {
      dailyGoalMinutes: 30,
      preferredFormat: 'hybrid',
      reminderEnabled: true,
      reminderTime: '21:30',
    })

    expect(preferences.dailyGoalMinutes).toBe(30)
    expect(preferences.preferredFormat).toBe('hybrid')
    expect(preferences.reminderTime).toBe('21:30')
  })

  it.each([5, 20, 45])('rejects unsupported goal %i', (dailyGoalMinutes) => {
    const user = makeUser(db)
    expect(() =>
      saveGoal(db, user.id, {
        dailyGoalMinutes,
        preferredFormat: 'audio',
        reminderEnabled: false,
        reminderTime: '07:30',
      }),
    ).toThrowError()
  })

  it('validates the reminder time only when reminders are enabled', () => {
    const user = makeUser(db)

    expect(() =>
      saveGoal(db, user.id, {
        dailyGoalMinutes: 15,
        preferredFormat: 'audio',
        reminderEnabled: false,
        reminderTime: '99:99',
      }),
    ).not.toThrowError()

    expect(() =>
      saveGoal(db, user.id, {
        dailyGoalMinutes: 15,
        preferredFormat: 'audio',
        reminderEnabled: true,
        reminderTime: '99:99',
      }),
    ).toThrowError()
  })
})

describe('reminder', () => {
  it('persists the reminder toggle and time', () => {
    const user = makeUser(db)

    const enabled = updateReminder(db, user.id, {
      reminderEnabled: true,
      reminderTime: '21:30',
    })
    expect(enabled.reminderEnabled).toBe(true)
    expect(enabled.reminderTime).toBe('21:30')

    const disabled = updateReminder(db, user.id, {
      reminderEnabled: false,
      reminderTime: '21:30',
    })
    expect(disabled.reminderEnabled).toBe(false)
    expect(disabled.reminderTime).toBe('21:30')
    expect(getPreferences(db, user.id).reminderEnabled).toBe(false)
  })

  it('rejects an invalid time when enabling reminders', () => {
    const user = makeUser(db)

    try {
      updateReminder(db, user.id, {
        reminderEnabled: true,
        reminderTime: '99:99',
      })
      throw new Error('expected failure')
    } catch (error) {
      expect(isAppError(error) && error.code).toBe('VALIDATION')
    }
  })
})

describe('onboarding state', () => {
  it('marks onboarding complete and exposes the state', () => {
    const user = makeUser(db)
    const category = makeCategory(db)
    replaceInterests(db, user.id, [category.id])

    completeOnboarding(db, user.id, 500)

    const state = getOnboardingState(db, user.id)
    expect(state.isComplete).toBe(true)
    expect(state.interests).toHaveLength(1)
    expect(state.preferences.onboardingCompleted).toBe(true)
  })

  it('is not complete without interests', () => {
    const user = makeUser(db)
    completeOnboarding(db, user.id)
    expect(getOnboardingState(db, user.id).isComplete).toBe(false)
  })
})

describe('projectAnnualBooks', () => {
  it('projects realistic annual output per goal', () => {
    expect(projectAnnualBooks(10)).toBe(24)
    expect(projectAnnualBooks(15)).toBe(36)
    expect(projectAnnualBooks(30)).toBe(72)
  })
})
