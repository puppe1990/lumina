import { formatCurrencyBRL, formatDateBRL } from '#/lib/text'

export type ReceiptInput = {
  customerName: string
  customerEmail: string
  planName: string
  interval: string
  priceCents: number
  monthlyEquivalentCents: number
  status: string
  startedAt: number
  currentPeriodEnd: number
  subscriptionId: string
  isTrialing: boolean
}

const PAPER = '#fdfbf4'
const INK = '#20251f'
const MUTED = '#6b7169'
const ACCENT = '#0b513d'
const LINE = '#c9cec5'
const MONO = '"Courier New", ui-monospace, Menlo, monospace'

const WIDTH = 440
const PAD = 26
const ZIG = 9
const SCALE = 2

function paperPath(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const step = 16
  ctx.beginPath()
  ctx.moveTo(0, ZIG)
  for (let x = 0; x < w; x += step) {
    ctx.lineTo(Math.min(x + step / 2, w), 0)
    ctx.lineTo(Math.min(x + step, w), ZIG)
  }
  ctx.lineTo(w, h - ZIG)
  for (let x = w; x > 0; x -= step) {
    ctx.lineTo(Math.max(x - step / 2, 0), h)
    ctx.lineTo(Math.max(x - step, 0), h - ZIG)
  }
  ctx.closePath()
}

function dashed(ctx: CanvasRenderingContext2D, y: number): number {
  ctx.save()
  ctx.strokeStyle = LINE
  ctx.lineWidth = 1
  ctx.setLineDash([4, 4])
  ctx.beginPath()
  ctx.moveTo(PAD, y)
  ctx.lineTo(WIDTH - PAD, y)
  ctx.stroke()
  ctx.restore()
  return y
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
): number {
  const words = text.split(' ')
  let line = ''
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word
    if (ctx.measureText(candidate).width > maxWidth && line) {
      ctx.fillText(line, x, y)
      y += lineHeight
      line = word
    } else {
      line = candidate
    }
  }
  if (line) {
    ctx.fillText(line, x, y)
    y += lineHeight
  }
  return y
}

function barcode(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  seed: string,
) {
  let state = 7
  for (const char of seed) {
    state = (state * 31 + char.charCodeAt(0)) >>> 0
  }
  ctx.save()
  ctx.fillStyle = INK
  let cursor = x
  while (cursor < x + w) {
    state = (state * 1103515245 + 12345) & 0x7fffffff
    const bar = 1 + (state % 3)
    const gap = 1 + ((state >> 8) % 3)
    ctx.fillRect(cursor, y, bar, h)
    cursor += bar + gap
  }
  ctx.restore()
}

function statusLabel(status: string): string {
  switch (status) {
    case 'trialing':
      return 'Período de teste'
    case 'active':
      return 'Ativa'
    case 'canceled':
      return 'Cancelada'
    default:
      return status
  }
}

