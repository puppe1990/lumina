export const SORT_VALUES = ['rating', 'popular', 'recent', 'quickest'] as const

export type BookSort = (typeof SORT_VALUES)[number]

export const TIME_VALUES = ['curto', 'medio', 'longo'] as const

export type BookTime = (typeof TIME_VALUES)[number]

export const DEFAULT_SORT: BookSort = 'rating'

// min é exclusivo e max é inclusivo (ver searchBooks no domínio).
export const TIME_RANGES: Record<BookTime, { min?: number; max?: number }> = {
  curto: { max: 10 },
  medio: { min: 10, max: 15 },
  longo: { min: 15 },
}

export const RATING_VALUES = [4, 4.5] as const

export const SORT_OPTIONS: { value: BookSort; label: string; icon: string }[] =
  [
    { value: 'rating', label: 'Melhor avaliados', icon: 'star' },
    { value: 'popular', label: 'Mais lidos', icon: 'local_fire_department' },
    { value: 'recent', label: 'Mais recentes', icon: 'new_releases' },
    { value: 'quickest', label: 'Mais rápidos', icon: 'bolt' },
  ]

export const RATING_OPTIONS: { value?: number; label: string }[] = [
  { value: undefined, label: 'Todas' },
  { value: 4, label: '4.0+' },
  { value: 4.5, label: '4.5+' },
]

export const TIME_OPTIONS: { value?: BookTime; label: string }[] = [
  { value: undefined, label: 'Qualquer' },
  { value: 'curto', label: 'Até 10 min' },
  { value: 'medio', label: '10–15 min' },
  { value: 'longo', label: '15+ min' },
]

export function timeRange(time?: BookTime): { min?: number; max?: number } {
  return time ? TIME_RANGES[time] : {}
}
