import { Link } from '@tanstack/react-router'

import { FEATURES } from '#/lib/features'

import { BookCover } from './book-cover'
import { Icon } from './icon'

export type BookCardData = {
  id: string
  title: string
  author: string
  coverColor: string
  coverUrl?: string | null
  categoryName: string
  categorySlug: string
  audioMinutes: number
  readingMinutes: number
  rating: number
}

export function BookCard({
  book,
  width = 'w-44',
}: {
  book: BookCardData
  width?: string
}) {
  return (
    <Link
      to="/reader/$bookId"
      params={{ bookId: book.id }}
      className={`flex shrink-0 snap-start flex-col rounded-xl bg-surface-container-lowest p-3 shadow-sm active:scale-[0.99] ${width}`}
    >
      <div className="relative mb-2.5 w-full">
        <BookCover
          title={book.title}
          author={book.author}
          color={book.coverColor}
          coverUrl={book.coverUrl}
          className="aspect-[3/4.4] w-full"
        />
        <span className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-surface-container-lowest/90 px-2 py-0.5 text-[10px] font-semibold text-on-surface backdrop-blur-sm">
          <Icon
            name={FEATURES.audioPlayer ? 'headphones' : 'schedule'}
            className="text-[13px] text-secondary"
          />
          {FEATURES.audioPlayer ? book.audioMinutes : book.readingMinutes} min
        </span>
      </div>
      <span className="truncate text-[10px] font-semibold tracking-wide text-secondary uppercase">
        {book.categoryName}
      </span>
      <h4 className="font-serif mt-0.5 truncate text-[16px] leading-snug font-semibold text-on-surface">
        {book.title}
      </h4>
      <p className="truncate text-[13px] text-on-surface-variant">
        {book.author}
      </p>
      <div className="mt-3 flex items-center justify-between pt-1">
        <span className="flex items-center gap-0.5 text-[10px] font-bold text-secondary">
          <Icon name="star" filled className="text-[14px]" />
          {book.rating.toFixed(1)}
        </span>
        <span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-on-primary">
          <Icon name="play_arrow" className="text-[16px]" />
        </span>
      </div>
    </Link>
  )
}
