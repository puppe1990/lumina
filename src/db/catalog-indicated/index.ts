// Livros indicados na pasta `my_life` (aba "Livros" de o-que-fazer.html),
// confirmados no acervo local em ~/Desktop/estudo/Ebooks.

import type { CatalogBook } from '#/db/catalog-data'

import { book as abaEmCasa } from '#/db/catalog-indicated/09-aba-em-casa'
import { book as decisionSprint } from '#/db/catalog-indicated/10-decision-sprint'
import { book as howToFailAtAlmostEverything } from '#/db/catalog-indicated/11-how-to-fail-at-almost-everything'
import { book as theFourWorkarounds } from '#/db/catalog-indicated/12-the-four-workarounds'
import { book as howToAdhd } from '#/db/catalog-indicated/01-how-to-adhd'
import { book as yourBrainsNotBroken } from '#/db/catalog-indicated/02-your-brains-not-broken'
import { book as youAreNotYourBrain } from '#/db/catalog-indicated/03-you-are-not-your-brain'
import { book as theOrganizedMind } from '#/db/catalog-indicated/04-the-organized-mind'
import { book as unfuckYourBrain } from '#/db/catalog-indicated/05-unfuck-your-brain'
import { book as dopamineDetox } from '#/db/catalog-indicated/06-dopamine-detox'
import { book as theGrievingBrain } from '#/db/catalog-indicated/07-the-grieving-brain'
import { book as theAutisticBrain } from '#/db/catalog-indicated/08-the-autistic-brain'

export const INDICATED_BOOKS: CatalogBook[] = [
  howToAdhd,
  yourBrainsNotBroken,
  youAreNotYourBrain,
  theOrganizedMind,
  unfuckYourBrain,
  dopamineDetox,
  theGrievingBrain,
  theAutisticBrain,
  abaEmCasa,
  decisionSprint,
  howToFailAtAlmostEverything,
  theFourWorkarounds,
]
