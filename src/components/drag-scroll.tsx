import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'

/**
 * Faixa com rolagem horizontal que também funciona no desktop: permite
 * arrastar com o mouse (não só swipe/trackpad) sem disparar o clique dos
 * cards quando o gesto foi um arrasto.
 */
export function DragScroll({
  className = '',
  children,
}: {
  className?: string
  children: ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let down = false
    let moved = false
    let startX = 0
    let startLeft = 0

    const onMove = (event: PointerEvent) => {
      if (!down) return
      const delta = event.clientX - startX
      if (Math.abs(delta) > 4) {
        moved = true
      }
      if (moved) {
        el.scrollLeft = startLeft - delta
        event.preventDefault()
      }
    }

    const stop = () => {
      down = false
      el.classList.remove('cursor-grabbing')
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', stop)
      window.removeEventListener('pointercancel', stop)
    }

    const onDown = (event: PointerEvent) => {
      if (event.pointerType === 'touch' || event.button !== 0) return
      down = true
      moved = false
      startX = event.clientX
      startLeft = el.scrollLeft
      el.classList.add('cursor-grabbing')
      // Escuta no window para continuar o arrasto mesmo se o ponteiro sair da faixa.
      window.addEventListener('pointermove', onMove)
      window.addEventListener('pointerup', stop)
      window.addEventListener('pointercancel', stop)
    }

    const onClickCapture = (event: MouseEvent) => {
      if (moved) {
        event.preventDefault()
        event.stopPropagation()
        moved = false
      }
    }

    // Links são arrastáveis por padrão; isso sequestra o gesto de rolagem.
    const onDragStart = (event: DragEvent) => {
      event.preventDefault()
    }

    el.addEventListener('pointerdown', onDown)
    el.addEventListener('click', onClickCapture, true)
    el.addEventListener('dragstart', onDragStart)

    return () => {
      el.removeEventListener('pointerdown', onDown)
      el.removeEventListener('click', onClickCapture, true)
      el.removeEventListener('dragstart', onDragStart)
      stop()
    }
  }, [])

  return (
    <div ref={ref} className={`cursor-grab select-none ${className}`}>
      {children}
    </div>
  )
}
