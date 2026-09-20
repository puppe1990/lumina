import { randomUUID } from 'node:crypto'

import { sql } from 'drizzle-orm'

import type { Db } from '#/db/client'
import { books } from '#/db/schema'
import * as schema from '#/db/schema'
import { CATALOG_BOOKS } from '#/db/catalog-data'
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
  ]
  for (const table of tables) {
    db.run(sql.raw(`DELETE FROM ${table}`))
  }
}

export function seedDatabase(db: Db): SeedSummary {
  const now = Date.now()

  const categoryIdBySlug = new Map<string, string>()
  for (const category of CATEGORIES) {
    const id = randomUUID()
    db.insert(schema.categories)
      .values({ id, ...category })
      .run()
    categoryIdBySlug.set(category.slug, id)
  }

  const bookIdBySlug = new Map<string, string>()
  let chapters = 0
  let insights = 0
  let quotes = 0

  CATALOG_BOOKS.forEach((book, index) => {
    const id = randomUUID()
    const categoryId = categoryIdBySlug.get(book.category)!

    db.insert(schema.books)
      .values({
        id,
        slug: book.slug,
        title: book.title,
        author: book.author,
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
      })
      .run()

    bookIdBySlug.set(book.slug, id)

    book.chapters.forEach((chapter, position) => {
      db.insert(schema.bookChapters)
        .values({
          id: randomUUID(),
          bookId: id,
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
          id: randomUUID(),
          bookId: id,
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
          id: randomUUID(),
          bookId: id,
          position,
          chapterPosition: quote.chapterPosition,
          text: quote.text,
          author: book.author,
        })
        .run()
      quotes++
    })
  })

  COLLECTIONS.forEach((collection, position) => {
    const id = randomUUID()
    db.insert(schema.collections)
      .values({
        id,
        slug: collection.slug,
        eyebrow: collection.eyebrow,
        title: collection.title,
        description: collection.description,
        icon: collection.icon,
        coverColor: collection.color,
        position,
      })
      .run()

    collection.books.forEach((bookSlug, index) => {
      const bookId = bookIdBySlug.get(bookSlug)
      if (bookId) {
        db.insert(schema.collectionBooks)
          .values({ collectionId: id, bookId, position: index })
          .run()
      }
    })
  })

  for (const plan of PLANS) {
    db.insert(schema.plans)
      .values({ id: randomUUID(), ...plan })
      .run()
  }

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

export function isSeeded(db: Db): boolean {
  const result = db
    .select({ value: sql<number>`count(*)` })
    .from(books)
    .get()
  return (result?.value ?? 0) > 0
}

export function ensureSeeded(db: Db): SeedSummary | null {
  if (isSeeded(db)) {
    return null
  }
  return seedDatabase(db)
}
