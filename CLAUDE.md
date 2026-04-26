# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # next dev — local server at http://localhost:3000
npm run build    # next build — production build (also use to typecheck end-to-end; tsc has noEmit:true)
npm start        # next start — serve the production build
npm run lint     # eslint (flat config in eslint.config.mjs)
```

There is no test suite. There is no `tsc` script — type errors surface during `next build` (or via `npx tsc --noEmit`).

Deployment is Vercel, triggered by pushing to `main` (see commit `b2edc6d trigger Vercel deployment`).

## Stack

- **Next.js 16.1.6** App Router, **React 19.2.3**, **TypeScript 5** (strict)
- **Tailwind CSS v4** via `@tailwindcss/postcss` (no `tailwind.config.js`)
- ESLint 9 flat config extending `eslint-config-next/core-web-vitals` + `/typescript`
- Path alias: `@/*` → `src/*`

## Architecture

Single-page portfolio. `src/app/page.tsx` simply stacks five sections plus a floating theme toggle:

```
ThemeToggle → Hero → Projects → Skills → Contact → Footer
```

All section components live in `src/components/` as flat files (no subfolders). Server components by default; `Projects.tsx`, `Contact.tsx`, and `ThemeToggle.tsx` are `"use client"` because they hold state.

### Tailwind v4 design tokens (important)

The color palette is **not** in a `tailwind.config.js` — it's declared in `src/app/globals.css` using Tailwind v4's `@theme {}` block, with dark-mode overrides under `html.dark { … }`:

```css
@theme {
  --color-background: #FAFAFA;
  --color-foreground: #1A1A1A;
  --color-accent: #5B7083;
  --color-gray: #6B7280;
  --color-card: #FFFFFF;
  --color-border: #E5E7EB;
}
html.dark { --color-background: #0A0A0A; … }
```

That's why utilities like `bg-card`, `text-accent`, `border-border`, `text-gray` work — they're project-defined, not Tailwind defaults. To add or rename a color, edit `globals.css` (both the light block and the `html.dark` override).

### Theme toggle pattern (FOUC-safe)

Two cooperating pieces:

1. **Inline script in `src/app/layout.tsx` `<head>`** runs before hydration: reads `localStorage.theme` (falling back to `prefers-color-scheme`) and adds `class="dark"` to `<html>` synchronously. This prevents a light-flash on dark-mode reload. `<html>` carries `suppressHydrationWarning` because the script mutates it before React mounts.
2. **`ThemeToggle.tsx`** (client) syncs React state with the same `<html class="dark">` toggle and persists to `localStorage`. It renders a placeholder until mounted to avoid hydration mismatch.

If you change theming, keep the inline-script logic and the component in sync.

### Project data is hardcoded — but the wiring suggests a CMS

`Projects.tsx` defines the project list as a local const named **`fallbackProjects`**. The `fallback` naming, plus the remote pattern for `portfolio-strapi-b8le.onrender.com` in `next.config.ts`, indicates a Strapi CMS source was/is planned. Today the array is the only source — there is no fetch. If you re-enable Strapi, restore the fetch path and keep `fallbackProjects` as the offline default.

The `Project.category: ProjectTag[]` array drives the `All / Web / Mobile` filter tabs; every project must include `"All"` to appear in the default view.

### Contact form has no backend

`Contact.tsx` POSTs directly to `https://formsubmit.co/ajax/timaz.dev@gmail.com`. No API route, no env vars, no secrets in this repo. Changing the recipient = editing that URL. Hidden fields `_captcha` and `_subject` are FormSubmit-specific options.

### Images

`next.config.ts` whitelists `images.unsplash.com` and the Strapi host for `next/image`, but components currently use plain `<img>` tags (e.g. `Hero.tsx`, `Projects.tsx`). ESLint will warn via `@next/next/no-img-element` — that's a known accepted state, not a bug to chase unless you're explicitly migrating to `next/image`.

## Conventions

- Sections follow a consistent shell: `<section className="px-6 py-10 md:py-14"><div className="mx-auto max-w-5xl">…</div></section>`. Match this when adding a new section.
- Icons are inline SVG (no icon library). Copy an existing one rather than adding a dependency.
- Imports use `@/components/…`, not relative paths.
