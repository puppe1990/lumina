import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'

import { NavigationProgress } from '../components/navigation-progress'
import { PwaRegister } from '../components/pwa-register'
import {
  OG_IMAGE,
  OG_IMAGE_ALT,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
} from '../lib/site'
import appCss from '../styles.css?url'
import { getCurrentUser } from '../server/auth'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1.0, maximum-scale=1.0, viewport-fit=cover',
      },
      { title: SITE_TITLE },
      { name: 'description', content: SITE_DESCRIPTION },
      { name: 'theme-color', content: '#064e3b' },
      { name: 'application-name', content: SITE_NAME },
      { name: 'mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
      { name: 'apple-mobile-web-app-title', content: SITE_NAME },

      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: SITE_NAME },
      { property: 'og:locale', content: 'pt_BR' },
      { property: 'og:url', content: `${SITE_URL}/` },
      { property: 'og:title', content: SITE_TITLE },
      { property: 'og:description', content: SITE_DESCRIPTION },
      { property: 'og:image', content: OG_IMAGE },
      { property: 'og:image:type', content: 'image/png' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: OG_IMAGE_ALT },

      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: SITE_TITLE },
      { name: 'twitter:description', content: SITE_DESCRIPTION },
      { name: 'twitter:image', content: OG_IMAGE },
      { name: 'twitter:image:alt', content: OG_IMAGE_ALT },
    ],
    links: [
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        href: '/icons/icon-192.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      { rel: 'manifest', href: '/manifest.webmanifest' },
      { rel: 'canonical', href: `${SITE_URL}/` },
      { rel: 'stylesheet', href: appCss },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400..700;1,6..72,400..700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap',
      },
    ],
  }),
  beforeLoad: async () => ({
    user: await getCurrentUser(),
  }),
  shellComponent: RootDocument,
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <NavigationProgress />
      <Outlet />
    </>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <PwaRegister />
        <Scripts />
      </body>
    </html>
  )
}
