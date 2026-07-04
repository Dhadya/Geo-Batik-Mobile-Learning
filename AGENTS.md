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

| Layer         | Technology                                      |
| ------------- | ----------------------------------------------- |
| Framework     | Next.js 16.2.9 (App Router)                     |
| Language      | TypeScript strict                               |
| Styling       | Tailwind CSS v4 + shadcn v4 + `tw-animate-css`  |
| UI Primitives | RetroUI (`@/components/retroui/`) — custom set  |
| Icons         | `lucide-react`                                  |
| Font          | Space Grotesk (variable via `next/font/google`) |
| Auth          | BetterAuth                                      |
| Database      | Supabase (PostgreSQL)                           |
| AI            | Gemini API                                      |
| Hosting       | Vercel                                          |

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
│       │   ├── [nomor]/    # Per-question (1–5) with prev/next
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
  never plain `<button>`. Add `!rounded-none`
- **Always use `lucide-react`** for icons (not Material Symbols)
- **Labels and headings are always `font-black uppercase`**
- **Buttons and cards are always square** (`!rounded-none`)
- **Shadows are hard offset** (no blur): `shadow`, `shadow-lg`,
  `.neubrutal-shadow`, `.hover-shift`, `.active-shift`
- **4px solid black borders** on interactive/containing elements
- **All text in Bahasa Indonesia**

## Key Conventions

- Client components: `"use client"` at the top (only when needed — prefer
  server components)
- Dynamic params: use `params: Promise<{ slug: string }>` pattern with
  `const { slug } = await props.params`
- Module tabs: defined in `MODULE_TABS` in `modul/[slug]/layout.tsx`
- Curriculum data: stored in `page_content` table (Supabase) and
  `data/curriculumData.ts`
- Icons inside buttons: use `lucide-react` components, e.g. `<ArrowRight
className="!size-10" />`

## Commands

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run lint         # ESLint check
npx tsc --noEmit     # TypeScript check
npm start            # Start production server
```

## Folder Structure

```
├── app/              # Next.js App Router pages
│   ├── (app)/        # App shell (header + nav)
│   ├── (auth)/       # Auth pages
│   └── (landing)/    # Landing page
├── components/       # React components
│   ├── retroui/      # NeoBrutalism primitives
│   ├── auth/         # AuthLayout, AuthFormField
│   ├── batik/        # KawungStamp, BatikWatermark, LandingFooter
│   └── common/       # AmbientCircles
├── data/             # Static curriculum data (future)
├── lib/              # Supabase, Drizzle, BetterAuth, Gemini clients
├── stores/           # Zustand stores (future)
├── hooks/            # Custom hooks (future)
├── types/            # TypeScript types
├── supabase/         # Database migrations & schema
├── AGENTS.md         # This file
├── CLAUDE.md         # Claude import of AGENTS.md
├── SKILL.md          # Agent skill definition
├── DESIGN.md         # Nusantara Rebel color palette
├── StyleGuide.md     # Component pattern reference
├── PRD.md            # Product requirements
└── DESIGN.md         # Full design system
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
