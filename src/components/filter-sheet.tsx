import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import {
  DEFAULT_SORT,
  RATING_OPTIONS,
  SORT_OPTIONS,
  TIME_OPTIONS,
} from '#/lib/filters'
import type { BookSort, BookTime } from '#/lib/filters'

import { Icon } from './icon'

export type AdvancedFilters = {
  rating?: number
  time?: BookTime
  sort?: BookSort
}

function Chip({
  active,
  onClick,
  icon,
  children,
}: {
  active: boolean
  onClick: () => void
  icon?: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-semibold whitespace-nowrap transition-all active:scale-95 ${
        active
          ? 'bg-primary text-on-primary shadow-sm'
          : 'bg-surface-container-low text-on-surface-variant'
      }`}
    >
      {icon ? <Icon name={icon} className="text-[15px]" /> : null}
      {children}
    </button>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col gap-2.5">
      <h4 className="text-[11px] font-bold tracking-wider text-secondary uppercase">
        {title}
      </h4>
      <div className="flex flex-wrap gap-2">{children}</div>
    </section>
  )
}

export function FilterSheet({
  open,
  value,
  onClose,
  onApply,
  onClear,
}: {
  open: boolean
  value: AdvancedFilters
  onClose: () => void
  onApply: (next: AdvancedFilters) => void
  onClear: () => void
}) {
  const [rating, setRating] = useState<number | undefined>(value.rating)
  const [time, setTime] = useState<BookTime | undefined>(value.time)
  const [sort, setSort] = useState<BookSort>(value.sort ?? DEFAULT_SORT)

  useEffect(() => {
    if (open) {
      setRating(value.rating)
      setTime(value.time)
      setSort(value.sort ?? DEFAULT_SORT)
    }
  }, [open, value.rating, value.time, value.sort])

  useEffect(() => {
    if (!open) {
      return
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) {
    return null
  }

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Filtros avançados"
      className="fixed inset-0 z-[80] flex items-end justify-center"
    >
      <button
        type="button"
        aria-label="Fechar filtros"
        onClick={onClose}
        className="absolute inset-0 bg-inverse-surface/40 backdrop-blur-[2px]"
      />
      <div className="animate-route-spinner relative w-full max-w-[430px] rounded-t-3xl bg-surface-container-lowest p-5 pb-8 shadow-level-3">
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-outline-variant" />
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h3 className="font-serif text-[20px] font-semibold text-primary">
              Filtros avançados
            </h3>
            <p className="text-[13px] text-on-surface-variant">
              Refine os resumos do seu jeito
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="grid h-9 w-9 place-items-center rounded-full bg-surface-container text-on-surface-variant active:scale-95"
          >
            <Icon name="close" className="text-[20px]" />
          </button>
        </div>

        <div className="flex flex-col gap-5">
          <Section title="Avaliação">
            {RATING_OPTIONS.map((option) => (
              <Chip
                key={option.label}
                icon={option.value ? 'star' : undefined}
                active={rating === option.value}
                onClick={() => setRating(option.value)}
              >
                {option.label}
              </Chip>
            ))}
          </Section>

          <Section title="Tempo de leitura">
            {TIME_OPTIONS.map((option) => (
              <Chip
                key={option.label}
                icon={option.value ? 'schedule' : undefined}
                active={time === option.value}
                onClick={() => setTime(option.value)}
              >
                {option.label}
              </Chip>
            ))}
          </Section>

          <Section title="Ordenar por">
            {SORT_OPTIONS.map((option) => (
              <Chip
                key={option.value}
                icon={option.icon}
                active={sort === option.value}
                onClick={() => setSort(option.value)}
              >
                {option.label}
              </Chip>
            ))}
          </Section>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setRating(undefined)
              setTime(undefined)
              setSort(DEFAULT_SORT)
              onClear()
            }}
            className="rounded-full px-4 py-3 text-[13px] font-semibold text-on-surface-variant active:scale-95"
          >
            Limpar filtros
          </button>
          <button
            type="button"
            onClick={() => onApply({ rating, time, sort })}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-primary py-3 text-[14px] font-semibold text-on-primary shadow-md active:scale-95"
          >
            <Icon name="filter_list" className="text-[18px]" />
            Aplicar filtros
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
