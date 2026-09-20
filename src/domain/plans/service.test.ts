import { beforeEach, describe, expect, it } from 'vitest'

import type { Db } from '#/db/client'
import {
  DAY_MS,
  cancelSubscription,
  getPlanBySlug,
  getSubscription,
  isPremium,
  listPlans,
  subscribe,
} from '#/domain/plans/service'
import { createTestDb, faker, makePlan, makeUser } from '#/test/factories'

let db: Db

beforeEach(() => {
  db = createTestDb()
  faker.seed(3)
})

describe('listPlans', () => {
  it('returns plans ordered by position', () => {
    makePlan(db, { name: 'Mensal', position: 1, interval: 'monthly' })
    makePlan(db, { name: 'Anual', position: 0, interval: 'yearly' })

    expect(listPlans(db).map((p) => p.name)).toEqual(['Anual', 'Mensal'])
  })
})

describe('getPlanBySlug', () => {
  it('throws for unknown plans', () => {
    expect(() => getPlanBySlug(db, 'inexistente')).toThrowError()
  })
})

describe('subscribe', () => {
  it('starts a trial for plans with trial days', () => {
    const user = makeUser(db)
    const plan = makePlan(db, {
      slug: 'anual',
      interval: 'yearly',
      trialDays: 7,
    })

    const subscription = subscribe(db, user.id, plan.slug, 1_000)

    expect(subscription.status).toBe('trialing')
    expect(subscription.currentPeriodEnd).toBe(1_000 + 7 * DAY_MS)
  })

  it('activates immediately when there is no trial', () => {
    const user = makeUser(db)
    const plan = makePlan(db, {
      slug: 'mensal',
      interval: 'monthly',
      trialDays: 0,
    })

    const subscription = subscribe(db, user.id, plan.slug, 1_000)

    expect(subscription.status).toBe('active')
    expect(subscription.currentPeriodEnd).toBe(1_000 + 30 * DAY_MS)
  })

  it('replaces a previous subscription instead of stacking', () => {
    const user = makeUser(db)
    const monthly = makePlan(db, {
      slug: 'mensal',
      interval: 'monthly',
      trialDays: 0,
    })
    const yearly = makePlan(db, {
      slug: 'anual',
      interval: 'yearly',
      trialDays: 7,
    })

    subscribe(db, user.id, monthly.slug, 1_000)
    subscribe(db, user.id, yearly.slug, 2_000)

    const view = getSubscription(db, user.id, 2_000)
    expect(view?.plan.slug).toBe('anual')
    expect(view?.subscription.startedAt).toBe(2_000)
  })

  it('rejects unknown plans', () => {
    const user = makeUser(db)
    expect(() => subscribe(db, user.id, 'plano-fantasma')).toThrowError()
  })
})

describe('getSubscription', () => {
  it('reports days left in the trial', () => {
    const user = makeUser(db)
    const plan = makePlan(db, { slug: 'anual', trialDays: 7 })
    subscribe(db, user.id, plan.slug, 1_000)

    const view = getSubscription(db, user.id, 1_000 + 2 * DAY_MS)
    expect(view?.isTrialing).toBe(true)
    expect(view?.trialDaysLeft).toBe(5)
  })

  it('returns null when there is no subscription', () => {
    const user = makeUser(db)
    expect(getSubscription(db, user.id)).toBeNull()
  })
})

describe('cancelSubscription', () => {
  it('marks the current subscription as canceled', () => {
    const user = makeUser(db)
    const plan = makePlan(db, { slug: 'anual' })
    subscribe(db, user.id, plan.slug)

    const canceled = cancelSubscription(db, user.id)
    expect(canceled?.status).toBe('canceled')
  })

  it('returns null when there is nothing to cancel', () => {
    const user = makeUser(db)
    expect(cancelSubscription(db, user.id)).toBeNull()
  })
})

describe('isPremium', () => {
  it('is true during an active trial and false after it expires', () => {
    const user = makeUser(db)
    const plan = makePlan(db, { slug: 'anual', trialDays: 7 })
    subscribe(db, user.id, plan.slug, 1_000)

    expect(isPremium(db, user.id, 1_000 + DAY_MS)).toBe(true)
    expect(isPremium(db, user.id, 1_000 + 8 * DAY_MS)).toBe(false)
    expect(isPremium(db, user.id)).toBe(false)
  })
})
