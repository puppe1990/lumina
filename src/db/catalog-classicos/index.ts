// Clássicos essenciais de desenvolvimento pessoal, produtividade, filosofia e
// finanças, alinhados ao acervo local em ~/Desktop/estudo/Ebooks.

import type { CatalogBook } from '#/db/catalog-data'

import { book as thePowerOfRegret } from '#/db/catalog-classicos/the-power-of-regret'
import { book as fourThousandWeeks } from '#/db/catalog-classicos/four-thousand-weeks'
import { book as theAlmanackOfNavalRavikant } from '#/db/catalog-classicos/the-almanack-of-naval-ravikant'
import { book as mansSearchForMeaning } from '#/db/catalog-classicos/mans-search-for-meaning'
import { book as howToBeResilient } from '#/db/catalog-classicos/how-to-be-resilient'
import { book as theDailyLaws } from '#/db/catalog-classicos/the-daily-laws'
import { book as theSubtleArtOfNotGivingAFuck } from '#/db/catalog-classicos/the-subtle-art-of-not-giving-a-fuck'
import { book as theLifeBrief } from '#/db/catalog-classicos/the-life-brief'

export const CLASSIC_BOOKS: CatalogBook[] = [
  thePowerOfRegret,
  fourThousandWeeks,
  theAlmanackOfNavalRavikant,
  mansSearchForMeaning,
  howToBeResilient,
  theDailyLaws,
  theSubtleArtOfNotGivingAFuck,
  theLifeBrief,
]
