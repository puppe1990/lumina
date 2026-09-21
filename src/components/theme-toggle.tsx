import { useTheme } from '#/lib/theme'

import { Icon } from './icon'

export function ThemeToggle({ className = '' }: { className?: string }) {
  const [theme, toggle] = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
      aria-pressed={isDark}
      className={`grid h-8 w-8 place-items-center rounded-full bg-surface-container text-on-surface-variant active:scale-95 ${className}`}
    >
      <Icon
        name={isDark ? 'light_mode' : 'dark_mode'}
        className="text-[18px]"
      />
    </button>
  )
}
