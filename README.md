# GEMATRI — Gemakan Mahir Transformasi Geometri

![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=flat-square) ![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue?style=flat-square) ![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square) ![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3FCF8E?style=flat-square) ![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

> **Geometric transformation meets Nusantara Batik heritage.**  
> An interactive learning medium for Grade IX SMP students that teaches translation and reflection through visual exploration of Indonesian Batik motifs, with AI-powered per-section feedback and sequential mastery-based progression.

---

## Why GEMATRI?

**Geometric transformations are inherently abstract.** Students struggle to visualize how points, lines, and shapes move across a coordinate plane. GEMATRI bridges that gap by embedding mathematical concepts within the rich geometric patterns of Indonesian Batik — turning abstract formulas into something tangible, cultural, and engaging.

**Built for pedagogy, not just technology.** Every interaction follows the van Hiele theory of geometric reasoning, scaffolding students from visual recognition to formal deduction. A sequential locking system ensures mastery at each step before progression.

---

## Key Features

### Sequential Module Learning

Each module tab must be completed in order. Every section within a tab (Percobaan, Pengamatan, Penyimpulan, Cek Pemahaman) requires submission before the next unlocks:

```
Tab 1 (Titik)  →  Submit all sections  →  Tab 2 (Garis) unlocks
Tab 2 (Garis)  →  Submit all sections  →  Tab 3 (Bangun) unlocks
...            →  All tabs complete     →  Quiz unlocks
```

### Learning Modules

| Module        | Tabs                                          | Batik Motifs                                                            |
| ------------- | --------------------------------------------- | ----------------------------------------------------------------------- |
| **Translasi** | Titik, Garis, Bangun                          | Kawung, Parang Rusak, Megamendung                                       |
| **Refleksi**  | Sumbu-X, Sumbu-Y, O(0,0), y=x, y=-x, x=h, y=k | Kawung, Parang, Megamendung, Truntum, Sidomukti, Sekar Jagad, Gentongan |

Each tab follows an inquiry-based flow:

1. **Budaya** — Learn the Batik motif's cultural significance
2. **Kanvas Interaktif** — Experiment with GeoGebra-powered visualizations
3. **Percobaan** — Guided experiment with AI-checked submission
4. **Pengamatan** — Record observations with AI-checked submission
5. **Penyimpulan** — Draw conclusions with AI-checked submission
6. **Cek Pemahaman** — Verify understanding with AI-checked submission

### Two-Attempt AI Feedback System

Every section and quiz question follows a structured two-attempt flow:

- **Attempt 1 (Correct)** → Full AI explanation, section marked complete
- **Attempt 1 (Wrong)** → AI hint (no answer revealed), "Coba Lagi" button appears
- **Attempt 2 (Wrong)** → Detailed AI feedback with answer key, input permanently locked
- **Scoring** → 0–100 per section based on question type (MC, essay, numeric, all-correct)

### Question Bank

- All questions created **manually** by the research team — no AI-generated content
- 4 question type variations: Pilihan Ganda, Uraian, Angka/Matematika, Campuran
- Module quizzes are separate from pre-test/post-test evaluation instruments

### Lab Batik (Creative Sandbox)

Free-form creative workspace where students:

- Place Batik motif stamps on a Cartesian grid
- Apply transformations (translate, reflect, clone)
- Choose from authentic Batik colors
- Save creations and export as PNG

---

## Tech Stack

| Layer         | Choice                   | Why                                     |
| ------------- | ------------------------ | --------------------------------------- |
| **Framework** | Next.js 16 (App Router)  | SSR, API routes, file-based routing     |
| **Language**  | TypeScript (strict)      | Type safety across the stack            |
| **Styling**   | Tailwind CSS v4          | Utility-first, design tokens            |
| **Database**  | Supabase (PostgreSQL)    | Persistence, RLS, real-time             |
| **ORM**       | Drizzle                  | Type-safe, lightweight, fast migrations |
| **State**     | Zustand + TanStack Query | Minimal client state + server caching   |
| **Auth**      | BetterAuth               | Self-hosted, session-based, OAuth-ready |
| **Viz**       | GeoGebra Web API         | Interactive geometry applets            |
| **AI**        | Gemini API               | Per-section answer evaluation           |
| **Deploy**    | Vercel                   | Edge network, serverless                |

---

## Project Structure

```
app/
├── (landing)/            # Brand hero landing page
├── (auth)/               # Login & register flows
├── (app)/
│   ├── menu/             # Main navigation grid
│   ├── prasyarat/        # Prerequisite material
│   ├── lab/              # Lab Batik creative sandbox
│   ├── apersepsi/[slug]  # Module introductions
│   └── modul/[slug]/     # Learning modules
│       ├── layout.tsx    # Tab navigation with locking logic
│       ├── [tab]/page.tsx # Per-tab sections with submit/AI feedback
│       └── kuis/         # Quiz flow (questions → results)
└── api/auth/             # BetterAuth handler

features/
├── auth/                 # Authentication UI + hooks
├── menu/                 # Menu components
├── prasyarat/            # Prerequisite canvas + controls
├── apersepsi/            # Module intro components
├── modules/              # Core learning engine
│   ├── data/             # Static curriculum (translasi, refleksi)
│   ├── hooks/            # Submission, locking, AI feedback hooks
│   ├── store/            # Zustand stores (progress, locking)
│   ├── types/            # Shared TypeScript types
│   └── components/
│       ├── sections/     # percobaan, pengamatan, penyimpulan, cek-pemahaman
│       ├── feedback/     # AI feedback display per section
│       └── shared/       # Reusable form primitives
├── quiz/                 # Quiz engine + components
└── lab/                  # Lab Batik canvas + tools

components/retroui/        # NeoBrutalism UI primitives
lib/                       # Auth, DB, utility clients
drizzle/                   # Database schema + migrations
```

---

## Design

**Nusantara Rebel** — where Indonesian heritage meets NeoBrutalism.

- 4px solid black borders on everything
- Hard drop shadows (no blur, no fade)
- Square elements, uppercase typography
- Space Grotesk throughout
- Color palette rooted in Batik dyes (Sogan Kuning, Merah Gentongan, etc.)

Full reference: [StyleGuide.md](./StyleGuide.md) | [DESIGN.md](./DESIGN.md)

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm / bun
- Supabase project (or local instance)
- BetterAuth credentials
- (Optional) Gemini API key for AI feedback features

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
npm run db:studio    # Open Drizzle Studio
npm run db:generate  # Generate migration
npm run db:migrate   # Apply migration
```

---

## Architecture Highlights

### Inquiry-Based Learning Flow

```
Each section follows the submit + AI evaluation flow:

  ■ Percobaan    → Interact with canvas → Submit → AI feedback
  ■ Pengamatan   → Record observations  → Submit → AI feedback
  ■ Penyimpulan  → Draw conclusions     → Submit → AI feedback
  ■ Cek Paham    → Quick check          → Submit → AI feedback

  2 attempts per section. Input locks after attempt 2.
  All progress persisted to database per section.
```

### Tab Locking System

Tabs are locked by default. Unlock conditions are validated both client-side (UI) and server-side (route protection + database checks). Each tab tracks which sections have been submitted, scored, and completed.

### Data Persistence

Every answer, score, and feedback entry across all attempts is stored in the `section_progress` table, enabling detailed progress tracking.

### Scoring Formulas

| Question Type    | Scoring Method                                                |
| ---------------- | ------------------------------------------------------------- |
| Pilihan Ganda    | (Correct / Total) × 100                                       |
| Uraian (Essay)   | AI compares semantics, intent, and reasoning (not exact text) |
| Angka/Matematika | Flexible validation — accepts equivalent values/formats       |
| All Correct      | Automatic 100                                                 |

---

## References

- [PRD_v2.md](./PRD_v2.md) — Product Requirements Document v2
- [StyleGuide.md](./StyleGuide.md) — Design system reference
- [DESIGN.md](./DESIGN.md) — Color palette & tokens

---

## License

MIT — see [LICENSE](./LICENSE) (if applicable).

---

_Built with ❤️ for Indonesian mathematics education._
