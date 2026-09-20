import { deleteCookie, getCookie, setCookie } from '@tanstack/react-start/server'

import { SESSION_COOKIE } from '#/domain/auth/service'

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365

export function readSessionToken(): string | undefined {
  return getCookie(SESSION_COOKIE)
}

export function writeSessionCookie(token: string, expiresAt: number): void {
  setCookie(SESSION_COOKIE, token, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: Math.max(0, Math.floor((expiresAt - Date.now()) / 1000)) || ONE_YEAR_SECONDS,
  })
}

export function clearSessionCookie(): void {
  deleteCookie(SESSION_COOKIE, { path: '/' })
}
