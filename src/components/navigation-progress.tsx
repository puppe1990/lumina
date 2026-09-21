import { useRouterState } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

/**
 * Indicador global de navegação: uma barra fina no topo enquanto a rota
 * carrega e um spinner central que só aparece se a transição passar de
 * ~150ms, para não piscar em navegações instantâneas.
 */
export function NavigationProgress() {
  const isLoading = useRouterState({ select: (state) => state.isLoading })
  const [showSpinner, setShowSpinner] = useState(false)

  useEffect(() => {
    if (!isLoading) {
      setShowSpinner(false)
      return
    }
    const timer = setTimeout(() => setShowSpinner(true), 150)
    return () => clearTimeout(timer)
  }, [isLoading])

  return (
    <>
      {isLoading ? (
        <div className="pointer-events-none fixed top-0 left-1/2 z-[90] h-0.5 w-full max-w-[430px] -translate-x-1/2 overflow-hidden">
          <div className="animate-nav-progress h-full w-full bg-primary" />
        </div>
      ) : null}

      <div
        aria-hidden={!showSpinner}
        className={`fixed inset-0 z-[85] grid place-items-center transition-opacity duration-200 ${
          showSpinner ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="absolute inset-0 bg-surface/50 backdrop-blur-[1px]" />
        <div className="animate-route-spinner relative flex items-center gap-3 rounded-full bg-surface-container-lowest px-5 py-3 shadow-level-3">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-primary/15 border-t-primary" />
          <span className="font-serif text-[14px] font-semibold text-primary">
            Preparando sua leitura…
          </span>
        </div>
      </div>
    </>
  )
}
