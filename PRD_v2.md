# Product Requirements Document v2

## GEMATRI — Geometri Batik Interaktif

**Product:** GEMATRI (Geometri Batik Interaktif)
**Version:** 2.0 (Draft)
**Last Updated:** 2026-07-16

---

## 1. Product Overview

### 1.1 Vision

Menjadi media pembelajaran interaktif definitif untuk geometri transformasi dalam pendidikan Indonesia, menjembatani abstraksi matematika dengan warisan budaya melalui teknologi.

### 1.2 Mission

- Menyajikan konsep geometri transformasi (translasi, refleksi) secara visual dan interaktif
- Membumikan matematika abstrak melalui konteks budaya Batik Nusantara
- Mendukung pedagogi konstruktivistik dengan scaffolding adaptif berbasis AI
- Membantu guru menyampaikan materi yang selama ini sulit divisualisasikan

### 1.3 Target Users

| User                   | Role        | Description                                                      |
| ---------------------- | ----------- | ---------------------------------------------------------------- |
| **Siswa SMP Kelas IX** | Learner     | Mempelajari translasi dan refleksi melalui eksplorasi interaktif |
| **Guru Matematika**    | Facilitator | Mengintegrasikan media ke dalam pembelajaran di kelas            |
| **Peneliti**           | Evaluator   | Mengukur validitas, kepraktisan, dan keefektifan produk          |

---

## 2. Problem Statement

### 2.1 Core Problem

Siswa kesulitan memahami konsep **transformasi geometri** karena materi bersifat **abstrak**. Vektor translasi, sumbu refleksi, dan pemetaan koordinat sulit dikaitkan dengan pengalaman sehari-hari siswa.

### 2.2 Contributing Factors

1. **Abstraction gap** — Siswa tidak dapat memvisualisasikan bagaimana titik, garis, dan bangun bergerak dalam ruang koordinat
2. **Cultural disconnect** — Soal geometri standar menggunakan bentuk generik tanpa relevansi budaya
3. **Passive learning** — Instruksi tradisional berpusat pada guru, bukan eksplorasi siswa
4. **Missing scaffolding** — Tidak ada progresi bertahap dari konkret ke abstrak

### 2.3 Solution Approach

Aplikasi web interaktif yang:

- Memvisualisasikan transformasi geometri melalui kanvas koordinat interaktif
- Membenamkan **motif Batik Indonesia** sebagai objek geometri yang ditransformasi
- Menyediakan aktivitas **konstruktivistik** (observasi → pola → kesimpulan → verifikasi)
- Mengikuti teori **van Hiele** untuk scaffolding dari visualisasi ke penalaran formal
- Mengintegrasikan **AI scaffolding** via Gemini API untuk umpan balik personal

---

## 3. Feature Requirements

### 3.1 Feature Roadmap

| #   | Feature                          | Priority | Notes                                              |
| --- | -------------------------------- | -------- | -------------------------------------------------- |
| F1  | Authentication (Login/Register)  | P0       | BetterAuth, email + Google OAuth                   |
| F2  | Landing & Apersepsi              | P0       | Brand hero, coordinate explorer, module navigation |
| F3  | Prerequisite Material            | P1       | Cartesian recap with interactive canvas            |
| F4  | Translation Module (3 subtopics) | P0       | Titik, Garis, Bidang with inquiry flow             |
| F5  | Translation Quiz                 | P0       | 10+ questions, multiple types, scoring             |
| F6  | Reflection Module (7 subtopics)  | P0       | Sumbu-X through y=k with inquiry flow              |
| F7  | Reflection Quiz                  | P0       | 15+ questions, same quiz engine                    |
| F8  | Lab Batik (Creative Sandbox)     | P1       | Free creation with stamp, transform, save/export   |
| F9  | AI Chatbot Scaffolding           | P1       | Gemini-powered, context-aware                      |
| F10 | AI Answer Checking & Feedback    | P1       | Auto-evaluation + step-by-step explanation         |
| F11 | Student Progress Tracking        | P1       | Subtopic completion, quiz scores, time tracking    |
| F12 | Stepped Learning                 | P1       | Step-by-step inquiry with completion tracking      |
| F13 | Teacher Dashboard                | P2       | Class analytics, progress reports                  |
| F14 | Student Dashboard                | P2       | Overview, strengths/weaknesses, history            |

### 3.2 Feature Details

#### F1: Authentication

- BetterAuth dengan email/password dan Google OAuth
- Session cookie-based, persistent across browser sessions
- Route protection: unauthenticated users redirected to `/login`
- Register flow with email + password + name
- Logout clears session

#### F2: Landing & Apersepsi

- Landing page with brand introduction and CTA
- Apersepsi page with introduction video for each module
- Interactive Cartesian coordinate explorer (toggles: sumbu-x, sumbu-y, kuadran, titik, arah)
- Navigation gateway to learning modules

