import { createHash } from 'node:crypto'

import { eq, notInArray, sql } from 'drizzle-orm'

import type { Db } from '#/db/client'
import { CATALOG_BOOKS } from '#/db/catalog-data'
import * as schema from '#/db/schema'
import { normalizeForSearch } from '#/lib/text'

type CategoryDef = {
  slug: string
  name: string
  description: string
  icon: string
  bookCount: number
}

type CollectionDef = {
  slug: string
  eyebrow: string
  title: string
  description: string
  icon: string
  color: string
  books: string[]
}

const DAY_MS = 1000 * 60 * 60 * 24
const CATALOG_VERSION_KEY = 'catalog_version'

const CATEGORIES: CategoryDef[] = [
  {
    slug: 'produtividade-foco',
    name: 'Produtividade & Foco',
    description: 'Gestão de tempo, rotinas e atenção profunda.',
    icon: 'bolt',
    bookCount: 340,
  },
  {
    slug: 'lideranca-negocios',
    name: 'Liderança & Negócios',
    description: 'Estratégia, tomada de decisão e cultura.',
    icon: 'diversity_3',
    bookCount: 410,
  },
  {
    slug: 'psicologia-mente',
    name: 'Psicologia & Mente',
    description: 'Viés cognitivo, emoções e decisão.',
    icon: 'psychology',
    bookCount: 290,
  },
  {
    slug: 'financas-riqueza',
    name: 'Finanças & Riqueza',
    description: 'Liberdade financeira, investimentos e economia.',
    icon: 'payments',
    bookCount: 225,
  },
  {
    slug: 'comunicacao',
    name: 'Comunicação',
    description: 'Oratória, negociação e empatia.',
    icon: 'record_voice_over',
    bookCount: 180,
  },
  {
    slug: 'inovacao-tech',
    name: 'Inovação & Tech',
    description: 'Inteligência artificial, startups e criatividade.',
    icon: 'lightbulb',
    bookCount: 195,
  },
  {
    slug: 'saude-longevidade',
    name: 'Saúde & Longevidade',
    description: 'Sono, energia, respiração e longevidade.',
    icon: 'spa',
    bookCount: 160,
  },
  {
    slug: 'filosofia-estoica',
    name: 'Filosofia Estoica',
    description: 'Propósito, estoicismo e calma.',
    icon: 'auto_stories',
    bookCount: 145,
  },
  {
    slug: 'historia-humanidade',
    name: 'História & Humanidade',
    description: 'Grandes narrativas sobre nós e o futuro.',
    icon: 'public',
    bookCount: 130,
  },
]

const COLLECTIONS: CollectionDef[] = [
  {
    slug: 'mente-focada-deep-work',
    eyebrow: '5 Obras Fundamentais',
    title: 'Mente Focada & Deep Work',
    description:
      'Domine sua atenção, elimine ruídos digitais e alcance hiperfoco em projetos complexos.',
    icon: 'psychology',
    color: '#064e3b',
    books: [
      'deep-work',
      'foco',
      'o-poder-do-habito',
      'rapido-e-devagar',
      'habitos-atomicos',
    ],
  },
  {
    slug: 'lideranca-alta-performance',
    eyebrow: '3 Obras Selecionadas',
    title: 'Liderança de Alta Performance',
    description:
      'Estratégia, princípios e decisão sob risco para liderar com consistência.',
    icon: 'diversity_3',
    color: '#262e42',
    books: ['principios', 'good-to-great', 'os-7-habitos'],
  },
  {
    slug: 'liberdade-financeira',
    eyebrow: '4 Obras Essenciais',
    title: 'Liberdade Financeira',
    description:
      'Construa patrimônio com comportamento, paciência e decisões conscientes.',
    icon: 'payments',
    color: '#904d00',
    books: [
      'psicologia-financeira',
      'o-investidor-inteligente',
      'pai-rico-pai-pobre',
      'o-homem-mais-rico-da-babilonia',
    ],
  },
  {
    slug: 'estoicismo-pratico',
    eyebrow: '3 Clássicos',
    title: 'Estoicismo Prático',
    description:
      'Calma, virtude e propósito para o que está sob o seu controle.',
    icon: 'auto_stories',
    color: '#3c4459',
    books: [
      'meditacoes',
      'o-obstaculo-e-o-caminho',
      'sobre-a-brevidade-da-vida',
    ],
  },
  {
    slug: 'comunicacao-e-relacoes',
    eyebrow: '3 Obras Práticas',
    title: 'Comunicação & Relações',
    description:
      'Fale com clareza, ouça de verdade e resolva conflitos sem ruído.',
    icon: 'record_voice_over',
    color: '#0b513d',
    books: [
      'comunicacao-nao-violenta',
      'como-fazer-amigos',
      'inteligencia-emocional',
    ],
  },
  {
    slug: 'ciencia-da-vida-longa',
    eyebrow: '3 Obras de Saúde',
    title: 'Ciência da Vida Longa',
    description: 'Sono, respiração e metabolismo para viver mais e melhor.',
    icon: 'spa',
    color: '#064e3b',
    books: ['outlive', 'respire', 'a-dieta-da-mente'],
  },
  {
    slug: 'startups-e-futuro',
    eyebrow: '3 Obras de Inovação',
    title: 'Startups & Futuro',
    description: 'Da validação enxuta à era da inteligência artificial.',
    icon: 'lightbulb',
    color: '#904d00',
    books: ['a-startup-enxuta', 'do-zero-ao-um', 'inteligencia-artificial'],
  },
  {
    slug: 'historia-da-humanidade',
    eyebrow: '2 Obras de Harari',
    title: 'História da Humanidade',
    description: 'De onde viemos e para onde a nossa espécie pode estar indo.',
    icon: 'public',
    color: '#262e42',
    books: ['sapiens', 'homo-deus'],
  },
]

