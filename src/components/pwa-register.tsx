import { useEffect, useState } from 'react'

import { Icon } from './icon'

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

const DISMISS_KEY = 'lumina:install-dismissed'

export function PwaRegister() {
  const [installEvent, setInstallEvent] =
    useState<BeforeInstallPromptEvent | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!('serviceWorker' in navigator) || !import.meta.env.PROD) {
      return
    }
    const register = () => {
      navigator.serviceWorker.register('/sw.js').catch((error: unknown) => {
        console.error('[pwa] falha ao registrar o service worker', error)
      })
    }
    if (document.readyState === 'complete') {
      register()
      return
    }
    window.addEventListener('load', register, { once: true })
    return () => window.removeEventListener('load', register)
  }, [])

  useEffect(() => {
    const onPrompt = (event: Event) => {
      event.preventDefault()
      if (window.localStorage.getItem(DISMISS_KEY) === '1') {
        return
      }
      setInstallEvent(event as BeforeInstallPromptEvent)
      setVisible(true)
    }
    window.addEventListener('beforeinstallprompt', onPrompt)
    return () => window.removeEventListener('beforeinstallprompt', onPrompt)
  }, [])

  async function handleInstall() {
    if (!installEvent) {
      return
    }
    await installEvent.prompt()
    const choice = await installEvent.userChoice
    if (choice.outcome === 'accepted') {
      setVisible(false)
    }
    setInstallEvent(null)
  }

  function handleDismiss() {
    window.localStorage.setItem(DISMISS_KEY, '1')
    setVisible(false)
  }

  if (!visible) {
    return null
  }

  return (
    <div className="fixed bottom-20 left-1/2 z-[70] flex w-[calc(100%-2.5rem)] max-w-[390px] -translate-x-1/2 items-center gap-3 rounded-2xl border border-black/5 bg-surface-container-lowest p-3 shadow-[0_24px_48px_-12px_rgba(15,23,42,0.18)]">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-container">
        <Icon
          name="auto_stories"
          filled
          className="text-[22px] text-secondary-container"
        />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-semibold text-on-surface">
          Instalar o Lúmina
        </p>
        <p className="truncate text-[11px] text-on-surface-variant">
          Acesso rápido e resumos offline na tela inicial.
        </p>
      </div>
      <button
        type="button"
        onClick={handleDismiss}
        aria-label="Agora não"
        className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-on-surface-variant active:scale-95"
      >
        <Icon name="close" className="text-[18px]" />
      </button>
      <button
        type="button"
        onClick={handleInstall}
        className="shrink-0 rounded-full bg-primary px-3.5 py-2 text-[12px] font-semibold text-on-primary active:scale-95"
      >
        Instalar
      </button>
    </div>
  )
}
