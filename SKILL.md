---
name: gematri
description: >
  GEMATRI (Gemakan Mahir Transformasi Geometri) — Next.js learning app for
  geometric transformations using Batik motifs. Nusantara Rebel design:
  NeoBrutalism + Indonesian heritage.
tasks:
  - Build or modify learning module pages
  - Create interactive geometry canvas components
  - Implement quiz flow with scoring and AI feedback
  - Style UI with RetroUI primitives and Tailwind v4
  - Write or update database schema and seed data
  - Implement API route handlers with AppError + service layer
  - Implement authentication with BetterAuth
  - Set up Supabase queries with Drizzle ORM
---

# GEMATRI Skill — Agent Instructions

## Role

You are a full-stack Next.js engineer working on **GEMATRI**, an interactive
learning media for geometric transformations (translasi & refleksi) targeting
Indonesian SMP students. The product uses Batik motifs as geometric context.

---

## 1. Stack & Versions

| Layer      | Version / Package                                                                   |
| ---------- | ----------------------------------------------------------------------------------- |
| Next.js    | `16.2.9` (App Router, Turbopack)                                                    |
| React      | `19.2.4`                                                                            |
| TypeScript | Strict mode, `@/*` path alias                                                       |
| Styling    | Tailwind CSS v4 + shadcn v4 + `tw-animate-css`                                      |
| Base UI    | `@base-ui/react` ^1.6.0 (via RetroUI)                                               |
| Icons      | Material Symbols (via `@/components/common/MaterialIcon`) — fallback `lucide-react` |
| CVA        | `class-variance-authority` for variants                                             |
| Auth       | BetterAuth                                                                          |
| Database   | Supabase (PostgreSQL) + Drizzle ORM                                                 |
| AI         | Gemini API                                                                          |
| API Layer  | AppError codes + handleError() + requireAuth()                                      |
| Services   | Plain async functions under features/modules/services/                              |

---

## 2. Project Structure

```
app/                          # Next.js App Router
├── (app)/                    # App shell (header + nav)
│   ├── menu/                 # Main menu — 3-card nav grid
│   ├── prasyarat/            # Prerequisite material
│   ├── lab/                  # Lab Batik creative sandbox
│   ├── apersepsi/[slug]/     # Module intro (translasi | refleksi)
│   ├── modul/[slug]/         # Learning modules
│   │   ├── layout.tsx        # Tab navigation + footer
│   │   ├── page.tsx          # Redirects to first tab
│   │   ├── [tab]/page.tsx    # Tab content (titik|garis|bangun|sumbu-x|...)
│   │   └── kuis/             # Quiz flow
│   │       ├── [nomor]/      # Per-question (1–10) with prev/next
│   │       └── hasil/        # Score + pembahasan
│   └── layout.tsx            # App shell layout
├── (auth)/                   # Auth pages (no app shell)
│   ├── login/
│   └── register/
├── (landing)/                # Landing page hero (no app shell)
├── api/auth/[...all]/        # BetterAuth API handler
├── layout.tsx                # Root layout — font + globals
└── globals.css               # Nusantara Rebel palette + utilities

features/                     # Feature-based modular architecture
├── auth/                     # Auth feature
│   ├── components/           # LoginForm, RegisterForm, AuthFormField
│   └── hooks/                # useLoginForm, useRegisterForm
├── menu/                     # Menu page feature
│   ├── components/           # ModuleCard, LabCard, MenuHeader, ModuleGrid, BackLink
│   ├── data.ts               # Menu module data
│   └── index.ts              # Barrel exports
├── prasyarat/                # Prerequisite material feature
│   ├── components/           # InteractiveCanvas, GeoGebraCanvas, ControlPanel, ConceptCard, VideoEmbed
│   ├── hooks/                # useGeoGebra, useToggleControls
│   ├── data.ts               # Prerequisite concept data
│   ├── toggles.ts            # Toggle config and accordion groups
│   ├── types.ts              # GGBApplet, GGBWindow, GeoGebraToggle types
│   └── index.ts              # Barrel exports
├── modules/                  # Core learning engine
│   ├── services/             # Layer 2 — plain async service functions
│   │   ├── section.ts        # saveSectionAttempt, getSectionProgress
│   │   ├── progress.ts       # getTabProgress, unlockNextTab
│   │   ├── quiz.ts           # saveQuizResult, getLatestQuizResult
│   │   └── ai.ts             # evaluateSection, evaluateQuizQuestion
│   ├── store/                # Zustand stores (answerStore, tabProgressStore)
│   ├── lib/                  # Client-side utils
│   ├── hooks/                # useSection, useObservation, useQuiz
│   ├── types/                # Shared TypeScript types
│   └── components/           # Section UI components
└── quiz/                     # Quiz data, types, components, hooks

components/                   # Shared React components
├── retroui/                  # NeoBrutalism primitives (Button, Card, Toggle, Accordion, Skeleton, Sonner, etc.)
├── batik/                    # KawungStamp, BatikWatermark
├── common/                   # AmbientCircles, MaterialIcon
└── layout/                   # AuthLayout, LandingFooter, ProfileDropdown

lib/                          # Utilities and clients
├── api/                      # Layer 1 shared primitives
│   ├── errors.ts             # AppError + typed codes + handleError()
│   ├── auth-utils.ts         # requireAuth() via BetterAuth
│   └── handler.ts            # apiHandler wrapper
├── supabase/                 # Supabase client (client, server, middleware)
├── auth.ts                   # BetterAuth server config
├── auth-client.ts            # BetterAuth browser client
├── db.ts                     # Drizzle + getDb() lazy accessor
├── utils.ts                  # Utility functions
├── validate-redirect.ts      # Redirect URL validation
└── validators.ts             # Form validation

drizzle/                      # Drizzle ORM schema
└── schema.ts                 # All DB tables

supabase/                     # Database migrations & schema
├── migrations/
└── schema.sql

public/                       # Static assets
├── icons/                    # SVG icons (google.svg)
└── images/                   # Module preview images

Root config files: AGENTS.md, CLAUDE.md, SKILL.md, DESIGN.md, StyleGuide.md, PRD.md, PRD_v2.md
```

