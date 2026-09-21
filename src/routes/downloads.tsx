import { createFileRoute, Link, redirect } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

import { BookCover } from '#/components/book-cover'
import { Icon } from '#/components/icon'
import { Screen } from '#/components/screen'
import { useToast } from '#/components/toast'
import {
  clearDownloads,
  downloadBook,
  listDownloads,
  offlineSupported,
  removeDownload,
} from '#/lib/offline'
import type { OfflineDownload } from '#/lib/offline'
import { getDownloadableBooks } from '#/server/catalog'

export const Route = createFileRoute('/downloads')({
  beforeLoad: ({ context }) => {
    if (!context.user) {
      throw redirect({ to: '/login' })
    }
  },
  loader: async () => getDownloadableBooks(),
  component: DownloadsPage,
})

function DownloadsPage() {
  const { books } = Route.useLoaderData()
  const { show, toast } = useToast()
  const [downloads, setDownloads] = useState<OfflineDownload[]>([])
  const [busy, setBusy] = useState<string | null>(null)
  const [supported, setSupported] = useState(true)

  useEffect(() => {
    setSupported(offlineSupported())
    setDownloads(listDownloads())
  }, [])

  const downloadedIds = new Set(downloads.map((item) => item.id))

  async function handleDownload(book: (typeof books)[number]) {
    setBusy(book.id)
    try {
      await downloadBook({
        id: book.id,
        slug: book.slug,
        title: book.title,
        author: book.author,
        coverColor: book.coverColor,
        coverUrl: book.coverUrl,
      })
      setDownloads(listDownloads())
      show(`“${book.title}” disponível offline`)
    } catch (error) {
      show(
        error instanceof Error ? error.message : 'Falha ao baixar este resumo.',
      )
    } finally {
      setBusy(null)
    }
  }

  async function handleRemove(book: (typeof books)[number]) {
    setBusy(book.id)
    try {
      await removeDownload(book.id)
      setDownloads(listDownloads())
      show(`“${book.title}” removido dos downloads`)
    } finally {
      setBusy(null)
    }
  }

  async function handleClear() {
    await clearDownloads()
    setDownloads([])
    show('Downloads removidos')
  }

  return (
    <Screen nav="biblioteca">
      <header className="pt-safe sticky top-0 z-40 bg-surface/85 px-5 py-3 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <Link
            to="/library"
            aria-label="Voltar"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-surface-container text-on-surface active:scale-95"
          >
            <Icon name="arrow_back" className="text-[20px]" />
          </Link>
          <div className="min-w-0 flex-1">
            <h1 className="font-serif text-[20px] font-semibold text-primary">
              Downloads Offline
            </h1>
            <p className="text-[12px] text-on-surface-variant">
              {downloads.length} de {books.length} resumos baixados
            </p>
          </div>
          {downloads.length > 0 ? (
            <button
              type="button"
              onClick={handleClear}
              className="shrink-0 text-[12px] font-semibold text-primary"
            >
              Limpar
            </button>
          ) : null}
        </div>
      </header>

      <section className="px-5 pt-3 pb-2">
        <div className="flex items-start gap-3 rounded-xl bg-primary-fixed/40 p-4">
          <Icon name="cloud_off" className="text-[20px] text-primary" />
          <p className="text-[13px] leading-relaxed text-on-surface-variant">
            Baixe um resumo para lê-lo sem internet. O texto e as capas ficam
            salvos neste dispositivo.
          </p>
        </div>
      </section>

      {!supported ? (
        <p className="px-5 py-8 text-center text-[14px] text-on-surface-variant">
          Seu navegador não suporta leitura offline.
        </p>
      ) : (
        <section className="flex flex-col gap-3 px-5 pt-2 pb-6">
          {books.map((book) => {
            const downloaded = downloadedIds.has(book.id)
            const loading = busy === book.id
            return (
              <div
                key={book.id}
                className="flex items-center gap-3 rounded-xl bg-surface-container-lowest p-3 shadow-sm"
              >
                <Link
                  to="/reader/$bookId"
                  params={{ bookId: book.id }}
                  className="flex min-w-0 flex-1 items-center gap-3 active:scale-[0.99]"
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
                      {book.author} · {book.readingMinutes} min
                    </p>
                  </div>
                </Link>
                <button
                  type="button"
                  disabled={loading}
                  onClick={() =>
                    downloaded ? handleRemove(book) : handleDownload(book)
                  }
                  aria-label={
                    downloaded
                      ? `Remover ${book.title} dos downloads`
                      : `Baixar ${book.title}`
                  }
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-full active:scale-95 disabled:opacity-60 ${
                    downloaded
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-container-high text-on-surface'
                  }`}
                >
                  <Icon
                    name={
                      loading
                        ? 'progress_activity'
                        : downloaded
                          ? 'download_done'
                          : 'download'
                    }
                    className={`text-[20px] ${loading ? 'animate-spin' : ''}`}
                  />
                </button>
              </div>
            )
          })}
        </section>
      )}
      {toast}
    </Screen>
  )
}
