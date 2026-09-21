export const OFFLINE_CACHE = 'lumina-offline-v2'

const META_KEY = 'lumina:downloads'

export type OfflineDownload = {
  id: string
  slug: string
  title: string
  author: string
  coverColor: string
  coverUrl?: string | null
  savedAt: number
}

export type DownloadableBook = Omit<OfflineDownload, 'savedAt'>

export function offlineSupported(): boolean {
  return typeof window !== 'undefined' && 'caches' in window
}

export function readerUrl(id: string): string {
  return `/reader/${id}`
}

export function listDownloads(): OfflineDownload[] {
  if (typeof window === 'undefined') {
    return []
  }
  try {
    const raw = localStorage.getItem(META_KEY)
    if (!raw) {
      return []
    }
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as OfflineDownload[]) : []
  } catch {
    return []
  }
}

export function isDownloaded(id: string): boolean {
  return listDownloads().some((item) => item.id === id)
}

function writeMeta(items: OfflineDownload[]): void {
  try {
    localStorage.setItem(META_KEY, JSON.stringify(items))
  } catch {
    // storage indisponível: cache ainda funciona na sessão
  }
}

/**
 * Carrega a rota num iframe oculto para o service worker cachear o chunk
 * lazy da página (o import dinâmico não aparece no HTML do SSR).
 */
function warmRoute(url: string): Promise<void> {
  return new Promise((resolve) => {
    const iframe = document.createElement('iframe')
    iframe.setAttribute('aria-hidden', 'true')
    iframe.tabIndex = -1
    iframe.style.cssText =
      'position:absolute;width:1px;height:1px;opacity:0;pointer-events:none;border:0'

    let done = false
    const finish = () => {
      if (done) {
        return
      }
      done = true
      iframe.remove()
      resolve()
    }

    iframe.onload = () => window.setTimeout(finish, 1500)
    iframe.src = url
    document.body.appendChild(iframe)
    window.setTimeout(finish, 8000)
  })
}

/** Guarda o HTML do leitor e seus assets para leitura sem internet. */
export async function downloadBook(book: DownloadableBook): Promise<void> {
  if (!offlineSupported()) {
    throw new Error('Seu navegador não suporta leitura offline.')
  }

  const cache = await caches.open(OFFLINE_CACHE)
  const url = readerUrl(book.id)
  const response = await fetch(url, { credentials: 'include' })
  if (!response.ok) {
    throw new Error('Não foi possível baixar este resumo.')
  }

  const html = await response.clone().text()
  await cache.put(url, response.clone())

  const doc = new DOMParser().parseFromString(html, 'text/html')
  const assets = [
    ...doc.querySelectorAll('script[src], link[rel="stylesheet"]'),
  ]
    .map((el) => el.getAttribute('src') ?? el.getAttribute('href'))
    .filter((value): value is string => Boolean(value))

  await Promise.allSettled(assets.map((asset) => cache.add(asset)))
  if (book.coverUrl) {
    await Promise.allSettled([cache.add(book.coverUrl)])
  }

  // Aquece o chunk lazy da rota do leitor para funcionar offline.
  await warmRoute(url)

  const next: OfflineDownload[] = [
    { ...book, savedAt: Date.now() },
    ...listDownloads().filter((item) => item.id !== book.id),
  ]
  writeMeta(next)
}

export async function removeDownload(id: string): Promise<void> {
  if (!offlineSupported()) {
    return
  }
  const cache = await caches.open(OFFLINE_CACHE)
  await cache.delete(readerUrl(id))
  writeMeta(listDownloads().filter((item) => item.id !== id))
}

export async function clearDownloads(): Promise<void> {
  if (!offlineSupported()) {
    return
  }
  await caches.delete(OFFLINE_CACHE)
  try {
    localStorage.removeItem(META_KEY)
  } catch {
    // ignora
  }
}
