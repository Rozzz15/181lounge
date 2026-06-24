# AGENTS.md — 181 Lounge Coffee Website

## Project Overview

A premium corporate website for **181 Lounge**, a Filipino coffee shop brand. Built as a single-page React application with a Vite build toolchain. Includes a PostgreSQL-backed admin dashboard (Drizzle ORM), an AI chatbot widget, splash screen, and rich animations.

## Critical Architecture Gotcha: Dual Entry System

This project has **two overlapping but incompatible architectures** — only one is active:

| Layer | Active (Vite) | Dormant (Next.js) |
|---|---|---|
| Entry point | `index.html` → `src/main.tsx` | `src/app/layout.tsx` → `src/app/page.tsx` |
| Router | `react-router-dom` (`<BrowserRouter>`) | Next.js App Router (file-based) |
| Pages | `src/pages/*.tsx` | `src/app/*/page.tsx` |
| API | None (no backend runtime) | `src/app/api/*/route.ts` |
| Build | `vite build` | Not wired up |

**The Vite SPA is the only working build target.** The Next.js pages/API routes in `src/app/` exist but are **excluded from TypeScript** (`tsconfig.json` excludes `src/app` and `src/db`). They reference `next/server` and `next` types but `next` is NOT in `package.json`. The `drizzle.config.json` and `next.config.ts` are configuration-only artifacts. **Do not try to run or build the Next.js parts** — they can't work without adding `next` as a dependency and rewriting the build pipeline.

If you need to modify pages, work in `src/pages/` and `src/components/`. The `src/app/` copies should stay in sync but are not the active codebase.

## Commands

```bash
npm run dev        # Start Vite dev server (SPA only)
npm run build      # tsc -b && vite build
npm run preview    # Serve production build locally
npm run lint       # eslint .
```

There are **no tests**, no test runner, and no CI configured.

## Tech Stack

- **React 19** with TypeScript (strict mode)
- **Vite 6** as bundler/dev server
- **react-router-dom v7** for client-side routing
- **TailwindCSS 4** with `@tailwindcss/postcss` plugin
- **framer-motion** for all animations (GSAP installed but barely used)
- **Drizzle ORM** + `pg` (PostgreSQL) — DB layer exists but only usable if the Next.js API runtime is activated
- **Lucide React** for icons
- **class-variance-authority** for component variants (Button)

## Project Structure

```
src/
├── main.tsx              # Vite entry: creates root, wraps App in BrowserRouter
├── App.tsx               # Layout shell: SplashScreen, Header, Footer, ClickSpark, AiChatbot, Routes
├── pages/                # Route-level page components (Vite — the active pages)
│   ├── Home.tsx
│   ├── Menu.tsx
│   ├── Story.tsx
│   ├── Contact.tsx
│   └── Admin.tsx
├── app/                  # Next.js App Router pages (DORMANT — excluded from tsc)
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css       # THE active global CSS (imported by main.tsx via '@/app/globals.css')
│   ├── admin/page.tsx
│   ├── menu/page.tsx
│   ├── contact/page.tsx
│   ├── story/page.tsx
│   └── api/              # Next.js API routes (DORMANT — can't run without next)
│       ├── health/route.ts
│       ├── products/route.ts
│       ├── contact/route.ts
│       ├── stores/route.ts
│       └── jobs/route.ts
├── components/
│   ├── layout/           # Header, Footer, ScrollToTop
│   ├── ui/               # Reusable: Button, Card, Input, Badge, Gallery, etc.
│   ├── home/             # HeroSection, AboutSection, FeaturedCarousel, etc.
│   ├── menu/menu-client.tsx
│   ├── contact/contact-client.tsx
│   ├── story/our-story-client.tsx
│   ├── admin/admin-dashboard.tsx
│   ├── splash-screen.tsx
│   ├── ai-chatbot.tsx
│   └── ClickSpark.tsx    # Canvas-based click particle effect
├── db/                   # Drizzle schema + connection (DORMANT)
│   ├── schema.ts
│   └── index.ts
└── lib/utils.ts          # cn(), formatPrice(), slugify(), truncate()
```

