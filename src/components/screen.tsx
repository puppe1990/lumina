import type { ReactNode } from 'react'

import { BottomNav } from './bottom-nav'
import type { NavKey } from './bottom-nav'

export function Screen({
  children,
  nav,
  className = '',
}: {
  children: ReactNode
  nav?: NavKey
  className?: string
}) {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[430px] flex-col bg-surface shadow-[0_0_60px_rgba(15,23,42,0.08)]">
      <main
        className={`flex flex-1 flex-col ${nav ? 'pb-20' : ''} ${className}`}
      >
        {children}
      </main>
      {nav ? <BottomNav active={nav} /> : null}
    </div>
  )
}
