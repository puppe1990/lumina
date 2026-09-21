import { randomUUID } from 'node:crypto'

import { faker } from '@faker-js/faker'

import { createDatabase } from '#/db/client'
import type { Db } from '#/db/client'
import * as schema from '#/db/schema'
import { normalizeForSearch, slugify } from '#/lib/text'

type Tables = typeof schema

export type User = Tables['users']['$inferSelect']
export type Category = Tables['categories']['$inferSelect']
export type Book = Tables['books']['$inferSelect']
export type Chapter = Tables['bookChapters']['$inferSelect']
export type Insight = Tables['bookInsights']['$inferSelect']
export type Quote = Tables['bookQuotes']['$inferSelect']
export type Collection = Tables['collections']['$inferSelect']
export type Plan = Tables['plans']['$inferSelect']
export type LibraryItem = Tables['libraryItems']['$inferSelect']
export type Preferences = Tables['userPreferences']['$inferSelect']

const COVER_COLORS = ['#064e3b', '#262e42', '#904d00', '#0b513d', '#3c4459']
const ICONS = ['bolt', 'psychology', 'payments', 'diversity_3', 'spa']

export function createTestDb(): Db {
  return createDatabase(':memory:')
}

export function makeUser(db: Db, overrides: Partial<User> = {}): User {
  const now = Date.now()
  const user: User = {
    id: randomUUID(),
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    passwordHash: 'test-hash',
    avatarUrl: faker.image.avatar(),
    createdAt: now,
    ...overrides,
  }
  db.insert(schema.users).values(user).run()
  return user
}

export function makeCategory(
  db: Db,
  overrides: Partial<Category> = {},
): Category {
  const name = overrides.name ?? faker.commerce.department()
  const category: Category = {
    id: randomUUID(),
    slug:
      faker.helpers.slugify(name).toLowerCase() || faker.string.alphanumeric(8),
    name,
    description: faker.lorem.sentence(),
    icon: faker.helpers.arrayElement(ICONS),
    bookCount: faker.number.int({ min: 10, max: 500 }),
    ...overrides,
  }
  db.insert(schema.categories).values(category).run()
  return category
}

export function makeBook(
  db: Db,
  overrides: Partial<Book> & { categoryId: string },
): Book {
  const title = overrides.title ?? faker.book.title()
  const author = overrides.author ?? faker.book.author()
  const tagline = overrides.tagline ?? faker.lorem.sentence({ min: 6, max: 12 })
  const book: Book = {
    id: randomUUID(),
    slug: slugify(title) || faker.string.alphanumeric(8),
    title,
    author,
    tagline,
    description: faker.lorem.paragraph(),
    coverColor: faker.helpers.arrayElement(COVER_COLORS),
    audioMinutes: faker.number.int({ min: 8, max: 25 }),
    readingMinutes: faker.number.int({ min: 6, max: 18 }),
    rating: faker.number.float({ min: 3.8, max: 5, fractionDigits: 1 }),
    ratingsCount: faker.number.int({ min: 100, max: 9000 }),
    isFeatured: false,
    publishedAt: faker.date.past({ years: 2 }).getTime(),
    searchIndex: normalizeForSearch(`${title} ${author} ${tagline}`),
    coverUrl: null,
    forWho: null,
    ...overrides,
  }
  db.insert(schema.books).values(book).run()
  return book
}

export function makeChapter(
  db: Db,
  overrides: Partial<Chapter> & { bookId: string },
): Chapter {
  const chapter: Chapter = {
    id: randomUUID(),
    position: 1,
    title: faker.lorem.sentence({ min: 3, max: 7 }),
    body: faker.lorem.paragraphs(2, '\n\n'),
    ...overrides,
  }
  db.insert(schema.bookChapters).values(chapter).run()
  return chapter
}

export function makeInsight(
  db: Db,
  overrides: Partial<Insight> & { bookId: string },
): Insight {
  const insight: Insight = {
    id: randomUUID(),
    position: 1,
    title: faker.lorem.words(3),
    body: faker.lorem.sentence({ min: 8, max: 20 }),
    ...overrides,
  }
  db.insert(schema.bookInsights).values(insight).run()
  return insight
}

export function makeQuote(
  db: Db,
  overrides: Partial<Quote> & { bookId: string },
): Quote {
  const quote: Quote = {
    id: randomUUID(),
    position: 1,
    chapterPosition: 1,
    text: faker.lorem.sentence({ min: 8, max: 18 }),
    author: faker.book.author(),
    ...overrides,
  }
  db.insert(schema.bookQuotes).values(quote).run()
  return quote
}

export function makeCollection(
  db: Db,
  overrides: Partial<Collection> = {},
): Collection {
  const title = overrides.title ?? faker.commerce.productName()
  const collection: Collection = {
    id: randomUUID(),
    slug:
      faker.helpers.slugify(title).toLowerCase() ||
      faker.string.alphanumeric(8),
    eyebrow: faker.helpers.arrayElement([
      '6 Obras Fundamentais',
      '8 Obras Selecionadas',
    ]),
    title,
    description: faker.lorem.sentence(),
    icon: faker.helpers.arrayElement(ICONS),
    coverColor: faker.helpers.arrayElement(COVER_COLORS),
    position: 0,
    ...overrides,
  }
  db.insert(schema.collections).values(collection).run()
  return collection
}

export function makePlan(db: Db, overrides: Partial<Plan> = {}): Plan {
  const plan: Plan = {
    id: randomUUID(),
    slug: faker.string.alphanumeric(8),
    name: faker.commerce.productName(),
    interval: 'yearly',
    priceCents: 23880,
    monthlyEquivalentCents: 1990,
    trialDays: 7,
    badge: '7 dias grátis',
    description: faker.lorem.sentence(),
    isFeatured: false,
    position: 0,
    ...overrides,
  }
  db.insert(schema.plans).values(plan).run()
  return plan
}

export function makeLibraryItem(
  db: Db,
  overrides: Partial<LibraryItem> & { userId: string; bookId: string },
): LibraryItem {
  const item: LibraryItem = {
    id: randomUUID(),
    status: 'saved',
    progressPercent: 0,
    lastPositionSeconds: 0,
    lastChapterPosition: 1,
    completedAt: null,
    updatedAt: Date.now(),
    ...overrides,
  }
  db.insert(schema.libraryItems).values(item).run()
  return item
}

export function makePreferences(
  db: Db,
  overrides: Partial<Preferences> & { userId: string },
): Preferences {
  const preferences: Preferences = {
    dailyGoalMinutes: 15,
    preferredFormat: 'audio',
    reminderEnabled: true,
    reminderTime: '07:30',
    onboardingCompleted: false,
    updatedAt: Date.now(),
    ...overrides,
  }
  db.insert(schema.userPreferences).values(preferences).run()
  return preferences
}

export function makeInterest(db: Db, userId: string, categoryId: string): void {
  db.insert(schema.userInterests).values({ userId, categoryId }).run()
}

export { faker }
