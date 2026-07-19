<!-- ======================================================================= -->
<!-- PROJECT-SPECIFIC RULES — add/edit freely outside the markers below       -->
<!-- ======================================================================= -->

# GEMATRI — Agent Instructions

## Project Overview

GEMATRI (Gemakan Mahir Transformasi Geometri) is a Next.js learning app for
teaching geometric transformations (translasi & refleksi) to Indonesian SMP
students using Batik motifs. The design language is **Nusantara Rebel** —
Indonesian heritage meets NeoBrutalism.

## Tech Stack

| Layer         | Technology                                                                          |
| ------------- | ----------------------------------------------------------------------------------- |
| Framework     | Next.js 16.2.9 (App Router)                                                         |
| Language      | TypeScript strict                                                                   |
| Styling       | Tailwind CSS v4 + shadcn v4 + `tw-animate-css`                                      |
| UI Primitives | RetroUI (`@/components/retroui/`) — custom set                                      |
| Icons         | Material Symbols (via `@/components/common/MaterialIcon`) — fallback `lucide-react` |
| Font          | Space Grotesk (variable via `next/font/google`)                                     |
| Auth          | BetterAuth                                                                          |
| Database      | Supabase (PostgreSQL)                                                               |
| AI            | Gemini API                                                                          |
| Hosting       | Vercel                                                                              |

## Routing Architecture

```
app/
├── (auth)/          # Login & Register (no app shell)
├── (app)/           # All authenticated pages (app shell layout)
│   ├── menu/        # Main menu — 3-card nav grid
│   ├── prasyarat/   # Prerequisite material
│   ├── lab/         # Lab Batik creative sandbox
│   ├── apersepsi/[slug]/  # Module intro (translasi | refleksi)
│   └── modul/[slug]/       # Learning modules
│       ├── page.tsx        # Redirects to first tab
│       ├── [tab]/page.tsx  # Tab content (titik|garis|bangun|sumbu-x|...)
│       ├── kuis/           # Quiz intro
│       │   ├── [nomor]/    # Per-question (1–10) with prev/next
│       │   └── hasil/      # Score + pembahasan
├── (landing)/       # Landing page hero (no app shell)
├── layout.tsx       # Root layout — font + globals
└── globals.css      # Nusantara Rebel palette + utilities
```

**Route groups**: Parentheses groups don't affect URL path.
`(app)/page.tsx` → `/`, `(auth)/login/page.tsx` → `/login`.

## Design System Essentials

See `StyleGuide.md` and `DESIGN.md` for the full reference.

- **Always use Tailwind semantic classes** (`bg-primary`, `text-foreground`,
  `border-border`), never raw hex colors
- **Always use RetroUI `<Button>`** from `@/components/retroui/Button` —
  never plain `<button>`
- **Priority: Material Symbols** via `@/components/common/MaterialIcon` (e.g. `<MaterialIcon name="arrow_forward" />`); fallback to `lucide-react` if symbol unavailable
- **Labels and headings are always `font-black uppercase`**
- **Buttons and cards are always square** — RetroUI components already have `rounded-none`, never add `rounded-*` classes
- **Shadows are hard offset** (no blur): `shadow`, `shadow-lg`,
  `.neubrutal-shadow`, `.hover-shift`, `.active-shift`
- **4px solid black borders** on interactive/containing elements
- **All text in Bahasa Indonesia**

## Key Conventions

- **No native HTML elements** — always use RetroUI components: `Card`, `Checkbox`, `Dialog`, `Input`, `Radio`, `Select`, `Skeleton`, `Toaster`, etc.
- **Always use `Skeleton`** from `@/components/retroui/Skeleton` for loading states — match the same size, layout, and position as the content it replaces
- **Install new RetroUI components** in `D:\Freelance\geobatik-v2\batik-geometry\components\retroui` — never create a separate `ui/` folder

- Client components: `"use client"` at the top (only when needed — prefer
  server components)
- Dynamic params: use `params: Promise<{ slug: string }>` pattern with
  `const { slug } = await props.params`
