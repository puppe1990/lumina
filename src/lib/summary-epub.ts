import JSZip from 'jszip'
import type { BookDetail } from '#/domain/catalog/service'
import { escapeXml, summarySections } from './summary-document'

function xhtml(title: string, body: string): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" lang="pt-BR" xml:lang="pt-BR">
<head><title>${escapeXml(title)}</title><style>body{font-family:serif;line-height:1.6;margin:5%;}h1,h2{line-height:1.2;}p{white-space:pre-line;}</style></head>
<body>${body}</body></html>`
}

export async function createSummaryEpub(book: BookDetail): Promise<Blob> {
  const zip = new JSZip()
  // EPUB readers require this to be the first ZIP entry, without compression.
  zip.file('mimetype', 'application/epub+zip', { compression: 'STORE' })
  zip.file(
    'META-INF/container.xml',
    `<?xml version="1.0"?><container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container"><rootfiles><rootfile full-path="EPUB/package.opf" media-type="application/oebps-package+xml"/></rootfiles></container>`,
  )
  const sections = summarySections(book)
  zip.file(
    'EPUB/title.xhtml',
    xhtml(
      book.title,
      `<h1>${escapeXml(book.title)}</h1><p>${escapeXml(book.author)}</p><p>Resumo editorial · Lúmina</p><p>${escapeXml(book.tagline)}</p>`,
    ),
  )
  sections.forEach((section, index) => {
    zip.file(
      `EPUB/section-${index}.xhtml`,
      xhtml(
        section.title,
        `<h2>${escapeXml(section.title)}</h2>${section.paragraphs.map((paragraph) => `<p>${escapeXml(paragraph)}</p>`).join('')}`,
      ),
    )
  })
  zip.file(
    'EPUB/nav.xhtml',
    xhtml(
      'Sumário',
      `<nav epub:type="toc"><h1>Sumário</h1><ol><li><a href="title.xhtml">${escapeXml(book.title)}</a></li>${sections.map((section, index) => `<li><a href="section-${index}.xhtml">${escapeXml(section.title)}</a></li>`).join('')}</ol></nav>`,
    ),
  )
  zip.file(
    'EPUB/package.opf',
    `<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="book-id">
<metadata xmlns:dc="http://purl.org/dc/elements/1.1/"><dc:identifier id="book-id">urn:lumina:summary:${escapeXml(book.id)}</dc:identifier><dc:title>${escapeXml(book.title)} — Resumo</dc:title><dc:creator>${escapeXml(book.author)}</dc:creator><dc:language>pt-BR</dc:language><dc:publisher>Lúmina</dc:publisher><meta property="dcterms:modified">${new Date().toISOString().replace(/\.\d{3}Z$/, 'Z')}</meta></metadata>
<manifest><item id="title" href="title.xhtml" media-type="application/xhtml+xml"/><item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>${sections.map((_, index) => `<item id="s${index}" href="section-${index}.xhtml" media-type="application/xhtml+xml"/>`).join('')}</manifest>
<spine><itemref idref="title"/>${sections.map((_, index) => `<itemref idref="s${index}"/>`).join('')}</spine></package>`,
  )
  return zip.generateAsync({
    type: 'blob',
    mimeType: 'application/epub+zip',
    compression: 'DEFLATE',
  })
}
