// Baixa as capas reais dos livros do catálogo via Open Library.
// Uso: node scripts/fetch-covers.mjs
// Saída: public/covers/<slug>.jpg

import { mkdirSync, writeFileSync } from 'node:fs'

const OUT = new URL('../public/covers/', import.meta.url).pathname
mkdirSync(OUT, { recursive: true })

// [slug, título original para busca, autor]
const BOOKS = [
  ['habitos-atomicos', 'Atomic Habits', 'James Clear'],
  ['deep-work', 'Deep Work', 'Cal Newport'],
  ['o-poder-do-habito', 'The Power of Habit', 'Charles Duhigg'],
  ['foco', 'Focus The Hidden Driver of Excellence', 'Daniel Goleman'],
  ['principios', 'Principles Life and Work', 'Ray Dalio'],
  ['os-7-habitos', 'The 7 Habits of Highly Effective People', 'Stephen Covey'],
  ['good-to-great', 'Good to Great', 'Jim Collins'],
  ['rapido-e-devagar', 'Thinking Fast and Slow', 'Daniel Kahneman'],
  ['inteligencia-emocional', 'Emotional Intelligence', 'Daniel Goleman'],
  ['psicologia-financeira', 'The Psychology of Money', 'Morgan Housel'],
  ['pai-rico-pai-pobre', 'Rich Dad Poor Dad', 'Robert Kiyosaki'],
  [
    'o-homem-mais-rico-da-babilonia',
    'The Richest Man in Babylon',
    'George Clason',
  ],
  ['o-investidor-inteligente', 'The Intelligent Investor', 'Benjamin Graham'],
  [
    'comunicacao-nao-violenta',
    'Nonviolent Communication',
    'Marshall Rosenberg',
  ],
  [
    'como-fazer-amigos',
    'How to Win Friends and Influence People',
    'Dale Carnegie',
  ],
  ['a-startup-enxuta', 'The Lean Startup', 'Eric Ries'],
  ['do-zero-ao-um', 'Zero to One', 'Peter Thiel'],
  ['inteligencia-artificial', 'AI Superpowers', 'Kai-Fu Lee'],
  ['outlive', 'Outlive The Science and Art of Longevity', 'Peter Attia'],
  ['respire', 'Breath The New Science of a Lost Art', 'James Nestor'],
  ['a-dieta-da-mente', 'Grain Brain', 'David Perlmutter'],
  ['meditacoes', 'Meditations', 'Marcus Aurelius'],
  ['o-obstaculo-e-o-caminho', 'The Obstacle Is the Way', 'Ryan Holiday'],
  ['sobre-a-brevidade-da-vida', 'On the Shortness of Life', 'Seneca'],
  ['sapiens', 'Sapiens A Brief History of Humankind', 'Yuval Noah Harari'],
  ['homo-deus', 'Homo Deus A Brief History of Tomorrow', 'Yuval Noah Harari'],
]

const norm = (s) =>
  s
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')

async function search(title, author) {
  const url = new URL('https://openlibrary.org/search.json')
  url.searchParams.set('title', title)
  url.searchParams.set('author', author)
  url.searchParams.set('limit', '8')
  url.searchParams.set(
    'fields',
    'title,author_name,cover_i,isbn,first_publish_year',
  )
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`search ${res.status}`)
  }
  const json = await res.json()
  return json.docs ?? []
}

function pickCover(docs, title) {
  const wanted = norm(title)
    .split(' ')
    .filter((w) => w.length > 3)
  const withCover = docs.filter((doc) => doc.cover_i)
  const scored = withCover
    .map((doc) => {
      const docTitle = norm(doc.title ?? '')
      const score = wanted.filter((word) => docTitle.includes(word)).length
      return { doc, score }
    })
    .sort((a, b) => b.score - a.score)
  return scored[0]?.doc ?? null
}

async function download(coverId) {
  const url = `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`cover ${res.status}`)
  }
  const type = res.headers.get('content-type') ?? ''
  const buffer = Buffer.from(await res.arrayBuffer())
  if (!type.includes('image') || buffer.length < 4000) {
    throw new Error(`cover inválida (${type}, ${buffer.length}b)`)
  }
  return buffer
}

const ok = []
const failed = []

for (const [slug, title, author] of BOOKS) {
  try {
    const docs = await search(title, author)
    const doc = pickCover(docs, title)
    if (!doc?.cover_i) {
      failed.push([slug, 'sem cover_i'])
      console.log(`✗ ${slug} — sem capa`)
      continue
    }
    const buffer = await download(doc.cover_i)
    writeFileSync(`${OUT}${slug}.jpg`, buffer)
    ok.push(slug)
    console.log(
      `✓ ${slug.padEnd(32)} ${(buffer.length / 1024).toFixed(0)}KB  "${doc.title}" (${doc.first_publish_year ?? '?'})`,
    )
  } catch (error) {
    failed.push([slug, error.message])
    console.log(`✗ ${slug} — ${error.message}`)
  }
}

console.log(`\nBaixadas: ${ok.length}/${BOOKS.length}`)
if (failed.length) {
  console.log('Falhas:', failed.map(([s, m]) => `${s} (${m})`).join(', '))
}
