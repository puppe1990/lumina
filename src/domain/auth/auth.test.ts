import { beforeEach, describe, expect, it } from 'vitest'

import type { Db } from '#/db/client'
import {
  authenticateUser,
  createSession,
  destroySession,
  getUserBySession,
  hashPassword,
  registerUser,
  verifyPassword,
} from '#/domain/auth/service'
import { isAppError } from '#/domain/errors'
import { createTestDb, faker, makeUser } from '#/test/factories'

let db: Db

beforeEach(() => {
  db = createTestDb()
  faker.seed(2024)
})

describe('password hashing', () => {
  it('never stores the plain password and verifies correct candidates', () => {
    const password = faker.internet.password({ length: 12 })
    const hash = hashPassword(password)

    expect(hash).not.toContain(password)
    expect(hash.split(':')).toHaveLength(2)
    expect(verifyPassword(password, hash)).toBe(true)
    expect(verifyPassword(`${password}!`, hash)).toBe(false)
  })

  it('rejects malformed hashes instead of throwing', () => {
    expect(verifyPassword('anything', 'not-a-valid-hash')).toBe(false)
  })
})

describe('registerUser', () => {
  it('creates a user and default preferences', () => {
    const email = faker.internet.email()
    const user = registerUser(db, {
      name: '  Mariana Souza  ',
      email,
      password: 'senhaSegura1',
    })

    expect(user.id).toBeTruthy()
    expect(user.name).toBe('Mariana Souza')
    expect(user.email).toBe(email.toLowerCase())
    expect(user.passwordHash).not.toBe('senhaSegura1')
  })

  it('normalizes e-mail casing and rejects duplicates', () => {
    const email = 'Carolina.Mendonca@Example.com'
    registerUser(db, { name: 'Carolina', email, password: 'senhaSegura1' })

    try {
      registerUser(db, { name: 'Outra', email: email.toUpperCase(), password: 'senhaSegura1' })
      throw new Error('expected duplicate registration to fail')
    } catch (error) {
      expect(isAppError(error)).toBe(true)
      if (isAppError(error)) {
        expect(error.code).toBe('EMAIL_IN_USE')
      }
    }
  })

  it.each([
    { name: 'A', email: 'valido@example.com', password: 'senhaSegura1', field: 'name' },
    { name: 'Ana', email: 'email-invalido', password: 'senhaSegura1', field: 'email' },
    { name: 'Ana', email: 'valido2@example.com', password: 'curta', field: 'password' },
  ])('rejects invalid $field', ({ name, email, password }) => {
    expect(() => registerUser(db, { name, email, password })).toThrowError()
  })
})

describe('authenticateUser', () => {
  it('returns the user for valid credentials regardless of e-mail casing', () => {
    const created = registerUser(db, {
      name: 'James Clear',
      email: 'james@lumina.app',
      password: 'habitos123',
    })

    const authenticated = authenticateUser(db, {
      email: 'JAMES@LUMINA.APP',
      password: 'habitos123',
    })

    expect(authenticated.id).toBe(created.id)
  })

  it('rejects a wrong password with a generic message', () => {
    registerUser(db, { name: 'Ray Dalio', email: 'ray@lumina.app', password: 'principios1' })

    expect(() =>
      authenticateUser(db, { email: 'ray@lumina.app', password: 'errada999' }),
    ).toThrowError('E-mail ou senha incorretos.')
  })
})

describe('sessions', () => {
  it('resolves an active session and expires it after the ttl', () => {
    const user = makeUser(db)
    const { token, expiresAt } = createSession(db, user.id, 1_000)

    expect(getUserBySession(db, token, 1_500)?.id).toBe(user.id)
    expect(getUserBySession(db, token, expiresAt + 1)).toBeNull()
  })

  it('returns null for unknown or missing tokens', () => {
    expect(getUserBySession(db, undefined)).toBeNull()
    expect(getUserBySession(db, 'nenhum-token')).toBeNull()
  })

  it('destroys a session', () => {
    const user = makeUser(db)
    const { token } = createSession(db, user.id)

    destroySession(db, token)

    expect(getUserBySession(db, token)).toBeNull()
  })
})
