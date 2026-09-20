import { mkdirSync } from 'node:fs'
import { dirname } from 'node:path'

import { drizzle } from 'drizzle-orm/better-sqlite3'
import type { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'

import { ddl } from './ddl'
import * as schema from './schema'

export type Db = BetterSQLite3Database<typeof schema>

export function createDatabase(fileName = ':memory:'): Db {
  if (fileName !== ':memory:') {
    mkdirSync(dirname(fileName), { recursive: true })
  }
  const sqlite = new Database(fileName)
  sqlite.pragma('journal_mode = WAL')
  sqlite.pragma('foreign_keys = ON')
  sqlite.exec(ddl)
  return drizzle(sqlite, { schema })
}

let cached: Db | undefined

export function getDb(): Db {
  if (!cached) {
    cached = createDatabase(process.env.DATABASE_FILE ?? 'data/lumina.db')
  }
  return cached
}

export function setDb(db: Db | undefined): void {
  cached = db
}
