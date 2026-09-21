import { createFileRoute, Link } from '@tanstack/react-router'

import { BookCover } from '#/components/book-cover'
import { Icon } from '#/components/icon'
import { Logo } from '#/components/logo'
import { Screen } from '#/components/screen'
import { getExploreData } from '#/server/catalog'

export const Route = createFileRoute('/onboarding/welcome')({
  loader: async () => {
    const data = await getExploreData({ data: {} })
    return { trending: data.trending.slice(0, 3), totalBooks: data.totalBooks }
  },
  component: WelcomePage,
})

const PILLARS = [
  {
    icon: 'headphones',
    tone: 'bg-primary-fixed text-on-primary-fixed-variant',
    title: 'Áudio & Texto Imersivo',
    body: 'Narração com voz humana em cadência ideal para seus trajetos matinais, treinos ou pausas de café.',
  },
  {
    icon: 'bolt',
    tone: 'bg-secondary-fixed text-on-secondary-fixed-variant',
    title: 'Ideias-Chave em 1 Minuto',
    body: 'Vá direto ao ponto essencial através de sínteses executivas, citações marcantes e resumos aplicáveis.',
  },
  {
    icon: 'track_changes',
    tone: 'bg-tertiary-fixed text-on-tertiary-fixed',
    title: 'Jornada Personalizada',
    body: 'Trilhas calibradas com suas metas profissionais e rotina real de tempo disponível.',
  },
]

function WelcomePage() {
  const { trending, totalBooks } = Route.useLoaderData()

  return (
    <Screen>
      <header className="pt-safe sticky top-0 z-40 bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="flex h-16 items-center justify-between px-5">
          <Logo />
          <div className="flex items-center gap-1">
            <Link
              to="/login"
              className="px-3 py-2 text-[12px] font-semibold text-on-surface-variant transition-colors hover:text-primary"
            >
              Pular
            </Link>
            <Link
              to="/signup"
              className="grid h-8 w-8 place-items-center rounded-full bg-primary"
              aria-label="Criar conta"
            >
              <Icon
                name="person"
                filled
                className="text-[18px] text-on-primary"
              />
            </Link>
          </div>
        </div>
      </header>

      <div className="flex flex-col px-5 pt-3 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="rounded-full bg-secondary-fixed px-2 py-0.5 text-[10px] font-bold tracking-widest text-on-secondary-fixed uppercase">
              Passo 1 de 4
            </span>
            <span className="text-[10px] font-semibold text-on-surface-variant">
              • Descoberta
            </span>
          </div>
          <Link
            to="/login"
            className="flex items-center gap-0.5 text-[12px] font-semibold text-primary"
          >
            Já tenho conta
            <Icon name="chevron_right" className="text-[16px]" />
          </Link>
        </div>
        <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-surface-container-high">
          <div className="h-full w-1/4 rounded-full bg-primary-container transition-all duration-700" />
        </div>
      </div>

      <section className="flex flex-col px-5 pt-3 pb-2">
        <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-surface-container-low px-2.5 py-1 shadow-sm">
          <Icon
            name="auto_awesome"
            filled
            className="text-[16px] text-secondary"
          />
          <span className="text-[12px] font-semibold text-secondary">
            Sabedoria condensada em minutos
          </span>
        </span>
        <h1 className="font-serif mt-3 text-[32px] leading-[1.12] font-semibold tracking-tight text-primary">
          Os maiores livros do mundo. Em 15 minutos.
        </h1>
        <p className="mt-2 text-[15px] leading-relaxed text-on-surface-variant">
          Aprenda ideias práticas de negócios, liderança, psicologia e
          desenvolvimento pessoal com resumos em áudio imersivo e texto
          diagramado.
        </p>

        <div className="mt-4 flex flex-col gap-2 rounded-xl bg-surface-container-lowest p-4 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-secondary-container" />
              <span className="text-[12px] font-semibold text-on-surface">
                Em alta na curadoria
              </span>
            </div>
            <span className="rounded-full bg-surface-container px-2 py-0.5 text-[10px] font-semibold text-on-surface-variant">
              Áudio & Texto
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {trending.map((book) => (
              <div
                key={book.id}
                className="flex flex-col rounded-lg bg-surface-container-low p-1.5 shadow-sm"
              >
                <BookCover
                  title={book.title}
                  author={book.author}
                  color={book.coverColor}
                  label={book.categoryName}
                  showAudioBadge
                  className="aspect-[2/3] w-full"
                />
                <span className="mt-1 flex items-center gap-0.5 text-[9px] text-on-surface-variant">
                  <Icon
                    name="schedule"
                    className="text-[11px] text-secondary"
                  />
                  {book.audioMinutes} min
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-1.5 rounded-lg bg-surface-container-low py-1.5">
            <Icon name="verified" className="text-[18px] text-primary" />
            <span className="text-[12px] font-medium text-on-surface">
              <strong>{totalBooks} títulos</strong> sintetizados por
              especialistas
            </span>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-2 px-5 pt-2 pb-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold tracking-widest text-on-surface-variant uppercase">
            O que você ganha
          </span>
          <span className="text-[10px] font-semibold text-secondary">
            Ritmo diário
          </span>
        </div>
        {PILLARS.map((pillar) => (
          <div
            key={pillar.title}
            className="flex items-start gap-3 rounded-xl bg-surface-container-lowest p-3 shadow-sm"
          >
            <span
              className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${pillar.tone}`}
            >
              <Icon name={pillar.icon} filled className="text-[20px]" />
            </span>
            <div className="min-w-0">
              <h2 className="text-[16px] leading-snug font-bold text-primary">
                {pillar.title}
              </h2>
              <p className="mt-0.5 text-[13px] text-on-surface-variant">
                {pillar.body}
              </p>
            </div>
          </div>
        ))}
      </section>

      <section className="px-5 pt-2 pb-4">
        <div className="flex items-center justify-between rounded-xl bg-surface-container-low p-3">
          <div className="flex items-center gap-2">
            <div className="flex text-secondary-container">
              {[0, 1, 2, 3, 4].map((star) => (
                <Icon key={star} name="star" filled className="text-[16px]" />
              ))}
            </div>
            <span className="text-[12px] font-bold text-on-surface">
              4.9/5.0
            </span>
          </div>
          <span className="text-[10px] text-on-surface-variant">
            +28 mil mentes ativas
          </span>
        </div>
      </section>

      <section className="mt-auto flex flex-col items-center gap-1.5 px-5 pt-2 pb-8">
        <Link
          to="/onboarding/interests"
          className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary-container text-[14px] font-semibold text-on-primary shadow-md transition-all hover:bg-primary active:scale-[0.98]"
        >
          Personalizar Minha Jornada
          <Icon name="arrow_forward" className="text-[20px]" />
        </Link>
        <Link
          to="/signup"
          className="px-4 py-2 text-[12px] font-semibold text-on-surface-variant transition-colors hover:text-primary"
        >
          Explorar sem personalizar
        </Link>
        <div className="flex items-center gap-1 text-[10px] text-on-surface-variant opacity-80">
          <Icon name="timer" className="text-[14px]" />
          <span>Leva menos de 1 minuto para configurar seu perfil</span>
        </div>
      </section>
    </Screen>
  )
}
