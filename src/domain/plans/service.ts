import { desc, eq } from 'drizzle-orm'

import type { Db } from '#/db/client'
import { plans, subscriptions } from '#/db/schema'
import { AppError } from '#/domain/errors'

import type { Plan } from '#/test/factories'

export const DAY_MS = 1000 * 60 * 60 * 24

export type Subscription = typeof subscriptions.$inferSelect

export type SubscriptionView = {
  subscription: Subscription
  plan: Plan
  isTrialing: boolean
  trialDaysLeft: number
}

function intervalDays(interval: string): number {
  return interval === 'monthly' ? 30 : 365
}

export function listPlans(db: Db): Plan[] {
  return db.select().from(plans).orderBy(plans.position).all()
}

export function getPlanBySlug(db: Db, slug: string): Plan {
  const plan = db.select().from(plans).where(eq(plans.slug, slug)).get()
  if (!plan) {
    throw new AppError('NOT_FOUND', 'Plano não encontrado.')
  }
  return plan
}

export function subscribe(db: Db, userId: string, planSlug: string, now = Date.now()): Subscription {
  const plan = getPlanBySlug(db, planSlug)
  const isTrialing = plan.trialDays > 0
  const periodMs = isTrialing
    ? plan.trialDays * DAY_MS
    : intervalDays(plan.interval) * DAY_MS

  db.delete(subscriptions).where(eq(subscriptions.userId, userId)).run()

  const subscription: Subscription = {
    id: crypto.randomUUID(),
    userId,
    planId: plan.id,
    status: isTrialing ? 'trialing' : 'active',
    startedAt: now,
    currentPeriodEnd: now + periodMs,
    createdAt: now,
  }

  db.insert(subscriptions).values(subscription).run()
  return subscription
}

export function getSubscription(db: Db, userId: string, now = Date.now()): SubscriptionView | null {
  const subscription = db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.userId, userId))
    .orderBy(desc(subscriptions.createdAt))
    .get()

  if (!subscription) {
    return null
  }

  const plan = db.select().from(plans).where(eq(plans.id, subscription.planId)).get()
  if (!plan) {
    return null
  }

  const msLeft = subscription.currentPeriodEnd - now
  const trialDaysLeft =
    subscription.status === 'trialing' ? Math.max(0, Math.ceil(msLeft / DAY_MS)) : 0

  return {
    subscription,
    plan,
    isTrialing: subscription.status === 'trialing',
    trialDaysLeft,
  }
}

export function cancelSubscription(db: Db, userId: string): Subscription | null {
  const current = db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.userId, userId))
    .orderBy(desc(subscriptions.createdAt))
    .get()

  if (!current) {
    return null
  }

  db.update(subscriptions)
    .set({ status: 'canceled' })
    .where(eq(subscriptions.id, current.id))
    .run()

  return db.select().from(subscriptions).where(eq(subscriptions.id, current.id)).get()!
}

export function isPremium(db: Db, userId: string, now = Date.now()): boolean {
  const view = getSubscription(db, userId, now)
  if (!view) {
    return false
  }
  return (
    (view.subscription.status === 'trialing' || view.subscription.status === 'active') &&
    view.subscription.currentPeriodEnd > now
  )
}
