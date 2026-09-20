import { createFileRoute, redirect } from '@tanstack/react-router'

import { getReaderIndex } from '#/server/catalog'

export const Route = createFileRoute('/reader/')({
  beforeLoad: async ({ context }) => {
    if (!context.user) {
      throw redirect({ to: '/login' })
    }
    const { bookId } = await getReaderIndex()
    if (bookId) {
      throw redirect({ to: '/reader/$bookId', params: { bookId } })
    }
    throw redirect({ to: '/explore' })
  },
})
