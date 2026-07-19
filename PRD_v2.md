# Product Requirements Document v2

## GEMATRI — Gemakan Mahir Transformasi Geometri

**Product:** GEMATRI (Gemakan Mahir Transformasi Geometri)
**Version:** 2.0
**Last Updated:** 2026-07-16

---

## 1. Product Overview

### 1.1 Vision

To make students proficient in geometric transformation (Gemakan Mahir Transformasi Geometri) through an interactive learning medium that bridges mathematical abstraction with Indonesian Batik cultural heritage.

### 1.2 Mission

- Present geometric transformation concepts (translation, reflection) visually and interactively
- Ground abstract mathematics in the cultural context of Nusantara Batik motifs
- Support constructivist pedagogy with adaptive AI-based scaffolding
- Help teachers deliver material that has traditionally been difficult to visualize

### 1.3 Target Users

| User                   | Role        | Description                                                      |
| ---------------------- | ----------- | ---------------------------------------------------------------- |
| **Siswa SMP Kelas IX** | Learner     | Study translation and reflection through interactive exploration |
| **Guru Matematika**    | Facilitator | Integrate the media into classroom learning                      |
| **Peneliti**           | Evaluator   | Measure product validity, practicality, and effectiveness        |

---

## 2. Problem Statement

### 2.1 Core Problem

Students struggle to understand **geometric transformation** concepts because the material is inherently **abstract**. Translation vectors, reflection axes, and coordinate mapping are difficult to connect with students' daily experience.

### 2.2 Contributing Factors

1. **Abstraction gap** — Students cannot visualize how points, lines, and shapes move in a coordinate space
2. **Cultural disconnect** — Standard geometry problems use generic shapes with no cultural relevance
3. **Passive learning** — Traditional instruction is teacher-centered, not student-exploratory
4. **Missing scaffolding** — No gradual progression from concrete to abstract

### 2.3 Solution Approach

An interactive web application that:

- Visualizes geometric transformations through an interactive coordinate canvas
- Embeds **Indonesian Batik motifs** as geometric objects to be transformed
- Provides **constructivist activities** (observation → pattern → conclusion → verification)
- Follows **van Hiele theory** (levels 0–2) for scaffolding from visualization to informal deduction
- Integrates **AI scaffolding** via Gemini API for personalized per-section feedback
- Implements a **sequential unlocking system** ensuring mastery before progression

---

## 3. Learning Flow & Access Control

### 3.1 Sequential Module Progression

Users must complete each module tab sequentially. Each tab contains multiple sections that must be submitted before the next tab unlocks.

```
Modul Page
  ├── Tab 1 (Titik)        →  Locked until user opens module
  ├── Tab 2 (Garis)        →  Locked until Tab 1 is fully completed
  ├── Tab 3 (Bangun)       →  Locked until Tab 2 is fully completed
  └── Kuis                  →  Locked until all tabs are completed
```

### 3.2 Section-Based Submission Flow

Each tab contains structured sections that must be completed in order:

```
Tab Content
  ├── Percobaan (Experiment)        → Input + Submit required
  ├── Pengamatan (Observation)      → Input + Submit required
  ├── Penyimpulan (Conclusion)      → Input + Submit required
  └── Cek Pemahaman (Comprehension) → Input + Submit required
```

- Each section requires the user to complete and submit their answer before the next section unlocks
- All sections within a tab must be submitted before the next tab becomes accessible
- Progress is persisted in the database after each submission

### 3.3 Tab Locking Mechanism

| State         | Visual    | Behavior                                                 |
| ------------- | --------- | -------------------------------------------------------- |
| **Locked**    | 🔒 Greyed | Tab not clickable; shows tooltip with unlock requirement |
| **Available** | Active    | Tab is accessible for learning                           |
| **Completed** | Checkmark | Tab shows completion status; user can revisit to review  |

- Unlocking condition: all sections in the previous tab must be submitted and evaluated
- Once unlocked, tabs remain accessible (no re-locking)

---

## 4. Content & Question Bank Specifications

### 4.1 Manual Creation

All question banks and quiz content are created **manually by the research team** to ensure quality, validity, and material relevance. The system does **not** use AI-generated quizzes or auto-generated questions.

### 4.2 Instrument Separation

Questions within the learning modules serve purely as **daily learning progress tracking** for students. They are **completely separate** from the main evaluation instruments (pre-test and post-test).

### 4.3 Four Question Type Variations

The question bank is divided into four question type variations:

