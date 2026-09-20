import { createDatabase } from '../src/db/client'
import { isSeeded, resetDatabase, seedDatabase } from '../src/db/seed'

const file = process.env.DATABASE_FILE ?? 'data/lumina.db'
const db = createDatabase(file)

if (process.env.RESET === '1') {
  resetDatabase(db)
  console.log('Banco limpo.')
}

if (isSeeded(db) && process.env.RESET !== '1') {
  console.log('Banco já possui dados. Use RESET=1 para recriar o catálogo.')
  process.exit(0)
}

const summary = seedDatabase(db)
console.log('Catálogo criado:', summary)
