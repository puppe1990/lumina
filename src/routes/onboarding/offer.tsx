import { createFileRoute, redirect, useRouter } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

import { Icon } from '#/components/icon'
import { Logo } from '#/components/logo'
import { Screen } from '#/components/screen'
import { useToast } from '#/components/toast'
import { FEATURES } from '#/lib/features'
import { formatCurrencyBRL } from '#/lib/text'
import { finishOnboarding, getOnboardingData } from '#/server/onboarding'
import { getPlansData, subscribeToPlan } from '#/server/plans'

export const Route = createFileRoute('/onboarding/offer')({
  beforeLoad: ({ context }) => {
    if (!context.user) {
      throw redirect({ to: '/signup' })
    }
  },
  loader: async () => {
    const [plans, onboarding] = await Promise.all([
      getPlansData(),
      getOnboardingData(),
    ])
    const plan = plans.plans.find((item) => item.isFeatured) ?? plans.plans[0]
    return {
      plan,
      totalBooks: plans.totalBooks,
      interests: onboarding.interests,
      preferences: onboarding.preferences,
    }
  },
  component: OfferPage,
})

function buildFeatures(totalBooks: number, audioPlayer: boolean) {
  return [
    {
      title: `${totalBooks} resumos de alta fidelidade`,
      detail: audioPlayer
        ? 'em áudio imersivo e texto editorial.'
        : 'em texto editorial diagramado.',
    },
    {
      title: 'Modo Offline Instantâneo',
      detail: 'para ouvir e estudar durante deslocamentos.',
    },
    {
      title: 'Sincronização com Kindle',
      detail: 'e exportação de mapas mentais em PDF e Notion.',
    },
    {
      title: 'Curadoria diária guiada por IA',
      detail: 'calibrada com suas metas de carreira.',
    },
  ]
}

function formatCountdown(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  const pad = (value: number) => String(value).padStart(2, '0')
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
}

