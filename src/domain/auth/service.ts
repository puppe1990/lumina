import {
  randomBytes,
  randomUUID,
  scryptSync,
  timingSafeEqual,
} from 'node:crypto'

import { and, eq, gt } from 'drizzle-orm'

import type { Db } from '#/db/client'
import { sessions, userPreferences, users } from '#/db/schema'
import { AppError } from '#/domain/errors'

import type { User } from '#/test/factories'

export const SESSION_COOKIE = 'lumina_session'
export const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 30

export type RegisterInput = {
  name: string
  email: string
  password: string
}

export type LoginInput = {
  email: string
  password: string
}

const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex')
  const derived = scryptSync(password, salt, 64).toString('hex')
  return `${salt}:${derived}`
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(':')
  if (!salt || !hash) {
    return false
  }
  const candidate = scryptSync(password, salt, 64)
  const expected = Buffer.from(hash, 'hex')
  if (candidate.length !== expected.length) {
    return false
  }
  return timingSafeEqual(candidate, expected)
}

export function registerUser(
  db: Db,
  input: RegisterInput,
  now = Date.now(),
): User {
  const name = input.name.trim()
  const email = input.email.trim().toLowerCase()

  if (name.length < 2) {
    throw new AppError('VALIDATION', 'Informe seu nome completo.')
  }
  if (!EMAIL_PATTERN.test(email)) {
    throw new AppError('VALIDATION', 'Informe um e-mail válido.')
  }
  if (input.password.length < 8) {
    throw new AppError('VALIDATION', 'A senha deve ter ao menos 8 caracteres.')
  }

  const existing = db.select().from(users).where(eq(users.email, email)).get()
  if (existing) {
    throw new AppError('EMAIL_IN_USE', 'Já existe uma conta com este e-mail.')
  }

  const user: User = {
    id: randomUUID(),
    name,
    email,
    passwordHash: hashPassword(input.password),
    avatarUrl: null,
    createdAt: now,
  }

  db.insert(users).values(user).run()
  db.insert(userPreferences).values({ userId: user.id, updatedAt: now }).run()

  return user
}

export function authenticateUser(db: Db, input: LoginInput): User {
  const email = input.email.trim().toLowerCase()
  const user = db.select().from(users).where(eq(users.email, email)).get()

  if (!user || !verifyPassword(input.password, user.passwordHash)) {
    throw new AppError('INVALID_CREDENTIALS', 'E-mail ou senha incorretos.')
  }

  return user
}

export function createSession(
  db: Db,
  userId: string,
  now = Date.now(),
): { token: string; expiresAt: number } {
  const token = randomBytes(32).toString('hex')
  const expiresAt = now + SESSION_TTL_MS
  db.insert(sessions)
    .values({ id: token, userId, expiresAt, createdAt: now })
    .run()
  return { token, expiresAt }
}

export function getUserBySession(
  db: Db,
  token: string | undefined,
  now = Date.now(),
): User | null {
  if (!token) {
    return null
  }

  const row = db
    .select({ user: users })
    .from(sessions)
    .innerJoin(users, eq(users.id, sessions.userId))
    .where(and(eq(sessions.id, token), gt(sessions.expiresAt, now)))
    .get()

  return row?.user ?? null
}

export function destroySession(db: Db, token: string | undefined): void {
  if (!token) {
    return
  }
  db.delete(sessions).where(eq(sessions.id, token)).run()
}