const PLANS = [
  {
    slug: 'anual',
    name: 'Plano Anual',
    interval: 'yearly',
    priceCents: 23880,
    monthlyEquivalentCents: 1990,
    trialDays: 7,
    badge: 'Economize 50%',
    description: 'Acesso irrestrito por 12 meses com 7 dias grátis.',
    isFeatured: true,
    position: 0,
  },
  {
    slug: 'mensal',
    name: 'Plano Mensal',
    interval: 'monthly',
    priceCents: 3990,
    monthlyEquivalentCents: 3990,
    trialDays: 0,
    badge: 'Flexível',
    description: 'Cancele quando quiser, sem compromisso de longo prazo.',
    isFeatured: false,
    position: 1,
  },
]

export type SeedSummary = {
  categories: number
  books: number
  chapters: number
  insights: number
  quotes: number
  collections: number
  plans: number
}

export const CATALOG_VERSION = createHash('sha1')
  .update(CATALOG_BOOKS.map((book) => `${book.slug}:${book.title}`).join('|'))
  .digest('hex')
  .slice(0, 12)

const newId = (prefix: string, slug: string) => `${prefix}_${slug}`

export function resetDatabase(db: Db): void {
  const tables = [
    'user_highlights',
    'library_items',
    'user_interests',
    'user_preferences',
    'subscriptions',
    'sessions',
    'collection_books',
    'book_quotes',
    'book_insights',
    'book_chapters',
    'books',
    'collections',
    'categories',
    'plans',
    'users',
    'app_meta',
  ]
  for (const table of tables) {
    db.run(sql.raw(`DELETE FROM ${table}`))
  }
}

/**
 * Sincroniza o catálogo de forma idempotente e segura em produção:
 * o upsert é por `slug`, então livros existentes são atualizados no lugar
 * (preservando ids e o progresso do usuário) e apenas títulos que saíram
 * do acervo são removidos.
 */
