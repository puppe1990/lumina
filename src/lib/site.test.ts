import { describe, expect, it } from 'vitest'

import {
  OG_IMAGE,
  OG_IMAGE_ALT,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
} from '#/lib/site'

describe('site metadata', () => {
  it('describes the product without promising audio', () => {
    for (const value of [SITE_DESCRIPTION, OG_IMAGE_ALT]) {
      expect(value.toLowerCase()).not.toContain('áudio')
      expect(value.toLowerCase()).not.toContain('audio')
    }
  })

  it('points the og:image to the generated asset', () => {
    expect(OG_IMAGE.endsWith('/og.png')).toBe(true)
  })

  it('has a name and title', () => {
    expect(SITE_NAME).toBe('Lúmina')
    expect(SITE_TITLE).toContain('Lúmina')
  })
})
