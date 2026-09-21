const VERSION = 'v2'
const SHELL_CACHE = `lumina-shell-${VERSION}`
const RUNTIME_CACHE = `lumina-runtime-${VERSION}`
const OFFLINE_CACHE = `lumina-offline-${VERSION}`
const OFFLINE_URL = '/offline.html'

const PRECACHE = [
  OFFLINE_URL,
  '/manifest.webmanifest',
  '/favicon.svg',
  '/apple-touch-icon.png',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/icon-maskable-512.png',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(SHELL_CACHE)
      await cache.addAll(PRECACHE)
      await self.skipWaiting()
    })(),
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keep = [SHELL_CACHE, RUNTIME_CACHE, OFFLINE_CACHE]
      const keys = await caches.keys()
      await Promise.all(
        keys
          .filter((key) => !keep.includes(key))
          .map((key) => caches.delete(key)),
      )
      await self.clients.claim()
    })(),
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event

  if (request.method !== 'GET') {
    return
  }

  const url = new URL(request.url)
  if (url.origin !== self.location.origin) {
    return
  }

  if (request.mode === 'navigate') {
    if (url.pathname.startsWith('/reader/')) {
      event.respondWith(offlineFirstReader(request))
      return
    }
    event.respondWith(networkFirstNavigation(request))
    return
  }

  if (isCacheableAsset(url.pathname)) {
    event.respondWith(staleWhileRevalidate(request))
  }
})

async function offlineFirstReader(request) {
  const cache = await caches.open(OFFLINE_CACHE)
  const cached = await cache.match(request)

  const network = fetch(request)
    .then((response) => {
      if (response.ok) {
        cache.put(request, response.clone())
      }
      return response
    })
    .catch(() => undefined)

  if (cached) {
    return cached
  }

  const fresh = await network
  if (fresh) {
    return fresh
  }

  const runtime = await caches.match(request)
  if (runtime) {
    return runtime
  }

  const offline = await caches.match(OFFLINE_URL)
  return offline ?? Response.error()
}

async function networkFirstNavigation(request) {
  try {
    const response = await fetch(request)
    const cache = await caches.open(RUNTIME_CACHE)
    cache.put(request, response.clone())
    return response
  } catch {
    const cached = await caches.match(request)
    if (cached) {
      return cached
    }
    const offline = await caches.match(OFFLINE_URL)
    return offline ?? Response.error()
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(RUNTIME_CACHE)
  const cached = await cache.match(request)

  const network = fetch(request)
    .then((response) => {
      if (response.ok) {
        cache.put(request, response.clone())
      }
      return response
    })
    .catch(() => undefined)

  return cached ?? (await network) ?? Response.error()
}

function isCacheableAsset(pathname) {
  return (
    pathname.startsWith('/assets/') ||
    pathname.startsWith('/icons/') ||
    pathname.startsWith('/covers/') ||
    /\.(?:png|svg|jpe?g|webp|ico|woff2?|css|js|webmanifest)$/.test(pathname)
  )
}
