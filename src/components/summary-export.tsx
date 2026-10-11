import { useState } from 'react'
import type { BookDetail } from '#/domain/catalog/service'
import { summaryFilename } from '#/lib/summary-document'
import { Icon } from './icon'

type ExportFormat = 'epub' | 'pdf'

function downloadSummary(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.append(link)
  link.click()
  link.remove()
  setTimeout(() => URL.revokeObjectURL(url), 60_000)
}

export function SummaryExport({ book }: { book: BookDetail }) {
  const [exporting, setExporting] = useState<ExportFormat | null>(null)
  const [error, setError] = useState('')

  async function exportSummary(format: ExportFormat): Promise<void> {
    setExporting(format)
    setError('')
    try {
      const blob =
        format === 'epub'
          ? await (await import('#/lib/summary-epub')).createSummaryEpub(book)
          : await (await import('#/lib/summary-pdf')).createSummaryPdf(book)
      downloadSummary(blob, `${summaryFilename(book)}.${format}`)
    } catch {
      setError(
        `Não foi possível exportar o resumo em ${format.toUpperCase()}. Tente novamente.`,
      )
    } finally {
      setExporting(null)
    }
  }

  return (
    <div className="mb-4 px-5">
      <div
        className="flex flex-wrap items-center gap-2"
        aria-busy={exporting !== null}
      >
        <span className="mr-1 text-[12px] text-on-surface-variant">
          Exportar resumo
        </span>
        {(['epub', 'pdf'] as const).map((format) => (
          <button
            key={format}
            type="button"
            disabled={exporting !== null}
            onClick={() => void exportSummary(format)}
            className="flex items-center gap-1.5 rounded-full bg-surface-container px-4 py-2 text-[12px] font-semibold text-primary disabled:opacity-50"
          >
            <Icon name="download" className="text-[18px]" />
            {exporting === format ? 'Exportando…' : format.toUpperCase()}
          </button>
        ))}
      </div>
      <p role="status" className="mt-2 text-[12px] text-on-surface-variant">
        {error || (exporting ? 'Preparando o arquivo para download…' : '')}
      </p>
    </div>
  )
}
