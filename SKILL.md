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

| Layer      | Version / Package                                      |
| ---------- | ------------------------------------------------------ |
| Next.js    | `16.2.9` (App Router, Turbopack)                       |
| React      | `19.2.4`                                               |
| TypeScript | Strict mode, `@/*` path alias                          |
| Styling    | Tailwind CSS v4 + shadcn v4 + `tw-animate-css`         |
| Base UI    | `@base-ui/react` ^1.6.0 (via RetroUI)                  |
| Icons      | `lucide-react` ^1.21.0                                 |
| CVA        | `class-variance-authority` for variants                |
| Auth       | BetterAuth                                             |
| Database   | Supabase (PostgreSQL) + Drizzle ORM                    |
| AI         | Gemini API                                             |
| API Layer  | AppError codes + handleError() + requireAuth()         |
| Services   | Plain async functions under features/modules/services/ |

---

## 2. Project Structure

```
app/                          # Next.js App Router
├── (app)/modul/[slug]/       # Learning module shell
│   ├── layout.tsx            # Tab bar + footer
│   ├── [tab]/page.tsx        # Tab content per subtopic
│   └── kuis/                 # Quiz flow (intro, per-question, results)
├── api/                      # API route handlers (Layer 1)
│   ├── modul/[slug]/         # Module + quiz API endpoints
│   └── ai/                   # Gemini evaluation endpoints
├── (auth)/login/             # Login page
├── (auth)/register/          # Register page
├── (landing)/page.tsx        # Landing / hero page
├── layout.tsx                # Root layout (Space Grotesk)
└── globals.css               # Design tokens + utilities

features/
├── modules/
│   ├── services/             # Layer 2 — plain async service functions
│   │   ├── section.ts        # saveSectionAttempt, getSectionProgress
│   │   ├── progress.ts       # getTabProgress, unlockNextTab
│   │   ├── quiz.ts           # saveQuizResult, getLatestQuizResult
│   │   └── ai.ts             # evaluateSection, evaluateQuizQuestion
│   ├── store/                # Zustand stores (answerStore, tabProgressStore)
│   ├── lib/                  # Client-side utils (evaluateSection, persistSectionAttempt)
│   ├── components/           # Section UI components
│   └── data/                 # Static curriculum data
├── quiz/                     # Quiz data, types, components, hooks
└── auth/                     # LoginForm, RegisterForm

lib/
├── api/                      # Layer 1 shared primitives
│   ├── errors.ts             # AppError + typed codes + handleError()
│   ├── auth-utils.ts         # requireAuth() via BetterAuth
│   └── handler.ts            # apiHandler wrapper
├── auth.ts                   # BetterAuth server config
├── auth-client.ts            # BetterAuth browser client
├── db.ts                     # Drizzle + getDb() lazy accessor
├── supabase/                 # Supabase client (client, server, middleware)
└── utils.ts                  # Shared utilities

drizzle/
└── schema.ts                 # All DB tables (section_progress, tab_progress, quiz_results)
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
/modul/[slug]/kuis/1…5      → Per-question with prev/next
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

**DO NOT use raw `<button>`. Always import `Button` from RetroUI:**

```tsx
import { Button } from "@/components/retroui/Button"

// Primary CTA
<Button variant="default" size="lg"
  className="neubrutal-shadow hover-shift active-shift"
  onClick={...}>
  MASUK
  <ArrowRight className="!size-10" />
</Button>

// Outline
<Button variant="outline" size="md" className="!rounded-none">
  KEMBALI
</Button>

// Ghost icon
<Button variant="ghost" size="icon" className="!rounded-none">
  <Eye className="size-5" />
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

**Icons — always lucide-react:**

```tsx
import { ArrowRight, Eye, EyeOff, Check, X, Menu } from "lucide-react";
```

### Uppercase Rule

All labels, headings, and button text are `font-black uppercase`. Body text
is never uppercase.

### Shadows

```
.neubrutal-shadow  → 12px 12px 0 0 #000 (for CTAs)
.shadow-lg         → 6px 6px 0 0 border  (for cards)
.hover-shift       → translate(-4,-4) + bigger shadow
.active-shift      → translate(8,8) + no shadow
```

---

## 5. Data Model

### Subtopic Slugs (10 total)

```
translasi: titik, garis, bangun
refleksi:  sumbu-x, sumbu-y, titik-asal, garis-y-x, garis-y-neg-x, garis-x-h, garis-y-k
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

```
<type>(<scope>): <description>

- bullet for body
```

See [docs/CONVENTIONAL_COMMITS.md](./docs/CONVENTIONAL_COMMITS.md).

---

## 7. Testing & Quality

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

## 8. Common Pitfalls

1. **Plain `<button>` elements** — always use `@/components/retroui/Button`.
   Even icon-only toggles (password visibility, etc.) must use `<Button>`.
2. **Raw hex colors** — always use Tailwind semantic classes
   (`bg-primary`, `text-foreground`, `border-border`).
3. **Rounded buttons/cards** — add `!rounded-none` to override any defaults.
4. **Dynamic params** — always use `params: Promise<...>` + `await props.params`
   (Next.js 16 pattern, not the old sync pattern).
5. **`"use client"** — add only when needed (hooks, state, event handlers).
   Default to server components.
6. **Material Symbols** — don't use them. All icons are `lucide-react`.
7. **Teacher role** — does not exist. All users are students.
