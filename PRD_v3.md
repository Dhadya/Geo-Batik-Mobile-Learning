# Product Requirements Document v3

## GEMATRI — Gemakan Mahir Transformasi Geometri

**Product:** GEMATRI (Gemakan Mahir Transformasi Geometri)
**Version:** 3.0
**Last Updated:** 2026-07-22

---

## Table of Contents

1. [Product Overview](#1-product-overview)
2. [Problem & Solution](#2-problem--solution)
3. [Target Users](#3-target-users)
4. [Learning Flow & Access Control](#4-learning-flow--access-control)
5. [Content & Question Bank](#5-content--question-bank)
6. [Answer Attempt & AI Feedback Flow](#6-answer-attempt--ai-feedback-flow)
7. [Scoring System](#7-scoring-system)
8. [Quiz System](#8-quiz-system)
9. [Cross-Module Locking](#9-cross-module-locking)
10. [Data Management & Progress Tracking](#10-data-management--progress-tracking)
11. [Feature Requirements](#11-feature-requirements)
12. [Technical Architecture](#12-technical-architecture)
13. [Design System](#13-design-system)
14. [Data Model](#14-data-model)
15. [User Flows](#15-user-flows)
16. [Non-Functional Requirements](#16-non-functional-requirements)
17. [Development Phases & Status](#17-development-phases--status)
18. [Success Criteria](#18-success-criteria)
19. [Appendix](#19-appendix)

---

## 1. Product Overview

### 1.1 Vision

To make students proficient in geometric transformation (Gemakan Mahir Transformasi Geometri) through an interactive learning medium that bridges mathematical abstraction with Indonesian Batik cultural heritage.

### 1.2 Mission

- Present geometric transformation concepts (translation, reflection) visually and interactively
- Ground abstract mathematics in the cultural context of Nusantara Batik motifs
- Support constructivist pedagogy with adaptive AI-based scaffolding
- Help teachers deliver material that has traditionally been difficult to visualize

### 1.3 Core Value Proposition

| For             | Value                                                                                                     |
| --------------- | --------------------------------------------------------------------------------------------------------- |
| **Students**    | Understand abstract geometry through concrete, culturally-grounded visualizations and hands-on activities |
| **Teachers**    | A ready-to-use interactive media that follows pedagogical theory and covers the full curriculum           |
| **Researchers** | A validated educational product measurable against usability, practicality, and effectiveness criteria    |

---

## 2. Problem & Solution

### 2.1 Core Problem

Students struggle to understand **geometric transformation** concepts because the material is inherently **abstract**. Translation vectors, reflection axes, and coordinate mapping are difficult to connect with students' daily experience.

### 2.2 Contributing Factors

1. **Abstraction gap** — Students cannot visualize how points, lines, and shapes move in a coordinate space
2. **Cultural disconnect** — Standard geometry problems use generic shapes with no cultural relevance
3. **Passive learning** — Traditional instruction is teacher-centered, not student-exploratory
4. **Missing scaffolding** — No gradual progression from concrete to abstract (van Hiele levels)

### 2.3 Solution Approach

An interactive web application that:

- Visualizes geometric transformations through an interactive coordinate canvas (GeoGebra)
- Embeds **Indonesian Batik motifs** as geometric objects to be transformed
- Provides **constructivist activities** (observation → pattern → conclusion → verification)
- Follows **van Hiele theory** (levels 0–2) for scaffolding from visualization to informal deduction
- Integrates **AI scaffolding** via Gemini API for personalized per-section feedback
- Implements a **sequential unlocking system** ensuring mastery before progression
- Uses **score color indicators** (red/orange/green) instead of raw numbers to avoid demotivation

---

## 3. Target Users

### 3.1 Primary Users

| User                              | Role         | Description                                                                           |
| --------------------------------- | ------------ | ------------------------------------------------------------------------------------- |
| **Students (Siswa SMP Kelas IX)** | Learners     | Study translation and reflection through interactive exploration of Batik motifs      |
| **Teachers (Guru Matematika)**    | Facilitators | Integrate the media into classroom learning as a presentation tool and activity guide |

### 3.2 Secondary Users

| User                       | Role       | Description                                                                         |
| -------------------------- | ---------- | ----------------------------------------------------------------------------------- |
| **Researchers (Peneliti)** | Evaluators | Measure product validity, practicality, and effectiveness against research criteria |

### 3.3 User Environment

- **Device:** Desktop and mobile (responsive)
- **Language:** Indonesian (Bahasa Indonesia)
- **Network:** Variable — core content cached; AI features require connectivity
- **Browser:** Modern browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)

---

## 4. Learning Flow & Access Control

### 4.1 Sequential Module Progression

```
Translasi Module
  ├── Tab 1 (Titik)       →  Unlocked by default
  ├── Tab 2 (Garis)       →  Locked until Tab 1 fully completed
  ├── Tab 3 (Bangun)      →  Locked until Tab 2 fully completed
  └── Kuis                →  Locked until ALL tabs completed
                            → After Kuis attempt 1 completed:
                              Refleksi module unlocks (cross-module)
```

```
Refleksi Module (locked until Translasi Kuis attempt 1 is done)
  ├── Tab 1 (Sumbu-X)     →  Unlocked by default (within Refleksi)
  ├── Tab 2 (Sumbu-Y)     →  Locked until Tab 1 fully completed
  ├── ... (7 tabs total)
  └── Kuis                →  Locked until all Refleksi tabs completed
```

### 4.2 Tab-Level Locking

| State         | Visual                      | Behavior                                                     |
| ------------- | --------------------------- | ------------------------------------------------------------ |
| **Locked**    | Greyed + lock icon          | Tab not clickable; server-side redirect or overlay prevented |
| **Available** | Active                      | Tab is accessible for learning                               |
| **Completed** | Checkmark + score color dot | Tab shows completion; user can revisit                       |

- Unlocking condition: all sections in the previous tab must be evaluated (status `correct` or `wrong_attempt2`)
- Once unlocked, tabs remain accessible (no re-locking)
- Sections within a tab are independent — any can be attempted in any order

### 4.3 Section-Based Submission Flow

Each tab contains:

```
Tab Content
  ├── Percobaan (Experiment)       → Input + AI evaluation → two-attempt
  ├── Pengamatan (Observation)     → Input + AI evaluation → two-attempt
  ├── Penyimpulan (Conclusion)     → Input + AI evaluation → two-attempt
  └── Cek Pemahaman (Comprehension)→ MCQ + AI evaluation → two-attempt
```

Exception: `refleksi/bangun` has **no Penyimpulan** section (only 3 sections total).

---

## 5. Content & Question Bank

### 5.1 Manual Creation

All question banks and quiz content are created **manually by the research team** to ensure quality, validity, and material relevance. The system does **not** use AI-generated quizzes or auto-generated questions.

### 5.2 Instrument Separation

Questions within the learning modules serve purely as **daily learning progress tracking** for students. They are **completely separate** from the main evaluation instruments (pre-test and post-test).

### 5.3 Question Types

#### Module Sections (within tabs)

| Type             | Section                      | Answer Mechanism                |
| ---------------- | ---------------------------- | ------------------------------- |
| Matriks          | Percobaan                    | Fill (a,b) vector components    |
| Koordinat        | Percobaan                    | Fill (x,y) coordinate pairs     |
| Uraian           | Pengamatan, Penyimpulan      | Free text input                 |
| Pilihan Ganda    | Pengamatan, Cek Pemahaman    | Select from predefined options  |
| Pilihan Refleksi | Percobaan (refleksi)         | Dropdown + coordinate inputs    |
| Urutkan          | Penyimpulan                  | Drag-and-drop ordering          |
| Memasangkan      | Pengamatan                   | Match left items to right items |
| Checklist Table  | Pengamatan (refleksi/bangun) | Yes/No per statement            |

#### Quiz (MCQ-only)

| Type          | Description                                           |
| ------------- | ----------------------------------------------------- |
| Pilihan Ganda | Single correct answer from 4–5 options                |
| Inline Matrix | Vector notation `(a/b)` rendered inside question text |

### 5.4 Question Bank Size

| Scope                   | Questions                      |
| ----------------------- | ------------------------------ |
| Translasi section items | ~30 items across 3 tabs        |
| Refleksi section items  | ~70 items across 7 tabs        |
| Translasi quiz          | 20 questions (2 packages × 10) |
| Refleksi quiz           | 20 questions (2 packages × 10) |
| **Total quiz**          | **40 MCQ**                     |

---

## 6. Answer Attempt & AI Feedback Flow

### 6.1 Trigger

The flow initiates when the user completes their answer input and clicks the **"Periksa Jawaban"** button. The AI provides feedback per-section at the bottom of the relevant section area.

### 6.2 Attempt 1

| Condition           | Behavior                                                                                   |
| ------------------- | ------------------------------------------------------------------------------------------ |
| **Correct**         | Status marked as **Benar**. "Coba Lagi" does **not** appear. AI provides full explanation. |
| **Wrong / Partial** | AI provides a short hint (no answer revealed). System shows **"Coba Lagi"** button.        |

### 6.3 Attempt 2

| Condition          | Behavior                                                                    |
| ------------------ | --------------------------------------------------------------------------- |
| **User resubmits** | User corrects their answer and submits a second time                        |
| **Still wrong**    | AI provides detailed feedback + **official answer key** for self-evaluation |

### 6.4 Post-Attempt 2

- Input is **permanently locked**
- User cannot retry further
- `finalScore` is recorded
- Tab unlock check is triggered

### 6.5 Feedback Placement

AI feedback is rendered **dynamically below each respective section** (not at the bottom of the page).

---

## 7. Scoring System

### 7.1 Score Calculation

#### Module Sections

| Type                | Scoring                                                   |
| ------------------- | --------------------------------------------------------- |
| All items correct   | AI returns `score: 100`                                   |
| Partial (attempt 1) | AI returns `score: null` (hint only, no grade)            |
| Partial (attempt 2) | AI returns `score: 0–100` based on correctness proportion |

#### Quiz (MCQ)

```
Score = (Correct Answers / Total Questions) × 100
```

### 7.2 Score Color Indicators

Numeric scores (0–100) are stored in the database but **never shown as raw numbers** to students. Only color indicators are displayed:

| Range       | Color  | Label           | Student Sees   |
| ----------- | ------ | --------------- | -------------- |
| 0–30        | Red    | Perlu Perbaikan | ● (red dot)    |
| 31–70       | Orange | Cukup           | ● (orange dot) |
| 71–100      | Green  | Baik            | ● (green dot)  |
| Unsubmitted | Gray   | Belum Dinilai   | (no indicator) |

### 7.3 Score Storage

| Field                  | Location             | Purpose                               |
| ---------------------- | -------------------- | ------------------------------------- |
| `attempt1Score`        | `section_progress`   | Score from first attempt              |
| `attempt2Score`        | `section_progress`   | Score from second attempt             |
| `finalScore`           | `section_progress`   | Best/terminal score                   |
| `SectionAnswers.score` | answerStore (client) | Client-side cache for color indicator |

---

## 8. Quiz System

### 8.1 Overview

The quiz system uses **Pilihan Ganda (MCQ)** questions with a two-attempt structure at the module level (not per-question):

- **Attempt 1 (Mandatory):** Student is randomly assigned Paket 1 or Paket 2 (10 questions). Score is recorded as the official quiz grade.
- **Attempt 2+ (Optional):** Student receives the **other package** (not attempted before). Acts as additional practice/evaluation — score does NOT replace attempt 1 grade.
- **Unlimited attempts** after attempt 2: each subsequent attempt randomly assigns any package (may repeat).
- **All history** is persisted in the database.

### 8.2 Package Randomization

| Aspect     | Detail                                                 |
| ---------- | ------------------------------------------------------ |
| Packages   | Paket 1 (questions 1–10), Paket 2 (questions 11–20)    |
| Assignment | Random on first quiz entry, persisted in localStorage  |
| Attempt 2  | Automatically uses the OPPOSITE package from attempt 1 |
| Attempt 3+ | Random package (can be either, may repeat)             |

### 8.3 Per-Question Flow (Within Quiz)

```
Student selects answer → clicks "Periksa Jawaban"
  → POST /api/ai/evaluate-quiz
  → Correct (attempt 1):
    - Green highlight on correct option
    - Show explanation
    - Lock question
  → Wrong (attempt 1):
    - AI hint (no answer key)
    - "Coba Lagi" button
    - Student edits → resubmits as attempt 2
  → Wrong (attempt 2):
    - Full feedback + answer key
    - Lock question permanently
```

### 8.4 Quiz Routes

| Route                        | Purpose                                                       |
| ---------------------------- | ------------------------------------------------------------- |
| `/modul/[slug]/kuis`         | Intro page — access guard + package assignment + "Mulai Kuis" |
| `/modul/[slug]/kuis/[nomor]` | Per-question with two-attempt AI evaluation                   |
| `/modul/[slug]/kuis/hasil`   | Score color indicator + per-tab breakdown + attempt history   |

### 8.5 Grading Model

- **Attempt 1 score** = official quiz grade (saved as `totalScore` in `quiz_results`)
- **Attempt 2+ scores** = stored as separate `quiz_results` rows for teacher review
- Grade is calculated as `(correct / total) × 100` where total = 10

---

## 9. Cross-Module Locking

### 9.1 Rule

The **Refleksi** module (all pages) is completely locked until the student completes **at least attempt 1** of the **Translasi** quiz.

### 9.2 Locked Pages

All of the following Refleksi routes are inaccessible until unlocked:

- `/apersepsi/refleksi`
- `/modul/refleksi/*` (all tabs + quiz)
- `/prasyarat` (if navigated from Refleksi context)

### 9.3 Locking Mechanism

An **overlay** is rendered on top of the page content preventing interaction:

```
┌──────────────────────────────────────┐
│  [Menu]  [Profile]                   │
│                                      │
│  ┌────────────────────────────────┐  │
│  │         ┌──────────────┐       │  │
│  │         │   🔒         │       │  │
│  │         ────────────────       │  │
│  │         SELESAIKAN DULU        │  │
│  │         Modul Translasi        │  │
│  │         untuk membuka          │  │
│  │         halaman ini.           │  │
│  │         ┌──────────────┐       │  │
│  │         │  Ke Menu     │       │  │
│  │         └──────────────┘       │  │
│  └────────────────────────────────┘  │
│                                      │
└──────────────────────────────────────┘
```

- Overlay blocks clicks on all interactive elements
- Shows clear message explaining the unlock condition
- Includes a "Ke Menu" button to navigate away
- No redirect — the page URL is preserved but interaction is blocked

### 9.4 Unlock Condition

- `quiz_results` table has at least one row for `module = "translasi"` for the current user
- Checked server-side when rendering any Refleksi page
- If no translasi quiz result found → render overlay

### 9.5 Why Overlay Instead of Redirect

- Allows students to see what content is locked without being thrown away from the URL
- More transparent and less frustrating than sudden redirects
- Consistent with NeoBrutalism design system (bold, blocky overlay)

---

## 10. Data Management & Progress Tracking

### 10.1 Storage Requirements

Every score, answer submission, and feedback history for each section (Percobaan, Pengamatan, Penyimpulan, Cek Pemahaman) must be **immediately persisted to the database** after evaluation is complete. All quiz attempts (1, 2, 3, ...) are persisted.

### 10.2 Per-Section Data

| Field                | Description                                             |
| -------------------- | ------------------------------------------------------- |
| `section_type`       | The section type (percobaan, pengamatan, etc.)          |
| `module`             | Module identifier (translasi, refleksi)                 |
| `tab`                | Tab identifier (titik, garis, etc.)                     |
| `user_id`            | The submitting user                                     |
| `attempt_1_answer`   | First attempt answer (JSON)                             |
| `attempt_1_feedback` | AI feedback for attempt 1                               |
| `attempt_1_score`    | Score after attempt 1                                   |
| `attempt_2_answer`   | Second attempt answer (JSON)                            |
| `attempt_2_feedback` | AI feedback for attempt 2                               |
| `attempt_2_score`    | Score after attempt 2                                   |
| `final_score`        | Final score (0–100)                                     |
| `status`             | `correct`, `wrong_attempt1`, `wrong_attempt2`, `locked` |
| `completed_at`       | Timestamp of completion                                 |

### 10.3 Per-Quiz Data

| Field            | Description                             |
| ---------------- | --------------------------------------- |
| `id`             | Unique quiz attempt ID                  |
| `user_id`        | The submitting user                     |
| `module`         | Module identifier                       |
| `attempt_number` | 1, 2, 3, ... (which attempt this is)    |
| `package_id`     | 0 (Paket 1) or 1 (Paket 2)              |
| `total_score`    | Score 0–100                             |
| `answers`        | JSON array of per-question attempt data |
| `completed_at`   | Timestamp of completion                 |

### 10.4 Progress Calculation

| Scope                  | Condition                                                   |
| ---------------------- | ----------------------------------------------------------- |
| Tab completion         | All active sections have `finalScore` recorded              |
| Module tab completion  | All tabs completed                                          |
| Module quiz completion | At least 1 quiz `quiz_results` row exists                   |
| Cross-module unlock    | Translasi quiz has ≥1 `quiz_results` row → Refleksi unlocks |

---

## 11. Feature Requirements

### 11.1 Feature Roadmap

| #   | Feature                                   | Priority | Status         |
| --- | ----------------------------------------- | -------- | -------------- |
| F1  | Authentication (Login/Register)           | P0       | ✅             |
| F2  | Landing & Apersepsi                       | P0       | ✅             |
| F3  | Prerequisite Material                     | P1       | ✅             |
| F4  | Translation Module (3 tabs)               | P0       | ✅             |
| F5  | Translation Quiz                          | P0       | ✅ (core)      |
| F6  | Reflection Module (7 tabs)                | P0       | ✅             |
| F7  | Reflection Quiz                           | P0       | ✅ (core)      |
| F8  | Lab Batik (Creative Sandbox)              | P1       | 🔧 In progress |
| F9  | Section-Based AI Feedback                 | P0       | ✅             |
| F10 | Tab Locking & Sequential Access           | P0       | ✅             |
| F11 | Per-Section Progress Tracking             | P1       | ✅             |
| F12 | Quiz Package Randomization                | P0       | ✅             |
| F13 | Two-Attempt Quiz System                   | P0       | ✅             |
| F14 | Cross-Module Locking (Translasi→Refleksi) | P0       | ✅             |
| F15 | Page Overlay Lock                         | P0       | ✅             |
| F16 | Score Color Indicators                    | P1       | ✅             |

### 11.2 Feature Details

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
  ├── Kanvas Interaktif — GeoGebra + coordinate exploration
  ├── Percobaan (Experiment) — Input + AI evaluation
  ├── Pengamatan (Observation) — Input + AI evaluation
  ├── Penyimpulan (Conclusion) — Input + AI evaluation (NOT in refleksi/bangun)
  └── Cek Pemahaman (Comprehension) — MCQ + AI evaluation
```

**Translasi Module (3 tabs):** Titik, Garis, Bangun
**Refleksi Module (7 tabs):** Sumbu-X, Sumbu-Y, Titik Asal (0,0), Garis y=x, Garis y=-x, Garis x=h, Garis y=k, Bangun (no penyimpulan)

#### F5 & F7: Quiz System

- Route: `/modul/[slug]/kuis` → `/modul/[slug]/kuis/[nomor]` → `/modul/[slug]/kuis/hasil`
- MCQ-only (pilihan ganda) with inline vector notation
- 20 questions per module split into 2 packages (10 each)
- **Two-attempt at module level:**
  - Attempt 1: mandatory, randomized package, score counts
  - Attempt 2: optional, opposite package, extra practice
  - Attempt 3+: unlimited, random package
- All attempts persisted to DB
- Per-question two-attempt AI evaluation within each quiz attempt

#### F8: Lab Batik (Creative Sandbox) — P1

- Canvas-based workspace with Cartesian grid (-10 to 10)
- Click-to-place Batik stamps
- Batch transformation tools: translation, reflection, clone
- Save/load to user account
- Export to PNG

#### F9: Section-Based AI Feedback

- Per-section AI evaluation via Gemini API
- Two-attempt system as defined in §6
- Scoring as defined in §7
- Feedback rendered dynamically below each section
- History of both attempts stored in database

#### F10: Tab Locking & Sequential Access

- Tabs locked by default; unlock condition: all preceding tab sections submitted
- Visual indicators (locked, available, completed) with score color dot
- Server-side validation prevents access to locked tab routes
- SSR progress fetch eliminates flash of incorrect state

#### F11: Per-Section Progress Tracking

- Each section submission persists answer, score, feedback, timestamp
- Tab completion calculated from all section statuses
- Section scores use color indicators (never raw numbers)

#### F12: Quiz Package Randomization

- On first quiz entry, randomly assign Paket 1 (IDs 1–10) or Paket 2 (IDs 11–20)
- Persist assignment in localStorage
- Attempt 2 automatically uses the opposite package
- Attempt 3+ uses random package

#### F13: Two-Attempt Quiz System

- Attempt 1: mandatory, score counts as official grade
- Attempt 2: optional, opposite package, practice only
- Unlimited subsequent attempts
- Each attempt stored as separate `quiz_results` row

#### F14: Cross-Module Locking (Translasi→Refleksi) ✅

- Refleksi module entirely locked until Translasi quiz attempt 1 completed
- Check: server-side `hasModuleAttempt()` queries `quiz_results WHERE module = 'translasi''
- Applied to all Refleksi routes: apersepsi, modul, quiz via `RefleksiLockGuard` server component

#### F15: Page Overlay Lock ✅

- Locked pages show full-screen `LockOverlay` component instead of redirect
- Overlay blocks all interaction on the page (fixed z-50 backdrop)
- Shows lock icon, "Modul Belum Terbuka" message, and "Ke Menu" navigation button
- URL preserved so student knows where they are

#### F16: Score Color Indicators

- 0–30 → Red (Perlu Perbaikan)
- 31–70 → Orange (Cukup)
- 71–100 → Green (Baik)
- Applied to section headers, observation panel tabs, quiz results
- Raw scores never visible to students

---

## 12. Technical Architecture

### 12.1 Tech Stack

| Layer             | Technology              | Purpose                                         |
| ----------------- | ----------------------- | ----------------------------------------------- |
| **Framework**     | Next.js 16 (App Router) | Routing, SSR, API routes, file-based structure  |
| **Language**      | TypeScript (strict)     | Type safety                                     |
| **Styling**       | Tailwind CSS v4         | Design system, responsive layout, utility-first |
| **Database**      | Supabase (PostgreSQL)   | Data persistence                                |
| **ORM**           | Drizzle                 | Type-safe database queries, migrations          |
| **State Mgmt**    | Zustand                 | Client-side state management                    |
| **Data Fetching** | TanStack Query          | Server state, caching, optimistic updates       |
| **Validation**    | Zod                     | Schema validation (forms, API, DB)              |
| **Auth**          | BetterAuth              | Authentication & session management             |
| **Visualization** | GeoGebra (Web API)      | Interactive geometry applets                    |
| **AI**            | Gemini API              | Per-section answer evaluation                   |
| **Hosting**       | Vercel                  | Deployment & hosting                            |

### 12.2 Architecture Diagram

```
┌──────────────────────────────────────────────────────────────────┐
│                        BROWSER (Client)                          │
│                                                                  │
│  ┌──────────────┐   ┌────────────────┐   ┌───────────────────┐  │
│  │ answerStore   │   │ tabProgress    │   │ SectionScore      │  │
│  │ (Zustand +    │   │ Store (Zustand)│   │ Indicator (color) │  │
│  │ localStorage) │   │                │   │                   │  │
│  └──────┬───────┘   └───────┬────────┘   └───────────────────┘  │
│         │                   │                                     │
│  ┌──────▼───────────────────▼──────────────────────────────────┐ │
│  │              Client-side libs                               │ │
│  │  persistSectionAttempt.ts  evaluateSection.ts               │ │
│  │  progressSync.ts           scoreColors.ts                   │ │
│  └─────────────────────────────────────────────────────────────┘ │
└──────────────────────────┬──────────────────────────────────────┘
                           │ HTTP (fetch)
┌──────────────────────────▼──────────────────────────────────────┐
│                    NEXT.JS API ROUTES (Layer 1)                  │
│                                                                  │
│  /api/modul/[slug]/section   /api/modul/[slug]/progress         │
│  /api/modul/[slug]/progress/unlock  /api/modul/[slug]/quiz/*    │
│  /api/ai/evaluate-section    /api/ai/evaluate-quiz              │
└──────────────────────────┬──────────────────────────────────────┘
                           │ function call
┌──────────────────────────▼──────────────────────────────────────┐
│                    SERVICES (Layer 2)                            │
│                                                                  │
│  section.ts — saveSectionAttempt(), getSectionProgress()        │
│  progress.ts — getTabProgress(), unlockNextTab()                │
│  quiz.ts — saveQuizResult(), getLatestQuizResult()              │
│  ai.ts — evaluateSection(), evaluateQuizQuestion()              │
└──────────────────────────┬──────────────────────────────────────┘
                           │ getDb()
┌──────────────────────────▼──────────────────────────────────────┐
│                    DATABASE (Layer 3)                            │
│                                                                  │
│  section_progress — per-section attempt history + score         │
│  tab_progress — tab unlock/completion state                     │
│  quiz_results — ALL quiz attempts (1, 2, 3, ...)                │
└─────────────────────────────────────────────────────────────────┘
```

### 12.3 Project Structure

```
app/
├── (auth)/               # Auth pages — login, register (no app shell)
├── (app)/                # Authenticated pages (app shell layout)
│   ├── menu/             # Main menu — 3-card grid
│   ├── prasyarat/        # Prerequisite material
│   ├── lab/              # Lab Batik creative sandbox
│   ├── apersepsi/[slug]/ # Module intro (translasi | refleksi)
│   └── modul/[slug]/     # Learning modules
│       ├── [tab]/page.tsx| Tab content (titik|garis|bangun|sumbu-x|...)
│       └── kuis/         # Quiz flow (intro → questions → results)
├── (landing)/            # Landing page hero (no app shell)
├── api/auth/[...all]/    # BetterAuth API handler
├── providers.tsx         # QueryClientProvider + other providers
├── layout.tsx            # Root layout — font + globals
└── globals.css           # Nusantara Rebel palette + utilities

features/                  # Feature-based modular architecture
├── auth/                 # LoginForm, RegisterForm, AuthFormField, hooks
├── menu/                 # ModuleCard, LabCard, MenuHeader, data, hooks
├── modules/              # Core learning engine
│   ├── components/       # ConclusionArea, AssessmentSection, etc.
│   ├── hooks/            # TanStack Query hooks (useSectionSubmission, useTabProgress, useEvaluateSection)
│   ├── data/             # Shared constants (moduleConfig.ts)
│   ├── lib/              # Client-side utils (shuffle.ts)
│   ├── services/         # Layer 2 — plain async service functions
│   └── index.ts          # Barrel exports
├── quiz/                 # Quiz engine
│   ├── components/       # QuizResult, QuizNavigation, etc.
│   ├── hooks/            # TanStack Query hooks (useSubmitQuiz, useQuizResult, useEvaluateQuiz)
│   ├── data/             # Question bank (translasi.ts, refleksi.ts)
│   └── index.ts          # Barrel exports
├── prasyarat/            # InteractiveCanvas, GeoGebraCanvas, ControlPanel, ConceptCard, VideoEmbed
└── lab/                  # Lab Batik canvas + tools (future — P1)

components/                # Shared React components
├── retroui/              # NeoBrutalism RetroUI primitives (30+ components)
├── batik/                # KawungStamp, BatikWatermark
├── common/               # AmbientCircles, MaterialIcon
└── layout/               # AuthLayout, LandingFooter, ProfileDropdown

lib/                       # Auth, DB, utility clients
├── query/                # TanStack Query setup
│   └── client.ts         # Singleton QueryClient factory
├── api/                  # Layer 1 primitives (AppError, requireAuth)
├── supabase/             # Supabase client (client, server, middleware)
├── auth.ts               # BetterAuth server config
├── auth-client.ts        # BetterAuth browser client
├── db.ts                 # Lazy getDb() singleton
├── utils.ts              # Utility functions
├── validate-redirect.ts  # Redirect URL validation
└── validators.ts         # Form validation

drizzle/                   # Database schema (Drizzle ORM)
└── schema.ts             # All DB tables

supabase/                  # Database migrations
├── migrations/
└── schema.sql

```

### 12.4 Three-Layer Architecture

```
Layer 1 — Route Handler (app/api/.../route.ts)
  Parse request → Zod validate → call service → respond
  Error: catch → handleError()

Layer 2 — Service (features/modules/services/*.ts)
  Plain async functions — NO Next.js imports
  Business logic + AppError throws
  Calls getDb() lazily

Layer 3 — Database (lib/db.ts + drizzle/schema)
  Lazy getDb() singleton — never at module level
  Drizzle ORM (camelCase JS → snake_case SQL)
```

---

## 13. Design System

### 13.1 Design Language

**Nusantara Rebel** — Indonesian heritage meets NeoBrutalism.

- **4px solid black borders** on all interactive/container elements
- **Hard drop shadows** (no blur) — `4px 4px 0 0 #000`
- **Square elements** — `rounded-none` on cards and buttons
- **Uppercase** labels and headings (`font-black uppercase`)
- **Space Grotesk** for all text (variable weight 300–700)
- **High contrast** — black text on warm paper background `#fff8ef`
- **Icons:** Material Symbols exclusively (via `@/components/common/MaterialIcon`)

### 13.2 Color Palette

| Token                  | Hex       | Usage                              |
| ---------------------- | --------- | ---------------------------------- |
| `--background`         | `#fff8ef` | Page background (warm paper)       |
| `--foreground`         | `#1f1b12` | Body text                          |
| `--card`               | `#ffffff` | Card, input, popover surfaces      |
| `--primary`            | `#ffd93d` | CTA buttons, primary actions       |
| `--primary-foreground` | `#000`    | Text on primary                    |
| `--secondary`          | `#006e29` | Success states, translation module |
| `--tertiary`           | `#ae2f34` | Errors, reflection module          |
| `--muted`              | `#eae2d2` | Inactive areas, secondary          |
| `--border`             | `#000`    | All borders (always black)         |

### 13.3 Typography

- **Font:** Space Grotesk (weights 300–700), loaded via `next/font/google`
- **Icons:** Material Symbols via `@/components/common/MaterialIcon` (exclusive — no `lucide-react`)
- **Labels/headings:** `font-black uppercase`
- **Body:** `font-medium`

### 13.4 Component Patterns

| Element | Pattern                                                                                         |
| ------- | ----------------------------------------------------------------------------------------------- |
| Buttons | RetroUI `<Button>` — never plain `<button>`. Use `variant="default"`, `"outline"`, or `"ghost"` |
| Cards   | RetroUI `<Card>` with `Card.Header`, `Card.Title`, `Card.Content`                               |
| Tabs    | RetroUI `<Tabs>` with `Tabs.List`, `Tabs.Trigger`, `Tabs.Content`                               |
| Shadows | Hard offset — `shadow`, `shadow-lg`, `.neubrutal-shadow`, `.hover-shift`, `.active-shift`       |
| Loading | RetroUI `<Skeleton>` matching content size and position                                         |

---

## 14. Data Model

### 14.1 Database Tables (Drizzle ORM)

**7 tables total:** 4 BetterAuth auth tables + 3 app tables.

#### `section_progress`

| Column               | Type             | Description                                                            |
| -------------------- | ---------------- | ---------------------------------------------------------------------- |
| `id`                 | `text PK`        | UUID                                                                   |
| `user_id`            | `text FK → user` | The student                                                            |
| `module`             | `text`           | `translasi` or `refleksi`                                              |
| `tab`                | `text`           | Tab slug (titik, garis, etc.)                                          |
| `section_type`       | `text`           | `percobaan`, `pengamatan`, `penyimpulan`, `cek-pemahaman`              |
| `attempt_1_answer`   | `text`           | JSON-stringified first attempt                                         |
| `attempt_1_feedback` | `text`           | AI feedback for attempt 1                                              |
| `attempt_1_score`    | `integer`        | 0–100 or null                                                          |
| `attempt_2_answer`   | `text`           | JSON-stringified second attempt                                        |
| `attempt_2_feedback` | `text`           | AI feedback for attempt 2                                              |
| `attempt_2_score`    | `integer`        | 0–100 or null                                                          |
| `final_score`        | `integer`        | Terminal score                                                         |
| `status`             | `text`           | `unsubmitted`, `correct`, `wrong_attempt1`, `wrong_attempt2`, `locked` |
| `completed_at`       | `timestamptz`    | When finalized                                                         |

**Unique:** `(user_id, module, tab, section_type)`

#### `tab_progress`

| Column       | Type             | Description               |
| ------------ | ---------------- | ------------------------- |
| `id`         | `text PK`        | UUID                      |
| `user_id`    | `text FK → user` | The student               |
| `module`     | `text`           | `translasi` or `refleksi` |
| `tab`        | `text`           | Tab slug                  |
| `unlocked`   | `boolean`        | Whether tab is accessible |
| `completed`  | `boolean`        | Whether tab is fully done |
| `updated_at` | `timestamptz`    | Last update               |

**Unique:** `(user_id, module, tab)`

#### `quiz_results`

| Column           | Type             | Description                     |
| ---------------- | ---------------- | ------------------------------- |
| `id`             | `text PK`        | UUID                            |
| `user_id`        | `text FK → user` | The student                     |
| `module`         | `text`           | `translasi` or `refleksi`       |
| `attempt_number` | `integer`        | 1, 2, 3, ... — which attempt    |
| `package_id`     | `integer`        | 0 = Paket 1, 1 = Paket 2        |
| `total_score`    | `integer`        | Score 0–100 for this attempt    |
| `answers`        | `jsonb`          | Per-question attempt data array |
| `completed_at`   | `timestamptz`    | When submitted                  |

### 14.2 Zod Schemas

```typescript
// Section submission — POST /api/modul/[slug]/section
const saveSectionSchema = z.object({
  tab: z.string().min(1),
  sectionType: z.enum([
    "percobaan",
    "pengamatan",
    "penyimpulan",
    "cek-pemahaman",
  ]),
  attempt: z.literal(1).or(z.literal(2)),
  answer: z.record(z.string(), z.record(z.string(), z.string())),
  feedback: z.string().optional(),
  score: z.number().int().min(0).max(100).nullable().optional(),
  status: z.enum(["correct", "wrong_attempt1", "wrong_attempt2"]).optional(),
});

// Quiz submission — POST /api/modul/[slug]/quiz/submit
const quizAnswerSchema = z.object({
  questionId: z.number(),
  type: z.enum(["pilihan_ganda"]),
  attempt1Answer: z.unknown().nullable(),
  attempt1Correct: z.boolean().nullable(),
  attempt1Feedback: z.string().nullable(),
  attempt1Score: z.number().int().nullable(),
  attempt2Answer: z.unknown().nullable(),
  attempt2Correct: z.boolean().nullable(),
  attempt2Feedback: z.string().nullable(),
  attempt2Score: z.number().int().nullable(),
  finalScore: z.number().int(),
  status: z.enum(["correct_attempt1", "wrong_attempt1", "wrong_attempt2"]),
});

// Quiz evaluation — POST /api/ai/evaluate-quiz
const evaluateQuizSchema = z.object({
  question: z.object({
    id: z.number(),
    question: z.string(),
    options: z.array(z.string()),
    correctIndex: z.number(),
    questionMatrix: z.string().optional(),
    questionSuffix: z.string().optional(),
  }),
  answer: z.number(),
  attempt: z.literal(1).or(z.literal(2)),
});
```

### 14.3 Zustand Stores

**answerStore** — persisted to localStorage (`gematri-module-answers`):

- `answers: Record<string, TabAnswers>` — per-tab section state
- Actions: `setField`, `setSelections`, `setChecked`, `setSectionStatus`, `setSectionScore`, etc.

**tabProgressStore** — in-memory:

- `progress: Record<string, TabProgressEntry[]>` — cached from server
- Actions: `setProgress`, `updateTab`, `getProgress`

**quizStore** — persisted to localStorage:

- `answers: Record<number, number>` — in-progress quiz selections
- `attempts: Record<number, QuizQuestionAttempt>` — per-question attempt tracking
- `currentPackage: number | null` — which package assigned (0 = Paket 1, 1 = Paket 2)
- Actions: `selectAnswer`, `submitAnswers`, `recordAttempt`, `resetAnswers`, `setCurrentPackage`

---

## 15. User Flows

### 15.1 Complete Learning Flow

```
/ (Landing) → /login (BetterAuth) → /menu
  │
  ├──→ /prasyarat → Self-check → /menu
  │
  ├──→ Translasi Module
  │     ├── Apersepsi → Tab 1 (Titik) → Submit all sections → Tab 2 unlocks
  │     │                              → Tab 2 (Garis) → Submit → Tab 3 unlocks
  │     │                              → Tab 3 (Bangun) → Submit → Quiz unlocks
  │     └── Kuis (Attempt 1 — mandatory)
  │           ├── Random: Paket 1 or Paket 2
  │           ├── 10 MCQ with two-attempt per question
  │           ├── Score saved to DB (official grade)
  │           ├── → /kuis/hasil (score color indicator + pembahasan)
  │           │
  │           → Kuis (Attempt 2 — optional, opposite package)
  │           → Kuis (Attempt 3+ — unlimited, random package)
  │           │
  │           └──→ Refleksi module UNLOCKS (after attempt 1)
  │
  ├──→ Refleksi Module (LOCKED until Translasi quiz attempt 1 done)
  │     ├── OVERLAY shown on all Refleksi pages if locked
  │     ├── Apersepsi → Tab 1 (Sumbu-X) → Submit → Tab 2 unlocks → ...
  │     │                              → Tab 7 (Bangun) → Submit → Quiz unlocks
  │     └── Kuis → Same flow as Translasi quiz
  │
  └──→ Lab Batik (free exploration — P1)
```

### 15.2 Per-Section Submission Flow

```
Section Page
  ├── User reads material / interacts with canvas
  ├── User fills answer input
  ├── Clicks "Periksa Jawaban"
  │   ├── Correct (Attempt 1):
  │   │   ├── Score recorded
  │   │   ├── AI shows full explanation
  │   │   ├── Section marked complete
  │   │   └── No "Coba Lagi" button
  │   └── Wrong (Attempt 1):
  │       ├── AI shows hint (no answer)
  │       ├── "Coba Lagi" button appears
  │       └── User edits answer → clicks submit
  │           ├── Correct → Score recorded, full explanation
  │           └── Wrong (Attempt 2):
  │               ├── AI shows detailed feedback + answer key
  │               ├── Input permanently locked
  │               └── Final score recorded + tab unlock check
  └── Progress saved to DB
```

### 15.3 Quiz Flow (Per Module Level Attempt)

```
/kuis (intro page)
  ├── Access guard: all tabs completed?
  ├── Attempt 1: randomize package → assign → store in localStorage
  ├── Attempt 2: opposite package → assign → store in localStorage
  ├── Attempt 3+: random package
  └── "Mulai Kuis" → /kuis/1

/kuis/[nomor] (per-question)
  ├── MCQ with answer button grid
  ├── "Periksa Jawaban" → AI evaluation
  ├── Correct → explanation, lock
  ├── Wrong attempt 1 → hint, "Coba Lagi"
  ├── Wrong attempt 2 → answer key, lock
  └── "Lanjut" → /kuis/[nomor+1] or "Selesai" → submit

/kuis/hasil (results)
  ├── Total score (0–100) as color indicator
  ├── Per-tab breakdown
  ├── Pembahasan (accordion per question)
  ├── "Ulangi Kuis" (next attempt) — COUNTS as attempt 2, 3, etc.
  └── "Kembali ke Menu"
```

### 15.4 Cross-Module Locking Flow

```
User → /modul/refleksi (or any Refleksi page)
  ├── Server checks: quiz_results WHERE module='translasi' AND user_id=X
  │   ├── Row exists → render page normally
  │   └── No row → render overlay:
  │       ├── Full-screen semi-transparent overlay
  │       ├── Lock icon + message: "Selesaikan dulu Modul Translasi"
  │       ├── "Ke Menu" button
  │       └── All underlying interactions blocked
```

---

## 16. Non-Functional Requirements

### 16.1 Performance

| Metric                   | Target          |
| ------------------------ | --------------- |
| First Contentful Paint   | < 2s            |
| Largest Contentful Paint | < 3s            |
| Time to Interactive      | < 4s            |
| Canvas FPS               | ≥ 60fps         |
| Gemini API Response      | < 5s            |
| Initial Bundle           | < 250KB gzipped |

### 16.2 Responsiveness

| Breakpoint          | Layout                        |
| ------------------- | ----------------------------- |
| Mobile (< 640px)    | Single column, stacked panels |
| Tablet (640–1024px) | Two-column where appropriate  |
| Desktop (> 1024px)  | Full 12-column grid layout    |

### 16.3 Accessibility

- Semantic HTML elements
- ARIA labels on interactive elements
- Keyboard navigation for all controls
- Color contrast ≥ 4.5:1 (WCAG AA)
- Alt text on all images/icons
- Focus indicators on all interactive elements

### 16.4 Browser Support

Chrome 90+, Firefox 88+, Safari 14+, Edge 90+.

### 16.5 Security

- BetterAuth handles authentication (session-based, cookie-based)
- Passwords hashed with bcrypt by BetterAuth
- Supabase Row Level Security (RLS) on all tables (future)
- Users can only read/write their own data
- API routes protected with `requireAuth()`
- No sensitive data in client-side code
- Environment variables for all API keys

### 16.6 Offline Support (future)

- Core learning content cached for offline access (P1)
- Quiz answers queued and synced when online (P1)
- AI features gracefully degrade with offline message (P1)

---

## 17. Development Phases & Status

### Phase 1: Foundation ✅

- Next.js project scaffold + TypeScript strict + Tailwind v4
- BetterAuth auth (email/password + Google OAuth)
- Supabase + Drizzle schema + migrations
- NeoBrutalism design system + base components (RetroUI)
- Layout components (navbar, footer)

### Phase 2: Core Learning Engine ✅

- Section progress schema + tab progress schema
- Section submission system (Percobaan, Pengamatan, Penyimpulan, Cek Pemahaman)
- Tab locking mechanism (client + server validation)
- AI evaluation API route (Gemini integration)
- Two-attempt feedback flow
- Per-section scoring logic

### Phase 3: Learning Modules ✅

- Apersepsi with coordinate explorer
- Prerequisite material
- Translation module (3 tabs) with full section flow + locking
- Reflection module (7 tabs) with full section flow + locking
- Interactive canvas components (GeoGebra)
- Cultural context + video content

### Phase 4: Quiz System ✅

- MCQ-only question bank (40 questions, 2 packages × 20)
- Two-attempt per question AI evaluation
- Quiz UI (intro → per-question → results)
- Results page with per-tab breakdown + score color indicator
- Quiz persistence (`quiz_results` table)
- Access guard — all tabs must be completed
- Package randomization (F12) — random assignment on first entry, opposite on attempt 2
- Two-attempt at module level (F13) — attempt 1 counts, attempt 2+ practice
- All quiz history in DB (attempt_number, package_id)

### Phase 5: Cross-Module Locking ✅

- Server-side query for Translasi quiz completion (F14) — `hasModuleAttempt()` in `features/modules/services/quiz.ts`
- Page overlay component (F15) — `LockOverlay` with NeoBrutalism styling
- All Refleksi routes render overlay when locked — via `RefleksiLockGuard` in layout + apersepsi page
- Integration with tab locking system — guard checks `quiz_results` table directly

### Phase 6: Lab Batik & Polish 🚧

- 🚧 Creative sandbox canvas with stamp tools (P1)
- 🚧 Batch transformation tools (P1)
- 🚧 Save/load creations (P1)
- 🚧 Performance optimization
- 🚧 Accessibility audit
- 🚧 Research instrumentation
- 🚧 E2E testing

---

## 18. Success Criteria

### 18.1 Functional Completeness

| Criterion                             | Target |
| ------------------------------------- | ------ |
| All P0 features operational           | 100%   |
| All P1 features operational           | 100%   |
| Zero critical bugs in production      | 0      |
| All learning modules content accurate | 100%   |

### 18.2 Technical Quality

| Criterion                      | Target      |
| ------------------------------ | ----------- |
| TypeScript strict mode         | Enabled     |
| Linting (ESLint)               | Zero errors |
| Test coverage (critical paths) | ≥ 80%       |
| Lighthouse Performance         | ≥ 90        |
| Lighthouse Accessibility       | ≥ 90        |

### 18.3 Research Validation

| Criterion                       | Measurement     | Target            |
| ------------------------------- | --------------- | ----------------- |
| **Validity (Kevalidan)**        | Expert review   | ≥ 3.5 / 4.0       |
| **Practicality (Kepraktisan)**  | Teacher testing | ≥ 3.5 / 4.0       |
| **Effectiveness (Keefektifan)** | Pre/post test   | Improvement ≥ 25% |

---

## 19. Appendix

### A. Van Hiele Levels in Product

| Level | Name               | Implementation                                                |
| ----- | ------------------ | ------------------------------------------------------------- |
| 0     | Visualization      | Batik motifs displayed, shape recognition on coordinate plane |
| 1     | Analysis           | Properties observed in interactive canvas                     |
| 2     | Informal Deduction | Patterns recognized in inquiry steps, matrix formulas         |
| 3     | Formal Deduction   | Algebraic notation in conclusion (future)                     |
| 4     | Rigor              | Student conclusions, comprehension checks                     |

### B. Reference Documents

- [StyleGuide.md](./StyleGuide.md) — Visual design system reference
- [DESIGN.md](./DESIGN.md) — Color palette & tokens

### C. Document History

| Version | Date       | Changes                                                                                                                                                     |
| ------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1.0     | 2026-06-23 | Initial PRD                                                                                                                                                 |
| 2.0     | 2026-07-16 | Architecture update, v2 requirements                                                                                                                        |
| 3.0     | 2026-07-21 | Merged v1+v2; added quiz package randomization, two-attempt quiz, cross-module locking, overlay, score color indicators; aligned with actual implementation |
