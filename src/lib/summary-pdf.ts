import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import type { Content, TDocumentDefinitions } from 'pdfmake/interfaces'
import type { BookDetail } from '#/domain/catalog/service'
import { summarySections } from './summary-document'

pdfMake.addVirtualFileSystem(pdfFonts)

export function summaryPdfDefinition(book: BookDetail): TDocumentDefinitions {
  const content: Content[] = [
    {
      text: 'LÚMINA · RESUMO EDITORIAL',
      fontSize: 10,
      color: '#064e3b',
      margin: [0, 0, 0, 18],
    },
    { text: book.title, fontSize: 26, bold: true, margin: [0, 0, 0, 8] },
    { text: book.author, fontSize: 13, margin: [0, 0, 0, 12] },
    { text: book.tagline, italics: true, margin: [0, 0, 0, 24] },
  ]
  for (const section of summarySections(book)) {
    content.push({ text: section.title, style: 'heading' })
    content.push(
      ...section.paragraphs.map((text) => ({
        text,
        margin: [0, 0, 0, 10] as [number, number, number, number],
      })),
    )
  }
  return {
    info: {
      title: `${book.title} — Resumo`,
      author: book.author,
      creator: 'Lúmina',
    },
    pageSize: 'A4',
    pageMargins: [50, 50, 50, 50],
    content,
    defaultStyle: {
      font: 'Roboto',
      fontSize: 11,
      lineHeight: 1.35,
      color: '#222222',
    },
    styles: {
      heading: {
        fontSize: 17,
        bold: true,
        color: '#064e3b',
        margin: [0, 18, 0, 10],
      },
    },
    pageBreakBefore: (node, following) =>
      node.style === 'heading' &&
      following.getFollowingNodesOnPage().length === 0,
    footer: (page, pages) => ({
      text: `Lúmina · ${page} / ${pages}`,
      alignment: 'center',
      fontSize: 9,
      color: '#666666',
    }),
  }
}

export async function createSummaryPdf(book: BookDetail): Promise<Blob> {
  return pdfMake.createPdf(summaryPdfDefinition(book)).getBlob()
}
