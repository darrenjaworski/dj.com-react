# AGENTS.md

Instructions for AI coding agents (Claude Code, Hermes, Codex, etc.) working in this repository.

## What this is

Darren's personal site (`darrenjaworski.com`) — a small React 19 + TypeScript SPA
built with Vite, deployed to GitHub Pages. Single page component with client-side
"routing" (`home` / `journalism`) via local state, no router library. No backend.

Design constraints (palette, typography, spacing, do's/don'ts) live in
[`DESIGN.md`](./DESIGN.md) — read it before touching any styling. Short version:
ultra-simple, two-color Catppuccin Latte/Frappé theme, no CSS framework, no
decoration beyond what content needs.

## Stack

- React 19, TypeScript, Vite 7 (`@vitejs/plugin-react-swc`)
- Vitest + Testing Library for unit tests (jsdom)
- Playwright for e2e tests (chromium/firefox/webkit + mobile viewports)
- ESLint (flat config) + `tsc` for type checking
- Node version pinned in `.nvmrc`
- Plain CSS (`src/index.css`, `src/reset.css`), no CSS framework — see `DESIGN.md`

## Structure

- `src/App.tsx` — page composition: routing between `HomePage`/`JournalismPage`,
  `Navigation`, `ThemeToggle`. Components are module-scoped (not nested inside
  `App()` — see Conventions below).
- `src/hooks/useTheme.ts` — theme state (`isDarkMode`, `toggleTheme`), syncs the
  `data-theme` attribute on `<html>`.
- `src/utils/slugify.ts` — shared slug/testid-string generator; used anywhere a
  label needs to become a `data-testid`-safe string.
- `src/data/journalism.json` — journalism page content (article links).
- `src/data/site.ts` — home page content (`SOCIAL_LINKS`, `RESUME_URL`).
- `src/components/ThemeIcon.tsx` — single icon component, `variant: "dark" | "light"`.
- `src/__tests__/` — Vitest unit tests.
- `e2e-tests/` — Playwright specs (see `e2e-tests/README.md` for conventions).
- `dist/` — production build output (gh-pages deploy source), gitignored.
- `coverage/`, `playwright-report/`, `test-results/` — generated, gitignored.

## Commands

- `npm run dev` — start dev server (Vite, HMR)
- `npm run build` — `tsc -b && vite build`
- `npm run checks` — lint + typecheck + unit tests (run this before considering a change done)
- `npm run lint` / `npm run typecheck` / `npm run test:run` — individually
- `npm test` — unit tests in watch mode
- `npm run test:coverage` — unit tests with coverage report
- `npm run test:e2e` — Playwright e2e (needs `npx playwright install` once, and a
  running preview/dev server per `playwright.config.ts`)
- `npm run test:e2e:ui` / `npm run test:e2e:report` — Playwright UI mode / HTML report

Always run `npm run checks` before declaring a change done. If the change touches
user-facing behavior (nav, theme, journalism data rendering), also run the
relevant Playwright spec (`npm run test:e2e`).

## Conventions

- No router library — new "pages" are added as a `Page` union member in `App.tsx`
  plus a conditional render block, not a new route file.
- **Components live at module scope, never nested inside `App()`** — an
  inline-declared component is a new React type on every render, which
  unmounts/remounts its whole subtree on every state change. Hoist new
  components to module scope (or their own file under `src/components/`) and
  pass data down as props.
- Components use `data-testid` attributes for test hooks (Playwright + Testing
  Library both rely on these) — add one to any new interactive/content element.
  Use `slugify()` from `src/utils/slugify.ts` for any testid derived from a
  label/title, rather than writing new ad hoc string logic.
- Theme is driven by a `data-theme` attribute on `<html>`, toggled between
  `light`/`dark`/system — logic lives in `src/hooks/useTheme.ts`, not `App.tsx`.
- Content vs. code: page copy/config (`SOCIAL_LINKS`, `RESUME_URL`, journalism
  articles) lives in `src/data/`, not inline in components.
- Keep things minimal — this is a small personal site, prefer plain React/CSS
  over adding libraries (routers, state managers, UI kits) unless there's a
  concrete need. See `DESIGN.md` for the same principle applied to visual design.

## Deploy

CI (`static-checks.yml`) runs lint/typecheck/tests on push; on success,
`gh-pages.yml` builds with `PUBLIC_URL=https://darrenjaworski.com/` and deploys
`dist/` to GitHub Pages. No manual deploy steps needed — merging to `main` is
the release.