#### F3: Prerequisite Material

- Review: Cartesian coordinate system, quadrants, plotting points
- Interactive GeoGebra-based canvas demonstrations
- Self-check quiz on prerequisite concepts
- Progress indicator showing prerequisite completion status

#### F4: Translation Module

Three subtopics mapped to Batik motifs:

| Subtopic         | Batik Motif  | Concept                   |
| ---------------- | ------------ | ------------------------- |
| Translasi Titik  | Kawung       | Point translation T[a,b]  |
| Translasi Garis  | Parang Rusak | Line translation          |
| Translasi Bidang | Megamendung  | Polygon/shape translation |

Each subtopic includes:

- **Cultural context** — Batik motif significance + video
- **Interactive canvas** — GeoGebra + custom canvas with coordinate readout
- **Inquiry-based learning** — Observation → Pattern recognition → Conclusion
- **Matrix formula** — Algebraic explanation
- **Comprehension check** — Verify understanding
- **Conclusion notepad** — Student saves findings

#### F5: Translation Quiz

- Route: `/modul/translasi/kuis` (intro) → `/modul/translasi/kuis/[nomor]` (questions) → `/modul/translasi/kuis/hasil` (results)
- 10+ questions across 3 subtopics
- Question types: multiple choice, coordinate input, drag-and-drop, ordering
- Immediate per-question feedback (correct/incorrect)
- Final score display with subtopic breakdown
- AI-powered feedback on incorrect answers
- Results persisted to database

#### F6: Reflection Module

Seven subtopics mapped to Batik motifs:

| Subtopic                  | Batik Motif | Formula          |
| ------------------------- | ----------- | ---------------- |
| Refleksi Sumbu X          | Kawung      | (x,y) → (x,-y)   |
| Refleksi Sumbu Y          | Parang      | (x,y) → (-x,y)   |
| Refleksi Titik Asal (0,0) | Megamendung | (x,y) → (-x,-y)  |
| Refleksi Garis y=x        | Truntum     | (x,y) → (y,x)    |
| Refleksi Garis y=-x       | Sidomukti   | (x,y) → (-y,-x)  |
| Refleksi Garis x=h        | Sekar Jagad | (x,y) → (2h-x,y) |
| Refleksi Garis y=k        | Gentongan   | (x,y) → (x,2k-y) |

Same structure as Translation module (cultural context, canvas, inquiry, formula, conclusion).

#### F7: Reflection Quiz

- Route: `/modul/refleksi/kuis` → `/modul/refleksi/kuis/[nomor]` → `/modul/refleksi/kuis/hasil`
- 15+ questions across 7 subtopics
- Same quiz engine and feedback pattern as Translation Quiz

#### F8: Lab Batik (Creative Sandbox)

- Canvas-based workspace with Cartesian grid (-10 to 10)
- Click-to-place Batik stamps (Kawung, Parang, Megamendung, Truntum)
- Color palette: Sogan Kuning, Merah Gentongan, Pesisir Hijau, Biru Mega, Mata Arang
- Batch transformation tools: translation [a,b], reflection (4 axes), clone + transform
- Save/load creations to user account
- Export to PNG
- Clear canvas + undo/redo

#### F9: AI Chatbot Scaffolding

- Gemini-powered chatbot accessible from any learning page
- Context-aware: knows current subtopic and student progress
- Explains concepts in simple Indonesian
- Provides hints without giving away answers
- Chat interface with message history
- Offline fallback with static FAQ

#### F10: AI Answer Checking & Feedback

- AI evaluates student answers on quiz questions
- Constructive feedback on incorrect answers
- Step-by-step solution explanation
- Tracks common mistakes for teacher reporting

#### F11: Student Progress Tracking

- Subtopic completion tracking (inquiry steps, observations, conclusions)
- Quiz score history
- Time spent per module
- Data persisted in database
- Visual progress indicators throughout learning flow

#### F12: Stepped Learning

- Structured inquiry steps per subtopic (4-5 steps each)
- Step-by-step progression with completion marking
- Observations checklist per subtopic
- Conclusion writing with save functionality
- Visual progress per step within each subtopic

#### F13: Teacher Dashboard

- Class overview with student progress data
- Per-module completion statistics
- Common mistakes analysis
- Progress report export (CSV/PDF)

#### F14: Student Dashboard

- Overall progress overview across all modules
- Per-subtopic completion status and scores
- Quiz score history with dates
- Strengths and weaknesses identification

---

## 4. Technical Architecture

### 4.1 Tech Stack

