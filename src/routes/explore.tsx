import {
  createFileRoute,
  Link,
  redirect,
  useNavigate,
} from '@tanstack/react-router'
import { useState } from 'react'

import { BookCard } from '#/components/book-card'
import { BookCover } from '#/components/book-cover'
import { Icon } from '#/components/icon'
import { Logo } from '#/components/logo'
import { Screen } from '#/components/screen'
import { useToast } from '#/components/toast'
import { getExploreData } from '#/server/catalog'

type ExploreSearch = {
  category?: string
  q?: string
}

export const Route = createFileRoute('/explore')({
  beforeLoad: ({ context }) => {
    if (!context.user) {
      throw redirect({ to: '/login' })
    }
  },
  validateSearch: (search: Record<string, unknown>): ExploreSearch => ({
    category: typeof search.category === 'string' ? search.category : undefined,
    q: typeof search.q === 'string' ? search.q : undefined,
  }),
  loaderDeps: ({ search }) => ({ category: search.category, q: search.q }),
  loader: async ({ deps }) =>
    getExploreData({ data: { categorySlug: deps.category, query: deps.q } }),
  component: ExplorePage,
})

function ExplorePage() {
  const data = Route.useLoaderData()
  const search = Route.useSearch()
  const navigate = useNavigate()
  const { show, toast } = useToast()
  const [query, setQuery] = useState(search.q ?? '')

  const categories = [
    { id: 'todos', slug: 'todos', name: 'Todos', icon: 'auto_awesome' },
    ...data.categories,
  ]
  const isFiltered = Boolean(data.results)

  function submitSearch(event: React.FormEvent) {
    event.preventDefault()
    navigate({
      to: '/explore',
      search: { category: search.category, q: query.trim() || undefined },
    })
  }

  return (
    <Screen nav="explorar">
      <header className="pt-safe sticky top-0 z-40 bg-surface/85 px-5 py-3 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <Logo />
          <Link
            to="/library"
            aria-label="Perfil"
            className="grid h-8 w-8 place-items-center rounded-full bg-primary"
          >
            <Icon
              name="person"
              filled
              className="text-[18px] text-on-primary"
            />
          </Link>
        </div>
      </header>

      <div className="flex flex-col gap-4 px-5 pt-3 pb-2">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-secondary">
            <Icon name="wb_sunny" className="text-[16px]" />
            <span className="text-[10px] font-semibold tracking-wider uppercase">
              Momento de Sabedoria
            </span>
          </div>
          <h1 className="font-serif text-[30px] leading-tight font-semibold text-primary">
            O que você deseja aprender hoje?
          </h1>
        </div>

        <form className="flex items-center gap-2" onSubmit={submitSearch}>
          <div className="flex flex-1 items-center rounded-full bg-surface-container-low px-4 py-2.5 shadow-sm">
            <Icon name="search" className="mr-2.5 text-[20px] text-outline" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar livros, autores ou temas..."
              className="w-full bg-transparent text-[15px] text-on-surface outline-none placeholder:text-outline"
            />
          </div>
          <button
            type="button"
            onClick={() => show('Filtros avançados em breve')}
            aria-label="Filtrar conteúdo"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-surface-container-high text-on-surface shadow-sm active:scale-95"
          >
            <Icon name="tune" className="text-[20px]" />
          </button>
        </form>
      </div>

      <div className="no-scrollbar flex w-full items-center gap-2 overflow-x-auto px-5 py-3">
        {categories.map((category) => {
          const isActive = (search.category ?? 'todos') === category.slug
          return (
            <Link
              key={category.id}
              to="/explore"
              search={{
                category: category.slug === 'todos' ? undefined : category.slug,
                q: search.q,
              }}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-[12px] font-semibold whitespace-nowrap transition-all active:scale-95 ${
                isActive
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              {category.slug === 'todos' ? (
                <Icon name="auto_awesome" className="text-[15px]" />
              ) : null}
              {category.name}
            </Link>
          )
        })}
      </div>

      {isFiltered ? (
        <section className="flex flex-col gap-3 px-5 pt-1 pb-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-[18px] font-semibold text-on-surface">
              {data.results?.length ?? 0} resultados
            </h3>
            <Link
              to="/explore"
              search={{}}
              className="text-[12px] font-semibold text-primary"
            >
              Limpar
            </Link>
          </div>
          {data.results && data.results.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {data.results.map((book) => (
                <BookCard key={book.id} book={book} width="w-full" />
              ))}
            </div>
          ) : (
            <p className="py-8 text-center text-[14px] text-on-surface-variant">
              Nenhum resumo encontrado. Tente outra busca.
            </p>
          )}
        </section>
      ) : (
        <>
          {data.featured ? (
            <section className="px-5 pt-1 pb-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-secondary" />
                  <span className="text-[10px] font-semibold tracking-wider text-secondary uppercase">
                    Destaque Editorial
                  </span>
                </div>
                <span className="text-[10px] text-on-surface-variant">
                  Edição #142
                </span>
              </div>

              <div className="relative flex flex-col overflow-hidden rounded-xl bg-primary p-5 text-on-primary shadow-lg">
                <div className="pointer-events-none absolute -top-12 -right-12 h-48 w-48 rounded-full bg-secondary-container/20 blur-3xl" />
                <div className="z-10 mb-4 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold text-primary-fixed backdrop-blur-md">
                    <Icon name="trending_up" filled className="text-[13px]" />
                    Mais ouvido hoje
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-secondary-fixed">
                    <Icon name="star" filled className="text-[14px]" />
                    {data.featured.rating.toFixed(1)} (
                    {(data.featured.ratingsCount / 1000).toFixed(1)}k)
                  </span>
                </div>

                <div className="z-10 flex items-center gap-4">
                  <BookCover
                    title={data.featured.title}
                    author={data.featured.author}
                    color={data.featured.coverColor}
                    className="h-36 w-24 shrink-0 rounded-lg shadow-xl"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] tracking-wide text-on-primary-container uppercase">
                      {data.featured.categoryName}
                    </span>
                    <h2 className="font-serif mt-0.5 truncate text-[22px] leading-snug font-medium text-on-primary">
                      {data.featured.title}
                    </h2>
                    <p className="truncate text-[13px] text-on-primary-container">
                      {data.featured.author}
                    </p>
                    <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-white/80 italic">
                      “{data.featured.tagline}”
                    </p>
                  </div>
                </div>

                <div className="z-10 mt-5 flex items-center justify-between border-t border-white/10 pt-3">
                  <span className="flex items-center gap-2 text-[10px] text-on-primary-container">
                    <Icon name="headphones" className="text-[16px]" />
                    Áudio de {data.featured.audioMinutes} min + Texto
                  </span>
                  <Link
                    to="/reader/$bookId"
                    params={{ bookId: data.featured.id }}
                    className="flex items-center gap-2 rounded-full bg-secondary-container px-4 py-2.5 text-[12px] font-semibold text-on-secondary-fixed shadow-md active:scale-95"
                  >
                    <Icon name="play_arrow" filled className="text-[18px]" />
                    Ouvir Resumo
                  </Link>
                </div>
              </div>
            </section>
          ) : null}

          <section className="flex flex-col pt-2 pb-2">
            <div className="mb-3 flex items-center justify-between px-5">
              <div>
                <h3 className="font-serif text-[18px] font-semibold text-on-surface">
                  Em Alta esta Semana
                </h3>
                <p className="text-[13px] text-on-surface-variant">
                  Leituras essenciais que lideram as conversas
                </p>
              </div>
            </div>
            <div className="no-scrollbar flex snap-x snap-mandatory gap-3.5 overflow-x-auto px-5 pb-2">
              {data.trending.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-3 px-5 pt-4 pb-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-[18px] font-semibold text-on-surface">
                  Coleções Temáticas
                </h3>
                <p className="text-[13px] text-on-surface-variant">
                  Trilhas de conhecimento estruturadas
                </p>
              </div>
              <span className="text-[10px] font-bold tracking-wider text-secondary uppercase">
                Curadoria
              </span>
            </div>
            {data.collections.map((collection) => {
              if (collection.books.length === 0) {
                return null
              }
              const first = collection.books[0]
              return (
                <Link
                  key={collection.id}
                  to="/reader/$bookId"
                  params={{ bookId: first.id }}
                  className="flex items-center justify-between rounded-xl bg-surface-container-lowest p-4 shadow-sm active:scale-[0.99]"
                >
                  <div className="z-10 flex max-w-[62%] flex-col">
                    <div className="mb-1 flex items-center gap-1.5 text-secondary">
                      <Icon name={collection.icon} className="text-[16px]" />
                      <span className="text-[10px] font-semibold tracking-wide uppercase">
                        {collection.eyebrow}
                      </span>
                    </div>
                    <h4 className="font-serif text-[16px] leading-snug font-semibold text-primary">
                      {collection.title}
                    </h4>
                    <p className="mt-1 line-clamp-2 text-[13px] text-on-surface-variant">
                      {collection.description}
                    </p>
                    <span className="mt-2 flex items-center gap-2 text-[12px] font-semibold text-primary">
                      Explorar trilha
                      <Icon name="arrow_forward" className="text-[16px]" />
                    </span>
                  </div>
                  <BookCover
                    title={first.title}
                    author={first.author}
                    color={collection.coverColor}
                    className="h-28 w-20 shrink-0 rotate-3 shadow-md"
                  />
                </Link>
              )
            })}
          </section>

          <section className="px-5 pt-4 pb-6">
            <div className="relative flex flex-col overflow-hidden rounded-xl bg-gradient-to-br from-primary-container via-primary to-primary p-5 text-on-primary shadow-lg">
              <div className="pointer-events-none absolute right-0 bottom-0 h-36 w-36 rounded-full bg-secondary-container/20 blur-2xl" />
              <div className="mb-2 flex items-center gap-2">
                <Icon
                  name="workspace_premium"
                  filled
                  className="text-[22px] text-secondary-fixed"
                />
                <span className="text-[10px] font-bold tracking-wider text-secondary-fixed uppercase">
                  Acesso Ilimitado
                </span>
              </div>
              <h3 className="font-serif text-[22px] leading-snug font-medium">
                Desbloqueie os {data.totalBooks} resumos com o Lúmina Pro
              </h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-on-primary-container">
                Áudios narrados por especialistas, mapas conceituais e
                sincronização offline contínua.
              </p>
              <div className="mt-4 flex items-center gap-3">
                <Link
                  to="/plans"
                  className="flex items-center gap-1.5 rounded-full bg-secondary px-5 py-2.5 text-[12px] font-semibold text-on-secondary shadow-sm active:scale-95"
                >
                  Experimentar por 7 dias grátis
                  <Icon name="arrow_forward" className="text-[16px]" />
                </Link>
              </div>
            </div>
          </section>
        </>
      )}
      {toast}
    </Screen>
  )
}
