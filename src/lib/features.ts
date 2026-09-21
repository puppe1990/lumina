export function parseFlag(value: unknown, fallback = false): boolean {
  if (value === undefined || value === null || value === '') {
    return fallback
  }
  if (typeof value === 'boolean') {
    return value
  }
  return ['1', 'true', 'on', 'yes', 'enabled'].includes(
    String(value).toLowerCase().trim(),
  )
}

const env = import.meta.env as Record<string, string | undefined>

/**
 * Feature flags do app. `VITE_FEATURE_*` é lido em build time; ausente = off.
 * O player de áudio fica desativado por padrão.
 */
export const FEATURES = {
  audioPlayer: parseFlag(env.VITE_FEATURE_AUDIO_PLAYER, false),
} as const

export type FeatureKey = keyof typeof FEATURES

export function isFeatureEnabled(key: FeatureKey): boolean {
  return FEATURES[key]
}
