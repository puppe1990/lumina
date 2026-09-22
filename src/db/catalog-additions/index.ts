// Livros adicionados depois do catálogo base (fora da seleção da pasta my_life).

import type { CatalogBook } from '#/db/catalog-data'

import { book as theBodyKeepsTheScore } from '#/db/catalog-additions/body-keeps-the-score'
import { book as breakingTheHabit } from '#/db/catalog-additions/breaking-the-habit'
import { book as mindMagic } from '#/db/catalog-additions/mind-magic'
import { book as mindToMatter } from '#/db/catalog-additions/mind-to-matter'
import { book as theResilienceWorkbook } from '#/db/catalog-additions/resilience-workbook'
import { book as theHeartmathSolution } from '#/db/catalog-additions/heartmath'

export const ADDITIONAL_BOOKS: CatalogBook[] = [
  theHeartmathSolution,
  theResilienceWorkbook,
  breakingTheHabit,
  mindToMatter,
  mindMagic,
  theBodyKeepsTheScore,
]
