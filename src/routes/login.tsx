import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import { useState } from 'react'

import { Icon } from '#/components/icon'
import { Logo } from '#/components/logo'
import { Screen } from '#/components/screen'
import { useToast } from '#/components/toast'
import { signIn } from '#/server/auth'

export const Route = createFileRoute('/login')({
  component: LoginPage,
})

function LoginPage() {
  const router = useRouter()
  const { show, toast } = useToast()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setSubmitting(true)
    const result = await signIn({ data: { email, password } })
    setSubmitting(false)

    if (!result.ok) {
      show(result.error.message)
      return
    }
    await router.invalidate()
    await router.navigate({ to: '/explore' })
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
        <div className="mb-6 pt-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary-fixed/50 px-3 py-1 text-secondary">
            <span className="text-[12px]">✦</span>
            <span className="text-[12px] font-semibold tracking-wider uppercase">
              Acesso à sua biblioteca
            </span>
          </span>
          <h1 className="font-serif mt-3 text-[28px] leading-[1.15] font-semibold tracking-tight text-primary">
            Que bom ter você de volta.
          </h1>
          <p className="mt-2 text-[15px] leading-relaxed text-on-surface-variant">
            Retome seus 15 minutos diários de aprendizado e acesse seus resumos e citações salvas.
          </p>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <label className="flex flex-col gap-1.5">
            <span className="flex items-center justify-between text-[12px] font-semibold text-on-surface">
              E-mail
              <span className="font-normal text-on-surface-variant">Corporativo ou pessoal</span>
            </span>
            <span className="relative flex items-center">
              <Icon
                name="mail"
                className="pointer-events-none absolute left-3.5 text-[20px] text-outline"
              />
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="seu.email@exemplo.com"
                className="h-12 w-full rounded-xl bg-surface-container-low pl-11 text-[15px] text-on-surface outline-none transition-all placeholder:text-outline focus:bg-surface-container-lowest focus:shadow-[0_0_0_2px_#064e3b]"
              />
            </span>
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="flex items-center justify-between text-[12px] font-semibold text-on-surface">
              Senha
              <button
                type="button"
                className="text-[12px] text-primary hover:underline"
                onClick={() => show('Link de redefinição enviado para seu e-mail')}
              >
                Esqueceu a senha?
              </button>
            </span>
            <span className="relative flex items-center">
              <Icon
                name="lock"
                className="pointer-events-none absolute left-3.5 text-[20px] text-outline"
              />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                className="h-12 w-full rounded-xl bg-surface-container-low pr-11 pl-11 text-[15px] text-on-surface outline-none transition-all placeholder:text-outline focus:bg-surface-container-lowest focus:shadow-[0_0_0_2px_#064e3b]"
              />
              <button
                type="button"
                aria-label="Alternar visibilidade da senha"
                onClick={() => setShowPassword((value) => !value)}
                className="absolute right-3.5 flex h-8 w-8 items-center justify-center rounded-full text-outline transition-colors hover:text-on-surface"
              >
                <Icon name={showPassword ? 'visibility_off' : 'visibility'} className="text-[20px]" />
              </button>
            </span>
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary text-[15px] font-semibold text-on-primary shadow-[0_4px_14px_rgba(6,78,59,0.25)] transition-all hover:bg-primary-container active:scale-[0.98] disabled:opacity-70"
          >
            {submitting ? (
              <>
                <Icon name="progress_activity" className="animate-spin text-[18px]" />
                Acessando sua estante...
              </>
            ) : (
              <>
                Entrar na Minha Conta
                <Icon name="arrow_forward" className="text-[18px]" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 rounded-xl bg-surface-container-lowest p-4 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.04)]">
          <div className="pl-2">
            <div className="mb-1 flex items-center gap-1.5 text-secondary">
              <Icon name="auto_stories" className="text-[15px]" />
              <span className="text-[11px] font-semibold tracking-wider uppercase">
                Inspiração do Dia
              </span>
            </div>
            <p className="font-serif text-[17px] leading-snug text-on-surface italic">
              “O conhecimento não é aquilo que você absorve, mas sim o que você pratica com
              consistência.”
            </p>
            <p className="mt-1.5 text-[13px] font-medium text-on-surface-variant">
              — De <span className="font-semibold text-primary">Hábitos Atômicos</span> no Lúmina
            </p>
          </div>
        </div>

        <p className="mt-6 text-center text-[15px] text-on-surface-variant">
          Ainda não tem uma conta no Lúmina?{' '}
          <Link
            to="/signup"
            className="font-semibold text-primary underline decoration-secondary-container decoration-2 underline-offset-4"
          >
            Cadastre-se gratuitamente
          </Link>
        </p>
      </div>
      {toast}
    </Screen>
  )
}