- Module tabs: defined in `MODULE_TABS` in `modul/[slug]/layout.tsx`
- Curriculum data: stored in `features/modules/data/` (static TypeScript files, not DB)
- Icons inside buttons: use `@/components/common/MaterialIcon`, e.g. `<MaterialIcon
className="!size-10" name="arrow_forward" />`
- **Always add TSDoc/JSDoc comments** on exported functions, components, interfaces, and types — describe the _why_ (purpose, behavior), not the _what_ (implementation). Use `@param` and `@returns` where non-obvious. Keep comments concise.

## Responsive Design Guide

Apply these rules to every page and component. Always use a minimum of 2 breakpoints (`md:` and up).

### Text sizing

Reduce one level under `md` vs `md+`:

- `text-xs md:text-sm`
- `text-sm md:text-base`
- `text-base md:text-lg`
- `text-lg md:text-xl`
- `text-xl md:text-2xl`
- `text-2xl md:text-3xl`

### Spacing (padding, margin, gap, size)

Use ~3/4 of `md+` value under `md`, rounding to the nearest valid Tailwind size:

| md+       | under md |
| --------- | -------- |
| `p-8`     | `p-6`    |
| `p-6`     | `p-4`    |
| `p-4`     | `p-3`    |
| `p-3`     | `p-2`    |
| `gap-8`   | `gap-6`  |
| `gap-6`   | `gap-4`  |
| `size-12` | `size-9` |
| `size-10` | `size-8` |

### Layout

- All pages and components: `max-w-384 mx-auto`
- Top page padding: `pt-6 md:pt-8`
- Bottom page padding: `pb-16 md:pb-20`
- Ensure no overflow or horizontal scrolling (`overflow-hidden` where needed)
- Max `tracking-wide` — never use `tracking-wider` or `tracking-widest`

### Font weight consistency

Check neighbouring elements in the same component — keep font weights consistent within the same type of heading or body text. Within a page, use the same weight for all `h1`, all `h2`, all labels, etc.

---

## Conventional Commits

This project follows [docs/CONVENTIONAL_COMMITS.md](./docs/CONVENTIONAL_COMMITS.md).

- After every task, provide a concise **progress summary** to the developer explaining what was done and why, then inspect `git status`, `git diff`, and `git log --oneline -5` to understand what changed
- Always propose a commit message in chat for approval — never commit without confirmation

```
<type>(<scope>): <description>

- bullet points for body
```

Types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`
Scopes: `api`, `web`, `ui`, `db`, `shared`

Example proposal format (copy-paste ready, no backticks around the message):

```
feat(ui): add Skeleton and Sonner Retroui components

- add Skeleton with Skeleton.tsx
- add Sonner with Sonner.tsx
- removed rounded-none overrides, use Material Symbols, add Responsive Design Guide
- updated AGENTS.md rules (native HTMl, Skeleton, ui folder, commit convention)
```

---

## Layered Architecture (3-Layer Rule)

See [docs/GEMATRI_CONVENTIONS_REFERENCE.md](./docs/GEMATRI_CONVENTIONS_REFERENCE.md) for full reference.

```
Layer 1 — Route Handler (app/api/.../route.ts)
  Parse request → Zod validate → call service → respond
  Error: catch → handleError()
  Imports from Layer 2 only (services)

