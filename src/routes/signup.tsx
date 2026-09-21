import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import { useState } from 'react'

import { Icon } from '#/components/icon'
import { Logo } from '#/components/logo'
import { Screen } from '#/components/screen'
import { useToast } from '#/components/toast'
import { FEATURES } from '#/lib/features'
import { signUp } from '#/server/auth'

export const Route = createFileRoute('/signup')({
  component: SignUpPage,
})

function scorePassword(value: string): number {
  let score = 0
  if (value.length >= 8) score++
  if (/[A-Z]/.test(value)) score++
  if (/[0-9]/.test(value)) score++
  if (/[^A-Za-z0-9]/.test(value)) score++
  return score
}

const STRENGTH_LABELS = [
  'Força da senha',
  'Senha fraca',
  'Senha razoável',
  'Senha boa',
  'Senha excelente e segura!',
]
const BAR_COLORS = [
  'bg-surface-container-highest',
  'bg-error',
  'bg-secondary-container',
  'bg-surface-tint',
  'bg-primary',
]

function SignUpPage() {
  const router = useRouter()
  const { show, toast } = useToast()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const strength = password ? scorePassword(password) : 0

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setSubmitting(true)
    const result = await signUp({ data: { name, email, password } })
    setSubmitting(false)

    if (!result.ok) {
      show(result.error.message)
      return
    }
    await router.invalidate()
    await router.navigate({ to: '/onboarding/interests' })
  }

  return (
    <Screen>
      <header className="pt-safe sticky top-0 z-40 bg-surface/85 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between px-5">
          <Link
            to="/onboarding/welcome"
            className="-ml-3 flex h-11 w-11 items-center justify-center rounded-full text-on-surface transition-colors hover:bg-surface-container active:scale-95"
            aria-label="Voltar"
          >
            <Icon name="arrow_back" className="text-[22px]" />
          </Link>
          <Logo />
          <span className="w-8" />
        </div>
      </header>

      <div className="flex flex-1 flex-col px-5 pb-12">
        <header className="mt-2 mb-6 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary-container/15 px-3 py-1 text-secondary">
            <Icon name="auto_awesome" filled className="text-[14px]" />
            <span className="text-[11px] font-semibold tracking-wider uppercase">
              15 Minutos de Sabedoria
            </span>
          </span>
          <h1 className="font-serif mt-3 text-[30px] leading-[1.15] font-semibold tracking-tight text-primary">
            Comece seu ritual diário de leitura
          </h1>
          <p className="mx-auto mt-2 max-w-xs text-[15px] text-on-surface-variant">
            {FEATURES.audioPlayer
              ? 'Junte-se a milhares de mentes curiosas e acesse sínteses essenciais em áudio e texto.'
              : 'Junte-se a milhares de mentes curiosas e acesse sínteses essenciais em texto editorial.'}
          </p>
        </header>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <label className="flex flex-col gap-1.5">
            <span className="text-[12px] font-semibold text-on-surface">
              Nome Completo
            </span>
            <span className="relative flex items-center">
              <Icon
                name="person"
                className="pointer-events-none absolute left-3.5 text-[20px] text-on-surface-variant"
              />
              <input
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Como gostaria de ser chamado(a)?"
                className="h-12 w-full rounded-xl bg-surface-container-lowest pl-11 text-[15px] text-on-surface shadow-sm outline-none transition-all placeholder:text-outline focus:bg-surface-container-low"
              />
            </span>
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-[12px] font-semibold text-on-surface">
              E-mail
            </span>
            <span className="relative flex items-center">
              <Icon
                name="mail"
                className="pointer-events-none absolute left-3.5 text-[20px] text-on-surface-variant"
              />
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="seu.melhor@email.com"
                className="h-12 w-full rounded-xl bg-surface-container-lowest pl-11 text-[15px] text-on-surface shadow-sm outline-none transition-all placeholder:text-outline focus:bg-surface-container-low"
              />
            </span>
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="flex items-center justify-between">
              <span className="text-[12px] font-semibold text-on-surface">
                Senha Secreta
              </span>
              <span className="text-[11px] text-on-surface-variant">
                Mínimo 8 caracteres
              </span>
            </span>
            <span className="relative flex items-center">
              <Icon
                name="lock"
                className="pointer-events-none absolute left-3.5 text-[20px] text-on-surface-variant"
              />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Crie uma senha forte"
                className="h-12 w-full rounded-xl bg-surface-container-lowest pr-11 pl-11 text-[15px] text-on-surface shadow-sm outline-none transition-all placeholder:text-outline focus:bg-surface-container-low"
              />
              <button
                type="button"
                aria-label="Alternar visualização da senha"
                onClick={() => setShowPassword((value) => !value)}
                className="absolute right-3 flex h-8 w-8 items-center justify-center rounded-full text-on-surface-variant active:scale-95"
              >
                <Icon
                  name={showPassword ? 'visibility_off' : 'visibility'}
                  className="text-[20px]"
                />
              </button>
            </span>
            <span className="grid grid-cols-4 gap-1.5 pt-1">
              {[0, 1, 2, 3].map((index) => (
                <span
                  key={index}
                  className={`h-1 rounded-full transition-colors duration-300 ${
                    index < strength ? BAR_COLORS[strength] : BAR_COLORS[0]
                  }`}
                />
              ))}
            </span>
            <span className="flex items-center justify-between text-[11px]">
              <span
                className={
                  strength >= 3
                    ? 'font-semibold text-primary'
                    : 'text-on-surface-variant'
                }
              >
                {STRENGTH_LABELS[strength]}
              </span>
              <span className="flex items-center gap-0.5 text-secondary">
                <Icon name="security" className="text-[12px]" />
                Criptografia de ponta a ponta
              </span>
            </span>
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary text-[15px] font-semibold text-on-primary shadow-md transition-all hover:bg-primary-container active:scale-[0.98] disabled:opacity-70"
          >
            {submitting ? (
              <>
                <Icon
                  name="progress_activity"
                  className="animate-spin text-[18px]"
                />
                Criando sua estante...
              </>
            ) : (
              <>
                Criar Conta Gratuita
                <Icon name="arrow_forward" className="text-[18px]" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 rounded-xl bg-surface-container-lowest p-4 shadow-sm">
          <div className="mb-2.5 flex items-center gap-2">
            <Icon
              name="verified"
              filled
              className="text-[16px] text-secondary"
            />
            <span className="text-[12px] font-semibold text-primary">
              O que você ganha ao entrar:
            </span>
          </div>
          <ul className="flex flex-col gap-2 text-[13px] text-on-surface-variant">
            <li className="flex items-start gap-2.5">
              <Icon
                name="check_circle"
                className="mt-0.5 text-[16px] text-secondary"
              />
              <span>
                <strong className="font-semibold text-on-surface">
                  1 livro-resumo gratuito
                </strong>{' '}
                selecionado por especialistas todo dia
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <Icon
                name="check_circle"
                className="mt-0.5 text-[16px] text-secondary"
              />
              <span>
                <strong className="font-semibold text-on-surface">
                  {FEATURES.audioPlayer
                    ? 'Áudios narrados'
                    : 'Resumos editoriais'}
                </strong>{' '}
                com sínteses conceituais em 15 minutos
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <Icon
                name="check_circle"
                className="mt-0.5 text-[16px] text-secondary"
              />
              <span>
                <strong className="font-semibold text-on-surface">
                  Sem cobrança automática
                </strong>{' '}
                ou surpresas após o cadastro
              </span>
            </li>
          </ul>
        </div>

        <p className="mt-6 text-center text-[15px] text-on-surface-variant">
          Já possui uma conta no Lúmina?{' '}
          <Link
            to="/login"
            className="font-semibold text-primary underline decoration-primary/40 underline-offset-4"
          >
            Entrar
          </Link>
        </p>
      </div>
      {toast}
    </Screen>
  )
}
