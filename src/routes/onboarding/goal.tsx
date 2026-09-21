import { createFileRoute, redirect, useRouter } from '@tanstack/react-router'
import { useState } from 'react'

import { Icon } from '#/components/icon'
import { Logo } from '#/components/logo'
import { Screen } from '#/components/screen'
import { useToast } from '#/components/toast'
import { FEATURES } from '#/lib/features'
import { getOnboardingData, saveGoal } from '#/server/onboarding'

export const Route = createFileRoute('/onboarding/goal')({
  beforeLoad: ({ context }) => {
    if (!context.user) {
      throw redirect({ to: '/signup' })
    }
  },
  loader: async () => {
    const data = await getOnboardingData()
    return { preferences: data.preferences }
  },
  component: GoalPage,
})

const GOALS = [
  {
    minutes: 10,
    title: '10 min/dia',
    tag: 'Ritmo Leve',
    detail: '1 resumo express diário • ~24 livros/ano',
    icon: 'timer',
  },
  {
    minutes: 15,
    title: '15 min/dia',
    tag: 'Ritmo Ideal',
    detail: '1 resumo completo aprofundado • ~36 livros/ano',
    icon: 'auto_awesome',
  },
  {
    minutes: 30,
    title: '30 min/dia',
    tag: 'Ritmo Imersivo',
    detail: '2 resumos diários com anotações • ~72 livros/ano',
    icon: 'local_fire_department',
  },
]

const FORMATS = [
  { value: 'audio', label: 'Áudio Narrado', icon: 'headphones' },
  { value: 'text', label: 'Leitura', icon: 'menu_book' },
  { value: 'hybrid', label: 'Híbrido', icon: 'bolt' },
]

const AVAILABLE_FORMATS = FEATURES.audioPlayer
  ? FORMATS
  : FORMATS.filter((item) => item.value !== 'audio')

const TIMES = [
  { value: '07:30', detail: 'No café da manhã', icon: 'wb_twilight' },
  { value: '12:30', detail: 'Pausa do almoço', icon: 'lunch_dining' },
  { value: '18:30', detail: 'Volta para casa', icon: 'commute' },
  { value: '21:30', detail: 'Antes de dormir', icon: 'bedtime' },
]