| Type                   | Description                                                         | Answer Mechanism               |
| ---------------------- | ------------------------------------------------------------------- | ------------------------------ |
| **Pilihan Ganda**      | Multiple choice with single or multiple correct answers             | Select from predefined options |
| **Uraian (Essay)**     | Open-ended written response requiring explanation or reasoning      | Free text input                |
| **Angka / Matematika** | Numeric or mathematical equation input (coordinates, vectors, etc.) | Structured math input field    |
| **Campuran / Semua**   | Mixed-type or all-correct sections where full credit is automatic   | Varies; auto-100 on completion |

---

## 5. Answer Attempt & AI Feedback Flow

### 5.1 Trigger

The flow initiates when the user completes their answer input and clicks the **"Periksa Jawaban"** (Check Answer) button. The AI provides feedback per-section at the bottom of the relevant section area.

### 5.2 Attempt 1

| Condition           | Behavior                                                                                                                                                                                                                                                                                 |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Correct**         | Status immediately marked as **Benar**.<br>"Coba Lagi" button does **not** appear.<br>AI provides full explanation and discussion of the answer.                                                                                                                                         |
| **Wrong / Partial** | AI provides a short hint guiding the student on what to reconsider.<br>AI is **strictly prohibited** from revealing the final answer, final numbers, or calculation steps at this stage.<br>System shows **"Coba Lagi"** (Try Again) button, allowing the user to re-enter their answer. |

### 5.3 Attempt 2

| Condition          | Behavior                                                                                                                                                                          |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **User resubmits** | User corrects their answer and clicks submit for the second time                                                                                                                  |
| **Still wrong**    | AI provides **clearer, more detailed, and deeper** feedback than attempt 1<br>Feedback may approach the correct answer or display the **official answer key** for self-evaluation |

### 5.4 Post-Attempt 2

- The answer input is **permanently locked** after the second attempt
- The user cannot reset or retry further
- Scoring is finalized

### 5.5 Feedback Placement

AI feedback is rendered **dynamically below each respective section** (not at the bottom of the page). Each section has its own feedback area.

---

## 6. Scoring System (AI Evaluation)

After the attempt quota is exhausted (or if the answer is correct on first try), the AI evaluates and assigns a score from **0–100** per section based on question type:

### 6.1 Multiple Choice / Similar

$$
\text{Score} = \left( \frac{\text{Number of Correct Answers}}{\text{Total Questions}} \right) \times 100
$$

Scored exactly based on correct/total ratio.

### 6.2 Essay (Uraian)

- AI evaluates **objectively** by comparing against the official answer
- AI analyzes: sentence intent, essay essence, and the student's reasoning pattern
- Does **not** require 100% textual match; semantic equivalence is accepted

### 6.3 Numeric / Math Input

- AI performs **flexible validation** of the submitted value
- Differences in formatting (spaces, variable order, symbol format) are accepted as long as the **mathematical value is substantively valid**

### 6.4 All Correct (Benar Semua)

- Automatically receives a score of **100**

---

## 7. Data Management & Progress Tracking

### 7.1 Storage Requirements

Every score, answer submission, and feedback history for each section (Percobaan, Pengamatan, Penyimpulan, Cek Pemahaman) must be **immediately persisted to the database** after evaluation is complete.

### 7.2 Per-Section Data

| Field                | Description                                             |
| -------------------- | ------------------------------------------------------- |
| `section_type`       | The section type (Percobaan, Pengamatan, etc.)          |
| `tab_slug`           | The tab identifier (titik, garis, etc.)                 |
| `module_slug`        | The module identifier (translasi, refleksi)             |
| `user_id`            | The submitting user                                     |
| `attempt_1_answer`   | First attempt answer content                            |
| `attempt_1_feedback` | AI feedback for attempt 1                               |
| `attempt_1_score`    | Score after attempt 1                                   |
| `attempt_2_answer`   | Second attempt answer content (if applicable)           |
| `attempt_2_feedback` | AI feedback for attempt 2                               |
| `attempt_2_score`    | Score after attempt 2 (final)                           |
| `final_score`        | The final score (0–100)                                 |
| `status`             | `correct`, `wrong_attempt1`, `wrong_attempt2`, `locked` |
| `completed_at`       | Timestamp of completion                                 |

### 7.3 Progress Calculation

- Tab completion: all sections within the tab have `final_score` recorded
- Module completion: all tabs are completed
- Quiz is separate and has its own completion tracking

