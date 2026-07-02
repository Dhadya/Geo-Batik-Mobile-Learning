# Product Requirements Document (PRD)

## BatikGeometry — Interactive Geometric Transformations Learning Media

**Version:** 1.0  
**Date:** 2026-06-23

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Target Users](#2-target-users)
3. [Problem Statement](#3-problem-statement)
4. [Product Vision & Goals](#4-product-vision--goals)
5. [Feature Requirements](#5-feature-requirements)
6. [Technical Architecture](#6-technical-architecture)
7. [Design System](#7-design-system)
8. [Data Model](#8-data-model)
9. [User Flows](#9-user-flows)
10. [Non-Functional Requirements](#10-non-functional-requirements)
11. [Success Criteria](#11-success-criteria)
12. [Development Phases](#12-development-phases)
13. [Appendix](#appendix)

---

## 1. Project Overview

### 1.1 Product Name

**BatikGeometry**

### 1.2 Summary

BatikGeometry is a web-based interactive learning media for teaching **geometric transformations** (Translation and Reflection) to Indonesian junior high school students (SMP Kelas IX). The product integrates **Indonesian Batik cultural motifs** as the visual context for geometric concepts, combining a **neubrutalism** design language with constructivist learning activities grounded in **van Hiele's theory** of geometric thinking.

### 1.3 Core Value Proposition

| For         | Value                                                                                                     |
| ----------- | --------------------------------------------------------------------------------------------------------- |
| Students    | Understand abstract geometry through concrete, culturally-grounded visualizations and hands-on activities |
| Teachers    | A ready-to-use interactive media that follows pedagogical theory and covers the full curriculum           |
| Researchers | A validated educational product measurable against usability, practicality, and effectiveness criteria    |

### 1.4 Design Philosophy

The product follows **neubrutalism** (neo-brutalism) as its visual design language: thick black borders, hard solid drop shadows, square elements, bold uppercase typography, and high-contrast vibrant colors. This is combined with **Indonesian Batik cultural motifs** (Kawung, Parang Rusak, Megamendung, Truntum, etc.) woven into every learning module as both decoration and pedagogical content.

---

## 2. Target Users

### 2.1 Primary Users

| User                     | Role         | Description                                                                                                                                             |
| ------------------------ | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Students (Siswa SMP)** | Learners     | Grade 9 students studying translation and reflection. Use the media to explore, visualize, and practice geometric transformations through Batik motifs. |
| **Teachers (Guru)**      | Facilitators | Mathematics teachers who integrate the media into classroom instruction. Use it as a presentation tool and guide student activities.                    |

### 2.2 Secondary Users

| User                       | Role       | Description                                                                                                             |
| -------------------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------- |
| **Researchers (Peneliti)** | Evaluators | Educational technology researchers who evaluate the product against validity, practicality, and effectiveness criteria. |

### 2.3 User Environment

- **Device:** Desktop and mobile (responsive)
- **Language:** Indonesian (Bahasa Indonesia)
- **Network:** Variable (must work with intermittent connectivity)
- **Browser:** Modern browsers (Chrome, Firefox, Safari, Edge)

---

## 3. Problem Statement

### 3.1 Core Problem

Students frequently struggle to understand **geometric transformation concepts** because the material is inherently **abstract**. Concepts like translation vectors, reflection axes, and coordinate mappings lack tangible real-world connections in students' daily experience.

### 3.2 Contributing Factors

1. **Abstraction gap** — Students cannot visualize how points, lines, and shapes move in coordinate space
2. **Cultural disconnect** — Standard geometry problems use generic shapes with no cultural relevance
3. **Passive learning** — Traditional instruction relies on teacher-centered explanation rather than student exploration
4. **Missing scaffolding** — Students need step-by-step progression from concrete to abstract (van Hiele levels)

### 3.3 Proposed Solution

An interactive web media that:

- Visualizes geometric transformations using an interactive Cartesian coordinate canvas
- Embeds **Indonesian Batik motifs** as the geometric objects being transformed
- Provides **constructivist activities** (observation → pattern recognition → conclusion → verification)
- Follows **van Hiele's theory** to scaffold understanding from visualization to formal reasoning
- Integrates **AI scaffolding** via Gemini API for personalized feedback and answer checking

---

## 4. Product Vision & Goals

### 4.1 Vision

To become the definitive interactive learning media for geometric transformations in Indonesian education, bridging mathematical abstraction with cultural heritage through technology.

### 4.2 Goals

| Goal                  | Metric                                            | Target                                |
| --------------------- | ------------------------------------------------- | ------------------------------------- |
| **Completeness**      | All features functional without errors            | 100% of defined features operational  |
| **Integration**       | GeoGebra visualization runs smoothly              | Load time < 3s, 60fps interaction     |
| **Accuracy**          | Batik and geometry content displays correctly     | Zero content errors in QA review      |
| **Authentication**    | Users can login and save progress                 | Login success rate > 99%              |
| **AI Scaffolding**    | Chatbot, answer checking, and feedback functional | Response time < 5s, accuracy > 85%    |
| **Research Validity** | Product meets validity criteria                   | Expert validation score ≥ 3.5/4.0     |
| **Practicality**      | Product is practical to use                       | Teacher/practitioner rating ≥ 3.5/4.0 |
| **Effectiveness**     | Product improves learning outcomes                | Pre/post test improvement ≥ 25%       |

---

## 5. Feature Requirements

### 5.1 Feature Overview

| #   | Feature                                  | Priority |
| --- | ---------------------------------------- | -------- |
| F1  | Authentication (Login)                   | P0       |
| F2  | Dashboard / Home (Apersepsi)             | P0       |
| F3  | Prerequisite Material (Materi Prasyarat) | P1       |
| F4  | Translation Module                       | P0       |
| F5  | Translation Quiz                         | P0       |
| F6  | Reflection Module                        | P0       |
| F7  | Reflection Quiz                          | P0       |
| F8  | Lab Batik (Creative Sandbox)             | P1       |
| F9  | AI Scaffolding (Chatbot)                 | P1       |
| F10 | AI Answer Checking & Feedback            | P1       |
| F11 | Student Progress Tracking                | P1       |
| F12 | Student Dashboard & Analytics            | P2       |

### 5.2 Feature Details

---

#### F1: Authentication (Login)

**Priority:** P0

**Requirements:**

- Students authenticate before accessing learning content
- Authentication provider: **Clerk**
- Fields: username/email, password
- Session persistence across browser sessions
- Route protection: unauthenticated users cannot access `/menu`, `/prasyarat`, `/apersepsi/*`, `/modul/*`, `/lab`
- Logout functionality
- "Remember me" checkbox functionality

**Acceptance Criteria:**

- [ ] Clerk integration with sign-in/sign-up flows
- [ ] Protected routes redirect to `/login` when unauthenticated
- [ ] Session persists on page refresh
- [ ] Logout clears session and redirects to `/`

---

#### F2: Dashboard / Home (Apersepsi)

**Priority:** P0

**Requirements:**

- Welcome screen with product introduction
- Pre-learning video content about geometric transformations
- Interactive Cartesian coordinate explorer
- Navigation to Translation and Reflection modules
- Student identity display

**Acceptance Criteria:**

- [ ] Landing page with CTA to login
- [ ] Apersepsi page with intro content
- [ ] Interactive coordinate explorer with toggles (sumbu-x, sumbu-y, kuadran, titik, arah)
- [ ] Navigation to learning modules

---

#### F3: Prerequisite Material (Materi Prasyarat)

**Priority:** P1

**Requirements:**

- Review of prerequisite concepts: Cartesian coordinate system, quadrants, points, lines
- Interactive demonstrations
- Self-check quiz on prerequisites
- Progress indicator showing prerequisite completion

**Acceptance Criteria:**

- [ ] Dedicated prerequisite material section
- [ ] Interactive demonstrations of coordinate concepts
- [ ] Self-check quiz on prerequisites
- [ ] Progress indicator showing prerequisite completion

---

#### F4: Translation Module

**Priority:** P0

**Subtopics:**

| Subtopic         | Batik Motif  | Description                                     |
| ---------------- | ------------ | ----------------------------------------------- |
| Translasi Titik  | Kawung       | Point translation T[a,b]: (x,y) → (x+a, y+b)    |
| Translasi Garis  | Parang Rusak | Line translation: y=mx+c with translated points |
| Translasi Bidang | Megamendung  | Polygon/shape translation with vertex mapping   |

**Requirements per subtopic:**

- Cultural context section explaining the Batik motif's significance
- Interactive GeoGebra/Canvas visualization with sliders for a and b
- Inquiry-based learning steps (observation → pattern → conclusion)
- Live coordinate readout during transformation
- Matrix formula display with explanation
- Student conclusion notepad (saveable)
- Comprehension check

**Acceptance Criteria:**

- [ ] 3 translation subtopics with full content
- [ ] Interactive canvas with batik motifs (GeoGebra primary, custom canvas fallback)
- [ ] Inquiry-based learning flow with checklists
- [ ] Matrix formula display with explanation
- [ ] Student conclusion saving to database
- [ ] Video content in cultural context section

---

#### F5: Translation Quiz

**Priority:** P0

**Requirements:**

- Quiz covering all 3 translation subtopics
- Question types: multiple choice, coordinate input, drag-and-drop
- Immediate feedback per question
- Score calculation and display
- Review of incorrect answers
- AI-powered feedback on answers
- Progress saved to database

**Acceptance Criteria:**

- [ ] Quiz route `/modul/translasi/kuis` exists (intro), `/modul/translasi/kuis/[nomor]` (questions), `/modul/translasi/kuis/hasil` (results)
- [ ] Minimum 10 questions across 3 subtopics
- [ ] Multiple choice and coordinate input question types
- [ ] Immediate correct/incorrect feedback
- [ ] Final score display with subtopic breakdown
- [ ] AI feedback on incorrect answers
- [ ] Results saved to Supabase

---

#### F6: Reflection Module

**Priority:** P0

**Subtopics:**

| Subtopic                  | Batik Motif | Formula           |
| ------------------------- | ----------- | ----------------- |
| Refleksi Sumbu X          | Kawung      | (x,y) → (x, -y)   |
| Refleksi Sumbu Y          | Parang      | (x,y) → (-x, y)   |
| Refleksi Titik Asal (0,0) | Megamendung | (x,y) → (-x, -y)  |
| Refleksi Garis y=x        | Truntum     | (x,y) → (y, x)    |
| Refleksi Garis y=-x       | Sidomukti   | (x,y) → (-y, -x)  |
| Refleksi Garis x=h        | Sekar Jagad | (x,y) → (2h-x, y) |
| Refleksi Garis y=k        | Gentongan   | (x,y) → (x, 2k-y) |

**Requirements per subtopic:**

- Same structure as Translation module (cultural context, canvas, inquiry, matrix, conclusion)
- Axis/line selection appropriate to the reflection type
- Slider for h/k values where applicable

**Acceptance Criteria:**

- [ ] 7 reflection subtopics with full content
- [ ] Interactive canvas with batik motifs
- [ ] Inquiry-based learning flow
- [ ] Matrix formula display
- [ ] Student conclusion saving
- [ ] Video content in cultural context section

---

#### F7: Reflection Quiz

**Priority:** P0

**Requirements:** Same as F5 (Translation Quiz) but covering reflection subtopics.

**Acceptance Criteria:**

- [ ] Quiz route `/modul/refleksi/kuis` exists (intro), `/modul/refleksi/kuis/[nomor]` (questions), `/modul/refleksi/kuis/hasil` (results)
- [ ] Minimum 15 questions across 7 subtopics
- [ ] Same question types and feedback as Translation Quiz
- [ ] Results saved to Supabase

---

#### F8: Lab Batik (Creative Sandbox)

**Priority:** P1

**Requirements:**

- Canvas-based workspace for free creation
- Click-to-place Batik stamps on Cartesian grid
- Multiple Batik motifs: Kawung, Parang, Megamendung, Truntum
- Color palette: Sogan Kuning, Merah Gentongan, Pesisir Hijau, Biru Mega, Mata Arang
- Batch transformation tools:
  - Translation (vector [a,b])
  - Reflection (sumbu-x, sumbu-y, y=x, y=-x)
  - Clone + Transform ("Cerminkan & Gandakan")
- Save/load to user account
- Export to image (PNG)
- Clear canvas

**Acceptance Criteria:**

- [ ] Canvas with Cartesian grid (-10 to 10)
- [ ] 4 Batik motif stamps
- [ ] 5 color options
- [ ] Batch translation
- [ ] Batch reflection (4 axes)
- [ ] Save/load to Supabase
- [ ] Undo/redo
- [ ] Export to PNG
- [ ] Guided challenges/exercises

---

#### F9: AI Scaffolding (Chatbot)

**Priority:** P1

**Requirements:**

- Gemini-powered chatbot accessible from any learning page
- Context-aware: knows current subtopic and student progress
- Can explain concepts in simple Indonesian language
- Can answer questions about translation/reflection
- Can provide hints without giving away answers
- Chat interface with message history
- Offline fallback with static FAQ

**Acceptance Criteria:**

- [ ] Chat widget available on all learning pages
- [ ] Gemini API integration via Next.js API route
- [ ] Context-aware responses based on current page/topic
- [ ] Indonesian language responses
- [ ] Message history within session
- [ ] Loading states and error handling
- [ ] Offline fallback with static FAQ

---

#### F10: AI Answer Checking & Feedback

**Priority:** P1

**Requirements:**

- AI evaluates student answers on quiz questions
- Provides constructive feedback on incorrect answers
- Explains the correct solution step-by-step
- Rates answer quality (for essay-type questions)
- Tracks common mistakes for teacher reporting

**Acceptance Criteria:**

- [ ] Answer submission triggers AI evaluation via API route
- [ ] Feedback includes correct/incorrect indication
- [ ] Step-by-step explanation for wrong answers
- [ ] Feedback saved to database for teacher review

---

#### F11: Student Progress Tracking

**Priority:** P1

**Requirements:**

- Track completion of each subtopic (inquiry steps, observations, conclusions)
- Track quiz scores and attempts
- Track time spent per module
- Dashboard showing overall progress
- Persistent across sessions (Supabase)

**Acceptance Criteria:**

- [ ] Progress dashboard at `/dashboard`
- [ ] Completion status per subtopic (visual indicators)
- [ ] Quiz score history
- [ ] Time tracking
- [ ] Data persisted in Supabase

---

#### F12: Student Dashboard & Analytics

**Priority:** P2

**Requirements:**

- View own progress across all modules
- View quiz score history
- Identify strengths and weaknesses
- Export progress report

**Acceptance Criteria:**

- [ ] Student progress overview dashboard
- [ ] Per-module completion status and scores
- [ ] Quiz history with dates and scores

---

## 6. Technical Architecture

### 6.1 Tech Stack

| Layer             | Technology                 | Purpose                                         |
| ----------------- | -------------------------- | ----------------------------------------------- |
| **Framework**     | Next.js (App Router)       | Routing, SSR, API routes, file-based structure  |
| **Language**      | TypeScript (strict)        | Type safety                                     |
| **Styling**       | Tailwind CSS v4            | Design system, responsive layout, utility-first |
| **Database**      | Supabase (PostgreSQL)      | Data persistence, real-time, storage            |
| **ORM**           | Drizzle                    | Type-safe database queries, migrations          |
| **State Mgmt**    | Zustand                    | Client-side state management                    |
| **Data Fetching** | TanStack Query             | Server state, caching, optimistic updates       |
| **Validation**    | Zod                        | Schema validation (forms, API, DB)              |
| **Auth**          | Clerk                      | Authentication & user management                |
| **Visualization** | GeoGebra (Web API)         | Interactive geometry applets                    |
| **AI**            | Gemini API (@google/genai) | Chatbot, answer checking, feedback              |
| **Hosting**       | Vercel                     | Deployment & hosting                            |

### 6.2 Architecture Diagram

```
┌─────────────────────────────────────────────────────┐
│                    CLIENT (Browser)                   │
│                                                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────┐   │
│  │  Next.js  │  │ Zustand  │  │  TanStack Query  │   │
│  │  Router   │  │  Store   │  │   Data Fetching  │   │
│  └─────┬─────┘  └─────┬────┘  └────────┬─────────┘   │
│        │              │                 │              │
│  ┌─────┴──────────────┴─────────────────┴─────────┐   │
│  │              React Components                   │   │
│  │  ┌──────────┐ ┌──────────┐ ┌───────────────┐  │   │
│  │  │ Learning │ │   Quiz   │ │  Lab Batik    │  │   │
│  │  │ Modules  │ │  System  │ │  (Sandbox)    │  │   │
│  │  └──────────┘ └──────────┘ └───────────────┘  │   │
│  │  ┌──────────┐ ┌──────────┐ ┌───────────────┐  │   │
│  │  │ GeoGebra │ │  Gemini  │ │   Clerk Auth  │  │   │
│  │  │  Embed   │ │   Chat   │ │   Provider    │  │   │
│  │  └──────────┘ └──────────┘ └───────────────┘  │   │
│  └────────────────────────────────────────────────┘   │
└──────────────────────┬──────────────────────────────┘
                       │ HTTPS
┌──────────────────────┴──────────────────────────────┐
│                    SERVER (Vercel)                     │
│                                                       │
│  ┌────────────────────────────────────────────────┐   │
│  │              Next.js API Routes                 │   │
│  │  /api/quiz  /api/progress  /api/ai  /api/lab   │   │
│  └─────────┬──────────┬──────────┬────────┬───────┘   │
│            │          │          │        │            │
│  ┌─────────┴──┐ ┌─────┴────┐ ┌──┴───┐ ┌──┴────────┐  │
│  │   Clerk    │ │ Supabase │ │Drizzle│ │  Gemini   │  │
│  │   Auth     │ │    DB    │ │  ORM  │ │    API    │  │
│  └────────────┘ └──────────┘ └───────┘ └───────────┘  │
└──────────────────────────────────────────────────────┘
```

### 6.3 Project Structure

```
app/
├── (auth)/
│   ├── login/page.tsx
│   └── register/page.tsx
├── (app)/
│   ├── layout.tsx              # App shell — GEMATRI header + nav
│   ├── menu/page.tsx            # Main menu (3-card: Translasi, Refleksi, Lab)
│   ├── prasyarat/page.tsx       # Prerequisite material (Cartesian recap)
│   ├── lab/page.tsx             # Lab Batik creative sandbox
│   ├── apersepsi/
│   │   └── [slug]/page.tsx      # Module intro (translasi | refleksi)
│   └── modul/
│       └── [slug]/
│           ├── layout.tsx       # Tab navigation + footer (Kembali / Kuis)
│           ├── page.tsx         # Redirects to first tab
│           ├── [tab]/page.tsx   # Tab content rendered by slug+tab
│           ├── kuis/
│           │   ├── page.tsx     # Quiz intro/question
│           │   ├── [nomor]/page.tsx  # Per-question (1–5) with prev/next
│           │   └── hasil/page.tsx    # Score + pembahasan
├── (landing)/
│   └── page.tsx                 # Landing page — full brand hero
├── api/
│   ├── quiz/route.ts
│   ├── progress/route.ts
│   ├── ai/chat/route.ts
│   ├── ai/evaluate/route.ts
│   └── lab/route.ts
├── layout.tsx                   # Root layout — Space Grotesk + globals
└── globals.css                  # Nusantara Rebel palette + utilities

components/
├── retroui/                     # NeoBrutalism RetroUI primitives
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Text.tsx
│   ├── Input.tsx
│   ├── Tab.tsx
│   ├── Progress.tsx
│   ├── Alert.tsx
│   ├── Dialog.tsx
│   └── Textarea.tsx
├── auth/
│   ├── AuthLayout.tsx           # Branded auth shell
│   └── AuthFormField.tsx        # Label+input+icon/toggle
├── batik/
│   ├── KawungStamp.tsx
│   ├── BatikWatermark.tsx
│   └── LandingFooter.tsx
├── common/
│   └── AmbientCircles.tsx
├── canvas/
│   ├── InteractiveCoordinateGrid.tsx
│   ├── LabBatikCanvas.tsx
│   └── BatikMotifs.ts
├── geogebra/
│   └── GeoGebraEmbed.tsx
├── learning/
│   ├── InquirySteps.tsx
│   ├── Observations.tsx
│   ├── ConclusionNotepad.tsx
│   └── CulturalContext.tsx
└── quiz/
    ├── QuestionCard.tsx
    ├── MultipleChoice.tsx
    ├── CoordinateInput.tsx
    └── QuizResults.tsx

lib/
├── supabase/
│   ├── client.ts
│   └── server.ts
├── drizzle/
│   ├── schema.ts
│   ├── migrations/
│   └── index.ts
├── gemini/
│   └── client.ts
└── clerk/
    └── middleware.ts

stores/
├── useAuthStore.ts
├── useProgressStore.ts
├── useQuizStore.ts
└── useChatStore.ts

data/
├── curriculumData.ts
├── quizQuestions.ts
└── moduleConfig.ts              # Slug→tab mappings & metadata

hooks/
├── useCanvas.ts
├── useGeoGebra.ts
└── useTimer.ts

types/
└── index.ts
```

### 6.4 GeoGebra Integration

**Approach:**

1. Create GeoGebra `.ggb` files for each subtopic (3 translation + 7 reflection = 10 applets)
2. Embed using GeoGebra Web API (`ggbApplet` JavaScript API)
3. Bidirectional communication: GeoGebra ↔ React state (read coordinates, set transformations)
4. Fallback to custom HTML5 Canvas if GeoGebra fails to load
5. Custom canvas serves as the Lab Batik sandbox and backup visualization

---

## 7. Design System

> Full reference: [StyleGuide.md](./StyleGuide.md) | Color source: [DESIGN.md](./DESIGN.md)

### 7.1 Design Language

**Nusantara Rebel** — The Academic Rebel: Indonesian heritage meets NeoBrutalism. Structured Batik geometry (Kawung, Parang) meets high-contrast modernism. Thick 4px black borders, hard offset shadows (no blur), square elements, uppercase bold typography.

### 7.2 Color Palette

All colors are defined as CSS custom properties in `app/globals.css` and mapped to Tailwind utilities. **Always use semantic Tailwind classes, never raw hex.**

| CSS Variable            | Hex       | Tailwind Utility          | Role                          |
| ----------------------- | --------- | ------------------------- | ----------------------------- |
| `--background`          | `#fff8ef` | `bg-background`           | Page background (warm paper)  |
| `--foreground`          | `#1f1b12` | `text-foreground`         | Body text                     |
| `--card`                | `#ffffff` | `bg-card`                 | Card, input, popover surfaces |
| `--primary`             | `#ffd93d` | `bg-primary`              | CTA buttons, primary actions  |
| `--primary-foreground`  | `#000`    | `text-primary-foreground` | Text on primary               |
| `--primary-dark`        | `#705d00` | `text-primary-dark`       | Heading accent (Sogan Kuning) |
| `--secondary`           | `#006e29` | `bg-secondary`            | Success states, translation   |
| `--secondary-container` | `#93f59c` | `bg-secondary-container`  | Active tabs, indicators       |
| `--tertiary`            | `#ae2f34` | `bg-tertiary`             | Errors, reflection module     |
| `--tertiary-container`  | `#ffd1ce` | `bg-tertiary-container`   | Reflection headers, accents   |
| `--muted`               | `#eae2d2` | `bg-muted`                | Inactive areas, secondary     |
| `--muted-foreground`    | `#4d4633` | `text-muted-foreground`   | Secondary text, labels        |
| `--accent`              | `#ffe173` | `bg-accent`               | Badges, highlights            |
| `--border`              | `#000`    | `border-border`           | All borders (always black)    |
| `--outline`             | `#7e7761` | `border-outline`          | Secondary dividers            |
| `--error`               | `#ba1a1a` | `bg-error`                | Destructive actions           |
| `--surface-container`   | `#f5eddd` | `bg-surface-container`    | Container backgrounds         |

### 7.3 Typography

- **Font:** Space Grotesk (weights 300–700), loaded via `next/font/google`
- **Icons:** `lucide-react` (not Material Symbols)
- **Labels/headings:** `text-xs font-black uppercase` (or larger heading scale)
- **Body:** `text-sm font-medium`

### 7.4 Component Patterns

| Element    | Pattern                                                                                                                               | Import                            |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| Buttons    | RetroUI `<Button>` — never plain `<button>`. Add `!rounded-none`. Use `variant="default"`, `variant="outline"`, or `variant="ghost"`. | `@/components/retroui/Button`     |
| Cards      | RetroUI `<Card>` — use `Card.Header`, `Card.Title`, `Card.Content` sub-components. Square borders are implicit.                       | `@/components/retroui/Card`       |
| Inputs     | Use `<AuthFormField>` for auth forms or plain `<input>` with `border-2 border-border p-2.5 text-xs font-bold rounded`                 | `@/components/auth/AuthFormField` |
| Tabs       | RetroUI `<Tabs>` — `Tabs.List`, `Tabs.Trigger`, `Tabs.Content`. Labels uppercase via className                                        | `@/components/retroui/Tab`        |
| Shadows    | Hard offset — `shadow-sm` through `shadow-2xl` in `globals.css`. CTAs use `.neubrutal-shadow` + `.hover-shift` + `.active-shift`      | Defined in `globals.css`          |
| Auth shell | `<AuthLayout>` with branding, watermark, footer. `<AuthFormField>` for each form field.                                               | `@/components/auth/AuthLayout`    |

---

## 8. Data Model

### 8.1 Database Schema (Supabase + Drizzle)

```sql
-- Users (managed by Clerk, extended in Supabase)
CREATE TABLE users (
  id            TEXT PRIMARY KEY,       -- Clerk user ID
  username      TEXT NOT NULL,
  email         TEXT,
  avatar_url    TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Subtopic progress — tracks student advancement through a PageContent module
CREATE TABLE subtopic_progress (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id          TEXT REFERENCES users(id),
  module           TEXT NOT NULL,          -- 'translasi' | 'refleksi'
  subtopic         TEXT NOT NULL,          -- PageContent.id: 'titik', 'garis', 'bidang', 'sumbu-x', 'sumbu-y', 'titik-asal', 'garis-y-x', 'garis-y-neg-x', 'garis-x-h', 'garis-y-k'

  -- Pencapaian tahapan Inkuiri: menyimpan id langkah yang sudah dikerjakan oleh siswa, misal ["step1","step2","step3","step4"]
  steps_completed  JSONB DEFAULT '[]',

  -- Indeks pengamatan yang sudah diceklis oleh siswa, misal [0,1,2]
  observations     JSONB DEFAULT '[]',

  -- Catatan kesimpulan siswa berupa teks bebas
  conclusion       TEXT,

  completed        BOOLEAN DEFAULT FALSE,
  time_spent_ms    INTEGER DEFAULT 0,
  updated_at       TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, module, subtopic)
);

-- Quiz results
CREATE TABLE quiz_results (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       TEXT REFERENCES users(id),
  module        TEXT NOT NULL,          -- 'translasi' | 'refleksi'
  score         INTEGER NOT NULL,      -- 0-100
  total_questions INTEGER NOT NULL,
  answers       JSONB DEFAULT '[]',    -- [{question_id, answer, correct, feedback}]
  ai_feedback   TEXT,
  completed_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Lab Batik creations
CREATE TABLE batik_creations (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       TEXT REFERENCES users(id),
  name          TEXT,
  canvas_data   JSONB NOT NULL,        -- stamps, positions, colors
  thumbnail_url TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Chat history
CREATE TABLE chat_messages (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       TEXT REFERENCES users(id),
  session_id    TEXT NOT NULL,
  role          TEXT NOT NULL,          -- 'user' | 'assistant'
  content       TEXT NOT NULL,
  context_page  TEXT,                  -- current page/subtopic
  created_at    TIMESTAMPTZ DEFAULT NOW()
);
```

### 8.2 Drizzle Schema

```typescript
import {
  pgTable,
  text,
  uuid,
  integer,
  boolean,
  jsonb,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(), // Clerk user ID
  username: text("username").notNull(),
  email: text("email"),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const subtopicProgress = pgTable(
  "subtopic_progress",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id").references(() => users.id),
    module: text("module").notNull(), // 'translasi' | 'refleksi'
    subtopic: text("subtopic").notNull(), // PageContent.id — 'titik', 'garis', 'bidang', 'sumbu-x', dll.
    stepsCompleted: jsonb("steps_completed").default([]), // string[] — id langkah inkuiri, misal ["step1","step2"]
    observations: jsonb("observations").default([]), // number[] — indeks pengamatan, misal [0,1]
    conclusion: text("conclusion"), // catatan kesimpulan siswa
    completed: boolean("completed").default(false),
    timeSpentMs: integer("time_spent_ms").default(0),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (t) => [unique().on(t.userId, t.module, t.subtopic)],
);

export const quizResults = pgTable("quiz_results", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").references(() => users.id),
  module: text("module").notNull(),
  score: integer("score").notNull(),
  totalQuestions: integer("total_questions").notNull(),
  answers: jsonb("answers").default([]),
  aiFeedback: text("ai_feedback"),
  completedAt: timestamp("completed_at").defaultNow(),
});

export const batikCreations = pgTable("batik_creations", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").references(() => users.id),
  name: text("name"),
  canvasData: jsonb("canvas_data").notNull(),
  thumbnailUrl: text("thumbnail_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const chatMessages = pgTable("chat_messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").references(() => users.id),
  sessionId: text("session_id").notNull(),
  role: text("role").notNull(),
  content: text("content").notNull(),
  contextPage: text("context_page"),
  createdAt: timestamp("created_at").defaultNow(),
});
```

### 8.3 Zustand Store Structure

```typescript
interface AppStore {
  // Auth
  user: User | null;
  setUser: (user: User | null) => void;

  // Progress
  progress: Record<string, SubtopicProgress>;
  loadProgress: () => Promise<void>;
  updateProgress: (
    module: string,
    subtopic: string,
    update: Partial<SubtopicProgress>,
  ) => void;

  // Quiz
  currentQuiz: QuizState | null;
  startQuiz: (module: string) => void;
  submitAnswer: (questionId: string, answer: string) => void;
  finishQuiz: () => Promise<QuizResult>;

  // Chat
  chatMessages: ChatMessage[];
  sendMessage: (content: string) => Promise<void>;

  // UI
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}
```

### 8.4 Zod Schemas

```typescript
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export const quizAnswerSchema = z.object({
  questionId: z.string().uuid(),
  answer: z.string().min(1, "Jawaban harus diisi"),
  timeSpentMs: z.number().int().nonnegative(),
});

/* Subtopic slugs for each module */
const TRANSLASI_SUBTOPICS = ["titik", "garis", "bidang"] as const;
const REFLEKSI_SUBTOPICS = [
  "sumbu-x",
  "sumbu-y",
  "titik-asal",
  "garis-y-x",
  "garis-y-neg-x",
  "garis-x-h",
  "garis-y-k",
] as const;

/* PageContent — the static curriculum data for a single subtopic page */
export const pageContentSchema = z.object({
  id: z.string(),
  title: z.string(),
  batikConcept: z.string(),
  batikDescription: z.string(),
  interactiveTitle: z.string(),
  instructions: z.array(z.string()),
  geogebraUrl: z.string().optional(),
  inquirySteps: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
      completed: z.boolean().optional(),
    }),
  ),
  observations: z.array(z.string()),
  matrixFormula: z.string(),
  matrixExplanation: z.string(),
});

export const progressUpdateSchema = z.object({
  module: z.enum(["translasi", "refleksi"]),
  subtopic: z.string().min(1),
  stepsCompleted: z.array(z.string()), // InquiryStep.id[] — misal ["step1","step2"]
  observations: z.array(z.number()), // observation indices confirmed
  conclusion: z.string().optional(),
  completed: z.boolean(),
  timeSpentMs: z.number().int().nonnegative(),
});

export const chatMessageSchema = z.object({
  content: z.string().min(1).max(2000),
  contextPage: z.string().optional(),
});
```

---

## 9. User Flows

### 9.1 Student Learning Flow

```
/ (Landing) → /login (Clerk) → /menu
  │
  ├──→ /prasyarat → Self-check → /menu
  │
  ├──→ /apersepsi/translasi
  │     └──→ /modul/translasi/titik → Cultural Context → Interactive Canvas →
  │          Inquiry Steps → Observations → Conclusion → Comprehension Check
  │          /modul/translasi/garis   → [same flow]
  │          /modul/translasi/bangun   → [same flow]
  │          └──→ /modul/translasi/kuis → /modul/translasi/kuis/1…5
  │               → /modul/translasi/kuis/hasil → /menu
  │
  ├──→ /apersepsi/refleksi
  │     └──→ /modul/refleksi/sumbu-x → [same flow as Translation]
  │          /modul/refleksi/sumbu-y → [same flow]
  │          /modul/refleksi/garis   → [same flow]
  │          /modul/refleksi/bangun  → [same flow]
  │          └──→ /modul/refleksi/kuis → /modul/refleksi/kuis/1…5
  │               → /modul/refleksi/kuis/hasil → /menu
  │
  └──→ /lab → Place Stamps → Transform → Save → Share
```

### 9.2 AI Interaction Flow

```
Student on Learning Page
  │
  ├──→ Opens Chat Widget
  │     ├──→ Types question about current concept
  │     ├──→ Gemini API (with page context) → Response
  │     └──→ Conversation continues...
  │
  └──→ Submits Quiz Answer
        ├──→ Answer sent to Gemini API
        ├──→ AI evaluates correctness
        ├──→ AI generates step-by-step feedback
        └──→ Feedback displayed to student
```

### 9.3 Student Progress Flow

```
Student Login → Menu
  │
  ├──→ View Progress Dashboard
  │     ├──→ Translasi: 80% complete, quiz score 85
  │     ├──→ Refleksi: 45% complete, quiz score 62
  │     └──→ Continue from last subtopic
  │
  └──→ Resume Learning → Active module
```

---

## 10. Non-Functional Requirements

### 10.1 Performance

| Metric                   | Target          |
| ------------------------ | --------------- |
| First Contentful Paint   | < 2s            |
| Largest Contentful Paint | < 3s            |
| Time to Interactive      | < 4s            |
| Canvas FPS               | ≥ 60fps         |
| Gemini API Response      | < 5s            |
| Bundle Size (initial)    | < 250KB gzipped |

### 10.2 Responsiveness

| Breakpoint          | Layout                        |
| ------------------- | ----------------------------- |
| Mobile (< 640px)    | Single column, stacked panels |
| Tablet (640–1024px) | Two-column where appropriate  |
| Desktop (> 1024px)  | Full 12-column grid layout    |

### 10.3 Accessibility

- Semantic HTML elements
- ARIA labels on interactive elements
- Keyboard navigation for all controls
- Color contrast ratio ≥ 4.5:1 (WCAG AA)
- Alt text on all images/icons
- Focus indicators on all interactive elements

### 10.4 Browser Support

| Browser | Minimum Version |
| ------- | --------------- |
| Chrome  | 90+             |
| Firefox | 88+             |
| Safari  | 14+             |
| Edge    | 90+             |

### 10.5 Security

- Clerk handles authentication (no custom password storage)
- Supabase Row Level Security (RLS) on all tables
- Users can only read/write their own data
- API routes protected with authentication middleware
- No sensitive data in client-side code
- Environment variables for all API keys

### 10.6 Offline Support

- Core learning content cached for offline access
- Interactive canvas works offline
- Quiz answers queued and synced when online
- AI features gracefully degrade with offline message

---

## 11. Success Criteria

### 11.1 Functional Completeness

| Criterion                             | Target |
| ------------------------------------- | ------ |
| All P0 features operational           | 100%   |
| All P1 features operational           | 100%   |
| Zero critical bugs in production      | 0      |
| All learning modules content accurate | 100%   |

### 11.2 Technical Quality

| Criterion                      | Target      |
| ------------------------------ | ----------- |
| TypeScript strict mode         | Enabled     |
| Linting (ESLint)               | Zero errors |
| Test coverage (critical paths) | ≥ 80%       |
| Lighthouse Performance score   | ≥ 90        |
| Lighthouse Accessibility score | ≥ 90        |

### 11.3 Research Validation

| Criterion                       | Measurement                              | Target            |
| ------------------------------- | ---------------------------------------- | ----------------- |
| **Validity (Kevalidan)**        | Expert review (media + material experts) | Score ≥ 3.5 / 4.0 |
| **Practicality (Kepraktisan)**  | Teacher/practitioner user testing        | Score ≥ 3.5 / 4.0 |
| **Effectiveness (Keefektifan)** | Pre-test vs post-test with students      | Improvement ≥ 25% |

### 11.4 AI Performance

| Criterion                         | Target        |
| --------------------------------- | ------------- |
| Chatbot response accuracy         | ≥ 85% correct |
| Answer checking accuracy          | ≥ 90% correct |
| Feedback quality (student rating) | ≥ 4.0 / 5.0   |
| Response latency                  | < 5 seconds   |

---

## 12. Development Phases

### Phase 1: Project Setup & Foundation

**Goal:** Project scaffolded with core dependencies and design system

- [ ] Next.js project with App Router, TypeScript strict, Tailwind CSS v4
- [ ] Clerk authentication setup
- [ ] Supabase project + Drizzle schema + initial migrations
- [ ] Zustand store scaffolding
- [ ] TanStack Query provider setup
- [ ] Neubrutalism design system (CSS tokens, base components)
- [ ] Layout components (Navbar, Sidebar, Footer)

### Phase 2: Learning Modules

**Goal:** All learning content functional with interactive canvas

- [ ] Apersepsi (Dashboard) page with interactive coordinate explorer
- [ ] Prerequisite material section
- [ ] Translation module (3 subtopics) with inquiry flow
- [ ] Reflection module (7 subtopics) with inquiry flow
- [ ] Interactive coordinate canvas component
- [ ] GeoGebra integration (10 applets)
- [ ] Cultural context sections with video content
- [ ] Student conclusion notepad (Supabase persistence)

### Phase 3: Quiz System

**Goal:** Interactive quizzes with scoring and AI feedback

- [ ] Quiz data structure (Zod schemas + question bank)
- [ ] Translation quiz (10+ questions)
- [ ] Reflection quiz (15+ questions)
- [ ] Quiz UI components (multiple choice, coordinate input)
- [ ] Scoring & result display
- [ ] AI answer evaluation API route
- [ ] Quiz history (Supabase)

### Phase 4: AI Integration

**Goal:** Gemini-powered scaffolding and feedback

- [ ] Gemini API server-side setup (Next.js API route)
- [ ] Chatbot widget with context-aware responses
- [ ] AI answer checking & step-by-step feedback
- [ ] Chat history persistence
- [ ] Offline fallback with static FAQ

### Phase 5: Lab Batik & Progress

**Goal:** Creative sandbox and progress tracking

- [ ] Lab Batik canvas with stamp tools
- [ ] Batch transformation tools (translate, mirror)
- [ ] Save/load creations (Supabase)
- [ ] Export to PNG
- [ ] Student progress dashboard
- [ ] Time tracking per module
- [ ] Undo/redo in canvas

### Phase 6: Teacher Dashboard & Polish

**Goal:** Production-ready for deployment and research

- [ ] Teacher dashboard with class analytics
- [ ] Progress report export (CSV/PDF)
- [ ] Performance optimization
- [ ] Accessibility audit
- [ ] Research instrumentation
- [ ] Deployment to Vercel
- [ ] E2E testing

---

## Appendix

### A. Batik Motif Mapping

| Motif        | Indonesian Name | Geometric Concept                  | Module                   |
| ------------ | --------------- | ---------------------------------- | ------------------------ |
| Kawung       | Kawung          | Points, Sumbu X reflection         | Translation + Reflection |
| Parang Rusak | Parang          | Lines, Sumbu Y reflection          | Translation + Reflection |
| Megamendung  | Megamendung     | Polygons/Bidang, O(0,0) reflection | Translation + Reflection |
| Truntum      | Truntum         | Stars, y=x reflection              | Reflection               |
| Sidomukti    | Sidomukti       | y=-x reflection                    | Reflection               |
| Sekar Jagad  | Sekar Jagad     | Islands, x=h reflection            | Reflection               |
| Gentongan    | Gentongan       | Water vessel, y=k reflection       | Reflection               |

### B. Van Hiele Levels in Product

| Level | Name               | Product Implementation                    |
| ----- | ------------------ | ----------------------------------------- |
| 0     | Visualization      | Batik motifs displayed, shape recognition |
| 1     | Analysis           | Properties observed in interactive canvas |
| 2     | Informal Deduction | Patterns recognized in inquiry steps      |
| 3     | Formal Deduction   | Matrix formulas, algebraic notation       |
| 4     | Rigor              | Student conclusions, comprehension checks |

### C. Reference Documents

- [StyleGuide.md](./StyleGuide.md) — Visual design system reference
