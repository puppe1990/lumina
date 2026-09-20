import { useEffect, useRef, useState } from 'react'

import { Icon } from './icon'

export function useToast() {
  const [message, setMessage] = useState<string | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => () => clearTimeout(timer.current), [])

  function show(next: string) {
    setMessage(next)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setMessage(null), 2800)
  }

  const toast = (
    <div
      aria-live="polite"
      className={`pointer-events-none fixed bottom-24 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-2 rounded-full bg-tertiary px-4 py-2.5 text-[13px] font-semibold text-on-tertiary shadow-xl transition-opacity duration-300 ${
        message ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <Icon
        name="check_circle"
        filled
        className="text-[18px] text-secondary-container"
      />
      <span className="whitespace-nowrap">{message}</span>
    </div>
  )

  return { show, toast }
}