---

## 8. Feature Requirements

### 8.1 Feature Roadmap

| #   | Feature                         | Priority | Notes                                                    |
| --- | ------------------------------- | -------- | -------------------------------------------------------- |
| F1  | Authentication (Login/Register) | P0       | BetterAuth, email + Google OAuth                         |
| F2  | Landing & Apersepsi             | P0       | Brand hero, coordinate explorer, module navigation       |
| F3  | Prerequisite Material           | P1       | Cartesian recap with interactive canvas                  |
| F4  | Translation Module (3 tabs)     | P0       | Titik, Garis, Bangun with locking + section submission   |
| F5  | Translation Quiz                | P0       | 10 questions, 4 types, two-attempt, manual question bank |
| F6  | Reflection Module (7 tabs)      | P0       | Sumbu-X through y=k with locking + section submission    |
| F7  | Reflection Quiz                 | P0       | 10 questions, 4 types, two-attempt, manual question bank |
| F8  | Lab Batik (Creative Sandbox)    | P1       | Free creation with stamp, transform, save/export         |
| F9  | Section-Based AI Feedback       | P0       | Per-section AI evaluation with two-attempt system        |
| F10 | Tab Locking & Sequential Access | P0       | Lock/unlock tabs based on per-section completion         |
| F11 | Per-Section Progress Tracking   | P1       | Answer, score, feedback history persisted per section    |

### 8.2 Feature Details

#### F1: Authentication

- BetterAuth with email/password and Google OAuth
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

#### F4 & F6: Learning Modules (Translasi & Refleksi)

Each module has tabs that must be completed sequentially. Each tab contains inquiry sections:

```
Tab Structure:
  ├── Kanvas (Interactive Canvas) — GeoGebra + coordinate exploration
  ├── Percobaan (Experiment) — Input field + submit → AI feedback
  ├── Pengamatan (Observation) — Input field + submit → AI feedback
  ├── Penyimpulan (Conclusion) — Input field + submit → AI feedback
  └── Cek Pemahaman (Comprehension Check) — Input field + submit → AI feedback
```

**Translasi Module (3 tabs):**

| Tab    | Concept                   |
| ------ | ------------------------- |
| Titik  | Point translation T[a,b]  |
| Garis  | Line translation          |
| Bangun | Polygon/shape translation |

**Refleksi Module (7 tabs):**

| Tab        | Formula          |
| ---------- | ---------------- |
| Sumbu-X    | (x,y) → (x,-y)   |
| Sumbu-Y    | (x,y) → (-x,y)   |
| Titik Asal | (x,y) → (-x,-y)  |
| Garis y=x  | (x,y) → (y,x)    |
| Garis y=-x | (x,y) → (-y,-x)  |
| Garis x=h  | (x,y) → (2h-x,y) |
| Garis y=k  | (x,y) → (x,2k-y) |

#### F5 & F7: Quiz System

- Route: `/modul/[slug]/kuis` → `/modul/[slug]/kuis/[nomor]` → `/modul/[slug]/kuis/hasil`
- 10 questions per module, manually created by research team
- 4 question type variations: Pilihan Ganda, Uraian, Angka/Matematika, Campuran
- Two-attempt system per question (same as section AI feedback flow)
- Immediate AI scoring with per-question feedback
- Final score display with tab breakdown
- Results persisted to database

#### F8: Lab Batik (Creative Sandbox)

- Canvas-based workspace with Cartesian grid (-10 to 10)
- Click-to-place Batik stamps (Kawung, Parang, Megamendung, Truntum)
- Color palette: Sogan Kuning, Merah Gentongan, Pesisir Hijau, Biru Mega, Mata Arang
- Batch transformation tools: translation [a,b], reflection (4 axes), clone + transform
- Save/load creations to user account
- Export to PNG
- Clear canvas + undo/redo

#### F9: Section-Based AI Feedback

- Per-section AI evaluation (Percobaan, Pengamatan, Penyimpulan, Cek Pemahaman)
- Two-attempt system as defined in Section 5
- Scoring as defined in Section 6
- AI response rendered dynamically below each section
- History of both attempts and feedback stored in database

#### F10: Tab Locking & Sequential Access

- Tabs locked by default; unlock condition: all preceding tab sections submitted
- Visual indicators (locked, available, completed)
- Tooltip on locked tabs explaining unlock requirements
- Server-side validation prevents access to locked tab routes

#### F11: Per-Section Progress Tracking