| Layer             | Technology            | Purpose                          |
| ----------------- | --------------------- | -------------------------------- |
| **Framework**     | Next.js (App Router)  | Routing, SSR, API routes         |
| **Language**      | TypeScript (strict)   | Type safety                      |
| **Styling**       | Tailwind CSS v4       | Design system, responsive layout |
| **Database**      | Supabase (PostgreSQL) | Data persistence, real-time      |
| **ORM**           | Drizzle               | Type-safe queries, migrations    |
| **State Mgmt**    | Zustand               | Client-side state                |
| **Data Fetching** | TanStack Query        | Server state, caching            |
| **Validation**    | Zod                   | Schema validation                |
| **Auth**          | BetterAuth            | Authentication & sessions        |
| **Visualization** | GeoGebra (Web API)    | Interactive geometry applets     |
| **AI**            | Gemini API            | Chatbot, answer checking         |
| **Hosting**       | Vercel                | Deployment                       |

### 4.2 Project Structure

```
app/
├── (landing)/page.tsx           # Brand hero landing
├── (auth)/login + register      # BetterAuth flows
├── (app)/
│   ├── menu/page.tsx            # Main menu — 3-card grid
│   ├── prasyarat/page.tsx       # Prerequisite material
│   ├── lab/page.tsx             # Lab Batik sandbox
│   ├── apersepsi/[slug]         # Module introspection
│   └── modul/[slug]/
│       ├── layout.tsx           # Tab navigation + footer
│       ├── [tab]/page.tsx       # Per-subtopic learning page
│       └── kuis/[nomor] + hasil # Quiz flow
├── api/auth/[...all]            # BetterAuth handler
└── globals.css                  # Design tokens

features/
├── auth/     # Authentication components + hooks
├── menu/     # Menu components + data
├── prasyarat/ # Prerequisite components + hooks
├── apersepsi/ # Apersepsi components + hooks
├── modules/  # Learning modules (core)
│   ├── data/           # Static curriculum data
│   ├── hooks/          # Learning hooks
│   ├── types/          # TypeScript types
│   ├── store/          # Zustand stores
│   └── components/
│       ├── sections/   # percobaan, pengamatan, penyimpulan, cek-pemahaman
│       └── shared/     # Reusable form inputs
├── quiz/     # Quiz components + hooks
└── lab/      # Lab Batik canvas

components/
├── retroui/   # NeoBrutalism UI primitives
├── batik/     # Batik motif stamps
├── common/    # Shared utilities
└── layout/    # Navbar, footer, profile
```

---

## 5. Design System

### 5.1 Design Language

**Nusantara Rebel** — Indonesian heritage meets NeoBrutalism.

- **4px solid black borders** on all interactive/container elements
- **Hard drop shadows** (no blur) — `8px 8px 0 0 #000`
- **Square elements** — 0px border-radius on cards and buttons
- **Uppercase** labels and headings (`font-black uppercase`)
- **Space Grotesk** for all text
- **High contrast** — black text on warm paper background
- **Interactive press** — element shifts into its shadow on click

### 5.2 Color Palette

| Token          | Hex       | Usage                        |
| -------------- | --------- | ---------------------------- |
| `--background` | `#fff8ef` | Page background (warm paper) |
| `--foreground` | `#1f1b12` | Body text                    |
| `--card`       | `#ffffff` | Card surfaces                |
| `--primary`    | `#ffd93d` | CTA buttons, primary actions |
| `--secondary`  | `#006e29` | Success, translation module  |
| `--tertiary`   | `#ae2f34` | Errors, reflection module    |
| `--border`     | `#000`    | All borders (always black)   |

### 5.3 Typography

- **Font:** Space Grotesk (300–700), `next/font/google`
- **Icons:** `lucide-react`
- **Labels/headings:** `text-xs font-black uppercase`
- **Body:** `text-sm font-medium`

---

## 6. Data Model

### 6.1 Core Entities

| Entity                | Table               | Purpose                                    |
| --------------------- | ------------------- | ------------------------------------------ |
| **User**              | `users`             | Managed by BetterAuth                      |
| **Subtopic Progress** | `subtopic_progress` | Tracks completion per student per subtopic |
| **Quiz Result**       | `quiz_results`      | Score, answers, AI feedback                |
| **Batik Creation**    | `batik_creations`   | Saved Lab Batik canvas data                |
| **Chat Message**      | `chat_messages`     | AI chatbot conversation history            |

### 6.2 Subtopic Progress Schema

```typescript
interface SubtopicProgress {
  id: string;
  userId: string;
  module: "translasi" | "refleksi";
  subtopic: string; // 'titik', 'garis', 'sumbu-x', dll.
  stepsCompleted: string[]; // ["step1", "step2", ...]
  observations: number[]; // [0, 1, 2]
  conclusion: string;
  completed: boolean;
  timeSpentMs: number;
}
```

---

## 7. User Flows