---

## 3. Routing Conventions

### Route Groups

- `(auth)/` — no layout wrapper; used for login/register
- `(app)/` — wrapped in `(app)/layout.tsx` (GEMATRI header + nav)
- `(landing)/` — no layout; full-brand hero page

### Dynamic Segments

```tsx
// Always use Promise-based params (Next.js 16)
export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
}
```

### Module Tab Structure

| Slug        | Tab values                              |
| ----------- | --------------------------------------- |
| `translasi` | `titik`, `garis`, `bangun`              |
| `refleksi`  | `sumbu-x`, `sumbu-y`, `garis`, `bangun` |

Tabs are defined in `modul/[slug]/layout.tsx` via the `MODULE_TABS` constant.

### Quiz Flow

```
/modul/[slug]/kuis          → Intro / first question
/modul/[slug]/kuis/1…10     → Per-question with prev/next
/modul/[slug]/kuis/hasil    → Results + pembahasan
```

---

## 4. Design System (Nusantara Rebel)

### Colors — Always use Tailwind semantic tokens

| Token                   | Hex       | Tailwind                 |
| ----------------------- | --------- | ------------------------ |
| `--background`          | `#fff8ef` | `bg-background`          |
| `--foreground`          | `#1f1b12` | `text-foreground`        |
| `--primary`             | `#ffd93d` | `bg-primary`             |
| `--primary-dark`        | `#705d00` | `text-primary-dark`      |
| `--secondary`           | `#006e29` | `bg-secondary`           |
| `--secondary-container` | `#93f59c` | `bg-secondary-container` |
| `--tertiary`            | `#ae2f34` | `bg-tertiary`            |
| `--tertiary-container`  | `#ffd1ce` | `bg-tertiary-container`  |
| `--border`              | `#000`    | `border-border`          |
| `--muted`               | `#eae2d2` | `bg-muted`               |
| `--muted-foreground`    | `#4d4633` | `text-muted-foreground`  |

### Component Usage

**Do not use native HTML elements. Always use RetroUI components:**

```tsx
import { Button } from "@/components/retroui/Button"
import { MaterialIcon } from "@/components/common/MaterialIcon"

// Primary CTA
<Button variant="default" size="lg"
  className="neubrutal-shadow hover-shift active-shift"
  onClick={...}>
  MASUK
  <MaterialIcon className="!size-10" name="arrow_forward" />
</Button>

// Outline
<Button variant="outline" size="md">
  KEMBALI
</Button>

// Ghost icon
<Button variant="ghost" size="icon">
  <MaterialIcon name="visibility" className="size-5" />
</Button>
```

**Card:**

```tsx
import { Card } from "@/components/retroui/Card";
<Card>
  <Card.Header>
    <Card.Title>JUDUL</Card.Title>
  </Card.Header>
  <Card.Content>{children}</Card.Content>
</Card>;
```

**Tabs:**

```tsx
import { Tabs } from "@/components/retroui/Tab";
<Tabs defaultValue="titik">
  <Tabs.List>
    <Tabs.Trigger value="titik">TITIK</Tabs.Trigger>
    <Tabs.Trigger value="garis">GARIS</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="titik">{children}</Tabs.Content>
</Tabs>;
```

**Icons — priority Material Symbols, fallback lucide-react:**

```tsx
import { MaterialIcon } from "@/components/common/MaterialIcon";

// Preferred — Material Symbols
<MaterialIcon name="arrow_forward" />
<MaterialIcon name="visibility" />
<MaterialIcon name="check" />
<MaterialIcon name="close" />
<MaterialIcon name="menu" />
```

