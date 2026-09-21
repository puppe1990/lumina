import { createFileRoute, redirect, useRouter } from '@tanstack/react-router'
import { useState } from 'react'

import { Icon } from '#/components/icon'
import { Logo } from '#/components/logo'
import { Screen } from '#/components/screen'
import { useToast } from '#/components/toast'
import { FEATURES } from '#/lib/features'
import { formatCurrencyBRL, formatDateBRL } from '#/lib/text'
import { cancelPlan, getPlansData, subscribeToPlan } from '#/server/plans'

export const Route = createFileRoute('/plans')({
  beforeLoad: ({ context }) => {
    if (!context.user) {
      throw redirect({ to: '/login' })
    }
  },
  loader: async () => getPlansData(),
  component: PlansPage,
})

function buildBenefits(audioPlayer: boolean) {
  return [
    audioPlayer
      ? {
          icon: 'headphones',
          title: 'Narração profissional e curada',
          detail: 'Vozes humanas dinâmicas em velocidade até 2x',
        }
      : {
          icon: 'auto_stories',
          title: 'Resumos editoriais curados',
          detail: 'Textos diagramados por especialistas, no seu ritmo',
        },
    {
      icon: 'download_for_offline',
      title: 'Modo offline completo',
      detail: audioPlayer
        ? 'Baixe audiobooks e leia sem depender de internet'
        : 'Leia seus resumos sem depender de internet',
    },
    {
      icon: 'send_to_mobile',
      title: 'Sincronização com Kindle e PDF',
      detail: 'Envie resumos estruturados com um simples toque',
    },
    {
      icon: 'auto_stories',
      title: 'Lançamentos globais semanais',
      detail: 'Best-sellers mundiais traduzidos e dissecados',
    },
  ]
}

