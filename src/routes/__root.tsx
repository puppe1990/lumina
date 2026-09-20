import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'

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
      { title: 'Lúmina — Resuma os maiores livros em 15 minutos' },
      {
        name: 'description',
        content:
          'Resumos em áudio e texto dos maiores livros de negócios, liderança e desenvolvimento pessoal. Sabedoria condensada em 15 minutos por dia.',
      },
      { name: 'theme-color', content: '#064e3b' },
    ],
    links: [
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
  return <Outlet />
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
