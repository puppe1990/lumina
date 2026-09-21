import { useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'lumina:theme'

/** Executado antes do primeiro paint para evitar flash do tema claro. */
export const THEME_SCRIPT = `(function(){try{var s=localStorage.getItem('${STORAGE_KEY}');var d=s?s==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d){var r=document.documentElement;r.classList.add('dark');r.style.colorScheme='dark';}}catch(e){}})();`

export function readTheme(): Theme {
  if (typeof document === 'undefined') {
    return 'light'
  }
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

export function applyTheme(theme: Theme): void {
  if (typeof document === 'undefined') {
    return
  }
  const root = document.documentElement
  root.classList.toggle('dark', theme === 'dark')
  root.style.colorScheme = theme
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // storage indisponível
  }
}

export function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    setTheme(readTheme())
  }, [])

  const toggle = () => {
    const next: Theme = readTheme() === 'dark' ? 'light' : 'dark'
    applyTheme(next)
    setTheme(next)
  }

  return [theme, toggle]
}
