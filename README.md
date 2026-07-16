# GEMATRI — Geometri Batik Interaktif

![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=flat-square) ![TypeScript](https://img.shields.io/badge/TypeScript-5-strict-blue?style=flat-square) ![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square) ![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3FCF8E?style=flat-square) ![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

> **Geometri transformasi bertemu warisan Batik Nusantara.**  
> Sebuah media pembelajaran interaktif untuk siswa SMP Kelas IX yang mengajarkan translasi dan refleksi geometri melalui eksplorasi visual berbasis motif Batik Indonesia.

---

## Why GEMATRI?

**Geometric transformations are inherently abstract.** Students struggle to visualize how points, lines, and shapes move across a coordinate plane. GEMATRI bridges that gap by embedding mathematical concepts within the rich geometric patterns of Indonesian Batik — turning abstract formulas into something tangible, cultural, and engaging.

**Built for pedagogy, not just technology.** Every interaction follows the van Hiele theory of geometric reasoning, scaffolding students from visual recognition to formal deduction. The result is a learning experience that's both culturally grounded and pedagogically sound.

---

## Features

### Learning Modules

| Module        | Subtopics                                     | Batik Motifs                                                            |
| ------------- | --------------------------------------------- | ----------------------------------------------------------------------- |
| **Translasi** | Titik, Garis, Bidang                          | Kawung, Parang Rusak, Megamendung                                       |
| **Refleksi**  | Sumbu-X, Sumbu-Y, O(0,0), y=x, y=-x, x=h, y=k | Kawung, Parang, Megamendung, Truntum, Sidomukti, Sekar Jagad, Gentongan |

Each subtopic follows an inquiry-based flow:

1. **Eksplorasi Budaya** — Learn the Batik motif's cultural significance
2. **Kanvas Interaktif** — Experiment with GeoGebra-powered visualizations
3. **Langkah Inkuiri** — Guided discovery through observation and pattern recognition
4. **Rumus & Matriks** — Formalize findings algebraically
5. **Cek Pemahaman** — Verify understanding with comprehension checks

### Quiz System

- Per-module quizzes with multiple question types
- Immediate feedback on each answer
- Score breakdown by subtopic
- AI-powered step-by-step explanations for incorrect answers

### Lab Batik (Creative Sandbox)

Free-form creative workspace where students:

- Place Batik motif stamps on a Cartesian grid
- Apply transformations (translate, reflect, clone)
- Choose from authentic Batik colors
- Save creations and export as PNG

### Coming Soon

- AI chatbot for personalized scaffolding
- Student progress dashboard
- Teacher analytics dashboard
- Stepped learning with completion tracking

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
| **AI**        | Gemini API               | Chatbot, answer checking                |
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
│       ├── [tab]/        # Per-subtopic learning pages
│       └── kuis/         # Quiz flow (questions → results)
└── api/auth/             # BetterAuth handler

features/
├── auth/                 # Authentication UI + hooks
├── menu/                 # Menu components
├── prasyarat/            # Prerequisite canvas + controls
├── apersepsi/            # Module intro components
├── modules/              # Core learning engine
│   ├── data/             # Static curriculum (translasi, refleksi)
│   ├── hooks/            # Per-hook learning logic
│   ├── store/            # Zustand stores
│   ├── types/            # Shared TypeScript types
│   └── components/
│       ├── sections/     # percobaan, pengamatan, penyimpulan, cek-pemahaman
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
- (Optional) Gemini API key for AI features

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
Setiap subtopik mengikuti 4 langkah inkuiri:
  ■ Percobaan    → Interact with the GeoGebra canvas
  ■ Pengamatan   → Record observations in structured forms
  ■ Penyimpulan  → Draw conclusions from observed patterns
  ■ Cek Paham    → Verify understanding with quick checks
```

### Design System

All UI components live in `components/retroui/` — a bespoke NeoBrutalism kit built on `@base-ui/react`. Every component enforces the design system:

- `Button` — variants: default, outline, ghost; always `!rounded-none`
- `Card` — `Card.Header`, `Card.Title`, `Card.Content` sub-components
- `Tabs` — `Tabs.List`, `Tabs.Trigger`, `Tabs.Content` with uppercase labels
- `Input` / `Textarea` / `Select` — utility-based, `border-2 border-border`

### State Management

- **Zustand** stores for client-side state (auth, quiz in-progress, UI toggles)
- **TanStack Query** for server state (progress, quiz results, chat history)
- **Drizzle ORM** for type-safe database access

### Database Security

Row Level Security (RLS) on all Supabase tables ensures users can only read/write their own data. API routes are protected by BetterAuth session middleware.

---

## Module Content Architecture

Curriculum data is structured as typed static objects in `features/modules/data/`. Each translation and reflection subtopic has its own tab specification:

```typescript
export interface ModuleTab {
  label: string; // Display label
  value: string; // URL slug
  title: string; // Page heading
  instruction: string; // Inquiry prompt
  materialId: string; // GeoGebra material ID
  formula: { prefix: string; suffix: string; placeholders: string[] };
  sections: SectionBlock[]; // Percobaan → Pengamatan → Penyimpulan → Cek Paham
}
```

---

## References

- [PRD.md](./PRD.md) — Product Requirements Document v1
- [PRD_v2.md](./PRD_v2.md) — Product Requirements Document v2 (Draft)
- [StyleGuide.md](./StyleGuide.md) — Design system reference
- [DESIGN.md](./DESIGN.md) — Color palette & tokens
- [docs/MODULE_CONTENT_PLAN.md](./docs/MODULE_CONTENT_PLAN.md) — Content development plan
- [docs/phase-1-plan.md](./docs/phase-1-plan.md) — Phase 1 implementation plan

---

## License

MIT — see [LICENSE](./LICENSE) (if applicable).

---

_Dibangun dengan ❤️ untuk pendidikan matematika Indonesia._
