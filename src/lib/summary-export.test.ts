import { describe, expect, it } from 'vitest'
import JSZip from 'jszip'
import { getBookDetail } from '#/domain/catalog/service'
import { bookTakeaways } from '#/db/schema'
import {
  createTestDb,
  makeBook,
  makeCategory,
  makeChapter,
  makeInsight,
  makeQuote,
} from '#/test/factories'
import { createSummaryEpub } from './summary-epub'
import { createSummaryPdf, summaryPdfDefinition } from './summary-pdf'

const db = createTestDb()

function sampleBook() {
  const category = makeCategory(db)
  const book = makeBook(db, {
    categoryId: category.id,
    title: 'Ação & <sentido>',
    author: 'João “Silva”',
  })
  makeChapter(db, {
    bookId: book.id,
    title: 'Capítulo inicial',
    body: 'Primeiro parágrafo.\n\nSegundo parágrafo com acentuação.',
  })
  makeInsight(db, {
    bookId: book.id,
    title: 'Ideia central',
    body: 'Conteúdo da ideia.',
  })
  makeQuote(db, {
    bookId: book.id,
    text: 'Citação com emoção.',
    author: 'João Silva',
  })
  db.insert(bookTakeaways)
    .values({
      id: 'step',
      bookId: book.id,
      position: 1,
      body: 'Pratique hoje.',
    })
    .run()
  return getBookDetail(db, book.id)
}

describe('exportação do resumo', () => {
  it('gera EPUB com mimetype inicial sem compressão, navegação e conteúdo completo', async () => {
    const book = sampleBook()
    const blob = await createSummaryEpub(book)
    const bytes = await blob.arrayBuffer()
    const header = new DataView(bytes)
    expect(header.getUint16(8, true)).toBe(0)
    expect(new TextDecoder().decode(bytes.slice(30, 38))).toBe('mimetype')
    const zip = await JSZip.loadAsync(bytes)
    expect(await zip.file('mimetype')!.async('text')).toBe(
      'application/epub+zip',
    )
    expect(await zip.file('EPUB/package.opf')!.async('text')).toContain(
      'Ação &amp; &lt;sentido&gt;',
    )
    expect(await zip.file('EPUB/nav.xhtml')!.async('text')).toContain(
      'section-3.xhtml',
    )
    const sections = await Promise.all(
      [0, 1, 2, 3].map((index) =>
        zip.file(`EPUB/section-${index}.xhtml`)!.async('text'),
      ),
    )
    expect(sections.join('')).toContain('Pratique hoje.')
    expect(sections.join('')).toContain('Citação com emoção.')
    expect(sections[0]).toContain('<p>Segundo parágrafo com acentuação.</p>')
    const pdfDefinition = JSON.stringify(summaryPdfDefinition(book))
    expect(pdfDefinition).toContain('Pratique hoje.')
    expect(pdfDefinition).toContain('Citação com emoção.')
    const pdf = await createSummaryPdf(book)
    expect(
      new TextDecoder().decode((await pdf.arrayBuffer()).slice(0, 5)),
    ).toBe('%PDF-')
  })
})
