import { AppError } from '#/domain/errors'
import { getUserBySession } from '#/domain/auth/service'
import type { User } from '#/test/factories'

import { db } from './db'
import { readSessionToken } from './session'

export type PublicUser = {
  id: string
  name: string
  email: string
  avatarUrl: string | null
  createdAt: number
}

export function toPublicUser(user: User): PublicUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    avatarUrl: user.avatarUrl,
    createdAt: user.createdAt,
  }
}

export function currentUser(): User | null {
  return getUserBySession(db(), readSessionToken())
}

export function requireUser(): User {
  const user = currentUser()
  if (!user) {
    throw new AppError('UNAUTHORIZED', 'Faça login para continuar.')
  }
  return user
}
