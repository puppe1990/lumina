import { randomUUID } from 'node:crypto'

import { sql } from 'drizzle-orm'

import type { Db } from '#/db/client'
import { books } from '#/db/schema'
import * as schema from '#/db/schema'
import { slugify } from '#/lib/text'

type CategoryDef = {
  slug: string
  name: string
  description: string
  icon: string
  bookCount: number
}

type BookDef = {
  title: string
  author: string
  category: string
  tagline: string
  featured?: boolean
  color: string
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
    description: 'Viés cognitivo, hábitos e persuasão.',
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
    description: 'Sono, energia e biohacking.',
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
]

const BOOKS: BookDef[] = [
  {
    title: 'Hábitos Atômicos',
    author: 'James Clear',
    category: 'produtividade-foco',
    tagline:
      'Um método fácil e comprovado de criar bons hábitos e se livrar dos maus.',
    featured: true,
    color: '#064e3b',
  },
  {
    title: 'Deep Work',
    author: 'Cal Newport',
    category: 'produtividade-foco',
    tagline: 'Regras para o sucesso focado em um mundo distraído.',
    color: '#262e42',
  },
  {
    title: 'Essencialismo',
    author: 'Greg McKeown',
    category: 'produtividade-foco',
    tagline: 'A arte disciplinada de fazer menos, porém melhor.',
    color: '#0b513d',
  },
  {
    title: 'O Poder do Hábito',
    author: 'Charles Duhigg',
    category: 'produtividade-foco',
    tagline: 'Por que fazemos o que fazemos e como mudar.',
    color: '#904d00',
  },
  {
    title: 'Foco',
    author: 'Daniel Goleman',
    category: 'produtividade-foco',
    tagline: 'A atenção como recurso decisivo do alto desempenho.',
    color: '#3c4459',
  },
  {
    title: 'Princípios',
    author: 'Ray Dalio',
    category: 'lideranca-negocios',
    tagline:
      'Vida e trabalho segundo os princípios de um dos maiores investidores.',
    featured: true,
    color: '#262e42',
  },
  {
    title: 'Comece pelo Porquê',
    author: 'Simon Sinek',
    category: 'lideranca-negocios',
    tagline: 'Como grandes líderes inspiram ação.',
    color: '#064e3b',
  },
  {
    title: 'Os 7 Hábitos das Pessoas Altamente Eficazes',
    author: 'Stephen Covey',
    category: 'lideranca-negocios',
    tagline: 'Uma abordagem principiológica para a eficácia pessoal.',
    color: '#0b513d',
  },
  {
    title: 'Good to Great',
    author: 'Jim Collins',
    category: 'lideranca-negocios',
    tagline: 'Por que algumas empresas dão um salto extraordinário.',
    color: '#904d00',
  },
  {
    title: 'Liderança 360',
    author: 'John C. Maxwell',
    category: 'lideranca-negocios',
    tagline: 'Como influenciar positivamente de qualquer posição.',
    color: '#3c4459',
  },
  {
    title: 'Rápido e Devagar',
    author: 'Daniel Kahneman',
    category: 'psicologia-mente',
    tagline: 'Duas formas de pensar e os vieses que nos governam.',
    featured: true,
    color: '#3c4459',
  },
  {
    title: 'Mindset',
    author: 'Carol Dweck',
    category: 'psicologia-mente',
    tagline: 'A nova psicologia do sucesso e do crescimento.',
    color: '#064e3b',
  },
  {
    title: 'Inteligência Emocional',
    author: 'Daniel Goleman',
    category: 'psicologia-mente',
    tagline: 'Por que a empatia e o autocontrole importam tanto.',
    color: '#0b513d',
  },
  {
    title: 'Previsivelmente Irracional',
    author: 'Dan Ariely',
    category: 'psicologia-mente',
    tagline: 'As forças invisíveis que moldam nossas decisões.',
    color: '#904d00',
  },
  {
    title: 'As Armas da Persuasão',
    author: 'Robert Cialdini',
    category: 'psicologia-mente',
    tagline: 'Os seis princípios universais da influência.',
    color: '#262e42',
  },
  {
    title: 'Psicologia Financeira',
    author: 'Morgan Housel',
    category: 'financas-riqueza',
    tagline: 'Lições atemporais sobre o comportamento com dinheiro.',
    featured: true,
    color: '#0b513d',
  },
  {
    title: 'Pai Rico, Pai Pobre',
    author: 'Robert Kiyosaki',
    category: 'financas-riqueza',
    tagline: 'O que os ricos ensinam aos filhos sobre dinheiro.',
    color: '#904d00',
  },
  {
    title: 'O Homem Mais Rico da Babilônia',
    author: 'George S. Clason',
    category: 'financas-riqueza',
    tagline: 'Parábolas atemporais sobre prosperidade.',
    color: '#064e3b',
  },
  {
    title: 'O Investidor Inteligente',
    author: 'Benjamin Graham',
    category: 'financas-riqueza',
    tagline: 'O clássico que ensina valor e disciplina.',
    color: '#262e42',
  },
  {
    title: 'Do Mil ao Milhão',
    author: 'Thiago Nigro',
    category: 'financas-riqueza',
    tagline: 'Sem cortar o cafezinho: como investir com propósito.',
    color: '#3c4459',
  },
  {
    title: 'Comunicação Não-Violenta',
    author: 'Marshall Rosenberg',
    category: 'comunicacao',
    tagline: 'Uma linguagem de compaixão para resolver conflitos.',
    color: '#0b513d',
  },
  {
    title: 'Como Fazer Amigos e Influenciar Pessoas',
    author: 'Dale Carnegie',
    category: 'comunicacao',
    tagline: 'Os princípios clássicos das relações humanas.',
    color: '#904d00',
  },
  {
    title: 'Conversas Difíceis',
    author: 'Douglas Stone',
    category: 'comunicacao',
    tagline: 'Como defender o que importa sem perder a relação.',
    color: '#064e3b',
  },
  {
    title: 'Storytelling',
    author: 'Carmine Gallo',
    category: 'comunicacao',
    tagline: 'A ciência e a arte de contar histórias que conectam.',
    color: '#262e42',
  },
  {
    title: 'A Startup Enxuta',
    author: 'Eric Ries',
    category: 'inovacao-tech',
    tagline: 'Experimentação contínua e negócios sustentáveis.',
    color: '#064e3b',
  },
  {
    title: 'Do Zero ao Um',
    author: 'Peter Thiel',
    category: 'inovacao-tech',
    tagline: 'Notas sobre startups e a criação do novo.',
    color: '#262e42',
  },
  {
    title: 'Os Inovadores',
    author: 'Walter Isaacson',
    category: 'inovacao-tech',
    tagline: 'A história dos gênios que criaram a era digital.',
    color: '#0b513d',
  },
  {
    title: 'Inteligência Artificial',
    author: 'Kai-Fu Lee',
    category: 'inovacao-tech',
    tagline: 'Como a IA transforma trabalho, economia e sociedade.',
    color: '#904d00',
  },
  {
    title: 'Outlive',
    author: 'Peter Attia',
    category: 'saude-longevidade',
    tagline: 'A arte e a ciência de viver mais e melhor.',
    color: '#064e3b',
  },
  {
    title: 'Por Que Nós Dormimos',
    author: 'Matthew Walker',
    category: 'saude-longevidade',
    tagline: 'O poder transformador do sono.',
    color: '#262e42',
  },
  {
    title: 'Respire',
    author: 'James Nestor',
    category: 'saude-longevidade',
    tagline: 'A ciência esquecida da respiração.',
    color: '#0b513d',
  },
  {
    title: 'A Dieta da Mente',
    author: 'David Perlmutter',
    category: 'saude-longevidade',
    tagline: 'Como a alimentação molda o cérebro.',
    color: '#904d00',
  },
  {
    title: 'Meditações',
    author: 'Marco Aurélio',
    category: 'filosofia-estoica',
    tagline: 'Reflexões de um imperador sobre virtude e dever.',
    color: '#262e42',
  },
  {
    title: 'Cartas de um Estoico',
    author: 'Sêneca',
    category: 'filosofia-estoica',
    tagline: 'Lições práticas sobre tempo, calma e propósito.',
    color: '#064e3b',
  },
  {
    title: 'A Arte de Viver',
    author: 'Epicteto',
    category: 'filosofia-estoica',
    tagline: 'O manual estoico sobre o que está sob nosso controle.',
    color: '#0b513d',
  },
  {
    title: 'O Obstáculo é o Caminho',
    author: 'Ryan Holiday',
    category: 'filosofia-estoica',
    tagline: 'Como transformar provações em vantagem.',
    color: '#904d00',
  },
  {
    title: 'Sobre a Brevidade da Vida',
    author: 'Sêneca',
    category: 'filosofia-estoica',
    tagline: 'O tempo é o bem mais precioso que negligenciamos.',
    color: '#3c4459',
  },
  {
    title: 'Homo Deus',
    author: 'Yuval Noah Harari',
    category: 'inovacao-tech',
    tagline: 'Uma breve história do amanhã.',
    color: '#3c4459',
  },
  {
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    category: 'filosofia-estoica',
    tagline: 'Uma breve história da humanidade.',
    color: '#262e42',
  },
  {
    title: 'A Revolução do Cansaço',
    author: 'Nuno Amado',
    category: 'saude-longevidade',
    tagline: 'Recupere energia em um mundo que exige tudo.',
    color: '#3c4459',
  },
]

