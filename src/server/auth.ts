import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

import {
  authenticateUser,
  createSession,
  destroySession,
  registerUser,
} from '#/domain/auth/service'

import { currentUser, toPublicUser } from './context'
import { db } from './db'
import { runAction } from './result'
import {
  clearSessionCookie,
  readSessionToken,
  writeSessionCookie,
} from './session'

const credentialsSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
})

export const signUp = createServerFn({ method: 'POST' })
  .validator(
    z.object({
      name: z.string().min(1),
      email: z.string().min(1),
      password: z.string().min(1),
    }),
  )
  .handler(async ({ data }) =>
    runAction(() => {
      const database = db()
      const user = registerUser(database, data)
      const { token, expiresAt } = createSession(database, user.id)
      writeSessionCookie(token, expiresAt)
      return { user: toPublicUser(user) }
    }),
  )

export const signIn = createServerFn({ method: 'POST' })
  .validator(credentialsSchema)
  .handler(async ({ data }) =>
    runAction(() => {
      const database = db()
      const user = authenticateUser(database, data)
      const { token, expiresAt } = createSession(database, user.id)
      writeSessionCookie(token, expiresAt)
      return { user: toPublicUser(user) }
    }),
  )

export const signOut = createServerFn({ method: 'POST' }).handler(async () => {
  const database = db()
  destroySession(database, readSessionToken())
  clearSessionCookie()
  return { ok: true as const }
})

export const getCurrentUser = createServerFn({ method: 'GET' }).handler(
  async () => {
    const user = currentUser()
    return user ? toPublicUser(user) : null
  },
)
