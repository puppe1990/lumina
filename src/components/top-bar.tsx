import { Link } from '@tanstack/react-router'
import type { ReactNode } from 'react'

import { Icon } from './icon'

export function TopBar({
  title,
  subtitle,
  backTo,
  right,
  onBack,
}: {
  title?: string
  subtitle?: string
  backTo?: string
  right?: ReactNode
  onBack?: () => void
}) {
  return (
    <header className="pt-safe sticky top-0 z-40 border-b border-black/[0.04] bg-surface/85 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-5">
        <div className="flex min-w-0 items-center gap-2">
          {backTo ? (
            <Link
              to={backTo}
              className="-ml-2 flex h-11 w-11 items-center justify-center rounded-full text-on-surface transition-colors hover:bg-surface-container active:scale-95"
              aria-label="Voltar"
            >
              <Icon name="arrow_back" className="text-[22px]" />
            </Link>
          ) : onBack ? (
            <button
              type="button"
              onClick={onBack}
              className="-ml-2 flex h-11 w-11 items-center justify-center rounded-full text-on-surface transition-colors hover:bg-surface-container active:scale-95"
              aria-label="Voltar"
            >
              <Icon name="arrow_back" className="text-[22px]" />
            </button>
          ) : null}
          <div className="min-w-0">
            {title ? (
              <p className="font-serif text-[19px] leading-tight font-semibold text-primary">
                {title}
              </p>
            ) : null}
            {subtitle ? (
              <p className="truncate text-[11px] tracking-wide text-on-surface-variant uppercase">
                {subtitle}
              </p>
            ) : null}
          </div>
        </div>
        {right}
      </div>
    </header>
  )
}
