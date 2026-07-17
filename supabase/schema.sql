-- ============================================================================
-- GEMATRI — Gemakan Mahir Transformasi Geometri
-- Supabase Database Schema
-- DDL for all tables, indexes, and RLS policies.
-- ============================================================================

-- ── Extensions ─────────────────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- 1. BETTERAUTH TABLES — managed by BetterAuth drizzle adapter
-- ============================================================================

-- User account — stores auth credentials and profile info
CREATE TABLE "user" (
  id            TEXT PRIMARY KEY,
  name          TEXT,
  email         TEXT UNIQUE,
  email_verified BOOLEAN NOT NULL DEFAULT FALSE,
  image         TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE  "user" IS $$BetterAuth user account$$;

-- Session — tracks active user sessions with token-based auth
CREATE TABLE "session" (
  id            TEXT PRIMARY KEY,
  user_id       TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  expires_at    TIMESTAMPTZ NOT NULL,
  token         TEXT NOT NULL UNIQUE,
  ip_address    TEXT,
  user_agent    TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_session_user   ON "session"(user_id);
CREATE INDEX idx_session_token  ON "session"(token);

COMMENT ON TABLE  "session" IS $$Active user sessions$$;

-- Account — links user to OAuth providers (Google, etc.)
CREATE TABLE "account" (
  id                      TEXT PRIMARY KEY,
  user_id                 TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  account_id              TEXT NOT NULL,
  provider_id             TEXT NOT NULL,
  provider_user_id        TEXT,
  access_token            TEXT,
  refresh_token           TEXT,
  access_token_expires_at TIMESTAMPTZ,
  refresh_token_expires_at TIMESTAMPTZ,
  scope                   TEXT,
  id_token                TEXT,
  password                TEXT,
  created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at              TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_account_user ON "account"(user_id);

COMMENT ON TABLE  "account" IS $$OAuth provider account links$$;

-- Verification — stores email verification and password reset tokens
CREATE TABLE "verification" (
  id          TEXT PRIMARY KEY,
  identifier  TEXT NOT NULL,
  value       TEXT NOT NULL,
  expires_at  TIMESTAMPTZ NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE  "verification" IS $$Verification and password reset tokens$$;

-- ============================================================================
-- 2. SECTION PROGRESS — per-section answer history with two-attempt system
--    Stores all attempts, AI feedback, and scores for each section
--    (Percobaan, Pengamatan, Penyimpulan, Cek Pemahaman).
-- ============================================================================
CREATE TABLE section_progress (
  id                  TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id             TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  module              TEXT NOT NULL CHECK (module IN ('translasi', 'refleksi')),
  tab                 TEXT NOT NULL,
  section_type        TEXT NOT NULL CHECK (section_type IN ('percobaan', 'pengamatan', 'penyimpulan', 'cek-pemahaman')),

  -- Attempt 1
  attempt_1_answer    TEXT,
  attempt_1_feedback  TEXT,
  attempt_1_score     INTEGER,

  -- Attempt 2
  attempt_2_answer    TEXT,
  attempt_2_feedback  TEXT,
  attempt_2_score     INTEGER,

  final_score         INTEGER,
  status              TEXT NOT NULL DEFAULT 'unsubmitted'
                        CHECK (status IN ('unsubmitted', 'correct', 'wrong_attempt1', 'wrong_attempt2', 'locked')),
  completed_at        TIMESTAMPTZ,

  -- One row per (user, module, tab, section_type)
  UNIQUE(user_id, module, tab, section_type)
);

COMMENT ON TABLE  section_progress IS $$Per-section answer attempts, AI feedback, and scores$$;
COMMENT ON COLUMN section_progress.status IS $$unsubmitted | correct | wrong_attempt1 | wrong_attempt2 | locked$$;

CREATE INDEX idx_section_progress_user ON section_progress(user_id);

-- ── RLS ────────────────────────────────────────────────────────────────────
ALTER TABLE section_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own section progress"
  ON section_progress FOR ALL
  USING (user_id = auth.uid()::text)
  WITH CHECK (user_id = auth.uid()::text);

-- ============================================================================
-- 3. TAB PROGRESS — tracks unlock/completion state per tab within each module
--    Determines which tabs are accessible to the user based on prior
--    section completion.
-- ============================================================================
CREATE TABLE tab_progress (
  id          TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id     TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  module      TEXT NOT NULL CHECK (module IN ('translasi', 'refleksi')),
  tab         TEXT NOT NULL,
  unlocked    BOOLEAN NOT NULL DEFAULT FALSE,
  completed   BOOLEAN NOT NULL DEFAULT FALSE,
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE(user_id, module, tab)
);

COMMENT ON TABLE  tab_progress IS $$Tab unlock and completion tracking$$;

CREATE INDEX idx_tab_progress_user ON tab_progress(user_id);

-- ── RLS ────────────────────────────────────────────────────────────────────
ALTER TABLE tab_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own tab progress"
  ON tab_progress FOR ALL
  USING (user_id = auth.uid()::text)
  WITH CHECK (user_id = auth.uid()::text);

-- ============================================================================
-- 4. QUIZ RESULTS — per-attempt quiz answers and total score
--    Stores all answers as JSON with per-question attempt data.
-- ============================================================================
CREATE TABLE quiz_results (
  id            TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id       TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  module        TEXT NOT NULL CHECK (module IN ('translasi', 'refleksi')),
  answers       JSONB NOT NULL DEFAULT '[]'::jsonb,
  total_score   INTEGER NOT NULL,
  completed_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE  quiz_results IS $$Quiz attempt results with per-question two-attempt data$$;
COMMENT ON COLUMN quiz_results.answers IS $$JSON array — [{question_id, type, attempt_1_answer, attempt_1_correct, attempt_1_feedback, attempt_2_answer, attempt_2_correct, attempt_2_feedback, final_score}]$$;

CREATE INDEX idx_quiz_results_user   ON quiz_results(user_id);
CREATE INDEX idx_quiz_results_module ON quiz_results(module);

-- ── RLS ────────────────────────────────────────────────────────────────────
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own quiz results"
  ON quiz_results FOR ALL
  USING (user_id = auth.uid()::text)
  WITH CHECK (user_id = auth.uid()::text);
