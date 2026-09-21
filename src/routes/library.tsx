import {
  createFileRoute,
  Link,
  redirect,
  useRouter,
} from '@tanstack/react-router'
import { useState } from 'react'

import { BookCover } from '#/components/book-cover'
import { Icon } from '#/components/icon'
import { Logo } from '#/components/logo'
import { Screen } from '#/components/screen'
import { useToast } from '#/components/toast'
import { signOut } from '#/server/auth'
import { getLibraryData, saveBookAction } from '#/server/library'

export const Route = createFileRoute('/library')({
  beforeLoad: ({ context }) => {
    if (!context.user) {
      throw redirect({ to: '/login' })
    }
  },
  loader: async () => getLibraryData(),
  component: LibraryPage,
})

const TABS = [
  { key: 'in_progress', label: 'Em Andamento' },
  { key: 'saved', label: 'Salvos' },
  { key: 'completed', label: 'Concluídos' },
  { key: 'highlights', label: 'Destaques & Notas' },
] as const

type TabKey = (typeof TABS)[number]['key']

function initials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('')
}

function LibraryPage() {
  const data = Route.useLoaderData()
  const router = useRouter()
  const { show, toast } = useToast()
  const [tab, setTab] = useState<TabKey>('in_progress')
  const [reminders, setReminders] = useState(true)
  const [loadingRecommendation, setLoadingRecommendation] = useState<
    string | null
  >(null)

  const counts: Record<TabKey, number> = {
    in_progress: data.stats.inProgressCount,
    saved: data.stats.savedCount,
    completed: data.stats.completedCount,
    highlights: data.highlights.length,
  }

  const visibleItems = data.items.filter((item) => item.status === tab)

  async function saveRecommendation(bookId: string) {
    setLoadingRecommendation(bookId)
    const result = await saveBookAction({ data: { bookId } })
    setLoadingRecommendation(null)
    if (!result.ok) {
      show(result.error.message)
      return
    }
    show('Adicionado aos seus salvos')
    await router.invalidate()
  }

  return (
    <Screen nav="biblioteca">
      <header className="pt-safe sticky top-0 z-40 bg-surface/85 px-5 py-3 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <Logo />
          <button
            type="button"
            onClick={async () => {
              await signOut()
              await router.invalidate()
              await router.navigate({ to: '/onboarding/welcome' })
            }}
            className="flex items-center gap-1 rounded-full bg-surface-container px-3 py-1.5 text-[11px] font-semibold text-on-surface-variant"
          >
            <Icon name="logout" className="text-[16px]" />
            Sair
          </button>
        </div>
      </header>

      <section className="px-5 pt-3">
        <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-4 shadow-sm">
          <div className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-secondary-container/10 blur-2xl" />
          <div className="relative z-10 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <span className="relative grid h-14 w-14 place-items-center rounded-full bg-primary text-[18px] font-bold text-on-primary">
                {initials(data.user.name)}
                <span className="absolute -right-0.5 -bottom-0.5 grid h-5 w-5 place-items-center rounded-full bg-primary text-on-primary ring-2 ring-white">
                  <Icon name="verified" filled className="text-[12px]" />
                </span>
              </span>
              <div>
                <h1 className="font-serif text-[17px] font-semibold text-on-surface">
                  {data.user.name}
                </h1>
                <span className="mt-0.5 inline-flex items-center gap-1 rounded-full bg-secondary-fixed/50 px-2 py-0.5">
                  <Icon
                    name="star"
                    filled
                    className="text-[12px] text-secondary"
                  />
                  <span className="text-[10px] font-semibold text-on-secondary-fixed">
                    {data.subscription &&
                    data.subscription.subscription.status !== 'canceled'
                      ? 'Membro Premium'
                      : 'Plano Gratuito'}
                  </span>
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-surface-container-low px-2.5 py-1.5 shadow-sm">
              <Icon
                name="local_fire_department"
                filled
                className="text-[18px] text-secondary-container"
              />
              <div className="flex flex-col leading-none">
                <span className="text-[16px] font-bold text-on-surface">
                  {Math.max(
                    1,
                    data.stats.completedCount + data.stats.inProgressCount,
                  )}
                </span>
                <span className="text-[9px] tracking-wider text-outline uppercase">
                  Ritmo
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-lg bg-surface-container-low/70 p-3">
            <div className="mb-1.5 flex items-baseline justify-between">
              <span className="flex items-center gap-1 text-[12px] font-semibold text-on-surface">
                <Icon name="target" className="text-[16px] text-primary" />
                Meta Semanal
              </span>
              <span className="text-[11px] font-bold text-primary">
                {Math.min(data.stats.completedCount, 5)} de 5 resumos (
                {Math.min(100, data.stats.completedCount * 20)}%)
              </span>
            </div>
            <div className="flex h-2 w-full overflow-hidden rounded-full bg-surface-container-highest">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary-container to-secondary-container"
                style={{
                  width: `${Math.min(100, data.stats.completedCount * 20)}%`,
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pt-3">
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col items-center rounded-lg bg-surface-container-lowest p-3 text-center shadow-sm">
            <span className="mb-1 grid h-7 w-7 place-items-center rounded-full bg-primary-fixed/40 text-primary">
              <Icon name="auto_stories" className="text-[16px]" />
            </span>
            <span className="text-[18px] leading-tight font-bold text-on-surface">
              {data.stats.completedCount}
            </span>
            <span className="text-[10px] text-outline">Resumos</span>
          </div>
          <div className="flex flex-col items-center rounded-lg bg-surface-container-lowest p-3 text-center shadow-sm">
            <span className="mb-1 grid h-7 w-7 place-items-center rounded-full bg-secondary-fixed/50 text-secondary">
              <Icon name="headphones" className="text-[16px]" />
            </span>
            <span className="text-[18px] leading-tight font-bold text-on-surface">
              {data.stats.audioHours}h
            </span>
            <span className="text-[10px] text-outline">Áudio</span>
          </div>
          <div className="flex flex-col items-center rounded-lg bg-surface-container-lowest p-3 text-center shadow-sm">
            <span className="mb-1 grid h-7 w-7 place-items-center rounded-full bg-tertiary-fixed/60 text-tertiary">
              <Icon name="lightbulb" className="text-[16px]" />
            </span>
            <span className="text-[18px] leading-tight font-bold text-on-surface">
              {data.stats.highlightsCount}
            </span>
            <span className="text-[10px] text-outline">Ideias</span>
          </div>
        </div>
      </section>

      <section className="pt-4">
        <div className="no-scrollbar flex gap-2 overflow-x-auto px-5 pb-1">
          {TABS.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setTab(item.key)}
              className={`rounded-full px-3 py-1.5 text-[12px] font-semibold whitespace-nowrap transition-all active:scale-95 ${
                tab === item.key
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              {item.label} ({counts[item.key]})
            </button>
          ))}
        </div>
      </section>

      {tab === 'highlights' ? (
        <section className="px-5 pt-4">
          {data.highlights.length === 0 ? (
            <p className="py-8 text-center text-[14px] text-on-surface-variant">
              Você ainda não salvou citações. Toque em “Grifar” durante um
              resumo.
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {data.highlights.map((highlight) => (
                <div
                  key={highlight.id}
                  className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-4 shadow-sm"
                >
                  <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-secondary-container" />
                  <div className="pl-2">
                    <span className="inline-flex rounded-full bg-secondary-fixed/40 px-2 py-0.5 text-[10px] font-bold tracking-wider text-secondary uppercase">
                      Destaque
                    </span>
                    <blockquote className="font-serif mt-2 mb-3 text-[16px] leading-relaxed text-on-surface italic">
                      “{highlight.text}”
                    </blockquote>
                    <div className="flex items-center justify-between pt-1">
                      <div>
                        <p className="text-[12px] font-semibold text-on-surface">
                          {highlight.bookAuthor}
                        </p>
                        <p className="text-[11px] text-outline">
                          {highlight.bookTitle}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => show('Citação compartilhada!')}
                        className="inline-flex items-center gap-1.5 rounded-full bg-surface-container-low px-3 py-1.5 text-[10px] font-semibold text-on-surface active:scale-95"
                      >
                        <Icon
                          name="share"
                          className="text-[16px] text-secondary"
                        />
                        Compartilhar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      ) : (
        <section className="px-5 pt-4">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="font-serif text-[18px] font-semibold text-on-surface">
              {tab === 'in_progress'
                ? 'Continuar Ouvindo'
                : tab === 'saved'
                  ? 'Sua Lista'
                  : 'Concluídos'}
            </h2>
            <span className="text-[10px] font-semibold tracking-wider text-secondary uppercase">
              {visibleItems.length}{' '}
              {visibleItems.length === 1 ? 'título' : 'títulos'}
            </span>
          </div>

          {visibleItems.length === 0 ? (
            <p className="py-8 text-center text-[14px] text-on-surface-variant">
              Nada por aqui ainda. Explore o catálogo para começar.
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {visibleItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 rounded-xl bg-surface-container-lowest p-3 shadow-sm"
                >
                  <BookCover
                    title={item.book.title}
                    author={item.book.author}
                    color={item.book.coverColor}
                    coverUrl={item.book.coverUrl}
                    className="h-22 w-16 shrink-0 rounded-md shadow-sm"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="mb-0.5 flex items-center gap-1 text-[11px] font-semibold text-secondary">
                      <Icon name="schedule" className="text-[13px]" />
                      {item.status === 'completed'
                        ? 'Concluído'
                        : `Resta ${Math.max(1, Math.round(((100 - item.progressPercent) / 100) * item.book.audioMinutes))} min`}
                    </span>
                    <h3 className="truncate text-[15px] leading-snug font-semibold text-on-surface">
                      {item.book.title}
                    </h3>
                    <p className="truncate text-[12px] text-outline">
                      {item.book.author}
                    </p>
                    <div className="mt-2 flex h-1.5 w-full items-center rounded-full bg-surface-container-highest">
                      <div
                        className="h-full rounded-full bg-secondary-container"
                        style={{ width: `${item.progressPercent}%` }}
                      />
                    </div>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="text-[10px] text-outline">
                        {item.progressPercent}% concluído
                      </span>
                      <span className="text-[10px] font-semibold text-primary">
                        Capítulo {item.lastChapterPosition}
                      </span>
                    </div>
                  </div>
                  <Link
                    to="/reader/$bookId"
                    params={{ bookId: item.book.id }}
                    aria-label={`Abrir ${item.book.title}`}
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary-container text-on-primary shadow-md active:scale-95"
                  >
                    <Icon name="play_arrow" filled className="text-[24px]" />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      <section className="px-5 pt-6">
        <h2 className="font-serif mb-2 text-[18px] font-semibold text-on-surface">
          Recomendado para Você
        </h2>
        <div className="flex flex-col gap-3">
          {data.recommendations.map((book) => (
            <div
              key={book.id}
              className="flex items-center gap-3 rounded-xl bg-surface-container-lowest p-3 shadow-sm"
            >
              <BookCover
                title={book.title}
                author={book.author}
                color={book.coverColor}
                coverUrl={book.coverUrl}
                className="h-20 w-14 shrink-0 rounded-md shadow-sm"
              />
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-semibold tracking-wide text-secondary uppercase">
                  {book.categoryName}
                </span>
                <h3 className="truncate text-[15px] font-semibold text-on-surface">
                  {book.title}
                </h3>
                <p className="truncate text-[12px] text-outline">
                  {book.author}
                </p>
              </div>
              <button
                type="button"
                disabled={loadingRecommendation === book.id}
                onClick={() => saveRecommendation(book.id)}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-surface-container-high text-on-surface active:scale-95 disabled:opacity-60"
                aria-label={`Salvar ${book.title}`}
              >
                <Icon name="bookmark_add" className="text-[20px]" />
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 pt-6 pb-8">
        <h2 className="font-serif mb-2 text-[18px] font-semibold text-on-surface">
          Acesso Rápido & Ajustes
        </h2>
        <div className="flex flex-col overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm">
          <Link
            to="/plans"
            className="flex items-center justify-between px-4 py-3.5 hover:bg-surface-container-low"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-secondary-fixed/50 text-secondary">
                <Icon name="workspace_premium" className="text-[18px]" />
              </span>
              <div>
                <div className="text-[14px] font-semibold text-on-surface">
                  Gerenciar Assinatura
                </div>
                <div className="text-[13px] text-outline">
                  {data.subscription
                    ? `${data.subscription.plan.name} • ${data.subscription.isTrialing ? `${data.subscription.trialDaysLeft} dias restantes` : 'Ativo'}`
                    : 'Nenhum plano ativo'}
                </div>
              </div>
            </div>
            <Icon
              name="chevron_right"
              className="text-[20px] text-outline-variant"
            />
          </Link>

          <button
            type="button"
            onClick={() => show('Downloads offline em breve')}
            className="flex items-center justify-between px-4 py-3.5 text-left hover:bg-surface-container-low"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-primary-fixed/50 text-primary">
                <Icon name="download_done" className="text-[18px]" />
              </span>
              <div>
                <div className="text-[14px] font-semibold text-on-surface">
                  Downloads Offline
                </div>
                <div className="text-[13px] text-outline">
                  Ouvir sem internet
                </div>
              </div>
            </div>
            <Icon
              name="chevron_right"
              className="text-[20px] text-outline-variant"
            />
          </button>

          <div className="flex items-center justify-between px-4 py-3.5">
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-tertiary-fixed/60 text-tertiary">
                <Icon name="notifications_active" className="text-[18px]" />
              </span>
              <div>
                <div className="text-[14px] font-semibold text-on-surface">
                  Lembretes Diários
                </div>
                <div className="text-[13px] text-outline">
                  Notificar ritual às 07:30
                </div>
              </div>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={reminders}
              onClick={() => setReminders((value) => !value)}
              className={`relative h-6 w-11 rounded-full transition-colors ${reminders ? 'bg-primary' : 'bg-surface-container-highest'}`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${reminders ? 'left-[22px]' : 'left-0.5'}`}
              />
            </button>
          </div>
        </div>
      </section>
      {toast}
    </Screen>
  )
}
