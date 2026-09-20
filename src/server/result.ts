import { AppError, isAppError } from '#/domain/errors'

export type ActionError = {
  code: string
  message: string
}

export type ActionResult<T> = { ok: true; data: T } | { ok: false; error: ActionError }

export async function runAction<T>(fn: () => T | Promise<T>): Promise<ActionResult<T>> {
  try {
    const data = await fn()
    return { ok: true, data }
  } catch (error) {
    if (isAppError(error)) {
      return { ok: false, error: { code: error.code, message: error.message } }
    }
    console.error('[action] unexpected error', error)
    return {
      ok: false,
      error: { code: 'INTERNAL', message: 'Algo deu errado. Tente novamente em instantes.' },
    }
  }
}

export function unwrap<T>(result: ActionResult<T>): T {
  if (!result.ok) {
    throw new AppError('VALIDATION', result.error.message)
  }
  return result.data
}
