import { describe, expect, it } from 'vitest'

import {
  formatCurrencyBRL,
  formatDateBRL,
  formatDuration,
  normalizeForSearch,
  slugify,
} from '#/lib/text'

describe('normalizeForSearch', () => {
  it('removes accents and casing', () => {
    expect(normalizeForSearch('Hábitos Atômicos')).toBe('habitos atomicos')
  })
})

describe('slugify', () => {
  it('builds url-friendly slugs', () => {
    expect(slugify('Os 7 Hábitos das Pessoas Altamente Eficazes')).toBe(
      'os-7-habitos-das-pessoas-altamente-eficazes',
    )
  })
})

describe('formatCurrencyBRL', () => {
  it('formats cents as brazilian currency', () => {
    expect(formatCurrencyBRL(23880).replace(/\u00a0/g, ' ')).toBe('R$ 238,80')
  })
})

describe('formatDateBRL', () => {
  it('renders dates in the São Paulo timezone regardless of runtime zone', () => {
    const nearUtcMidnight = Date.UTC(2026, 8, 28, 0, 30)
    expect(formatDateBRL(nearUtcMidnight)).toBe('27/09/2026')
  })
})

describe('formatDuration', () => {
  it('pads minutes and seconds', () => {
    expect(formatDuration(0)).toBe('00:00')
    expect(formatDuration(255)).toBe('04:15')
    expect(formatDuration(3600)).toBe('60:00')
  })
})