const CHAPTER_POOL: Array<{ title: string; body: string }> = [
  {
    title: 'O poder surpreendente dos pequenos ganhos',
    body: 'É fácil superestimar a importância de um momento decisivo e subestimar o valor de pequenas melhorias diárias. Frequentemente nos convencemos de que um sucesso maciço exige uma ação igualmente titânica. Enquanto isso, uma melhoria de 1% não é notável — às vezes nem perceptível —, mas pode ser extraordinariamente significativa no longo prazo.',
  },
  {
    title: 'Sistemas vencem metas',
    body: 'Metas definem a direção, mas sistemas definem o progresso. Quando você se prende apenas ao resultado final, cada dia sem o prêmio parece um fracasso. Ao cuidar do processo, os resultados passam a ser consequência de uma engrenagem que funciona mesmo nos dias comuns.',
  },
  {
    title: 'Identidade antes do resultado',
    body: 'A mudança comportamental opera em três camadas: resultado, processo e identidade. A maioria começa pelo que quer alcançar e constrói hábitos frágeis. Os que sustentam a mudança começam por quem desejam se tornar, e então deixam que cada ação confirme essa identidade.',
  },
  {
    title: 'Da intenção à ação sem atrito',
    body: 'A distância entre intenção e comportamento costuma ser decidida pelo ambiente. Reduzir etapas, preparar o terreno e remover obstáculos torna a ação desejada quase inevitável. A força de vontade é frágil; o desenho do contexto é duradouro.',
  },
  {
    title: 'O papel crucial do retorno imediato',
    body: 'Nós favorecemos recompensas imediatas, mesmo quando elas sabotam objetivos de longo prazo. Tornar visíveis os pequenos ganhos e criar rastreadores simples ajuda a dar ao cérebro a satisfação que sustenta a constância.',
  },
  {
    title: 'Os dois modos de pensar',
    body: 'A mente opera em dois sistemas: um rápido, intuitivo e automático; outro lento, deliberado e analítico. Saber quando confiar na intuição e quando desacelerar é uma das habilidades cognitivas mais valiosas que existem.',
  },
  {
    title: 'Decisões sob incerteza',
    body: 'Boas decisões não se medem apenas pelo resultado imediato, mas pela qualidade do processo diante da informação disponível. Julgar pelo desfecho isolado é a armadilha que mais distorce o aprendizado.',
  },
  {
    title: 'O custo invisível do excesso',
    body: 'Toda escolha relevante implica abrir mão de algo. A clareza sobre o que deixamos de lado protege o essencial de ser sufocado pelo urgente e devolve deliberação a uma agenda tomada por ruído.',
  },
]

