# GEMATRI — Gemakan Mahir Transformasi Geometri

![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=flat-square) ![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue?style=flat-square) ![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square) ![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3FCF8E?style=flat-square) ![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

> **An interactive learning medium for Grade IX SMP students.**
> GEMATRI teaches geometric transformations — translation (translasi) and reflection (refleksi) — through structured learning modules, AI-powered per-section feedback, mastery-based tab unlocking, and a module-level quiz.

---

## Why GEMATRI?

**Geometric transformations are inherently abstract.** Students struggle to visualize how points, lines, and shapes move across a coordinate plane. GEMATRI makes the concepts concrete with interactive visualizations, guided experiments, and immediate AI feedback at every step.

**Built for pedagogy, not just technology.** Every interaction follows the van Hiele theory of geometric reasoning, scaffolding students from visual recognition (level 0) through analysis (level 1) to informal deduction (level 2). A sequential tab-locking system ensures mastery at each step before progression, and a module quiz verifies overall understanding.

---

## Key Features

### Learning Modules

| Module        | Tabs                                                                                           |
| ------------- | ---------------------------------------------------------------------------------------------- |
| **Translasi** | Titik, Garis, Bangun                                                                           |
| **Refleksi**  | Sumbu-X, Sumbu-Y, Titik (0,0), Garis x=y, Garis x=-y, Garis x=h, Garis y=h, Bangun, Ruas Garis |

Each tab follows an inquiry-based flow of sections:

1. **Pengamatan** — Record observations from the visualization
2. **Percobaan** — Guided experiment on the interactive GeoGebra canvas
3. **Penyimpulan** — Draw conclusions from the observed patterns
4. **Cek Pemahaman** — Verify understanding with a quick check

### Sequential Tab Unlocking

Tabs are **locked by default** — only the first tab starts unlocked. A tab becomes complete only when **every section reaches a terminal status** (correct on attempt 1, or wrong_attempt2 after both attempts):

```
Tab 1  →  Submit all sections  →  Tab 2 unlocks
Tab 2  →  Submit all sections  →  Tab 3 unlocks
...    →  All tabs complete    →  Module quiz unlocks
```

- The client updates the UI **optimistically**, then the server verifies and persists via `POST /api/modul/[slug]/progress/unlock`
- The server **reconciles** any missing section rows from the client's terminal claims (self-healing) and re-validates inside a transaction
- A server-side **auto-unlock safety net** re-checks incomplete tabs on every progress fetch, so progress always converges even if a client request fails
- **Cross-module gating**: the Refleksi module stays locked until the Translasi quiz has at least one attempt

### Two-Attempt AI Feedback System

Every section exercise follows a structured two-attempt flow:

- **Attempt 1 (correct)** → Full AI explanation; section marked complete
- **Attempt 1 (wrong)** → AI hint (no answer revealed); "Coba Lagi" button appears
- **Attempt 2 (wrong)** → Detailed AI feedback with the answer key; input permanently locked

Evaluation is **hybrid**:

- Structured items (matriks, koordinat, pilihan ganda, memasangkan, urutkan, pilihan refleksi, checklist) are validated **deterministically** with per-field correctness
- Uraian (essay) answers are judged by **Gemini AI**; the Penyimpulan section always consults Gemini because free-text mathematical reasoning can't be reliably keyword-matched
- AI responses are cached (DB + Redis read-through) and validated against the answer key before affecting the verdict
- Production resilience: multi-key rotation, per-key cool-down, concurrency slotting, daily RPD tracking, and retry with exponential backoff on 429s

### Scoring

| Scope      | Method                                                                                          | Student Display       |
| ---------- | ----------------------------------------------------------------------------------------------- | --------------------- |
| Section    | 0–100 — deterministic correct/total; uraian graded by AI; Penyimpulan AI score is authoritative | Color indicator       |
| Quiz (MCQ) | (Correct answers / Total questions) × 100                                                       | Color indicator + raw |

**Scores are shown as color indicators** — never raw numbers on section exercises:

- **Gray** → Belum Dinilai
- **Red** (0–30) → Perlu Perbaikan
- **Orange** (31–70) → Cukup
- **Green** (71–100) → Baik

### Module Quiz

A module-level MCQ evaluation that unlocks after every tab is completed:

- **10 questions per package** — each student is randomly assigned Paket 1 (questions 1–10) or Paket 2 (questions 11–20) on first entry, persisted across sessions
- **Single attempt per question** — answers are collected question-by-question, then submitted all at once with "Selesai"
- Correctness is computed locally against the answer key; results are persisted server-side in `quiz_results` with a server-computed attempt number
- The **first attempt counts as the final score**; subsequent attempts are for practice
- The **result page** shows the score plus per-question **pembahasan** — static explanations by default, with optional AI enrichment (`AI_PEMBAHASAN_ENABLED=true`)
- A **history panel** on the quiz intro page lists past attempts with links to each detail view

---

## Tech Stack

| Layer         | Choice                   | Why                                                      |
| ------------- | ------------------------ | -------------------------------------------------------- |
| **Framework** | Next.js 16 (App Router)  | SSR, API routes, file-based routing                      |
| **Language**  | TypeScript (strict)      | Type safety across the stack                             |
| **Styling**   | Tailwind CSS v4          | Utility-first, design tokens                             |
| **UI**        | shadcn + RetroUI         | Custom NeoBrutalism primitives                           |
| **Database**  | Supabase (PostgreSQL)    | Persistence, RLS, real-time                              |
| **ORM**       | Drizzle                  | Type-safe, lightweight                                   |
| **State**     | Zustand + TanStack Query | Client state (Zustand) + server caching (TanStack Query) |
| **Auth**      | BetterAuth               | Self-hosted, session-based, OAuth-ready                  |
| **AI**        | Gemini API               | Uraian grading, feedback, optional quiz pembahasan       |
| **Cache**     | Redis (Upstash)          | AI result cache + hot progress cache layer               |
| **Viz**       | GeoGebra Web API         | Interactive geometry applets (prasyarat + module tabs)   |
| **Deploy**    | Vercel                   | Edge network, serverless                                 |

---

## Project Structure

```
app/
├── (app)/                 # App shell (Navbar + content)
│   ├── menu/              # Main menu — module card grid (Translasi, Refleksi)
│   ├── prasyarat/         # Prerequisite material (coordinates, canvas, video)
│   ├── apersepsi/[slug]/  # Module intro (translasi | refleksi)
│   └── modul/[slug]/      # Learning modules
│       ├── layout.tsx     # Tab navigation + progress sync + lock guards
│       ├── [tab]/page.tsx # Per-tab sections with submit / AI feedback
│       └── kuis/          # Quiz flow
│           ├── page.tsx   # Quiz intro (rules, history, start)
│           ├── [nomor]/   # Per-question (1–10) with prev/next + Selesai
│           └── hasil/     # Score + per-question pembahasan
├── (auth)/                # Login & register flows (no app shell)
├── (landing)/             # Brand hero landing page (no app shell)
├── api/                   # Route handlers
│   ├── modul/[slug]/      # progress, progress/unlock, section, reset, quiz/{submit,status,result}
│   ├── ai/                # evaluate-section, generate-pembahasan, status
│   ├── cron/ai-cache-cleanup/  # AI cache TTL cleanup job
│   ├── health/            # Infrastructure health probe
│   └── auth/[...all]/     # BetterAuth handler
├── providers.tsx          # QueryClientProvider + other providers
├── layout.tsx             # Root layout — font + globals
└── globals.css            # Nusantara Rebel palette + utilities

features/                  # Feature-based modular architecture
├── auth/                  # LoginForm, RegisterForm, AuthFormField, hooks
├── menu/                  # ModuleCard, ModuleGrid, MenuHeader, data
├── modules/               # Core learning engine
│   ├── components/        # Section forms, AssessmentSection, LockOverlay, RefleksiLockGuard
│   ├── hooks/             # TanStack Query hooks (useSectionSubmission, useTabProgress, useEvaluateSection)
│   ├── data/              # Module tab configs (translasi.ts, refleksi.ts, moduleConfig.ts)
│   ├── lib/               # progressSync, evaluateSection, feedback, validation, scoreColors
│   ├── services/          # Layer 2 — progress.ts, quiz.ts, ai.ts, aiCache.ts
│   └── index.ts           # Barrel exports
├── quiz/                  # Quiz feature
│   ├── components/        # QuizResult, QuizNavigation, ScoreGauge, etc.
│   ├── hooks/             # useSubmitQuiz, useQuizResult, useQuizStatus, useQuiz, useQuizPembahasan
│   ├── data/              # Question bank (translasi.ts, refleksi.ts, 2 packages each)
│   ├── store.ts           # Zustand quiz store (user-scoped persistence)
│   └── index.ts           # Barrel exports
├── prasyarat/             # Prerequisite canvas + controls
└── apersepsi/             # Module intro content

components/                # Shared React components
├── retroui/               # NeoBrutalism primitives (Button, Card, Text, Skeleton, etc.)
├── common/                # MaterialIcon, AmbientCircles
└── layout/                # NavbarClient, LandingFooter, ProfileDropdown, AuthLayout

lib/                       # Auth, DB, utility clients
├── query/                 # TanStack Query singleton QueryClient
├── api/                   # Layer 1 primitives (AppError, handleError, requireAuth, logger)
├── rate-limit/            # Gemini key coordinator (rotation, cooldown, quotas)
├── supabase/              # Supabase client (client, server)
├── auth.ts / auth-client.ts   # BetterAuth server + browser config
├── db.ts                  # Drizzle + lazy getDb() accessor
├── cache.ts               # Redis read-through cache helper
├── user-scoped-storage.ts # Per-user localStorage persistence
└── schemas.ts             # Zod validation schemas (section, unlock, quiz, AI)

drizzle/                   # Database schema (Drizzle ORM)
supabase/                  # Database migrations
```

---

## Design

**Nusantara Rebel** — heritage-inspired NeoBrutalism.

- 4px solid black borders on everything
- Hard drop shadows (no blur, no fade)
- Square elements, `font-black uppercase` typography
- Space Grotesk throughout
- Material Symbols for icons (lucide-react only as fallback)
- Semantic Tailwind tokens (`bg-primary`, `text-foreground`, `border-border`) — never raw hex

Full reference: [StyleGuide.md](./StyleGuide.md) | [DESIGN.md](./DESIGN.md)

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm / bun
- Supabase project (or local instance)
- BetterAuth credentials
- Gemini API key (for AI feedback features)

### Installation

```bash
# Clone & install
git clone <repo-url>
cd batik-geometry
npm install

# Set up environment
cp .env.local.example .env.local
# Fill in: Supabase URL + keys, BetterAuth secrets, Gemini API key

# Push database schema
npm run db:push

# Start dev server
npm run dev
```

### Development Commands

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run lint         # Run ESLint
npm run test         # Run Vitest tests
npm run db:studio    # Open Drizzle Studio
npm run db:generate  # Generate migration
npm run db:migrate   # Apply migration
```

---

## Architecture Highlights

### 3-Layer API Architecture

```
Layer 1 — Route Handler (app/api/.../route.ts)
  Parse request → Zod validate → call service → respond
  Error: catch → handleError()

Layer 2 — Service (features/*/services/*.ts)
  Plain async functions — NO Next.js imports
  Business logic + AppError throws; calls getDb() lazily

Layer 3 — Database (lib/db.ts + drizzle/schema)
  Lazy getDb() singleton — never at module level
  Drizzle ORM
```

### Data Fetching (TanStack Query)

All API calls go through typed TanStack Query hooks co-located with their feature in `features/*/hooks/`. No raw `fetch()` or `useEffect`-based data loading in components. Singleton `QueryClient` at `lib/query/client.ts`, provided via `app/providers.tsx`.

### Tab Unlock Flow

1. Client submits the last terminal section → `triggerTabUnlockIfComplete` builds the section claims from the answer store
2. The store **optimistically** marks the tab completed and unlocks the next
3. `POST /api/modul/[slug]/progress/unlock` — the server reconciles missing section rows from the claims, validates all expected sections are terminal, then flips `completed` + `unlocked` in one transaction (idempotent, duplicate-concurrent-call safe)
4. On rejection the optimistic update rolls back; the server-side auto-unlock on the next progress fetch converges the state

### Data Persistence

Every answer, per-field correctness, score, feedback, and status across all attempts is stored in the `section_progress` table, enabling detailed progress tracking and tab unlock validation.

---

## References

- [PRD_v3.md](./PRD_v3.md) — Product Requirements Document (single source of truth)
- [PRD.md](./PRD.md) — Product Requirements Document v1 (archived)
- [StyleGuide.md](./StyleGuide.md) — Design system reference
- [DESIGN.md](./DESIGN.md) — Color palette & tokens
- [AGENTS.md](./AGENTS.md) — Project conventions & architecture rules

---

## License

MIT — see [LICENSE](./LICENSE) (if applicable).

---

_Built with ❤️ for Indonesian mathematics education._
