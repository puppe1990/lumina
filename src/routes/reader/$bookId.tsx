import { createFileRoute, redirect, useRouter } from '@tanstack/react-router'
import { useEffect, useMemo, useRef, useState } from 'react'

import { BookCover } from '#/components/book-cover'
import { Icon } from '#/components/icon'
import { Screen } from '#/components/screen'
import { useToast } from '#/components/toast'
import { formatDuration } from '#/lib/text'
import {
  addHighlightAction,
  completeBookAction,
  removeBookAction,
  saveBookAction,
  updateProgressAction,
} from '#/server/library'
import { getBookDetailData } from '#/server/catalog'

export const Route = createFileRoute('/reader/$bookId')({
  beforeLoad: ({ context }) => {
    if (!context.user) {
      throw redirect({ to: '/login' })
    }
  },
  loader: async ({ params }) =>
    getBookDetailData({ data: { idOrSlug: params.bookId } }),
  component: ReaderPage,
})

const SPEEDS = ['1.0x', '1.2x', '1.5x', '2.0x']
const FONT_SCALES = [
  { label: '100%', size: 16 },
  { label: '115%', size: 18 },
  { label: '130%', size: 20 },
]

function ReaderPage() {
  const { book, entry } = Route.useLoaderData()
  const router = useRouter()
  const { show, toast } = useToast()

  const totalSeconds = book.audioMinutes * 60
  const [position, setPosition] = useState(entry?.lastPositionSeconds ?? 0)
  const [playing, setPlaying] = useState(false)
  const [speedIndex, setSpeedIndex] = useState(1)
  const [tab, setTab] = useState<'summary' | 'insights'>('summary')
  const [fontIndex, setFontIndex] = useState(0)
  const [saved, setSaved] = useState(Boolean(entry))
  const [completed, setCompleted] = useState(entry?.status === 'completed')
  const [chapter, setChapter] = useState(entry?.lastChapterPosition ?? 1)

  const lastPersisted = useRef(position)

  const progressPercent =
    totalSeconds > 0 ? Math.min(100, (position / totalSeconds) * 100) : 0

  useEffect(() => {
    if (!playing) {
      return
    }
    const timer = setInterval(() => {
      setPosition((value) => {
        const next = value + 1
        if (next >= totalSeconds) {
          setPlaying(false)
          return totalSeconds
        }
        return next
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [playing, totalSeconds])

  useEffect(() => {
    if (Math.abs(position - lastPersisted.current) < 15 && position !== 0) {
      return
    }
    lastPersisted.current = position
    void updateProgressAction({
      data: {
        bookId: book.id,
        progressPercent: totalSeconds ? (position / totalSeconds) * 100 : 0,
        lastPositionSeconds: position,
        lastChapterPosition: chapter,
      },
    })
  }, [position, book.id, chapter, totalSeconds])

  const quotesByChapter = useMemo(() => {
    const map = new Map<number, typeof book.quotes>()
    for (const quote of book.quotes) {
      const key = quote.chapterPosition ?? 1
      map.set(key, [...(map.get(key) ?? []), quote])
    }
    return map
  }, [book.quotes])

  async function toggleSaved() {
    const result = saved
      ? await removeBookAction({ data: { bookId: book.id } })
      : await saveBookAction({ data: { bookId: book.id } })
    if (!result.ok) {
      show(result.error.message)
      return
    }
    setSaved(!saved)
    show(saved ? 'Removido da biblioteca' : 'Salvo na sua biblioteca')
    await router.invalidate()
  }

  async function handleComplete() {
    const result = await completeBookAction({ data: { bookId: book.id } })
    if (!result.ok) {
      show(result.error.message)
      return
    }
    setCompleted(true)
    setPosition(totalSeconds)
    show('Resumo concluído! Excelente ritmo.')
    await router.invalidate()
  }

  async function saveHighlight() {
    if (book.quotes.length === 0) {
      show('Nenhuma citação disponível neste resumo')
      return
    }
    const quote = book.quotes[0]
    const result = await addHighlightAction({
      data: { bookId: book.id, text: quote.text },
    })
    if (!result.ok) {
      show(result.error.message)
      return
    }
    show('Citação salva nas suas ideias')
    await router.invalidate()
  }

  const activeFont = FONT_SCALES[fontIndex]

  return (
    <Screen nav="leitor">
      <div className="flex items-center justify-between px-5 pt-6 pb-4 text-on-surface-variant">
        <button
          type="button"
          onClick={() => router.history.back()}
          aria-label="Voltar"
          className="grid h-10 w-10 place-items-center rounded-full bg-surface-container transition-transform active:scale-95"
        >
          <Icon name="arrow_back" className="text-[20px]" />
        </button>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={toggleSaved}
            aria-label={
              saved ? 'Remover da biblioteca' : 'Salvar na biblioteca'
            }
            className={`grid h-10 w-10 place-items-center rounded-full transition-all active:scale-95 ${
              saved
                ? 'bg-secondary-fixed text-secondary'
                : 'bg-surface-container text-on-surface-variant'
            }`}
          >
            <Icon name="bookmark" filled={saved} className="text-[20px]" />
          </button>
          <button
            type="button"
            onClick={() => show('Link de compartilhamento copiado!')}
            aria-label="Compartilhar"
            className="grid h-10 w-10 place-items-center rounded-full bg-surface-container text-on-surface-variant active:scale-95"
          >
            <Icon name="ios_share" className="text-[20px]" />
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 px-5 pb-4 sm:flex-row sm:items-start">
        <BookCover
          title={book.title}
          author={book.author}
          color={book.coverColor}
          coverUrl={book.coverUrl}
          className="aspect-[2/3] w-36 shrink-0 rounded-xl shadow-[0_12px_32px_rgba(0,53,39,0.18)]"
        />
        <div className="flex flex-1 flex-col items-center gap-1 text-center sm:items-start sm:text-left">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
            <span className="rounded-full bg-surface-container-high px-2.5 py-0.5 text-[10px] tracking-wide text-on-surface-variant">
              {book.category.name}
            </span>
            <span className="h-1 w-1 rounded-full bg-outline-variant" />
            <span className="flex items-center gap-1 text-[10px] font-bold text-secondary">
              <Icon name="headphones" className="text-[14px]" />{' '}
              {book.audioMinutes} min
            </span>
            <span className="h-1 w-1 rounded-full bg-outline-variant" />
            <span className="flex items-center gap-1 text-[10px] text-on-surface-variant">
              <Icon name="auto_stories" className="text-[14px]" />{' '}
              {book.readingMinutes} min
            </span>
          </div>
          <h1 className="font-serif mt-1 text-[26px] leading-tight font-semibold tracking-tight text-primary">
            {book.title}
          </h1>
          <p className="max-w-sm text-[13px] text-on-surface-variant">
            {book.tagline}
          </p>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-[12px] font-semibold text-on-surface">
              {book.author}
            </span>
            <span className="h-1 w-1 rounded-full bg-outline-variant" />
            <span className="flex items-center text-secondary">
              <Icon name="star" filled className="text-[16px]" />
              <span className="ml-0.5 text-[10px] font-bold text-on-surface">
                {book.rating.toFixed(1)}
              </span>
              <span className="ml-1 text-[10px] text-on-surface-variant">
                ({(book.ratingsCount / 1000).toFixed(1)}k)
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="mb-4 px-5">
        <div className="flex flex-col gap-4 rounded-2xl bg-surface-container-lowest p-4 shadow-[0_4px_24px_-2px_rgba(15,23,42,0.06)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 animate-pulse rounded-full bg-secondary-container" />
              <span className="text-[10px] font-bold tracking-wider text-primary uppercase">
                Narração Curada
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-on-surface-variant">
              <Icon name="graphic_eq" className="text-[18px]" />
              <span className="text-[10px]">Voz Humana HD</span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <input
              type="range"
              min={0}
              max={totalSeconds}
              value={position}
              onChange={(event) => setPosition(Number(event.target.value))}
              aria-label="Progresso do áudio"
              className="h-1.5 w-full cursor-pointer appearance-none rounded-full accent-secondary-container"
              style={{
                background: `linear-gradient(to right, var(--color-secondary-container) ${progressPercent}%, var(--color-surface-container-high) ${progressPercent}%)`,
              }}
            />
            <div className="flex items-center justify-between text-[10px] text-on-surface-variant">
              <span>{formatDuration(position)}</span>
              <span className="text-outline">
                {formatDuration(totalSeconds)}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <button
              type="button"
              onClick={() =>
                setSpeedIndex((index) => (index + 1) % SPEEDS.length)
              }
              className="rounded-full bg-surface-container px-2.5 py-1 text-[12px] font-semibold text-on-surface active:scale-95"
            >
              {SPEEDS[speedIndex]}
            </button>
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Voltar 15 segundos"
                onClick={() => setPosition((value) => Math.max(0, value - 15))}
                className="grid h-10 w-10 place-items-center rounded-full text-on-surface-variant active:scale-90"
              >
                <Icon name="replay" className="text-[24px]" />
              </button>
              <button
                type="button"
                aria-label={playing ? 'Pausar áudio' : 'Reproduzir áudio'}
                onClick={() => setPlaying((value) => !value)}
                className="grid h-14 w-14 place-items-center rounded-full bg-primary-container text-on-primary shadow-[0_8px_20px_rgba(6,78,59,0.3)] active:scale-95"
              >
                <Icon
                  name={playing ? 'pause' : 'play_arrow'}
                  filled
                  className="text-[32px] text-secondary-container"
                />
              </button>
              <button
                type="button"
                aria-label="Avançar 15 segundos"
                onClick={() =>
                  setPosition((value) => Math.min(totalSeconds, value + 15))
                }
                className="grid h-10 w-10 place-items-center rounded-full text-on-surface-variant active:scale-90"
              >
                <Icon name="forward_media" className="text-[24px]" />
              </button>
            </div>
            <button
              type="button"
              aria-label="Marcar momento"
              onClick={() => show('Momento marcado neste resumo')}
              className="grid h-9 w-9 place-items-center rounded-full bg-surface-container text-on-surface-variant active:scale-95"
            >
              <Icon name="add_circle_outline" className="text-[20px]" />
            </button>
          </div>
        </div>
      </div>

      <div className="mb-3 px-5">
        <div className="flex gap-1 rounded-full bg-surface-container p-1">
          <button
            type="button"
            onClick={() => setTab('summary')}
            className={`flex-1 rounded-full px-3 py-2 text-center text-[12px] font-semibold transition-all ${
              tab === 'summary'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-on-surface-variant'
            }`}
          >
            Resumo Editorial
          </button>
          <button
            type="button"
            onClick={() => setTab('insights')}
            className={`flex-1 rounded-full px-3 py-2 text-center text-[12px] font-semibold transition-all ${
              tab === 'insights'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-on-surface-variant'
            }`}
          >
            Ideias-Chave ({book.insights.length})
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-5 px-5">
        {tab === 'insights' ? (
          <div className="relative overflow-hidden rounded-2xl bg-surface-container-low p-4 shadow-sm">
            <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-secondary-container" />
            <div className="mb-3 flex items-center justify-between pl-2">
              <div className="flex items-center gap-1.5 text-secondary">
                <Icon name="bolt" className="text-[18px]" />
                <span className="text-[10px] font-bold tracking-wider uppercase">
                  Ideias Centrais em 1 Minuto
                </span>
              </div>
              <span className="rounded-full bg-secondary-fixed px-2 py-0.5 text-[10px] font-semibold text-on-secondary-fixed">
                Síntese VIP
              </span>
            </div>
            <div className="flex flex-col gap-3 pl-2">
              {book.insights.map((insight, index) => (
                <div key={insight.id} className="flex items-start gap-2.5">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-surface-container-highest text-[10px] font-bold text-primary">
                    {index + 1}
                  </span>
                  <p className="text-[13px] text-on-surface">
                    <strong>{insight.title}:</strong> {insight.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <article
            className="flex flex-col gap-4 text-on-surface"
            style={{ fontSize: activeFont.size }}
          >
            {book.chapters.map((item) => (
              <section key={item.id} className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => setChapter(item.position)}
                  className="flex items-center justify-between text-left"
                >
                  <span className="font-serif text-[20px] font-medium tracking-tight text-primary">
                    {item.title}
                  </span>
                  {chapter === item.position ? (
                    <Icon
                      name="check_circle"
                      filled
                      className="text-[20px] text-primary"
                    />
                  ) : null}
                </button>
                <p className="text-[15px] leading-relaxed text-on-surface/90">
                  {item.body}
                </p>
                {(quotesByChapter.get(item.position) ?? []).map((quote) => (
                  <div
                    key={quote.id}
                    className="relative overflow-hidden rounded-2xl bg-surface-container-lowest p-5 shadow-[0_4px_24px_rgba(0,0,0,0.03)]"
                  >
                    <span className="pointer-events-none absolute top-2 right-4 font-serif text-[64px] leading-none text-surface-container-high opacity-40 select-none">
                      “
                    </span>
                    <p className="font-serif relative z-10 text-[20px] leading-snug font-medium text-primary italic">
                      “{quote.text}”
                    </p>
                    <div className="relative z-10 mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="h-0.5 w-6 bg-secondary-container" />
                        <span className="text-[12px] font-bold text-secondary">
                          {quote.author}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          void navigator.clipboard.writeText(
                            `“${quote.text}” — ${quote.author}`,
                          )
                          show('Citação copiada!')
                        }}
                        className="flex items-center gap-1 text-[10px] text-on-surface-variant transition-colors hover:text-primary"
                      >
                        <Icon name="content_copy" className="text-[16px]" />
                        Copiar citação
                      </button>
                    </div>
                  </div>
                ))}
              </section>
            ))}
          </article>
        )}

        <div className="mb-8 flex flex-col items-center gap-3 rounded-2xl bg-surface-container-lowest p-5 text-center shadow-sm">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-secondary-fixed text-secondary">
            <Icon name="trophy" className="text-[28px]" />
          </span>
          <h3 className="font-serif text-[18px] font-semibold text-primary">
            {completed ? 'Síntese concluída!' : 'Concluiu esta síntese?'}
          </h3>
          <p className="max-w-xs text-[13px] text-on-surface-variant">
            Fixe o aprendizado marcando este resumo como lido ou salve uma
            citação nas suas ideias.
          </p>
          <button
            type="button"
            onClick={handleComplete}
            className={`flex w-full items-center justify-center gap-2 rounded-full py-3 text-[14px] font-semibold shadow-md transition-transform active:scale-95 ${
              completed
                ? 'bg-secondary-container text-on-secondary-fixed'
                : 'bg-primary-container text-on-primary'
            }`}
          >
            <Icon
              name={completed ? 'task_alt' : 'check_circle'}
              className="text-[20px]"
            />
            {completed ? 'Concluído com Sucesso!' : 'Marcar Concluído'}
          </button>
        </div>
      </div>

      <div className="pointer-events-none fixed bottom-20 left-1/2 z-40 flex -translate-x-1/2 items-center gap-4 rounded-full bg-inverse-surface/90 px-4 py-2 text-inverse-on-surface shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-md">
        <button
          type="button"
          onClick={() =>
            setFontIndex((index) => (index + 1) % FONT_SCALES.length)
          }
          className="pointer-events-auto flex items-center gap-1 text-[12px] font-semibold hover:text-secondary-fixed-dim"
        >
          <Icon name="format_size" className="text-[18px]" />
          {activeFont.label}
        </button>
        <span className="h-4 w-px bg-white/30" />
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="pointer-events-auto flex items-center gap-1 text-[12px] font-semibold hover:text-secondary-fixed-dim"
        >
          <Icon name="vertical_align_top" className="text-[18px]" />
          Topo
        </button>
        <span className="h-4 w-px bg-white/30" />
        <button
          type="button"
          onClick={saveHighlight}
          className="pointer-events-auto flex items-center gap-1 text-[12px] font-semibold hover:text-secondary-fixed-dim"
        >
          <Icon name="brush" className="text-[18px]" />
          Grifar
        </button>
      </div>
      {toast}
    </Screen>
  )
}