- Each section submission persists answer, score, feedback, and timestamp
- Tab completion calculated from all section statuses
- Module completion calculated from all tab statuses
- Visual progress indicators throughout learning flow
- Data used for progress visualization

---

## 9. Technical Architecture

### 9.1 Tech Stack

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
| **AI**            | Gemini API            | Per-section answer evaluation    |
| **Hosting**       | Vercel                | Deployment                       |

### 9.2 Project Structure

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
│       ├── layout.tsx           # Tab navigation + locking logic + footer
│       ├── [tab]/page.tsx       # Per-tab sections with submit/AI feedback
│       └── kuis/[nomor] + hasil # Quiz flow
├── api/auth/[...all]            # BetterAuth handler
└── globals.css                  # Design tokens

features/
├── auth/         # Authentication components + hooks
├── menu/         # Menu components + data
├── prasyarat/    # Prerequisite components + hooks
├── apersepsi/    # Apersepsi components + hooks
├── modules/      # Learning modules (core)
│   ├── data/           # Static curriculum data
│   ├── hooks/          # Learning hooks, submission logic
│   ├── types/          # TypeScript types
│   ├── store/          # Zustand stores (progress, locking)
│   └── components/
│       ├── sections/   # percobaan, pengamatan, penyimpulan, cek-pemahaman
│       ├── feedback/   # AI feedback display per section
│       └── shared/     # Reusable form inputs
├── quiz/        # Quiz components + hooks
└── lab/         # Lab Batik canvas

components/
├── retroui/   # NeoBrutalism UI primitives
├── batik/     # Batik motif stamps
├── common/    # Shared utilities
└── layout/    # Navbar, footer, profile
```

---

## 10. Design System

### 10.1 Design Language

**Nusantara Rebel** — Indonesian heritage meets NeoBrutalism.

- **4px solid black borders** on all interactive/container elements
- **Hard drop shadows** (no blur) — `8px 8px 0 0 #000`
- **Square elements** — 0px border-radius on cards and buttons
- **Uppercase** labels and headings (`font-black uppercase`)
- **Space Grotesk** for all text
- **High contrast** — black text on warm paper background
- **Interactive press** — element shifts into its shadow on click

### 10.2 Color Palette

| Token          | Hex       | Usage                        |
| -------------- | --------- | ---------------------------- |
| `--background` | `#fff8ef` | Page background (warm paper) |
| `--foreground` | `#1f1b12` | Body text                    |
| `--card`       | `#ffffff` | Card surfaces                |
| `--primary`    | `#ffd93d` | CTA buttons, primary actions |
| `--secondary`  | `#006e29` | Success, translation module  |
| `--tertiary`   | `#ae2f34` | Errors, reflection module    |
| `--border`     | `#000`    | All borders (always black)   |

### 10.3 Typography

- **Font:** Space Grotesk (300–700), `next/font/google`
- **Icons:** `lucide-react`
- **Labels/headings:** `text-xs font-black uppercase`
- **Body:** `text-sm font-medium`

---

## 11. Data Model

### 11.1 Database Tables

Only **3 app tables** are persisted in Supabase, plus the 4 BetterAuth auth tables. All curriculum data is static and lives in code (see `features/modules/data/`).

| Table              | Purpose                                                            |
| ------------------ | ------------------------------------------------------------------ |
| `section_progress` | Per-section answer attempts, AI feedback, scores (two-attempt log) |
| `tab_progress`     | Tab unlock/completion state per user per module                    |
| `quiz_results`     | Quiz attempt results with per-question two-attempt data            |

### 11.2 Section Progress Schema

```typescript
interface SectionProgress {
  id: string;
  userId: string;
  module: "translasi" | "refleksi";
  tab: string; // 'titik', 'garis', 'bangun', 'sumbu-x', etc.
  sectionType: "percobaan" | "pengamatan" | "penyimpulan" | "cek-pemahaman";
  attempt1Answer: string | null;
  attempt1Feedback: string | null;
  attempt1Score: number | null;
  attempt2Answer: string | null;
  attempt2Feedback: string | null;
  attempt2Score: number | null;
  finalScore: number | null;
  status:
    | "unsubmitted"
    | "correct"
    | "wrong_attempt1"
    | "wrong_attempt2"
    | "locked";
  completedAt: string | null;
}
```

### 11.3 Tab Progress Schema

```typescript
interface TabProgress {
  id: string;
  userId: string;
  module: "translasi" | "refleksi";
  tab: string;
  unlocked: boolean;
  completed: boolean;
  updatedAt: string;
}
```