const INSIGHT_POOL: Array<{ title: string; body: string }> = [
  {
    title: 'O Efeito Composto',
    body: 'Uma melhoria de 1% ao dia resulta em um salto de quase 37 vezes ao final de um ano. Constância vence intensidade.',
  },
  {
    title: 'Sistemas vs. Metas',
    body: 'Você não se eleva à altura dos seus objetivos; você cai ao nível dos seus sistemas de execução diários.',
  },
  {
    title: 'Mudança de Identidade',
    body: 'A verdadeira transformação comportamental reside em mudar quem você é, não apenas o que você faz.',
  },
  {
    title: 'Ambiente como arquitetura',
    body: 'Projete o contexto para que o comportamento desejado seja fácil e o indesejado, improvável.',
  },
  {
    title: 'Regra dos 2 minutos',
    body: 'Quando um hábito parece difícil, reduza-o a uma versão que leve menos de dois minutos para começar.',
  },
  {
    title: 'Assimetria de oportunidade',
    body: 'Grandes retornos vêm de poucas decisões certeiras — o segredo é permanecer no jogo tempo suficiente para encontrá-las.',
  },
  {
    title: 'Margem de segurança',
    body: 'O propósito de uma margem não é prever o futuro, mas sobreviver ao imprevisto sem comprometer o plano.',
  },
  {
    title: 'Custo de oportunidade',
    body: 'Dizer sim a tudo é dizer não ao que realmente importa. A disciplina de escolher é o que multiplica resultado.',
  },
  {
    title: 'Ilusão de controle',
    body: 'Separe o que depende de você do que não depende. A energia gasta no segundo grupo é a maior fonte de ansiedade.',
  },
  {
    title: "O poder do 'ainda não'",
    body: 'Trocar "não consigo" por "ainda não consigo" abre espaço para o aprendizado e reduz o medo do erro.',
  },
  {
    title: 'Atenção é o recurso escasso',
    body: 'Em um mundo desenhado para distrair, a capacidade de sustentar foco profundo é uma vantagem competitiva rara.',
  },
  {
    title: 'Sono como fundação',
    body: 'Nenhuma estratégia de desempenho sobrevive à privação crônica de sono. Recuperação não é pausa, é parte do treino.',
  },
]