## Global CSS (`src/app/globals.css`)

Despite being in `src/app/`, this IS the active stylesheet — imported by `src/main.tsx`. It defines:
- Tailwind v4 `@theme` block with custom colors, fonts
- Google Fonts: Inter (body), Oswald (headings), Playfair Display (display)
- Custom animations: `fadeInUp`, `float`, `pulse-ring`
- Utility classes: `.container`, `.section`, `.scrollbar-none`, `.gradient-text`
- Stagger animation delays: `.stagger-1` through `.stagger-5`

## Design Tokens (from Tailwind theme — what's actually used)

| Token | Value | Usage |
|---|---|---|
| `--color-primary` | `#525A40` (sage green) | Buttons, focus rings, selection |
| `--color-secondary` | `#927557` (warm wood) | Accents, hover states |
| `--color-dark` | `#44362A` (dark walnut) | Header bg, footer, text headings |
| `--color-background` | `#F3F0E8` (warm cream) | Page background |
| `--color-text` | `#44362A` | Body text |
| `--color-cream` | `#F3F0E8` | Same as background |

**Note:** The SPEC.md describes a burgundy/gold palette (`#8B0000`, `#C79A5D`) but the actual code uses a sage green/wood palette. Follow the code's colors, not the spec.

## Component Conventions

- **Client components** must have `'use client'` at the top. Most components are client components (animations, state, hooks).
- Use `cn()` from `@/lib/utils` for conditional class merging (combines `clsx` + `tailwind-merge`).
- **Button** component: `cva`-based variants (`primary`, `secondary`, `accent`, `outline`, `ghost`, `dark`) and sizes (`sm`, `md`, `lg`, `icon`). Supports `loading` prop.
- **Card** component: compound component pattern (`Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`).
- **Input/Textarea**: forwarded refs, support `label`, `error`, `helperText` props.
- File naming: kebab-case files, PascalCase component names.
- Path alias `@/` maps to `src/`.
- `formatPrice()` outputs Philippine Peso (`₱`) format.

## Routing

Uses `react-router-dom` v7 `<BrowserRouter>`. Routes defined in `src/App.tsx`:

- `/` → Home
- `/menu` → Menu
- `/story` → Story
- `/contact` → Contact
- `/admin` → Admin Dashboard

The `ScrollToTop` component (in `src/App.tsx`) scrolls to top on every route change.

Each page component sets `document.title` via `useEffect`.

## Stores Were Removed

Per `.mimocode/plans/1781957378983-jolly-pixel.md`, all `/stores` routes, store locator components, and "100+ Stores" references were removed. The `src/components/stores/` directory is now empty. The stores API route still exists in `src/app/api/stores/route.ts` but is in the dormant Next.js layer. **Do not reintroduce stores functionality.**

## Database (Dormant, Do Not Activate)

The `src/db/schema.ts` defines tables for `users`, `categories`, `products`, `stores`, `jobs`, `promotions`, `contact_submissions` using Drizzle ORM with PostgreSQL enums. This code is **excluded from TypeScript compilation** and not usable in the Vite build. It exists as reference/wiring for a future backend activation. The `drizzle.config.json` points to `postgresql://postgres:postgres@127.0.0.1:5432/app_db`.

## Menu Data

The `MenuClient` component contains hardcoded product data (36 items across coffee, cold drinks, breakfast, bakery, lunch, books, and boardgames categories). Uses client-side filtering and search (including price range queries like "under 150").

## Key Dependencies

- `framer-motion` — primary animation library (used everywhere)
- `gsap` — installed but only used sparingly (mostly framer-motion is preferred)
- `lucide-react` — icon library
- `class-variance-authority` — Button variants
- `@radix-ui/react-slot` — (dependency of Button, not directly used)

## The Plan File

`.mimocode/plans/1781957378983-jolly-pixel.md` documents the store-removal plan. Read it before making navigation/footer/homepage changes to understand what was deliberately removed.
