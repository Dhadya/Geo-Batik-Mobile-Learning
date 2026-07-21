import {
  pgTable,
  text,
  integer,
  boolean,
  jsonb,
  timestamp,
  uniqueIndex,
  index,
} from "drizzle-orm/pg-core"

// ─── BetterAuth Tables ───────────────────────────────────────────────────

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  image: text("image"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
})

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  token: text("token").notNull().unique(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
  index("idx_session_user").on(table.userId),
  index("idx_session_token").on(table.token),
])

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  providerUserId: text("provider_user_id"),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at", { withTimezone: true }),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at", { withTimezone: true }),
  scope: text("scope"),
  idToken: text("id_token"),
  password: text("password"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
  index("idx_account_user").on(table.userId),
])

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
})

// ─── App Tables ──────────────────────────────────────────────────────────

// Section progress — per-section answer history with two-attempt system
export const sectionProgress = pgTable(
  "section_progress",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    module: text("module", { enum: ["translasi", "refleksi"] }).notNull(),
    tab: text("tab").notNull(),
    sectionType: text("section_type", {
      enum: ["percobaan", "pengamatan", "penyimpulan", "cek-pemahaman"],
    }).notNull(),

    attempt1Answer: text("attempt_1_answer"),
    attempt1Feedback: text("attempt_1_feedback"),
    attempt1Score: integer("attempt_1_score"),

    attempt2Answer: text("attempt_2_answer"),
    attempt2Feedback: text("attempt_2_feedback"),
    attempt2Score: integer("attempt_2_score"),

    finalScore: integer("final_score"),
    status: text("status", {
      enum: ["unsubmitted", "correct", "wrong_attempt1", "wrong_attempt2", "locked"],
    }).notNull().default("unsubmitted"),
    completedAt: timestamp("completed_at", { withTimezone: true }),
  },
  (table) => [
    uniqueIndex("uq_user_module_tab_section").on(table.userId, table.module, table.tab, table.sectionType),
    index("idx_section_progress_user").on(table.userId),
  ],
)

// Tab progress — tracks unlock/completion per tab within each module
export const tabProgress = pgTable(
  "tab_progress",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    module: text("module", { enum: ["translasi", "refleksi"] }).notNull(),
    tab: text("tab").notNull(),
    unlocked: boolean("unlocked").notNull().default(false),
    completed: boolean("completed").notNull().default(false),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("uq_user_module_tab").on(table.userId, table.module, table.tab),
    index("idx_tab_progress_user").on(table.userId),
  ],
)

// Quiz results — per-attempt quiz answers and scores
// Each row represents one quiz attempt (1, 2, 3, ...).
// package_id: 0 = Paket 1 (questions 1–10), 1 = Paket 2 (questions 11–20)
export const quizResults = pgTable(
  "quiz_results",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    module: text("module", { enum: ["translasi", "refleksi"] }).notNull(),
    attemptNumber: integer("attempt_number").notNull(),
    packageId: integer("package_id").notNull(),
    answers: jsonb("answers").notNull().default([]),
    totalScore: integer("total_score").notNull(),
    completedAt: timestamp("completed_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("idx_quiz_results_user").on(table.userId),
    index("idx_quiz_results_module").on(table.module),
    index("idx_quiz_results_attempt").on(table.userId, table.module, table.attemptNumber),
  ],
)
