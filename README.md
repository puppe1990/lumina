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
npm run assets:generate # gera og.png e ícones da PWA
```

## Catálogo

O catálogo (`src/db/catalog-data.ts`) é alinhado ao acervo local de ebooks em
`~/Desktop/estudo/Ebooks`: 26 livros que existem de fato na biblioteca, cada um com resumo
editorial real — 4 capítulos, 4 ideias-chave e 2 citações — distribuídos em 9 categorias e 8
coleções temáticas. Títulos sem correspondência no acervo foram removidos.

As capas reais ficam em `public/covers/<slug>.jpg` e são obtidas via Open Library:

```bash
node scripts/fetch-covers.mjs
```

O componente `BookCover` usa a imagem quando existe e cai para uma capa gerada (gradiente da
marca) como fallback.

## Variáveis de ambiente

| Variável        | Padrão                  | Descrição                                                        |
| --------------- | ----------------------- | ---------------------------------------------------------------- |
| `VITE_APP_URL`  | `http://localhost:3000` | URL pública usada nas meta tags Open Graph/Twitter (`og:image`). |
| `DATABASE_FILE` | `data/lumina.db`        | Caminho do arquivo SQLite.                                       |

## PWA

O app é instalável e funciona offline:

- `public/manifest.webmanifest` — nome, ícones (`any` + `maskable`), `standalone`, `theme_color` e
  atalhos para Explorar/Biblioteca.
- `public/sw.js` — service worker com pré-cache do shell, **network-first** para navegação (com
  fallback para `public/offline.html`) e **stale-while-revalidate** para assets estáticos.
- `src/components/pwa-register.tsx` — registra o SW em produção e exibe o prompt de instalação
  (`beforeinstallprompt`).

O service worker é registrado apenas em builds de produção. Para testar:

```bash
npm run build && npm run preview
```

## Assets (OG + ícones)

Imagem de preview social (1200×630) e ícones da PWA são gerados a partir dos templates
`scripts/og.html` e `scripts/icon.html`:

```bash
npm run assets:generate   # requer Chromium do Playwright
```

As meta tags (`og:*`, `twitter:*`, `manifest`, favicon e `apple-touch-icon`) são declaradas em
`src/routes/__root.tsx`, usando `VITE_APP_URL` para montar URLs absolutas.

## Deploy (Cleat)

O app é publicado como servidor Node via [Nitro](https://nitro.build) no painel Cleat.

- `npm run build` gera `.output/` (preset `node-server`); `npm start` roda `node .output/server/index.mjs`.
- `.cleat_deploy/deploy.json` define runtime Node 22, comando de start e memória.
- Persistência: aponte `DATABASE_FILE` para o data dir do app (ex.: `/opt/lumina/data/lumina.db`).

```bash
cleat deploy lumina --watch
```

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
