import { createFileRoute, Link, redirect } from '@tanstack/react-router'

import { BookCard } from '#/components/book-card'
import { Icon } from '#/components/icon'
import { Screen } from '#/components/screen'
import { ThemeToggle } from '#/components/theme-toggle'
import { getCollectionCatalog } from '#/server/catalog'

export const Route = createFileRoute('/collection/$collectionId')({
  beforeLoad: ({ context }) => {
    if (!context.user) {
      throw redirect({ to: '/login' })
    }
  },
  loader: async ({ params }) =>
    getCollectionCatalog({ data: { slug: params.collectionId } }),
  component: CollectionPage,
})

function CollectionPage() {
  const { collection } = Route.useLoaderData()

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
            <span className="text-[10px] font-semibold tracking-wider text-secondary uppercase">
              Coleção
            </span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <section className="flex flex-col gap-2 px-5 pt-3 pb-2">
        <div className="flex items-center gap-1.5 text-secondary">
          <Icon name={collection.icon} className="text-[16px]" />
          <span className="text-[10px] font-semibold tracking-wide uppercase">
            {collection.eyebrow}
          </span>
        </div>
        <h1 className="font-serif text-[28px] leading-tight font-semibold text-primary">
          {collection.title}
        </h1>
        <p className="text-[14px] leading-relaxed text-on-surface-variant">
          {collection.description}
        </p>
        <p className="mt-1 text-[13px] font-semibold text-on-surface-variant">
          {collection.books.length}{' '}
          {collection.books.length === 1 ? 'título' : 'títulos'} nesta trilha
        </p>
      </section>

      <section className="px-5 pt-2 pb-6">
        {collection.books.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {collection.books.map((book) => (
              <BookCard key={book.id} book={book} width="w-full" />
            ))}
          </div>
        ) : (
          <p className="py-12 text-center text-[14px] text-on-surface-variant">
            Esta trilha ainda não tem títulos.
          </p>
        )}
      </section>
    </Screen>
  )
}
