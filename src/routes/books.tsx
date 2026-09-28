import {
  createFileRoute,
  Link,
  redirect,
  useNavigate,
} from '@tanstack/react-router'
import { useState } from 'react'

import { BookCard } from '#/components/book-card'
import { Icon } from '#/components/icon'
import { Screen } from '#/components/screen'
import { ThemeToggle } from '#/components/theme-toggle'
import { getAllBooks } from '#/server/catalog'

type BooksSearch = {
  category?: string
  q?: string
  page?: number
}

export const Route = createFileRoute('/books')({
  beforeLoad: ({ context }) => {
    if (!context.user) {
      throw redirect({ to: '/login' })
    }
  },
  validateSearch: (search: Record<string, unknown>): BooksSearch => ({
    category:
      typeof search.category === 'string' && search.category
        ? search.category
        : undefined,
    q: typeof search.q === 'string' && search.q ? search.q : undefined,
    page: Number(search.page) > 1 ? Math.trunc(Number(search.page)) : undefined,
  }),
  loaderDeps: ({ search }) => ({
    category: search.category,
    q: search.q,
    page: search.page,
  }),
  loader: async ({ deps }) =>
    getAllBooks({
      data: {
        categorySlug: deps.category,
        query: deps.q,
        page: deps.page,
      },
    }),
  component: BooksPage,
})

function BooksPage() {
  const data = Route.useLoaderData()
  const search = Route.useSearch()
  const navigate = useNavigate()
  const [query, setQuery] = useState(search.q ?? '')

  const categories = [
    { id: 'todos', slug: 'todos', name: 'Todos', icon: 'auto_awesome' },
    ...data.categories,
  ]

  function submitSearch(event: React.FormEvent) {
    event.preventDefault()
    navigate({
      to: '/books',
      search: {
        category: search.category,
        q: query.trim() || undefined,
      },
    })
  }

  function goToPage(next: number) {
    navigate({
      to: '/books',
      search: {
        category: search.category,
        q: search.q,
        page: next > 1 ? next : undefined,
      },
    })
  }

  return (
    <Screen nav="explorar">
      <header className="pt-safe sticky top-0 z-40 bg-surface/85 px-5 py-3 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link
              to="/explore"
              aria-label="Voltar"
              className="grid h-9 w-9 place-items-center rounded-full bg-surface-container-low text-on-surface"
            >
              <Icon name="arrow_back" className="text-[20px]" />
            </Link>
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold tracking-wider text-secondary uppercase">
                Acervo completo
              </span>
              <span className="font-serif text-[18px] leading-tight font-semibold text-primary">
                Todos os resumos
              </span>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="flex flex-col gap-3 px-5 pt-3 pb-2">
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
            type="submit"
            aria-label="Buscar"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary text-on-primary shadow-sm active:scale-95"
          >
            <Icon name="search" className="text-[20px]" />
          </button>
        </form>
        <p className="text-[13px] text-on-surface-variant">
          {data.total} {data.total === 1 ? 'título' : 'títulos'} no acervo
          {search.q ? ` para “${search.q}”` : ''}
        </p>
      </div>

      <div className="no-scrollbar flex w-full items-center gap-2 overflow-x-auto px-5 py-2">
        {categories.map((category) => {
          const isActive = (search.category ?? 'todos') === category.slug
          return (
            <Link
              key={category.id}
              to="/books"
              search={{
                q: search.q,
                category: category.slug === 'todos' ? undefined : category.slug,
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

      <section className="flex flex-col gap-3 px-5 pt-2 pb-4">
        {data.books.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {data.books.map((book) => (
              <BookCard key={book.id} book={book} width="w-full" />
            ))}
          </div>
        ) : (
          <p className="py-12 text-center text-[14px] text-on-surface-variant">
            Nenhum resumo encontrado. Tente outra busca.
          </p>
        )}

        {data.totalPages > 1 ? (
          <div className="mt-3 flex items-center justify-between">
            <button
              type="button"
              disabled={data.page <= 1}
              onClick={() => goToPage(data.page - 1)}
              className="flex items-center gap-1 rounded-full bg-surface-container px-4 py-2 text-[12px] font-semibold text-on-surface-variant disabled:opacity-40"
            >
              <Icon name="chevron_left" className="text-[18px]" />
              Anterior
            </button>
            <span className="text-[12px] font-semibold text-on-surface-variant">
              Página {data.page} de {data.totalPages}
            </span>
            <button
              type="button"
              disabled={data.page >= data.totalPages}
              onClick={() => goToPage(data.page + 1)}
              className="flex items-center gap-1 rounded-full bg-surface-container px-4 py-2 text-[12px] font-semibold text-on-surface-variant disabled:opacity-40"
            >
              Próxima
              <Icon name="chevron_right" className="text-[18px]" />
            </button>
          </div>
        ) : null}
      </section>
    </Screen>
  )
}
