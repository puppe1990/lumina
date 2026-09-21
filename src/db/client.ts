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
  applyMigrations(sqlite)
  return drizzle(sqlite, { schema })
}

// Colunas adicionadas depois do schema inicial (bancos já existentes).
const ADDED_COLUMNS: Array<
  [table: string, column: string, definition: string]
> = [['books', 'cover_url', 'TEXT']]

function applyMigrations(sqlite: Database.Database): void {
  for (const [table, column, definition] of ADDED_COLUMNS) {
    const columns = sqlite
      .prepare(`PRAGMA table_info(${table})`)
      .all()
      .map((row) => (row as { name: string }).name)
    if (!columns.includes(column)) {
      sqlite.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`)
    }
  }
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
