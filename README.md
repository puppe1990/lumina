# Lúmina

[![CI](https://github.com/puppe1990/lumina/actions/workflows/ci.yml/badge.svg)](https://github.com/puppe1990/lumina/actions/workflows/ci.yml)

App de assinatura de resumos de livros em áudio e texto. Reconstrução do design "Editorial
Intellect" (arquivos Stitch) como uma aplicação full-stack com **TanStack Start**, **SQLite** e
**TDD com Faker**.

## Stack

| Camada    | Tecnologia                                            |
| --------- | ----------------------------------------------------- |
| Framework | TanStack Start (React 19 + Vite 8, file-based routes) |
| Estilo    | Tailwind CSS v4 com design tokens do `DESIGN.md`      |
| Banco     | SQLite (`better-sqlite3`) + Drizzle ORM               |
| Testes    | Vitest + `@faker-js/faker` (factories de teste)       |
| Validação | Zod (validators das server functions)                 |
| Auth      | Sessões com cookie httpOnly + hash scrypt             |

## Rodando

```bash
npm install
npm run dev        # http://localhost:3000
```

O catálogo é semeado automaticamente no primeiro acesso. Para recriar o banco:

```bash
npm run db:seed    # popula data/lumina.db se estiver vazio
npm run db:reset   # limpa e recria o catálogo
```

## Scripts

```bash
npm run dev         # servidor de desenvolvimento
npm run build       # build de produção
npm test            # Vitest (72 testes)
npm run test:watch  # Vitest em watch
npm run test:coverage # Vitest com cobertura
npm run typecheck   # tsc --noEmit
npm run lint        # ESLint
npm run check       # Prettier --check
npm run format      # Prettier --write + ESLint --fix
npm run ci          # check + lint + typecheck + test + build
```

## Variáveis de ambiente

| Variável        | Padrão                  | Descrição                                                        |
| --------------- | ----------------------- | ---------------------------------------------------------------- |
| `VITE_APP_URL`  | `http://localhost:3000` | URL pública usada nas meta tags Open Graph/Twitter (`og:image`). |
| `DATABASE_FILE` | `data/lumina.db`        | Caminho do arquivo SQLite.                                       |

## Open Graph

O preview social (`public/og.png`, 1200×630) é gerado a partir de `scripts/og.html`:

```bash
npm run og:generate   # requer Chromium do Playwright
```

As meta tags (`og:*`, `twitter:*`) e o favicon (`public/favicon.svg`) são declaradas em
`src/routes/__root.tsx`, usando `VITE_APP_URL` para montar URLs absolutas.

## Qualidade de código

- **CI** (`.github/workflows/ci.yml`): roda em push/PR para `main` — Prettier, ESLint, typecheck,
  testes e build.
- **Pre-commit** (`.husky/pre-commit`): roda `lint-staged` (Prettier + ESLint nos arquivos
  alterados) e a suíte de testes antes de cada commit.

## Arquitetura

```
src/
  db/            conexão SQLite, DDL, schema Drizzle e seed com Faker
  domain/        regras de negócio puras (recebem um Db injetado)
    auth/        cadastro, login, senhas (scrypt) e sessões
    catalog/     categorias, busca sem acento, destaques, coleções
    library/     salvar, progresso, conclusão, citações e recomendações
    onboarding/  interesses, meta diária, formato e lembretes
    plans/       planos anuais/mensais, trial e assinaturas
  server/        server functions (createServerFn) + cookie de sessão
  routes/        rotas file-based do TanStack Router
  components/    design system reutilizável (Screen, BookCover, BottomNav…)
  test/          factories Faker para dados de teste
```

O núcleo de domínio é testável de forma isolada: cada serviço recebe um `Db` (SQLite em memória
nos testes) e devolve tipos puros. As server functions apenas orquestram sessão + domínio.

### Cobertura de testes

Os testes cobrem autenticação (hash, duplicidade, sessão expirada), onboarding, catálogo (busca
insensível a acento/caixa, ordenação, coleções), biblioteca (progresso, conclusão, estatísticas,
citações, recomendações) e planos (trial, troca de plano, cancelamento), além da integridade do
seed.

```bash
npm test
```

## Fluxo do app

`/` → onboarding (boas-vindas → interesses → meta → oferta) → `/explore` → `/reader/:bookId`,
`/library`, `/plans`. Todas as rotas do app exigem sessão; `/login` e `/signup` são públicas.

## Recursos

- Busca de resumos insensível a acentos e maiúsculas (índice `search_index` normalizado).
- Áudio player simulado com velocidade, scrubber, progresso persistido e "Grifar" citação.
- Biblioteca com trilha em andamento, salvos, concluídos, destaques e recomendações por interesse.
- Assinatura com trial de 7 dias, troca de plano e cancelamento.