const QUOTE_POOL = [
  'Você não sobe ao nível das suas metas; você cai ao nível dos seus sistemas.',
  'A disciplina é a ponte entre metas e realizações.',
  'O sucesso é a soma de pequenos esforços repetidos dia após dia.',
  'Não é a força que importa, mas a constância.',
  'Quem tem um porquê enfrenta quase qualquer como.',
  'A simplicidade é o último grau de sofisticação.',
  'Conhecer a si mesmo é o começo de toda sabedoria.',
  'O tempo que tememos perder é justamente o que nos ensina a viver.',
  'Nada é tão poderoso quanto uma ideia cujo momento chegou.',
  'Cuide do processo e o resultado cuidará de você.',
  'A atenção que você dá ao presente define a qualidade do futuro.',
  'O obstáculo no caminho torna-se o caminho.',
]

const COLLECTIONS = [
  {
    slug: 'mente-focada-deep-work',
    eyebrow: '6 Obras Fundamentais',
    title: 'Mente Focada & Deep Work',
    description:
      'Domine sua atenção, elimine ruídos digitais e alcance hiperfoco em projetos complexos.',
    icon: 'psychology',
    color: '#064e3b',
    books: [
      'deep-work',
      'foco',
      'essencialismo',
      'rapido-e-devagar',
      'habitos-atomicos',
    ],
  },
  {
    slug: 'lideranca-alta-performance',
    eyebrow: '8 Obras Selecionadas',
    title: 'Liderança de Alta Performance',
    description:
      'Estratégias de comunicação, decisão sob risco e cultura de confiança mútua.',
    icon: 'diversity_3',
    color: '#262e42',
    books: [
      'principios',
      'comece-pelo-porque',
      'good-to-great',
      'os-7-habitos-das-pessoas-altamente-eficazes',
    ],
  },
  {
    slug: 'liberdade-financeira',
    eyebrow: '5 Obras Essenciais',
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

function pick<T>(pool: T[], start: number, count: number): T[] {
  const result: T[] = []
  for (let i = 0; i < count; i++) {
    result.push(pool[(start + i) % pool.length])
  }
  return result
}

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

  BOOKS.forEach((book, index) => {
    const id = randomUUID()
    const slug = slugify(book.title)
    const categoryId = categoryIdBySlug.get(book.category)!

    db.insert(schema.books)
      .values({
        id,
        slug,
        title: book.title,
        author: book.author,
        categoryId,
        tagline: book.tagline,
        description: `${book.tagline} Nesta síntese editorial você encontra as ideias centrais de "${book.title}", exemplos práticos e um plano de ação para aplicar o conhecimento no mesmo dia.`,
        coverColor: book.color,
        audioMinutes: 11 + ((index * 3) % 9),
        readingMinutes: 8 + ((index * 2) % 7),
        rating: 4.4 + ((index * 7) % 6) / 10,
        ratingsCount: 800 + ((index * 373) % 8200),
        isFeatured: Boolean(book.featured),
        publishedAt: now - index * 3 * DAY_MS,
        searchIndex: `${book.title} ${book.author} ${book.tagline}`
          .normalize('NFD')
          .replace(/\p{Diacritic}/gu, '')
          .toLowerCase(),
      })
      .run()

    bookIdBySlug.set(slug, id)

    pick(CHAPTER_POOL, index, 4).forEach((chapter, position) => {
      db.insert(schema.bookChapters)
        .values({
          id: randomUUID(),
          bookId: id,
          position,
          title: `${position + 1}. ${chapter.title}`,
          body: chapter.body,
        })
        .run()
      chapters++
    })

    pick(INSIGHT_POOL, index, 4).forEach((insight, position) => {
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

    pick(QUOTE_POOL, index, 2).forEach((text, position) => {
      db.insert(schema.bookQuotes)
        .values({
          id: randomUUID(),
          bookId: id,
          position,
          chapterPosition: position + 1,
          text,
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
    books: BOOKS.length,
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
