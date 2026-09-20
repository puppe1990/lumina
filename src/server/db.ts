import { getDb } from '#/db/client'
import type { Db } from '#/db/client'
import { ensureSeeded } from '#/db/seed'

let seedChecked = false

export function db(): Db {
  const database = getDb()
  if (!seedChecked) {
    ensureSeeded(database)
    seedChecked = true
  }
  return database
}