### 7.1 Primary Learning Flow

```
Landing → Login → Menu
  ├── Prasyarat (optional)
  ├── Translasi Module
  │   ├── Apersepsi → Titik → Garis → Bidang → Quiz → Hasil
  │   └── Each subtopic: Budaya → Canvas → Inkuiri → Rumus → Cek
  ├── Refleksi Module
  │   ├── Apersepsi → Sumbu-X → Sumbu-Y → ... → y=k → Quiz → Hasil
  │   └── Each subtopic: Same inquiry flow
  └── Lab Batik (free exploration)
```

### 7.2 AI Interaction Flow

```
Student on Learning Page
  ├── Opens Chat Widget
  │   └── Asks question → Gemini API (context-aware) → Response
  └── Submits Quiz Answer
      └── AI evaluates → Correct/Incorrect → Step-by-step feedback
```

---

## 8. Non-Functional Requirements

| Metric                 | Target                                                          |
| ---------------------- | --------------------------------------------------------------- |
| First Contentful Paint | < 2s                                                            |
| Time to Interactive    | < 4s                                                            |
| Canvas FPS             | ≥ 60fps                                                         |
| Gemini API Response    | < 5s                                                            |
| Initial Bundle         | < 250KB gzipped                                                 |
| Responsiveness         | Mobile (<640px) → Tablet (640-1024px) → Desktop (>1024px)       |
| Accessibility          | WCAG AA (contrast ≥ 4.5:1, keyboard nav, ARIA labels)           |
| Browser Support        | Chrome 90+, Firefox 88+, Safari 14+, Edge 90+                   |
| Security               | BetterAuth sessions, Supabase RLS, environment-isolated secrets |

---

## 9. Batik Motif Mapping

| Motif        | Geometric Concept | Module               |
| ------------ | ----------------- | -------------------- |
| Kawung       | Titik, Sumbu X    | Translasi + Refleksi |
| Parang Rusak | Garis, Sumbu Y    | Translasi + Refleksi |
| Megamendung  | Bidang, O(0,0)    | Translasi + Refleksi |
| Truntum      | y=x reflection    | Refleksi             |
| Sidomukti    | y=-x reflection   | Refleksi             |
| Sekar Jagad  | x=h reflection    | Refleksi             |
| Gentongan    | y=k reflection    | Refleksi             |

---

## 10. Van Hiele Levels

| Level | Name               | Implementation                            |
| ----- | ------------------ | ----------------------------------------- |
| 0     | Visualization      | Batik motifs displayed, shape recognition |
| 1     | Analysis           | Properties observed in interactive canvas |
| 2     | Informal Deduction | Patterns recognized in inquiry steps      |
| 3     | Formal Deduction   | Matrix formulas, algebraic notation       |
| 4     | Rigor              | Student conclusions, comprehension checks |

---

## 11. Development Phases

### Phase 1: Foundation

- Next.js project scaffold + TypeScript strict + Tailwind v4
- BetterAuth auth (email/password + Google OAuth)
- Supabase + Drizzle schema + migrations
- NeoBrutalism design system + base components
- Layout components (navbar, footer)

### Phase 2: Learning Modules

- Apersepsi with coordinate explorer
- Prerequisite material
- Translation module (3 subtopics) with inquiry flow
- Reflection module (7 subtopics) with inquiry flow
- Interactive canvas components
- Cultural context + video content

### Phase 3: Quiz System

- Quiz data structure + question bank
- Translation quiz (10+ questions)
- Reflection quiz (15+ questions)
- Quiz UI (multiple choice, coordinate input, drag-and-drop)
- Scoring + result display
- AI answer evaluation

### Phase 4: AI Integration

- Gemini API setup (Next.js API route)
- Chatbot widget with context awareness
- AI answer checking + step-by-step feedback
- Offline fallback

### Phase 5: Lab Batik & Progress

- Creative sandbox canvas with stamp tools
- Batch transformation tools
- Save/load creations
- Student progress tracking
- Time tracking

### Phase 6: Polish & Dashboard

- Teacher dashboard with class analytics
- Student dashboard with progress overview
- Performance optimization
- Accessibility audit
- Research instrumentation
- E2E testing
- Production deployment

---

## 12. Success Criteria

| Criterion                       | Target      |
| ------------------------------- | ----------- |
| All P0 features operational     | 100%        |
| All P1 features operational     | 100%        |
| Zero critical bugs              | 0           |
| Expert validation score         | ≥ 3.5 / 4.0 |
| Practitioner practicality score | ≥ 3.5 / 4.0 |
| Pre/post test improvement       | ≥ 25%       |
| AI response accuracy            | ≥ 85%       |
| Lighthouse Performance          | ≥ 90        |
| Lighthouse Accessibility        | ≥ 90        |
