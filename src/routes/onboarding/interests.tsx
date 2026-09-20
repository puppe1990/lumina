import { createFileRoute, redirect, useRouter } from '@tanstack/react-router'
import { useState } from 'react'

import { Icon } from '#/components/icon'
import { Logo } from '#/components/logo'
import { Screen } from '#/components/screen'
import { useToast } from '#/components/toast'
import { getOnboardingData, saveInterests } from '#/server/onboarding'

export const Route = createFileRoute('/onboarding/interests')({
  beforeLoad: ({ context }) => {
    if (!context.user) {
      throw redirect({ to: '/signup' })
    }
  },
  loader: async () => {
    const data = await getOnboardingData()
    return { categories: data.categories, interests: data.interests }
  },
  component: InterestsPage,
})

function InterestsPage() {
  const router = useRouter()
  const { show, toast } = useToast()
  const { categories, interests } = Route.useLoaderData()
  const [selected, setSelected] = useState<string[]>(
    interests.map((category) => category.id),
  )
  const [submitting, setSubmitting] = useState(false)

  const ready = selected.length >= 3

  function toggle(categoryId: string) {
    setSelected((current) =>
      current.includes(categoryId)
        ? current.filter((id) => id !== categoryId)
        : [...current, categoryId],
    )
  }

  async function handleContinue() {
    if (!ready) {
      show('Selecione 3 ou mais tópicos para continuar')
      return
    }
    setSubmitting(true)
    const result = await saveInterests({ data: { categoryIds: selected } })
    setSubmitting(false)
    if (!result.ok) {
      show(result.error.message)
      return
    }
    await router.navigate({ to: '/onboarding/goal' })
  }

  return (
    <Screen>
      <header className="pt-safe sticky top-0 z-40 border-b border-stone-200/60 bg-surface px-5 pt-4 pb-3">
        <div className="mb-3 flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.navigate({ to: '/onboarding/welcome' })}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-200/60 text-stone-700 active:scale-95"
            aria-label="Voltar"
          >
            <Icon name="arrow_back" className="text-[20px]" />
          </button>
          <Logo />
          <button
            type="button"
            onClick={() => router.navigate({ to: '/onboarding/goal' })}
            className="px-2 py-1 text-[11px] font-semibold text-stone-500"
          >
            Pular
          </button>
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-semibold tracking-wider text-stone-500 uppercase">
            <span className="font-bold text-primary">Passo 2 de 4</span>
            <span>Personalização</span>
          </div>
          <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-stone-200">
            <div className="h-full w-2/4 rounded-full bg-primary transition-all duration-500" />
          </div>
        </div>
      </header>

      <div className="flex-1 px-5 pt-4 pb-32">
        <div className="mb-5">
          <span className="mb-2.5 inline-flex items-center gap-1.5 rounded-full border border-primary-fixed bg-primary-fixed/30 px-2.5 py-1 text-[11px] font-semibold text-on-primary-fixed-variant">
            <Icon
              name="auto_awesome"
              filled
              className="text-[14px] text-secondary"
            />
            Curadoria Inteligente
          </span>
          <h1 className="font-serif text-[28px] leading-[1.18] font-bold tracking-tight text-primary">
            O que você deseja dominar ou aprimorar?
          </h1>
          <p className="mt-2 text-[13px] leading-relaxed text-on-surface-variant">
            Selecione{' '}
            <strong className="font-semibold text-primary">
              3 ou mais tópicos
            </strong>{' '}
            para refinarmos seus resumos diários em áudio e texto de 15 minutos.
          </p>
        </div>

        <div className="mb-5 flex items-center justify-between rounded-2xl border border-stone-200/80 bg-white p-3.5 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-50 text-secondary">
              <Icon name="timer" filled className="text-[22px]" />
            </span>
            <div>
              <p className="text-[12px] font-semibold text-on-surface">
                Sua meta diária de síntese
              </p>
              <p className="text-[11px] text-on-surface-variant">
                1 resumo/dia (apenas 15 min)
              </p>
            </div>
          </div>
          <span className="rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-800">
            15 min/dia
          </span>
        </div>

        <div className="mb-3 flex items-center justify-between">
          <span className="text-[12px] font-bold tracking-wider text-stone-600 uppercase">
            Categorias em Destaque
          </span>
          <span className="rounded-full bg-primary-fixed/40 px-2 py-0.5 text-[11px] font-medium text-primary">
            {selected.length} selecionados
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {categories.map((category) => {
            const isSelected = selected.includes(category.id)
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => toggle(category.id)}
                className={`relative flex flex-col rounded-2xl border-2 p-3 text-left transition-all ${
                  isSelected
                    ? 'border-primary bg-primary-fixed/30 shadow-sm'
                    : 'border-stone-200 bg-white hover:border-primary'
                }`}
              >
                <div className="mb-2 flex items-start justify-between">
                  <span
                    className={`grid h-8 w-8 place-items-center rounded-xl ${
                      isSelected
                        ? 'bg-primary text-amber-300'
                        : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    <Icon name={category.icon} className="text-[18px]" />
                  </span>
                  <span
                    className={`grid h-5 w-5 place-items-center rounded-full ${
                      isSelected
                        ? 'bg-primary text-white'
                        : 'border border-stone-300 bg-white'
                    }`}
                  >
                    {isSelected ? (
                      <Icon name="check" className="text-[14px]" />
                    ) : null}
                  </span>
                </div>
                <span className="text-[14px] leading-tight font-bold text-primary">
                  {category.name}
                </span>
                <span className="mt-0.5 text-[11px] text-stone-600">
                  {category.description}
                </span>
                <span className="mt-1.5 flex items-center gap-1 text-[10px] font-medium text-primary/80">
                  <span className="h-1 w-1 rounded-full bg-secondary-container" />{' '}
                  +{category.bookCount} resumos
                </span>
              </button>
            )
          })}
        </div>

        <div className="mt-5 flex items-center gap-3 rounded-2xl bg-primary p-3.5 text-white shadow-md">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary-container text-amber-300">
            <Icon name="recommend" filled className="text-[20px]" />
          </span>
          <div className="text-[12px] leading-snug">
            <p className="font-semibold text-secondary-fixed">
              Recomendação inicial pronta:
            </p>
            <p className="text-stone-300">
              “Hábitos Atômicos” e “Princípios” combinam com suas escolhas.
            </p>
          </div>
        </div>
      </div>

      <footer className="pb-safe fixed bottom-0 z-30 w-full max-w-[430px] border-t border-stone-200/80 bg-white/95 p-4 backdrop-blur-md">
        <button
          type="button"
          disabled={submitting}
          onClick={handleContinue}
          className={`flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-[14px] font-semibold text-white shadow-lg transition-all active:scale-[0.99] disabled:opacity-70 ${
            ready ? 'bg-primary hover:bg-primary-container' : 'bg-primary/60'
          }`}
        >
          {submitting ? 'Salvando...' : 'Continuar para Minha Trilha'}
          <Icon name="arrow_forward" className="text-[18px]" />
        </button>
        <p className="mt-2 text-center text-[11px] text-stone-500">
          Você poderá alterar seus interesses e metas a qualquer momento no seu
          perfil.
        </p>
      </footer>
      {toast}
    </Screen>
  )
}