function GoalPage() {
  const router = useRouter()
  const { show, toast } = useToast()
  const { preferences } = Route.useLoaderData()
  const [goal, setGoal] = useState(preferences?.dailyGoalMinutes ?? 15)
  const [format, setFormat] = useState(() => {
    const stored = preferences?.preferredFormat
    if (stored && (FEATURES.audioPlayer || stored !== 'audio')) {
      return stored
    }
    return FEATURES.audioPlayer ? 'audio' : 'text'
  })
  const [reminder, setReminder] = useState(preferences?.reminderEnabled ?? true)
  const [time, setTime] = useState(preferences?.reminderTime ?? '07:30')
  const [submitting, setSubmitting] = useState(false)

  const annualBooks = goal === 30 ? 72 : goal === 15 ? 36 : 24

  async function handleContinue() {
    setSubmitting(true)
    const result = await saveGoal({
      data: {
        dailyGoalMinutes: goal,
        preferredFormat: format,
        reminderEnabled: reminder,
        reminderTime: time,
      },
    })
    setSubmitting(false)
    if (!result.ok) {
      show(result.error.message)
      return
    }
    await router.navigate({ to: '/onboarding/offer' })
  }

  return (
    <Screen>
      <header className="pt-safe sticky top-0 z-40 bg-surface/85 px-5 py-3 backdrop-blur-xl">
        <div className="mb-2 flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.navigate({ to: '/onboarding/interests' })}
            className="-ml-2 flex h-11 w-11 items-center justify-center rounded-full text-on-surface active:scale-95"
            aria-label="Voltar"
          >
            <Icon name="arrow_back" className="text-[22px]" />
          </button>
          <Logo />
          <button
            type="button"
            onClick={() => router.navigate({ to: '/onboarding/offer' })}
            className="px-2 text-[12px] font-semibold text-on-surface-variant"
          >
            Pular
          </button>
        </div>
        <div className="flex h-1 w-full overflow-hidden rounded-full bg-surface-container-high">
          <div className="h-full w-3/4 rounded-full bg-primary-container transition-all duration-500" />
        </div>
      </header>

      <div className="flex-1 px-5 pt-3 pb-28">
        <div className="mb-5">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary-fixed px-2.5 py-1 text-[10px] font-bold tracking-wider text-on-secondary-fixed uppercase">
            <Icon name="flag" filled className="text-[14px]" />
            Hábito & Consistência
          </span>
          <h1 className="font-serif mt-2 text-[30px] leading-[1.15] font-semibold tracking-tight text-primary">
            Quanto tempo você quer dedicar por dia?
          </h1>
          <p className="mt-2 text-[15px] text-on-surface-variant">
            Apenas 15 minutos diários equivalem a mais de 30 livros absorvidos
            ao longo de um ano.
          </p>
        </div>

        <span className="text-[10px] font-bold tracking-wider text-on-surface-variant uppercase">
          Selecione seu ritmo diário
        </span>
        <div className="mt-2 mb-5 flex flex-col gap-2">
          {GOALS.map((option) => {
            const active = goal === option.minutes
            return (
              <button
                key={option.minutes}
                type="button"
                onClick={() => setGoal(option.minutes)}
                className={`flex items-center justify-between rounded-xl p-3.5 text-left shadow-sm transition-all ${
                  active
                    ? 'bg-primary-container text-on-primary shadow-md'
                    : 'bg-surface-container-lowest hover:shadow-md'
                }`}
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span
                    className={`grid h-12 w-12 shrink-0 place-items-center rounded-full ${
                      active
                        ? 'bg-white/15 text-secondary-fixed'
                        : 'bg-surface-container text-on-surface-variant'
                    }`}
                  >
                    <Icon
                      name={option.icon}
                      filled={active}
                      className="text-[24px]"
                    />
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[16px] font-semibold ${active ? 'text-white' : 'text-on-surface'}`}
                      >
                        {option.title}
                      </span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                          active
                            ? 'bg-secondary-container text-on-secondary-fixed'
                            : 'bg-surface-container-high text-on-surface-variant'
                        }`}
                      >
                        {option.tag}
                      </span>
                    </div>
                    <span
                      className={`text-[13px] ${active ? 'text-on-primary-container' : 'text-on-surface-variant'}`}
                    >
                      {option.detail}
                    </span>
                  </div>
                </div>
                <span
                  className={`grid h-6 w-6 shrink-0 place-items-center rounded-full ${
                    active
                      ? 'bg-secondary-container text-on-secondary-container'
                      : 'bg-surface-container'
                  }`}
                >
                  <Icon
                    name="check"
                    className={`text-[16px] ${active ? '' : 'opacity-0'}`}
                  />
                </span>
              </button>
            )
          })}
        </div>

        <div className="mb-5">
          <span className="text-[10px] font-bold tracking-wider text-on-surface-variant uppercase">
            Como você prefere aprender?
          </span>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {AVAILABLE_FORMATS.map((option) => {
              const active = format === option.value
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFormat(option.value)}
                  className={`flex flex-col items-center justify-center gap-2 rounded-xl px-2 py-3 text-center transition-all ${
                    active
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  <Icon
                    name={option.icon}
                    className={`text-[24px] ${active ? 'text-secondary-fixed' : 'text-on-surface-variant'}`}
                  />
                  <span className="text-[12px] font-semibold">
                    {option.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-3 rounded-xl bg-surface-container-lowest p-4 shadow-sm">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-secondary-fixed text-on-secondary-fixed">
                <Icon
                  name="notifications_active"
                  filled
                  className="text-[20px]"
                />
              </span>
              <div>
                <span className="block text-[16px] font-semibold text-on-surface">
                  Lembrete Diário
                </span>
                <span className="block text-[13px] text-on-surface-variant">
                  Construa o hábito no seu melhor horário
                </span>
              </div>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={reminder}
              onClick={() => setReminder((value) => !value)}
              className={`relative mt-1 h-6 w-11 shrink-0 rounded-full transition-colors ${reminder ? 'bg-primary' : 'bg-surface-container-highest'}`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${reminder ? 'left-[22px]' : 'left-0.5'}`}
              />
            </button>
          </div>

          <div
            className={`transition-opacity ${reminder ? 'opacity-100' : 'pointer-events-none opacity-40'}`}
          >
            <span className="text-[10px] font-bold tracking-wider text-on-surface-variant uppercase">
              Horário sugerido
            </span>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {TIMES.map((option) => {
                const active = time === option.value
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setTime(option.value)}
                    className={`flex items-center gap-2 rounded-lg p-2.5 text-left transition-all ${
                      active
                        ? 'bg-primary-container text-on-primary'
                        : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                    }`}
                  >
                    <Icon
                      name={option.icon}
                      className={`text-[18px] ${active ? 'text-secondary-container' : 'text-on-surface-variant'}`}
                    />
                    <span className="min-w-0">
                      <span className="block text-[14px] font-bold">
                        {option.value}
                      </span>
                      <span
                        className={`block truncate text-[10px] ${active ? 'opacity-90' : 'text-on-surface-variant'}`}
                      >
                        {option.detail}
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>
            <div className="mt-2 flex items-center gap-2 text-[13px] text-on-surface-variant">
              <Icon name="verified_user" className="text-[16px]" />
              Sem spam. Notificações gentis que respeitam seu foco diário.
            </div>
          </div>
        </div>

        <div className="mb-8 flex items-center gap-3 rounded-xl bg-surface-container-low p-4 shadow-sm">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-secondary-fixed-dim text-on-secondary-fixed">
            <Icon name="insights" className="text-[26px]" />
          </span>
          <div className="min-w-0">
            <span className="text-[10px] font-bold tracking-wider text-secondary uppercase">
              Projeção anual estimada
            </span>
            <p className="font-serif mt-0.5 text-[18px] leading-snug font-medium text-primary">
              {annualBooks} grandes livros dominados às {time} sem sobrecarregar
              sua rotina.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button
            type="button"
            disabled={submitting}
            onClick={handleContinue}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary-container text-[14px] font-semibold text-on-primary shadow-md transition-all hover:bg-primary active:scale-[0.98] disabled:opacity-70"
          >
            {submitting ? 'Salvando...' : 'Continuar para o Passo 4'}
            <Icon name="arrow_forward" className="text-[18px]" />
          </button>
          <p className="px-4 text-center text-[13px] text-on-surface-variant">
            Você pode ajustar sua meta, formato e horários a qualquer momento no
            seu perfil.
          </p>
        </div>
      </div>
      {toast}
    </Screen>
  )
}
