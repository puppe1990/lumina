import { Icon } from './icon'

type BookCoverProps = {
  title: string
  author: string
  color: string
  className?: string
  label?: string
  showAudioBadge?: boolean
}

export function BookCover({
  title,
  author,
  color,
  className = '',
  label,
  showAudioBadge = false,
}: BookCoverProps) {
  return (
    <div
      className={`relative flex flex-col justify-between overflow-hidden rounded-l-[3px] rounded-r-md p-2.5 text-white ${className}`}
      style={{
        backgroundImage: `linear-gradient(155deg, ${color} 0%, #04150f 96%)`,
      }}
    >
      <div className="pointer-events-none absolute -top-6 -right-6 h-16 w-16 rounded-full bg-white/10 blur-xl" />
      <div className="flex items-start justify-between">
        {label ? (
          <span className="rounded-full bg-white/15 px-1.5 py-0.5 text-[8px] font-semibold tracking-[0.12em] uppercase backdrop-blur-sm">
            {label}
          </span>
        ) : (
          <span />
        )}
        {showAudioBadge ? (
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-secondary-container text-on-secondary-container">
            <Icon name="headphones" filled className="text-[10px]" />
          </span>
        ) : null}
      </div>

      <div className="relative">
        <div className="mb-1.5 h-px w-6 bg-secondary-container/80" />
        <p className="font-serif text-[13px] leading-tight font-semibold">{title}</p>
        <p className="mt-1 truncate text-[9px] tracking-wide text-white/70 uppercase">{author}</p>
      </div>
    </div>
  )
}
