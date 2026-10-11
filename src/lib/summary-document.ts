import type { BookDetail } from '#/domain/catalog/service'

export type SummarySection = { title: string; paragraphs: string[] }

export function summarySections(book: BookDetail): SummarySection[] {
  return [
    ...book.chapters.map((chapter) => ({
      title: chapter.title,
      paragraphs: chapter.body.split(/\n\s*\n/),
    })),
    {
      title: 'Ideias-chave',
      paragraphs: book.insights.map((item) => `${item.title}: ${item.body}`),
    },
    {
      title: 'Citações',
      paragraphs: book.quotes.map((item) => `“${item.text}” — ${item.author}`),
    },
    {
      title: 'Plano de ação',
      paragraphs: book.takeaways.map(
        (item, index) => `${index + 1}. ${item.body}`,
      ),
    },
  ].filter((section) => section.paragraphs.length > 0)
}

export function escapeXml(text: string): string {
  return text.replace(/[<>&"']/g, (character) => {
    const entities: Record<string, string> = {
      '<': '&lt;',
      '>': '&gt;',
      '&': '&amp;',
      '"': '&quot;',
      "'": '&apos;',
    }
    return entities[character]
  })
}

export function summaryFilename(book: BookDetail): string {
  const slug = book.slug.replace(/[^a-zA-Z0-9_-]/g, '-')
  return `${slug || 'livro'}-resumo`
}