export function syncCatalog(db: Db): SeedSummary {
  const now = Date.now()

  const bookSlugs = CATALOG_BOOKS.map((book) => book.slug)
  const categorySlugs = CATEGORIES.map((category) => category.slug)
  const collectionSlugs = COLLECTIONS.map((collection) => collection.slug)

  for (const category of CATEGORIES) {
    db.insert(schema.categories)
      .values({ id: newId('cat', category.slug), ...category })
      .onConflictDoUpdate({
        target: schema.categories.slug,
        set: { ...category },
      })
      .run()
  }

  const categoryIdBySlug = new Map(
    db
      .select({ slug: schema.categories.slug, id: schema.categories.id })
      .from(schema.categories)
      .all()
      .map((row) => [row.slug, row.id]),
  )

  CATALOG_BOOKS.forEach((book, index) => {
    const categoryId =
      categoryIdBySlug.get(book.category) ?? newId('cat', book.category)
    const derived = {
      categoryId,
      tagline: book.tagline,
      description: book.description,
      coverColor: book.color,
      audioMinutes: 11 + ((index * 3) % 9),
      readingMinutes: 8 + ((index * 2) % 7),
      rating: 4.4 + ((index * 7) % 6) / 10,
      ratingsCount: 800 + ((index * 373) % 8200),
      isFeatured: index < 4,
      publishedAt: now - index * 3 * DAY_MS,
      searchIndex: normalizeForSearch(
        `${book.title} ${book.author} ${book.tagline}`,
      ),
    }

    db.insert(schema.books)
      .values({
        id: newId('book', book.slug),
        slug: book.slug,
        title: book.title,
        author: book.author,
        ...derived,
      })
      .onConflictDoUpdate({
        target: schema.books.slug,
        set: { title: book.title, author: book.author, ...derived },
      })
      .run()
  })

  const bookIdBySlug = new Map(
    db
      .select({ slug: schema.books.slug, id: schema.books.id })
      .from(schema.books)
      .all()
      .map((row) => [row.slug, row.id]),
  )

  let chapters = 0
  let insights = 0
  let quotes = 0

  for (const book of CATALOG_BOOKS) {
    const bookId = bookIdBySlug.get(book.slug)!

    db.delete(schema.bookChapters)
      .where(eq(schema.bookChapters.bookId, bookId))
      .run()
    db.delete(schema.bookInsights)
      .where(eq(schema.bookInsights.bookId, bookId))
      .run()
    db.delete(schema.bookQuotes)
      .where(eq(schema.bookQuotes.bookId, bookId))
      .run()

    book.chapters.forEach((chapter, position) => {
      db.insert(schema.bookChapters)
        .values({
          id: newId('chap', `${book.slug}-${position}`),
          bookId,
          position,
          title: chapter.title,
          body: chapter.body,
        })
        .run()
      chapters++
    })

    book.insights.forEach((insight, position) => {
      db.insert(schema.bookInsights)
        .values({
          id: newId('ins', `${book.slug}-${position}`),
          bookId,
          position,
          title: insight.title,
          body: insight.body,
        })
        .run()
      insights++
    })

    book.quotes.forEach((quote, position) => {
      db.insert(schema.bookQuotes)
        .values({
          id: newId('quote', `${book.slug}-${position}`),
          bookId,
          position,
          chapterPosition: quote.chapterPosition,
          text: quote.text,
          author: book.author,
        })
        .run()
      quotes++
    })
  }

  COLLECTIONS.forEach((collection, position) => {
    const payload = {
      eyebrow: collection.eyebrow,
      title: collection.title,
      description: collection.description,
      icon: collection.icon,
      coverColor: collection.color,
      position,
    }

    db.insert(schema.collections)
      .values({
        id: newId('col', collection.slug),
        slug: collection.slug,
        ...payload,
      })
      .onConflictDoUpdate({ target: schema.collections.slug, set: payload })
      .run()

    const collectionId = db
      .select({ id: schema.collections.id })
      .from(schema.collections)
      .where(eq(schema.collections.slug, collection.slug))
      .get()!.id

    db.delete(schema.collectionBooks)
      .where(eq(schema.collectionBooks.collectionId, collectionId))
      .run()

    collection.books.forEach((bookSlug, index) => {
      const bookId = bookIdBySlug.get(bookSlug)
      if (bookId) {
        db.insert(schema.collectionBooks)
          .values({ collectionId, bookId, position: index })
          .run()
      }
    })
  })

  for (const plan of PLANS) {
    db.insert(schema.plans)
      .values({ id: newId('plan', plan.slug), ...plan })
      .onConflictDoUpdate({ target: schema.plans.slug, set: { ...plan } })
      .run()
  }

  // Remove títulos/categorias/coleções que saíram do acervo (livros antes das
  // categorias, para respeitar a chave estrangeira).
  db.delete(schema.books).where(notInArray(schema.books.slug, bookSlugs)).run()
  db.delete(schema.categories)
    .where(notInArray(schema.categories.slug, categorySlugs))
    .run()
  db.delete(schema.collections)
    .where(notInArray(schema.collections.slug, collectionSlugs))
    .run()

  db.insert(schema.appMeta)
    .values({ key: CATALOG_VERSION_KEY, value: CATALOG_VERSION })
    .onConflictDoUpdate({
      target: schema.appMeta.key,
      set: { value: CATALOG_VERSION },
    })
    .run()

  return {
    categories: CATEGORIES.length,
    books: CATALOG_BOOKS.length,
    chapters,
    insights,
    quotes,
    collections: COLLECTIONS.length,
    plans: PLANS.length,
  }
}

export function seedDatabase(db: Db): SeedSummary {
  resetDatabase(db)
  return syncCatalog(db)
}

export function isSeeded(db: Db): boolean {
  const result = db
    .select({ value: sql<number>`count(*)` })
    .from(schema.books)
    .get()
  return (result?.value ?? 0) > 0
}

export function ensureSeeded(db: Db): SeedSummary | null {
  const version = db
    .select()
    .from(schema.appMeta)
    .where(eq(schema.appMeta.key, CATALOG_VERSION_KEY))
    .get()

  if (version?.value === CATALOG_VERSION && isSeeded(db)) {
    return null
  }

  return syncCatalog(db)
}