---

## 12. User Flows

### 12.1 Primary Learning Flow

```
Landing → Login → Menu
  ├── Prasyarat (optional)
  ├── Translasi Module
  │   ├── Apersepsi → Tab 1 (Titik) → Submit all sections
  │   │                             → Tab unlocks
  │   │                             → Tab 2 (Garis) → Submit all sections
  │   │                             → Tab unlocks
  │   │                             → Tab 3 (Bangun) → Submit all sections
  │   │                             → Quiz unlocks
  │   │                             → Quiz → Hasil
  ├── Refleksi Module
  │   ├── Apersepsi → Tab 1 (Sumbu-X) → Submit all sections
  │   │                              → Tab unlocks → ... → Tab 7 (y=k)
  │   │                              → Quiz unlocks → Quiz → Hasil
  └── Lab Batik (free exploration)
```

### 12.2 Per-Section Submission Flow

```
Section Page
  ├── User reads material / interacts with canvas
  ├── User fills answer input
  ├── Clicks "Periksa Jawaban"
  │   ├── Correct (Attempt 1)
  │   │   ├── Score recorded
  │   │   ├── AI shows full explanation
  │   │   ├── Section marked complete → proceed
  │   │   └── No "Coba Lagi" button
  │   └── Wrong (Attempt 1)
  │       ├── AI shows hint (no answer)
  │       ├── "Coba Lagi" button appears
  │       └── User edits answer → clicks submit
  │           ├── Correct → Score recorded, full explanation
  │           └── Wrong (Attempt 2)
  │               ├── AI shows detailed feedback + answer key
  │               ├── Input permanently locked
  │               └── Final score recorded
  └── Progress saved to database
```

---

## 13. Non-Functional Requirements

| Metric                 | Target                                                          |
| ---------------------- | --------------------------------------------------------------- |
| First Contentful Paint | < 2s                                                            |
| Time to Interactive    | < 4s                                                            |
| Canvas FPS             | ≥ 60fps                                                         |
| Gemini API Response    | < 5s                                                            |
| Initial Bundle         | < 250KB gzipped                                                 |
| Responsiveness         | Mobile (<640px) → Tablet (640–1024px) → Desktop (>1024px)       |
| Accessibility          | WCAG AA (contrast ≥ 4.5:1, keyboard nav, ARIA labels)           |
| Browser Support        | Chrome 90+, Firefox 88+, Safari 14+, Edge 90+                   |
| Security               | BetterAuth sessions, Supabase RLS, environment-isolated secrets |

---

## 14. Van Hiele Levels

| Level | Name               | Implementation                            |
| ----- | ------------------ | ----------------------------------------- |
| 0     | Visualization      | Shapes displayed on coordinate plane      |
| 1     | Analysis           | Properties observed in interactive canvas |
| 2     | Informal Deduction | Patterns recognized in inquiry steps      |

---

## 16. Development Phases

### Phase 1: Foundation

- Next.js project scaffold + TypeScript strict + Tailwind v4
- BetterAuth auth (email/password + Google OAuth)
- Supabase + Drizzle schema + migrations
- NeoBrutalism design system + base components
- Layout components (navbar, footer)

### Phase 2: Core Learning Engine

- Section progress schema + tab progress schema
- Section submission system (Percobaan, Pengamatan, Penyimpulan, Cek Pemahaman)
- Tab locking mechanism (client + server validation)
- AI evaluation API route (Gemini integration)
- Two-attempt feedback flow
- Per-section scoring logic

### Phase 3: Learning Modules

- Apersepsi with coordinate explorer
- Prerequisite material
- Translation module (3 tabs) with full section flow + locking
- Reflection module (7 tabs) with full section flow + locking
- Interactive canvas components
- Cultural context + video content

### Phase 4: Quiz System

- Quiz data structure + manual question bank
- Translation quiz (10 questions, 4 types)
- Reflection quiz (10 questions, 4 types)
- Quiz UI with two-attempt per question
- Scoring + result display
- AI evaluation per question

### Phase 5: Lab Batik & Data Layer

- Creative sandbox canvas with stamp tools
- Batch transformation tools
- Save/load creations
- Per-section progress persistence
- Per-module progress overview

### Phase 6: Polish & Production

- Performance optimization
- Accessibility audit
- Research instrumentation
- E2E testing
- Production deployment

---

## 17. Success Criteria

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
