import { Link } from '@tanstack/react-router'

import { Icon } from './icon'

export type NavKey = 'explorar' | 'leitor' | 'planos' | 'biblioteca'

const ITEMS: Array<{ key: NavKey; label: string; icon: string; to: string }> = [
  { key: 'explorar', label: 'Explorar', icon: 'explore', to: '/explore' },
  { key: 'leitor', label: 'Leitor', icon: 'menu_book', to: '/reader' },
  { key: 'planos', label: 'Planos', icon: 'workspace_premium', to: '/plans' },
  { key: 'biblioteca', label: 'Biblioteca', icon: 'local_library', to: '/library' },
]

export function BottomNav({ active }: { active: NavKey }) {
  return (
    <nav className="pb-safe fixed bottom-0 z-50 w-full max-w-[430px] bg-surface/90 shadow-[0_-2px_12px_rgba(0,0,0,0.04)] backdrop-blur-xl">
      <div className="flex h-16 items-center justify-around px-1">
        {ITEMS.map((item) => {
          const isActive = item.key === active
          return (
            <Link
              key={item.key}
              to={item.to}
              className={`flex min-h-[44px] min-w-[64px] flex-col items-center justify-center gap-0.5 transition-colors ${
                isActive
                  ? 'font-bold text-primary'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <Icon name={item.icon} filled={isActive} className="text-[24px]" />
              <span className="text-[10px] font-semibold tracking-[0.05em]">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
