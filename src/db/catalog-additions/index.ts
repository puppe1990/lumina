// Livros adicionados depois do catálogo base (fora da seleção da pasta my_life).

import type { CatalogBook } from '#/db/catalog-data'

import { book as theHeartmathSolution } from '#/db/catalog-additions/heartmath'

export const ADDITIONAL_BOOKS: CatalogBook[] = [theHeartmathSolution]
