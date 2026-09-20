const PRODUCTION_URL = 'https://lumina.apps.gestaobem.com'
const DEVELOPMENT_URL = 'http://localhost:3000'

const rawUrl =
  import.meta.env.VITE_APP_URL ??
  (import.meta.env.PROD ? PRODUCTION_URL : DEVELOPMENT_URL)

export const SITE_URL = String(rawUrl).replace(/\/$/, '')
export const SITE_NAME = 'Lúmina'
export const SITE_TITLE = 'Lúmina — Resuma os maiores livros em 15 minutos'
export const SITE_DESCRIPTION =
  'Resumos em áudio e texto dos maiores livros de negócios, liderança, psicologia e desenvolvimento pessoal. Sabedoria condensada em 15 minutos por dia.'
export const OG_IMAGE = `${SITE_URL}/og.png`
export const OG_IMAGE_ALT =
  'Lúmina — os maiores livros do mundo em 15 minutos, com capas de Hábitos Atômicos, Rápido e Devagar e Psicologia Financeira.'
