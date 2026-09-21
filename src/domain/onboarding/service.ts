import { asc, eq, inArray } from 'drizzle-orm'

import type { Db } from '#/db/client'
import { categories, userInterests, userPreferences } from '#/db/schema'
import { AppError } from '#/domain/errors'

import type { Category, Preferences } from '#/test/factories'

export const DAILY_GOALS = [10, 15, 30] as const
export const LEARNING_FORMATS = ['audio', 'text', 'hybrid'] as const

export type DailyGoalMinutes = (typeof DAILY_GOALS)[number]
export type LearningFormat = (typeof LEARNING_FORMATS)[number]

export type GoalInput = {
  dailyGoalMinutes: number
  preferredFormat: string
  reminderEnabled: boolean
  reminderTime: string
}

export type OnboardingState = {
  preferences: Preferences
  interests: Category[]
  isComplete: boolean
}

const TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/

export function getPreferences(
  db: Db,
  userId: string,
  now = Date.now(),
): Preferences {
  const existing = db
    .select()
    .from(userPreferences)
    .where(eq(userPreferences.userId, userId))
    .get()

  if (existing) {
    return existing
  }

  db.insert(userPreferences).values({ userId, updatedAt: now }).run()
  return db
    .select()
    .from(userPreferences)
    .where(eq(userPreferences.userId, userId))
    .get()!
}

export function getUserInterests(db: Db, userId: string): Category[] {
  return db
    .select({ category: categories })
    .from(userInterests)
    .innerJoin(categories, eq(categories.id, userInterests.categoryId))
    .where(eq(userInterests.userId, userId))
    .orderBy(asc(categories.name))
    .all()
    .map((row) => row.category)
}

export function replaceInterests(
  db: Db,
  userId: string,
  categoryIds: string[],
): Category[] {
  const uniqueIds = [...new Set(categoryIds.filter(Boolean))]

  if (uniqueIds.length === 0) {
    throw new AppError(
      'VALIDATION',
      'Selecione ao menos um interesse para continuar.',
    )
  }

  const found = db
    .select()
    .from(categories)
    .where(inArray(categories.id, uniqueIds))
    .all()
  if (found.length !== uniqueIds.length) {
    throw new AppError(
      'NOT_FOUND',
      'Uma das categorias selecionadas não existe.',
    )
  }

  db.delete(userInterests).where(eq(userInterests.userId, userId)).run()
  db.insert(userInterests)
    .values(uniqueIds.map((categoryId) => ({ userId, categoryId })))
    .run()

  return getUserInterests(db, userId)
}

export function saveGoal(
  db: Db,
  userId: string,
  input: GoalInput,
  now = Date.now(),
): Preferences {
  if (!DAILY_GOALS.includes(input.dailyGoalMinutes as DailyGoalMinutes)) {
    throw new AppError(
      'VALIDATION',
      'Escolha uma meta diária de 10, 15 ou 30 minutos.',
    )
  }
  if (!LEARNING_FORMATS.includes(input.preferredFormat as LearningFormat)) {
    throw new AppError(
      'VALIDATION',
      'Escolha um formato de aprendizado válido.',
    )
  }
  if (input.reminderEnabled && !TIME_PATTERN.test(input.reminderTime)) {
    throw new AppError(
      'VALIDATION',
      'Informe um horário de lembrete válido (HH:MM).',
    )
  }

  getPreferences(db, userId, now)

  db.update(userPreferences)
    .set({
      dailyGoalMinutes: input.dailyGoalMinutes,
      preferredFormat: input.preferredFormat,
      reminderEnabled: input.reminderEnabled,
      reminderTime: input.reminderTime,
      updatedAt: now,
    })
    .where(eq(userPreferences.userId, userId))
    .run()

  return getPreferences(db, userId, now)
}

export type ReminderInput = {
  reminderEnabled: boolean
  reminderTime: string
}

export function updateReminder(
  db: Db,
  userId: string,
  input: ReminderInput,
  now = Date.now(),
): Preferences {
  if (input.reminderEnabled && !TIME_PATTERN.test(input.reminderTime)) {
    throw new AppError(
      'VALIDATION',
      'Informe um horário de lembrete válido (HH:MM).',
    )
  }

  getPreferences(db, userId, now)

  db.update(userPreferences)
    .set({
      reminderEnabled: input.reminderEnabled,
      reminderTime: input.reminderTime,
      updatedAt: now,
    })
    .where(eq(userPreferences.userId, userId))
    .run()

  return getPreferences(db, userId, now)
}

export function completeOnboarding(
  db: Db,
  userId: string,
  now = Date.now(),
): Preferences {
  getPreferences(db, userId, now)
  db.update(userPreferences)
    .set({ onboardingCompleted: true, updatedAt: now })
    .where(eq(userPreferences.userId, userId))
    .run()
  return getPreferences(db, userId, now)
}

export function getOnboardingState(db: Db, userId: string): OnboardingState {
  const preferences = getPreferences(db, userId)
  const interests = getUserInterests(db, userId)
  return {
    preferences,
    interests,
    isComplete: preferences.onboardingCompleted && interests.length > 0,
  }
}

export function projectAnnualBooks(dailyGoalMinutes: number): number {
  if (dailyGoalMinutes <= 10) {
    return 24
  }
  if (dailyGoalMinutes <= 15) {
    return 36
  }
  return 72
}