/** Desenha o conteúdo e devolve o Y final (base para a altura total). */
function drawContent(
  ctx: CanvasRenderingContext2D,
  input: ReceiptInput,
): number {
  const center = WIDTH / 2
  let y = ZIG + 34

  ctx.textAlign = 'center'
  ctx.fillStyle = ACCENT
  ctx.font = `700 28px ${MONO}`
  ctx.fillText('LÚMINA', center, y)
  y += 20
  ctx.fillStyle = MUTED
  ctx.font = `400 11px ${MONO}`
  ctx.fillText('RESUMOS QUE CABEM NO SEU DIA', center, y)
  y += 22
  ctx.fillStyle = INK
  ctx.font = `700 14px ${MONO}`
  ctx.fillText('RECIBO DE ASSINATURA', center, y)
  y += 24

  dashed(ctx, y)
  y += 24

  const rows: [string, string][] = [
    ['Data da compra', formatDateBRL(input.startedAt)],
    ['Cliente', input.customerName],
    ['E-mail', input.customerEmail],
    ['Plano', input.planName],
    [
      'Periodicidade',
      input.interval === 'yearly' ? 'Anual (12 meses)' : 'Mensal',
    ],
    [
      'Vigência',
      `${formatDateBRL(input.startedAt)} a ${formatDateBRL(input.currentPeriodEnd)}`,
    ],
    ['Status', statusLabel(input.status)],
    ['Nº da assinatura', input.subscriptionId.slice(0, 8).toUpperCase()],
  ]

  ctx.textAlign = 'left'
  for (const [label, value] of rows) {
    ctx.fillStyle = MUTED
    ctx.font = `400 11px ${MONO}`
    ctx.fillText(label.toUpperCase(), PAD, y)
    y += 17
    ctx.fillStyle = INK
    ctx.font = `600 14px ${MONO}`
    y = wrapText(ctx, value, PAD, y, WIDTH - PAD * 2, 18) + 12
  }

  dashed(ctx, y)
  y += 24

  const totalPaid = input.isTrialing ? 0 : input.priceCents
  const totals: [string, string, boolean][] = [
    ['Subtotal', formatCurrencyBRL(input.priceCents), false],
  ]
  if (input.isTrialing) {
    totals.push([
      'Desconto (teste grátis)',
      `- ${formatCurrencyBRL(input.priceCents)}`,
      false,
    ])
  } else if (input.interval === 'yearly') {
    totals.push([
      'Equivalente mensal',
      `${formatCurrencyBRL(input.monthlyEquivalentCents)}/mês`,
      false,
    ])
  }
  totals.push(['TOTAL PAGO', formatCurrencyBRL(totalPaid), true])

  for (const [label, value, strong] of totals) {
    if (strong) {
      ctx.strokeStyle = LINE
      ctx.setLineDash([])
      ctx.beginPath()
      ctx.moveTo(PAD, y - 14)
      ctx.lineTo(WIDTH - PAD, y - 14)
      ctx.stroke()
    }
    ctx.textAlign = 'left'
    ctx.fillStyle = strong ? ACCENT : MUTED
    ctx.font = `${strong ? 700 : 400} ${strong ? 15 : 13}px ${MONO}`
    ctx.fillText(label, PAD, y)
    ctx.textAlign = 'right'
    ctx.fillStyle = strong ? ACCENT : INK
    ctx.fillText(value, WIDTH - PAD, y)
    y += strong ? 26 : 20
  }

  y += 14
  dashed(ctx, y)
  y += 28

  barcode(ctx, PAD, y, WIDTH - PAD * 2, 44, input.subscriptionId)
  y += 58
  ctx.textAlign = 'center'
  ctx.fillStyle = MUTED
  ctx.font = `400 10px ${MONO}`
  ctx.fillText(input.subscriptionId.toUpperCase(), center, y)
  y += 24

  dashed(ctx, y)
  y += 26
  ctx.fillStyle = ACCENT
  ctx.font = `600 13px ${MONO}`
  ctx.fillText('Obrigado por assinar o Lúmina.', center, y)
  y += 18
  ctx.fillStyle = MUTED
  ctx.font = `400 11px ${MONO}`
  ctx.fillText('lumina.apps.gestaobem.com', center, y)
  y += 16
  ctx.font = `400 9px ${MONO}`
  ctx.fillText('Documento ilustrativo, sem valor fiscal.', center, y)

  return y
}

/** Gera e baixa o recibo da assinatura como PNG com cara de nota de papel. */
export function downloadSubscriptionReceipt(input: ReceiptInput): void {
  const measureCanvas = document.createElement('canvas')
  const measureCtx = measureCanvas.getContext('2d')
  if (!measureCtx) {
    return
  }
  const contentHeight = drawContent(measureCtx, input)
  const height = Math.ceil(contentHeight + ZIG + 10)

  const canvas = document.createElement('canvas')
  canvas.width = WIDTH * SCALE
  canvas.height = height * SCALE
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    return
  }
  ctx.scale(SCALE, SCALE)

  ctx.save()
  paperPath(ctx, WIDTH, height)
  ctx.shadowColor = 'rgba(15, 23, 42, 0.22)'
  ctx.shadowBlur = 16
  ctx.shadowOffsetY = 6
  ctx.fillStyle = PAPER
  ctx.fill()
  ctx.restore()

  ctx.save()
  paperPath(ctx, WIDTH, height)
  ctx.clip()
  drawContent(ctx, input)
  ctx.restore()

  canvas.toBlob((blob) => {
    if (!blob) {
      return
    }
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `recibo-lumina-${input.subscriptionId.slice(0, 8)}.png`
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.setTimeout(() => URL.revokeObjectURL(url), 1000)
  }, 'image/png')
}