function OfferPage() {
  const router = useRouter()
  const { show, toast } = useToast()
  const { plan, totalBooks, interests, preferences } = Route.useLoaderData()
  const features = buildFeatures(totalBooks, FEATURES.audioPlayer)
  const [secondsLeft, setSecondsLeft] = useState(23 * 3600 + 59 * 60 + 42)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const timer = setInterval(
      () => setSecondsLeft((value) => (value > 0 ? value - 1 : 0)),
      1000,
    )
    return () => clearInterval(timer)
  }, [])

  const interestNames = interests.slice(0, 3).map((category) => category.name)
  const goal = preferences?.dailyGoalMinutes ?? 15

  async function handleSubscribe() {
    setSubmitting(true)
    const result = await subscribeToPlan({ data: { planSlug: plan.slug } })
    if (!result.ok) {
      setSubmitting(false)
      show(result.error.message)
      return
    }
    await finishOnboarding()
    await router.invalidate()
    await router.navigate({ to: '/explore' })
  }

  async function handleSkip() {
    await finishOnboarding()
    await router.invalidate()
    await router.navigate({ to: '/explore' })
  }

  return (
    <Screen>
      <header className="pt-safe sticky top-0 z-40 bg-surface/85 px-5 py-3 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.navigate({ to: '/onboarding/goal' })}
            className="-ml-2 flex h-10 w-10 items-center justify-center rounded-full text-on-surface active:scale-95"
            aria-label="Voltar"
          >
            <Icon name="arrow_back_ios_new" className="text-[20px]" />
          </button>
          <div className="flex items-center gap-3">
            <Logo compact />
            <span className="text-[11px] font-semibold tracking-wider text-secondary uppercase">
              Passo 4 de 4
            </span>
          </div>
          <button
            type="button"
            onClick={handleSkip}
            className="px-2 py-1 text-[12px] font-semibold text-on-surface-variant"
          >
            Pular
          </button>
        </div>
      </header>

      <div className="flex-1 px-5 pt-2 pb-10">
        <div className="mb-4">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-secondary uppercase">
              <span className="h-1.5 w-1.5 animate-ping rounded-full bg-secondary" />
              Jornada Definida
            </span>
            <span className="text-[12px] font-medium text-on-surface-variant">
              100% concluído
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-container-high">
            <div className="h-full w-full rounded-full bg-primary-container" />
          </div>
        </div>

        <span className="mb-2 inline-flex items-center gap-1.5 self-start rounded-full bg-secondary-fixed px-4 py-1.5 text-on-secondary-fixed-variant shadow-sm">
          <Icon
            name="celebration"
            filled
            className="text-[18px] text-secondary"
          />
          <span className="text-[12px] font-semibold">
            Seu plano diário está pronto!
          </span>
        </span>

        <h1 className="font-serif text-[30px] leading-[1.15] font-semibold tracking-tight text-primary">
          Bem-vindo(a) ao Lúmina.
          <br />
          <span className="font-normal text-on-surface italic">
            Sua jornada começa hoje.
          </span>
        </h1>
        <p className="mt-2 text-[15px] leading-relaxed text-on-surface-variant">
          Sintetizamos sua biblioteca personalizada com foco em{' '}
          <strong className="font-semibold text-on-surface">
            {interestNames.join(', ') || 'seus interesses'}
          </strong>
          , no ritmo ideal de{' '}
          <span className="font-semibold text-primary">
            {goal} minutos ao dia
          </span>
          .
        </p>

        <div className="mt-5 rounded-xl bg-surface-container-lowest p-4 shadow-sm">
          <div className="mb-3 flex items-center gap-2">
            <Icon name="verified" filled className="text-[20px] text-primary" />
            <span className="text-[16px] font-semibold text-primary">
              Sua Trilha Sob Medida
            </span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-surface-container-low p-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-primary-container text-secondary-fixed">
              <Icon
                name={FEATURES.audioPlayer ? 'headphones' : 'menu_book'}
                filled
                className="text-[20px]"
              />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-semibold tracking-wider text-secondary uppercase">
                1º título reservado
              </p>
              <p className="truncate text-[15px] font-semibold text-on-surface">
                Hábitos Atômicos
              </p>
              <p className="truncate text-[12px] text-on-surface-variant">
                James Clear •{' '}
                {FEATURES.audioPlayer
                  ? `Áudio imersivo (${goal} min)`
                  : `Leitura (${goal} min)`}
              </p>
            </div>
            <Icon name="alarm" className="text-[18px] text-primary" />
            <strong className="text-[12px] text-on-surface">
              {preferences?.reminderTime ?? '07:30'}
            </strong>
          </div>
        </div>

        <div className="mt-5 overflow-hidden rounded-xl shadow-md">
          <div className="flex items-center justify-between bg-tertiary px-4 py-2 text-on-tertiary">
            <div className="flex items-center gap-1.5">
              <Icon
                name="bolt"
                filled
                className="animate-pulse text-[18px] text-secondary-container"
              />
              <span className="text-[10px] font-bold tracking-wider text-secondary-fixed uppercase">
                Oferta de entrada limitada
              </span>
            </div>
            <span className="flex items-center gap-1 rounded bg-tertiary-container px-2 py-0.5 text-[10px] font-semibold">
              <Icon name="schedule" className="text-[14px]" />
              {formatCountdown(secondsLeft)}
            </span>
          </div>

          <div className="bg-surface-container-lowest p-4">
            <span className="inline-flex rounded bg-secondary-fixed px-2 py-1 text-[10px] font-bold tracking-wide text-on-secondary-fixed-variant">
              7 DIAS GRÁTIS + 60% OFF NO PRIMEIRO ANO
            </span>
            <h3 className="font-serif mt-2 text-[24px] font-semibold text-primary">
              Lúmina Ilimitado
            </h3>
            <p className="text-[13px] text-on-surface-variant">
              Toda a biblioteca de sínteses mundiais desbloqueada na ponta dos
              seus dedos.
            </p>

            <div className="mt-3 flex items-baseline justify-between rounded-lg bg-surface-container-low p-4">
              <div>
                <span className="block text-[13px] text-on-surface-variant line-through">
                  R$ 39,90/mês
                </span>
                <div className="mt-0.5 flex items-baseline gap-1">
                  <span className="text-[12px] font-bold text-primary">R$</span>
                  <span className="text-[34px] leading-none font-bold text-primary">
                    {(plan.monthlyEquivalentCents / 100)
                      .toFixed(2)
                      .replace('.', ',')}
                  </span>
                  <span className="text-[13px] font-medium text-on-surface-variant">
                    /mês
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="block rounded bg-primary-fixed px-2 py-1 text-[10px] font-bold text-primary uppercase">
                  Cobrado anualmente
                </span>
                <span className="mt-1 block text-[10px] text-on-surface-variant">
                  {formatCurrencyBRL(plan.priceCents)} / ano
                </span>
              </div>
            </div>

            <ul className="mt-3 mb-3 flex flex-col gap-2">
              {features.map((feature) => (
                <li key={feature.title} className="flex items-start gap-2">
                  <Icon
                    name="check_circle"
                    filled
                    className="mt-0.5 shrink-0 text-[20px] text-secondary"
                  />
                  <span className="text-[15px] leading-snug text-on-surface">
                    <strong className="font-semibold text-primary">
                      {feature.title}
                    </strong>{' '}
                    {feature.detail}
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2 rounded bg-surface-container-high p-3 text-[12px] text-on-surface-variant">
              <Icon
                name="shield"
                className="shrink-0 text-[18px] text-primary"
              />
              Sem cobrança hoje. Cancele com 1 clique até o 7º dia.
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-col items-center gap-3">
          <button
            type="button"
            disabled={submitting}
            onClick={handleSubscribe}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary-container text-[14px] font-semibold text-on-primary shadow-md transition-transform active:scale-[0.98] disabled:opacity-70"
          >
            {submitting ? 'Ativando...' : 'Desbloquear 7 Dias Gratuitos'}
            <Icon name="arrow_forward" className="text-[20px]" />
          </button>
          <button
            type="button"
            onClick={handleSkip}
            className="px-4 py-1 text-center text-[12px] text-on-surface-variant underline decoration-surface-variant underline-offset-4"
          >
            Continuar com a versão limitada (1 síntese / dia)
          </button>
        </div>
      </div>
      {toast}
    </Screen>
  )
}