### Uppercase Rule

All labels, headings, and button text are `font-black uppercase`. Body text
is never uppercase.

### Buttons and cards

RetroUI components already have `rounded-none` baked in — never add `rounded-*` classes.

### Shadows

```
.neubrutal-shadow  → 12px 12px 0 0 #000 (for CTAs)
.shadow-lg         → 6px 6px 0 0 border  (for cards)
.hover-shift       → translate(-4,-4) + bigger shadow
.active-shift      → translate(8,8) + no shadow
```

---

## 5. Data Model

### Subtopic Slugs

```
translasi: titik, garis, bangun
refleksi:  sumbu-x, sumbu-y, garis, bangun
```

### Key Types

```typescript
interface InquiryStep {
  id: string; // "step1", "step2", ...
  text: string;
  completed?: boolean;
}

interface PageContent {
  id: string; // matches subtopic slug
  title: string;
  batikConcept: string;
  batikDescription: string;
  interactiveTitle: string;
  instructions: string[];
  geogebraUrl?: string;
  inquirySteps: InquiryStep[];
  observations: string[];
  matrixFormula: string; // LaTeX
  matrixExplanation: string;
}
```

### Database Tables

| Table              | Purpose                                            |
| ------------------ | -------------------------------------------------- |
| `user`             | BetterAuth user account                            |
| `section_progress` | Per-section answer attempts + AI feedback + scores |
| `tab_progress`     | Tab unlock/completion state per module             |
| `quiz_results`     | Quiz attempt results with per-question two-attempt |

---

## 6. API Conventions

See [docs/GEMATRI_CONVENTIONS_REFERENCE.md](./docs/GEMATRI_CONVENTIONS_REFERENCE.md).

### Response Envelope

```typescript
{ ok: true, data: T } | { ok: false, error: { code: string, message: string } }
```

### 3-Layer Architecture

| Layer             | Location                          | Rules                                                                                 |
| ----------------- | --------------------------------- | ------------------------------------------------------------------------------------- |
| 1 — Route Handler | `app/api/.../route.ts`            | Thin: parse → Zod validate → call service → respond. `catch → handleError()`          |
| 2 — Service       | `features/modules/services/*.ts`  | Plain async. No Next.js imports. Business logic + `AppError` throws. `getDb()` lazily |
| 3 — Database      | `lib/db.ts` + `drizzle/schema.ts` | Lazy `getDb()`. Never at module level. Drizzle ORM                                    |

### Error Handling

```typescript
import { appError, handleError } from "@/lib/api/errors";

// In service:
throw appError("TAB_LOCKED");

// In route handler:
catch (e) { return handleError(e); }
```

### Commit Messages

After every task, inspect `git status`, `git diff`, and `git log --oneline -5` to understand what changed. Always propose the commit message in chat for approval — never commit without confirmation.

```
<type>(<scope>): <description>

- bullet points for body
```

Types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`
Scopes: `api`, `web`, `ui`, `db`, `shared`

See [docs/CONVENTIONAL_COMMITS.md](./docs/CONVENTIONAL_COMMITS.md).

---

## 7. Responsive Design Guide

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

## 8. Code Documentation

Always add TSDoc/JSDoc comments on exported functions, components, interfaces, and types — describe the _why_ (purpose, behavior), not the _what_ (implementation). Use `@param` and `@returns` where non-obvious. Keep comments concise.

---

## 9. Testing & Quality

### Commands

```bash
npm run build        # Production build (must pass before commit)
npm run dev          # Dev server
npm run lint         # ESLint — fix all errors
npx tsc --noEmit     # TypeScript check
```

### Pre-commit (Husky)

- `lint-staged` runs `eslint --fix` on `.ts,.tsx` files
- `prettier --write` on `.json,.md,.css` files

### Pre-push

- `npm run lint`
- `npx tsc --noEmit`
- `npm run build`

---

## 10. Common Pitfalls

1. **Plain `<button>` or other native HTML** — always use RetroUI components
   (`Button`, `Card`, `Input`, `Checkbox`, `Dialog`, `Radio`, `Select`, etc.).
   Even icon-only toggles must use `<Button>`.
2. **Raw hex colors** — always use Tailwind semantic classes
   (`bg-primary`, `text-foreground`, `border-border`).
3. **Rounded-\* on RetroUI components** — RetroUI already has `rounded-none`
   baked in. Never add `rounded-*` or `!rounded-none`.
4. **Dynamic params** — always use `params: Promise<...>` + `await props.params`
   (Next.js 16 pattern, not the old sync pattern).
5. **`"use client"** — add only when needed (hooks, state, event handlers).
   Default to server components.
6. **Material Symbols priority** — use `@/components/common/MaterialIcon`
   as first choice. Fall back to `lucide-react` only if the symbol doesn't exist.
7. **Teacher role** — does not exist. All users are students.