Layer 2 — Service (features/modules/services/*.ts)
  Plain async functions — NO Next.js imports
  Business logic + AppError throws
  Calls getDb() lazily

Layer 3 — Database (lib/db.ts + drizzle/schema)
  Lazy getDb() singleton — never at module level
  Drizzle ORM (camelCase JS → snake_case SQL)
```

API conventions:

- `lib/api/errors.ts` — `AppError` + 11 typed codes + `handleError()`
- `lib/api/auth-utils.ts` — `requireAuth()` via BetterAuth
- `lib/api/handler.ts` — `apiHandler()` wrapper for route handlers
- `features/modules/services/*.ts` — service functions (plain async)

---

## Commands

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run lint         # ESLint check
npx tsc --noEmit     # TypeScript check
npm start            # Start production server
git commit -m "feat(scope): description"

# - bullet body
```

## Folder Structure

```
├── app/              # Next.js App Router pages
│   ├── (app)/        # App shell (header + nav)
│   │   ├── apersepsi/[slug]/   # Module intro (translasi | refleksi)
│   │   ├── lab/                # Lab Batik creative sandbox
│   │   ├── menu/               # Main menu — 3-card nav grid
│   │   ├── modul/[slug]/       # Learning modules
│   │   │   ├── [tab]/page.tsx  # Tab content (titik|garis|bangun|sumbu-x|...)
│   │   │   ├── kuis/           # Quiz intro
│   │   │   │   ├── [nomor]/    # Per-question (1–10) with prev/next
│   │   │   │   └── hasil/      # Score + pembahasan
│   │   │   ├── layout.tsx      # Tab navigation + footer
│   │   │   └── page.tsx        # Redirects to first tab
│   │   ├── prasyarat/          # Prerequisite material
│   │   └── layout.tsx          # App shell layout
│   ├── (auth)/       # Auth pages (no app shell)
│   │   ├── login/
│   │   └── register/
│   ├── (landing)/    # Landing page (no app shell)
│   ├── api/auth/[...all]/  # BetterAuth API handler
│   ├── layout.tsx    # Root layout — font + globals
│   └── globals.css   # Nusantara Rebel palette + utilities
├── components/       # Shared React components
│   ├── retroui/      # NeoBrutalism primitives (Button, Card, Toggle, Accordion, etc.)
│   ├── batik/        # KawungStamp, BatikWatermark
│   ├── common/       # AmbientCircles, MaterialIcon
│   └── layout/       # AuthLayout, LandingFooter, ProfileDropdown
├── features/         # Feature-based modular architecture
│   ├── auth/         # Authentication feature
│   │   ├── components/  # LoginForm, RegisterForm, AuthFormField
│   │   └── hooks/       # useLoginForm, useRegisterForm
│   ├── menu/         # Menu page feature
│   │   ├── components/  # ModuleCard, LabCard, MenuHeader, ModuleGrid, BackLink
│   │   ├── data.ts      # Menu module data
│   │   └── index.ts     # Barrel exports
│   └── prasyarat/    # Prerequisite material feature
│       ├── components/  # InteractiveCanvas, GeoGebraCanvas, ControlPanel, ConceptCard, VideoEmbed
│       ├── hooks/       # useGeoGebra, useToggleControls
│       ├── data.ts      # Prerequisite concept data
│       ├── toggles.ts   # Toggle config and accordion groups
│       ├── types.ts     # GGBApplet, GGBWindow, GeoGebraToggle types
│       └── index.ts     # Barrel exports
├── lib/              # Utilities and clients
│   ├── supabase/     # Supabase client (client, server, middleware)
│   ├── auth.ts       # BetterAuth server config
│   ├── auth-client.ts # BetterAuth browser client
│   ├── db.ts         # Drizzle database instance
│   ├── utils.ts      # Utility functions
│   ├── validate-redirect.ts # Redirect URL validation
│   └── validators.ts # Form validation (email, password, error mapping)
├── drizzle/          # Drizzle ORM schema
│   └── schema.ts
├── supabase/         # Database migrations & schema
│   ├── migrations/
│   ── schema.sql
├── public/           # Static assets
│   ├── icons/        # SVG icons (google.svg)
│   └── images/       # Module preview images
├── AGENTS.md         # This file
├── CLAUDE.md         # Claude import of AGENTS.md
├── SKILL.md          # Agent skill definition
├── DESIGN.md         # Nusantara Rebel color palette
├── StyleGuide.md     # Component pattern reference
└── PRD.md            # Product requirements
```

<!-- BEGIN:nextjs-agent-rules -->
<!-- =================================================================== -->

# Next.js: ALWAYS read docs before coding

Before any Next.js work, find and read the relevant doc in
`node_modules/next/dist/docs/`. Your training data is outdated — the docs
are the source of truth.

Key docs to reference:

- App Router: `node_modules/next/dist/docs/01-app/`
- Route groups: `.../01-getting-started/03-route-groups.mdx`
- Dynamic routes: `.../01-getting-started/02-project-structure.mdx`
- Layouts: `.../03-api-reference/04-file-conventions/01-layout.mdx`
- Loading UI: `.../03-api-reference/04-file-conventions/02-loading.mdx`
- Error handling: `.../03-api-reference/04-file-conventions/03-error.mdx`
- Server Actions: `.../02-guides/09-server-actions.mdx`
<!-- END:nextjs-agent-rules -->
