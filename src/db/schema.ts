import { relations } from 'drizzle-orm'
import {
  integer,
  primaryKey,
  real,
  sqliteTable,
  text,
} from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  avatarUrl: text('avatar_url'),
  createdAt: integer('created_at').notNull(),
})

export const sessions = sqliteTable('sessions', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expiresAt: integer('expires_at').notNull(),
  createdAt: integer('created_at').notNull(),
})

export const categories = sqliteTable('categories', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  icon: text('icon').notNull(),
  bookCount: integer('book_count').notNull().default(0),
})

export const books = sqliteTable('books', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  author: text('author').notNull(),
  categoryId: text('category_id')
    .notNull()
    .references(() => categories.id),
  tagline: text('tagline').notNull(),
  description: text('description').notNull(),
  coverColor: text('cover_color').notNull(),
  audioMinutes: integer('audio_minutes').notNull(),
  readingMinutes: integer('reading_minutes').notNull(),
  rating: real('rating').notNull(),
  ratingsCount: integer('ratings_count').notNull(),
  isFeatured: integer('is_featured', { mode: 'boolean' })
    .notNull()
    .default(false),
  publishedAt: integer('published_at').notNull(),
  searchIndex: text('search_index').notNull().default(''),
  coverUrl: text('cover_url'),
})

export const bookChapters = sqliteTable('book_chapters', {
  id: text('id').primaryKey(),
  bookId: text('book_id')
    .notNull()
    .references(() => books.id, { onDelete: 'cascade' }),
  position: integer('position').notNull(),
  title: text('title').notNull(),
  body: text('body').notNull(),
})

export const bookInsights = sqliteTable('book_insights', {
  id: text('id').primaryKey(),
  bookId: text('book_id')
    .notNull()
    .references(() => books.id, { onDelete: 'cascade' }),
  position: integer('position').notNull(),
  title: text('title').notNull(),
  body: text('body').notNull(),
})

export const bookQuotes = sqliteTable('book_quotes', {
  id: text('id').primaryKey(),
  bookId: text('book_id')
    .notNull()
    .references(() => books.id, { onDelete: 'cascade' }),
  chapterPosition: integer('chapter_position'),
  position: integer('position').notNull(),
  text: text('text').notNull(),
  author: text('author').notNull(),
})

export const collections = sqliteTable('collections', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  eyebrow: text('eyebrow').notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  icon: text('icon').notNull(),
  coverColor: text('cover_color').notNull(),
  position: integer('position').notNull().default(0),
})

export const collectionBooks = sqliteTable(
  'collection_books',
  {
    collectionId: text('collection_id')
      .notNull()
      .references(() => collections.id, { onDelete: 'cascade' }),
    bookId: text('book_id')
      .notNull()
      .references(() => books.id, { onDelete: 'cascade' }),
    position: integer('position').notNull().default(0),
  },
  (table) => [primaryKey({ columns: [table.collectionId, table.bookId] })],
)

export const userPreferences = sqliteTable('user_preferences', {
  userId: text('user_id')
    .primaryKey()
    .references(() => users.id, { onDelete: 'cascade' }),
  dailyGoalMinutes: integer('daily_goal_minutes').notNull().default(15),
  preferredFormat: text('preferred_format').notNull().default('audio'),
  reminderEnabled: integer('reminder_enabled', { mode: 'boolean' })
    .notNull()
    .default(true),
  reminderTime: text('reminder_time').notNull().default('07:30'),
  onboardingCompleted: integer('onboarding_completed', { mode: 'boolean' })
    .notNull()
    .default(false),
  updatedAt: integer('updated_at').notNull(),
})

export const userInterests = sqliteTable(
  'user_interests',
  {
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    categoryId: text('category_id')
      .notNull()
      .references(() => categories.id, { onDelete: 'cascade' }),
  },
  (table) => [primaryKey({ columns: [table.userId, table.categoryId] })],
)

export const libraryItems = sqliteTable(
  'library_items',
  {
    id: text('id').primaryKey(),
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    bookId: text('book_id')
      .notNull()
      .references(() => books.id, { onDelete: 'cascade' }),
    status: text('status').notNull().default('saved'),
    progressPercent: integer('progress_percent').notNull().default(0),
    lastPositionSeconds: integer('last_position_seconds').notNull().default(0),
    lastChapterPosition: integer('last_chapter_position').notNull().default(1),
    completedAt: integer('completed_at'),
    updatedAt: integer('updated_at').notNull(),
  },
  (table) => [primaryKey({ columns: [table.id] })],
)

export const userHighlights = sqliteTable('user_highlights', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  bookId: text('book_id')
    .notNull()
    .references(() => books.id, { onDelete: 'cascade' }),
  text: text('text').notNull(),
  createdAt: integer('created_at').notNull(),
})

export const plans = sqliteTable('plans', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  interval: text('interval').notNull(),
  priceCents: integer('price_cents').notNull(),
  monthlyEquivalentCents: integer('monthly_equivalent_cents').notNull(),
  trialDays: integer('trial_days').notNull().default(0),
  badge: text('badge'),
  description: text('description').notNull(),
  isFeatured: integer('is_featured', { mode: 'boolean' })
    .notNull()
    .default(false),
  position: integer('position').notNull().default(0),
})

export const subscriptions = sqliteTable('subscriptions', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  planId: text('plan_id')
    .notNull()
    .references(() => plans.id),
  status: text('status').notNull().default('trialing'),
  startedAt: integer('started_at').notNull(),
  currentPeriodEnd: integer('current_period_end').notNull(),
  createdAt: integer('created_at').notNull(),
})

export const appMeta = sqliteTable('app_meta', {
  key: text('key').primaryKey(),
  value: text('value').notNull(),
})

export const booksRelations = relations(books, ({ one, many }) => ({
  category: one(categories, {
    fields: [books.categoryId],
    references: [categories.id],
  }),
  chapters: many(bookChapters),
  insights: many(bookInsights),
  quotes: many(bookQuotes),
}))

export const chaptersRelations = relations(bookChapters, ({ one }) => ({
  book: one(books, { fields: [bookChapters.bookId], references: [books.id] }),
}))

export const categoriesRelations = relations(categories, ({ many }) => ({
  books: many(books),
}))
