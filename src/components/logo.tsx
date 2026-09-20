export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2">
      <span className="grid h-8 w-8 place-items-center rounded-md bg-primary-container">
        <svg
          viewBox="0 0 120 120"
          className="h-8 w-8"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M60 34v50M60 84c-7-4.5-19-5.4-28-2V39c9-3.4 21-2.5 28 2M60 84c7-4.5 19-5.4 28-2V39c-9-3.4-21-2.5-28 2"
            stroke="#F59E0B"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="60" cy="26" r="3.5" fill="#FDE68A" />
          <path
            d="M60 14v3M67 21l-2.5 1.5M53 21l2.5 1.5"
            stroke="#FDE68A"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </span>
      {!compact ? (
        <span className="font-serif text-[20px] font-semibold tracking-tight text-primary">
          Lúmina
        </span>
      ) : null}
    </span>
  )
}
