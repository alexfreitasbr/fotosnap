# Turborepo starter

This Turborepo starter is maintained by the Turborepo core team.

## Using this example

Run the following command:

```sh
npx create-turbo@latest
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `@repo/ui`: a stub React component library shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended):

```sh
cd my-turborepo
turbo build
```

Without global `turbo`, use your package manager:

```sh
cd my-turborepo
npx turbo build
pnpm dlx turbo build
pnpm exec turbo build
```

You can build a specific package by using a [filter](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters):

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed:

```sh
turbo build --filter=docs
```

Without global `turbo`:

```sh
npx turbo build --filter=docs
pnpm exec turbo build --filter=docs
pnpm exec turbo build --filter=docs
```

### Develop

To develop all apps and packages, run the following command:

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended):

```sh
cd my-turborepo
turbo dev
```

Without global `turbo`, use your package manager:

```sh
cd my-turborepo
npx turbo dev
pnpm exec turbo dev
pnpm exec turbo dev
```

You can develop a specific package by using a [filter](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters):

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed:

```sh
turbo dev --filter=web
```

Without global `turbo`:

```sh
npx turbo dev --filter=web
pnpm exec turbo dev --filter=web
pnpm exec turbo dev --filter=web
```

### Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turborepo.dev/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended):

```sh
cd my-turborepo
turbo login
```

Without global `turbo`, use your package manager:

```sh
cd my-turborepo
npx turbo login
pnpm exec turbo login
pnpm exec turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed:

```sh
turbo link
```

Without global `turbo`:

```sh
npx turbo link
pnpm exec turbo link
pnpm exec turbo link
```

## Testes

O monorepo usa ferramentas diferentes por camada. Cada uma fica no pacote certo — não é necessário instalar RTL ou Playwright no backend.

### Estrutura

| Camada | Pacote | Ferramenta | O que testa |
|--------|--------|------------|-------------|
| **Front** | `apps/web` | Vitest + React Testing Library | Componentes, hooks e lógica de UI |
| **Back** | `apps/backend` | Jest + Supertest | Services, controllers e rotas HTTP |
| **E2E** | `apps/e2e` | Playwright | Fluxos completos no browser (login, signup, navegação) |

### Onde ficam os arquivos

```
apps/web/components/**/*.test.tsx   # testes de componente (RTL)
apps/backend/src/**/*.spec.ts     # testes unitários (Jest)
apps/backend/test/**/*.e2e-spec.ts # e2e de API (Jest + Supertest)
apps/e2e/tests/**/*.spec.ts       # testes e2e no browser (Playwright)
```

### Comandos na raiz

```sh
# Todos os testes (web + backend + e2e)
pnpm test

# Apenas um pacote
pnpm test:web
pnpm test:e2e

# Cobertura (web com Vitest + backend com Jest)
pnpm test:cov
```

### Front (`apps/web`)

```sh
# Rodar uma vez
pnpm --filter web test

# Modo watch (reexecuta ao salvar)
pnpm --filter web test:watch

# Cobertura de código
pnpm --filter web test:cov
```

A cobertura é gerada em `apps/web/coverage/`. Para ver o relatório HTML:

```sh
open apps/web/coverage/index.html
```

A pasta `coverage/` está no `.gitignore` e não vai para o Git.

### Back (`apps/backend`)

```sh
# Testes unitários
pnpm --filter backend test

# Modo watch
pnpm --filter backend test:watch

# e2e de API (Supertest)
pnpm --filter backend test:e2e

# Cobertura
pnpm --filter backend test:cov
```

A cobertura do backend é gerada em `apps/backend/coverage/`.

### E2E (`apps/e2e`)

O Playwright sobe o Next.js automaticamente (`http://localhost:3000`) antes de rodar os testes.

```sh
# Headless (padrão)
pnpm --filter e2e test

# Interface visual do Playwright
pnpm --filter e2e test:ui

# Com o browser visível
pnpm --filter e2e test:headed

# Abrir o último relatório HTML
pnpm --filter e2e test:report
```

**Primeira execução:** se aparecer erro de browser não encontrado, instale o Chromium:

```sh
pnpm --filter e2e exec playwright install chromium
```

O pacote `e2e` também roda esse install no `postinstall` após um `pnpm install`.

### Fluxo recomendado

1. **RTL (web)** — componentes isolados, rápidos (forms, validação, mensagens de erro).
2. **Jest (backend)** — regras de negócio, auth, Prisma, DTOs.
3. **Playwright (e2e)** — fluxos reais no browser com front e API rodando.

### Desenvolvimento

Para testar fluxos e2e que dependem da API, suba o backend em outro terminal antes ou em paralelo:

```sh
pnpm dev:backend   # API
pnpm dev:web       # front (o Playwright já sobe isso nos testes e2e)
```

## Storybook

O app `web` usa [Storybook](https://storybook.js.org/) 10 com o framework `@storybook/nextjs-vite`, integrado ao Next.js, Tailwind e aos estilos globais do projeto.

### Onde ficam as stories

```
apps/web/components/**/*.stories.@(ts|tsx)   # componentes do projeto
apps/web/stories/**/*.stories.@(ts|tsx)     # exemplos gerados na instalação
apps/web/.storybook/                         # configuração (main.ts, preview.tsx)
```

### Comandos

**Na raiz do monorepo** (`fotosnap/`):

```sh
pnpm storybook              # recomendado
pnpm --filter web storybook # equivalente, sem passar pelo turbo
```

**Dentro de `apps/web`**:

```sh
pnpm storybook              # use este — sem --filter
```

> O `--filter web` só funciona quando você está na **raiz** do monorepo. Dentro de `apps/web`, use apenas `pnpm storybook`.

Build estático:

```sh
# na raiz
pnpm build-storybook

# em apps/web
pnpm build-storybook
```

Abra [http://localhost:6006](http://localhost:6006) no browser para visualizar e documentar os componentes.

### Addons configurados

- **Docs** — documentação automática das stories
- **A11y** — verificação de acessibilidade
- **Vitest** — integração com os testes do projeto
- **Chromatic** — publicação visual (opcional)
- **MCP** — integração com ferramentas de IA

A pasta `storybook-static/` e os arquivos `*storybook.log` estão no `.gitignore` e não vão para o Git.

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turborepo.dev/docs/crafting-your-repository/running-tasks)
- [Caching](https://turborepo.dev/docs/crafting-your-repository/caching)
- [Remote Caching](https://turborepo.dev/docs/core-concepts/remote-caching)
- [Filtering](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters)
- [Configuration Options](https://turborepo.dev/docs/reference/configuration)
- [CLI Usage](https://turborepo.dev/docs/reference/command-line-reference)
