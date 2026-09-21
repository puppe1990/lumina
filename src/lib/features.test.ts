import { describe, expect, it } from 'vitest'

import { FEATURES, isFeatureEnabled, parseFlag } from '#/lib/features'

describe('parseFlag', () => {
  it('defaults to false when the value is absent', () => {
    expect(parseFlag(undefined)).toBe(false)
    expect(parseFlag(null)).toBe(false)
    expect(parseFlag('')).toBe(false)
  })

  it('accepts common truthy spellings', () => {
    for (const value of ['1', 'true', 'TRUE', 'on', 'yes', 'enabled', ' on ']) {
      expect(parseFlag(value)).toBe(true)
    }
  })

  it('treats other values as disabled', () => {
    for (const value of ['0', 'false', 'off', 'no', 'disabled']) {
      expect(parseFlag(value)).toBe(false)
    }
  })

  it('supports an explicit fallback', () => {
    expect(parseFlag(undefined, true)).toBe(true)
    expect(parseFlag(false)).toBe(false)
  })
})

describe('FEATURES', () => {
  it('keeps the audio player disabled by default', () => {
    expect(FEATURES.audioPlayer).toBe(false)
    expect(isFeatureEnabled('audioPlayer')).toBe(false)
  })
})