function PlansPage() {
  const data = Route.useLoaderData()
  const router = useRouter()
  const { show, toast } = useToast()
  const benefits = buildBenefits(FEATURES.audioPlayer)
  const [selected, setSelected] = useState(
    data.plans.find((plan) => plan.isFeatured)?.slug ?? data.plans[0]?.slug,
  )
  const [submitting, setSubmitting] = useState(false)

  const current = data.subscription
  const selectedPlan = data.plans.find((plan) => plan.slug === selected)

  async function handleSubscribe() {
    if (!selectedPlan) {
      return
    }
    setSubmitting(true)
    const result = await subscribeToPlan({
      data: { planSlug: selectedPlan.slug },
    })
    setSubmitting(false)
    if (!result.ok) {
      show(result.error.message)
      return
    }
    show(
      selectedPlan.trialDays > 0
        ? 'Teste de 7 dias ativado!'
        : 'Assinatura mensal ativada!',
    )
    await router.invalidate()
  }

  async function handleCancel() {
    const result = await cancelPlan()
    if (!result.ok) {
      show(result.error.message)
      return
    }
    show('Assinatura cancelada')
    await router.invalidate()
  }

  return (
    <Screen nav="planos">
      <header className="pt-safe sticky top-0 z-40 bg-surface/85 px-5 py-3 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <Logo />
          {current ? (
            <span className="rounded-full bg-primary-fixed px-3 py-1 text-[10px] font-bold tracking-wider text-primary uppercase">
              {current.isTrialing
                ? `Teste: ${current.trialDaysLeft}d`
                : 'Premium'}
            </span>
          ) : (
            <span className="text-[10px] font-semibold tracking-wider text-on-surface-variant uppercase">
              Plano Gratuito
            </span>
          )}
        </div>
      </header>

      <div className="flex flex-col px-5 pt-3 pb-8">
        <div className="mb-6 flex flex-col items-center text-center">
          <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-secondary-fixed px-3 py-1 text-secondary shadow-sm">
            <Icon name="workspace_premium" filled className="text-[16px]" />
            <span className="text-[10px] font-bold tracking-wider uppercase">
              Lúmina Premium
            </span>
          </span>
          <h2 className="font-serif mt-1 mb-2 text-[30px] leading-tight font-semibold text-on-surface">
            Acelere seu conhecimento em minutos por dia
          </h2>
          <p className="max-w-xs text-[15px] leading-relaxed text-on-surface-variant">
            Acesso irrestrito aos {data.totalBooks} resumos essenciais em{' '}
            {FEATURES.audioPlayer
              ? 'áudio imersivo e texto diagramado.'
              : 'texto editorial diagramado.'}
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-2.5">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="flex items-center gap-3 rounded-xl bg-surface-container-lowest p-3.5 shadow-sm"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                <Icon name={benefit.icon} filled className="text-[22px]" />
              </span>
              <div className="min-w-0">
                <span className="block text-[15px] leading-tight text-on-surface">
                  {benefit.title}
                </span>
                <span className="block truncate text-[13px] text-on-surface-variant">
                  {benefit.detail}
                </span>
              </div>
              <Icon
                name="check_circle"
                filled
                className="ml-auto shrink-0 text-[20px] text-secondary"
              />
            </div>
          ))}
        </div>

        <div className="mb-8 flex flex-col gap-3.5">
          {data.plans.map((plan) => {
            const active = plan.slug === selected
            return (
              <button
                key={plan.id}
                type="button"
                onClick={() => setSelected(plan.slug)}
                className={`relative flex flex-col rounded-xl p-4 text-left transition-all ${
                  active
                    ? 'bg-surface-container-lowest shadow-md ring-2 ring-primary'
                    : 'bg-surface-container-low opacity-90 shadow-sm'
                }`}
              >
                {plan.badge ? (
                  <span className="absolute -top-3 right-4 flex items-center gap-1 rounded-full bg-secondary-container px-2.5 py-0.5 text-[10px] font-bold text-on-secondary-fixed shadow-sm">
                    <Icon
                      name="local_fire_department"
                      filled
                      className="text-[12px]"
                    />
                    {plan.badge.toUpperCase()}
                  </span>
                ) : null}
                <div className="mb-1.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`grid h-5 w-5 place-items-center rounded-full ${active ? 'bg-primary' : 'bg-surface-container-highest'}`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${active ? 'bg-white' : 'bg-transparent'}`}
                      />
                    </span>
                    <span className="text-[16px] font-semibold text-on-surface">
                      {plan.name}
                    </span>
                  </div>
                  {plan.trialDays > 0 ? (
                    <span className="rounded-full bg-primary-fixed px-2 py-0.5 text-[10px] font-medium text-primary">
                      {plan.trialDays} DIAS GRÁTIS
                    </span>
                  ) : (
                    <span className="text-[11px] text-on-surface-variant">
                      Flexível
                    </span>
                  )}
                </div>
                <div className="mt-2 flex items-baseline justify-between border-t border-surface-container-highest pt-2">
                  <div className="flex flex-col">
                    <div className="flex items-baseline gap-1">
                      <span
                        className={`text-[24px] leading-none font-bold ${active ? 'text-primary' : 'text-on-surface'}`}
                      >
                        {formatCurrencyBRL(plan.monthlyEquivalentCents)}
                      </span>
                      <span className="text-[13px] text-on-surface-variant">
                        / mês
                      </span>
                    </div>
                    <span className="mt-0.5 text-[12px] text-on-surface-variant">
                      {plan.interval === 'yearly'
                        ? `${formatCurrencyBRL(plan.priceCents)} faturado a cada 12 meses`
                        : 'Cobrança recorrente mensal'}
                    </span>
                  </div>
                  <span
                    className={`text-[11px] font-semibold ${active ? 'text-secondary' : 'text-outline'}`}
                  >
                    {plan.interval === 'yearly'
                      ? 'Melhor custo-benefício'
                      : 'Cancele quando quiser'}
                  </span>
                </div>
              </button>
            )
          })}
        </div>

        <div className="mb-8 flex flex-col rounded-xl bg-surface-container-low p-4">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex text-secondary">
              {[0, 1, 2, 3, 4].map((star) => (
                <Icon key={star} name="star" filled className="text-[16px]" />
              ))}
            </div>
            <span className="text-[12px] font-bold text-on-surface">
              4.9 / 5.0
            </span>
            <span className="text-[13px] text-on-surface-variant">
              (+28 mil leitores)
            </span>
          </div>
          <p className="font-serif mb-3 text-[17px] leading-snug text-on-surface italic">
            “O Lúmina transformou meu trajeto matinal em uma pós-graduação
            constante. É a ferramenta mais eficiente que uso hoje.”
          </p>
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-[12px] font-bold text-on-primary">
              CM
            </span>
            <div className="flex flex-col">
              <span className="text-[12px] leading-tight font-semibold text-on-surface">
                Carolina Mendonça
              </span>
              <span className="text-[12px] text-on-surface-variant">
                Head de Produto & Inovação
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          {current ? (
            <>
              <div className="flex w-full items-center justify-between rounded-xl bg-primary-fixed/40 p-4">
                <div>
                  <p className="text-[13px] font-semibold text-primary">
                    Assinatura ativa
                  </p>
                  <p className="text-[12px] text-on-surface-variant">
                    {current.plan.name} •{' '}
                    {formatDateBRL(current.subscription.currentPeriodEnd)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="rounded-full border border-primary/30 px-3 py-1.5 text-[12px] font-semibold text-primary"
                >
                  Cancelar
                </button>
              </div>
              <button
                type="button"
                disabled={submitting || !selectedPlan}
                onClick={handleSubscribe}
                className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-primary-container text-[16px] font-semibold text-on-primary-container shadow-lg transition-transform active:scale-[0.98] disabled:opacity-70"
              >
                <Icon name="lock_open" className="text-[20px]" />
                Trocar para {selectedPlan?.name}
              </button>
            </>
          ) : (
            <button
              type="button"
              disabled={submitting}
              onClick={handleSubscribe}
              className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-primary-container text-[16px] font-semibold text-on-primary-container shadow-lg transition-transform active:scale-[0.98] disabled:opacity-70"
            >
              <Icon name="lock_open" className="text-[20px]" />
              {selectedPlan && selectedPlan.trialDays > 0
                ? `Iniciar ${selectedPlan.trialDays} Dias Gratuitos`
                : 'Assinar Plano Mensal'}
            </button>
          )}

          <div className="mt-1 flex flex-col items-center gap-1.5 text-center">
            <div className="flex items-center gap-1.5 text-[12px] text-on-surface-variant">
              <Icon
                name="verified_user"
                className="text-[16px] text-surface-tint"
              />
              <span>
                Sem cobrança imediata. Cancele facilmente com 1 clique.
              </span>
            </div>
            <div className="mt-2 flex items-center justify-center gap-3 text-[12px] text-on-surface-variant/70">
              <span className="flex items-center gap-1">
                <Icon name="qr_code_2" className="text-[15px]" /> Pix
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Icon name="credit_card" className="text-[15px]" /> Cartão
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Icon name="phone_iphone" className="text-[15px]" /> Apple Pay
              </span>
            </div>
          </div>
        </div>
      </div>
      {toast}
    </Screen>
  )
}
