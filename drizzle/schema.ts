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

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  username: text("username").notNull(),
  email: text("email"),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
})

export const subtopicProgress = pgTable(
  "subtopic_progress",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    module: text("module", { enum: ["translasi", "refleksi"] }).notNull(),
    subtopic: text("subtopic").notNull(),
    stepsCompleted: jsonb("steps_completed").notNull().default([]),
    observations: jsonb("observations").notNull().default([]),
    conclusion: text("conclusion"),
    completed: boolean("completed").notNull().default(false),
    timeSpentMs: integer("time_spent_ms").notNull().default(0),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("uq_user_module_subtopic").on(table.userId, table.module, table.subtopic),
    index("idx_subtopic_progress_user").on(table.userId),
    index("idx_subtopic_progress_module").on(table.module),
  ],
)

export const quizResults = pgTable(
  "quiz_results",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    module: text("module", { enum: ["translasi", "refleksi"] }).notNull(),
    score: integer("score").notNull(),
    totalQuestions: integer("total_questions").notNull(),
    answers: jsonb("answers").notNull().default([]),
    aiFeedback: text("ai_feedback"),
    completedAt: timestamp("completed_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("idx_quiz_results_user").on(table.userId),
    index("idx_quiz_results_module").on(table.module),
    index("idx_quiz_results_completed").on(table.completedAt),
  ],
)

export const batikCreations = pgTable(
  "batik_creations",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    name: text("name"),
    canvasData: jsonb("canvas_data").notNull(),
    thumbnailUrl: text("thumbnail_url"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("idx_batik_creations_user").on(table.userId)],
)

export const chatMessages = pgTable(
  "chat_messages",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    sessionId: text("session_id").notNull(),
    role: text("role", { enum: ["user", "assistant", "system"] }).notNull(),
    content: text("content").notNull(),
    contextPage: text("context_page"),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("idx_chat_messages_session").on(table.sessionId),
    index("idx_chat_messages_user").on(table.userId),
    index("idx_chat_messages_created").on(table.createdAt),
  ],
)

export const pageContent = pgTable(
  "page_content",
  {
    id: text("id").primaryKey(),
    module: text("module", { enum: ["translasi", "refleksi"] }).notNull(),
    sortOrder: integer("sort_order").notNull(),
    title: text("title").notNull(),
    batikConcept: text("batik_concept").notNull(),
    batikDescription: text("batik_description").notNull(),
    interactiveTitle: text("interactive_title").notNull(),
    instructions: jsonb("instructions").notNull().default([]),
    geogebraUrl: text("geogebra_url"),
    inquirySteps: jsonb("inquiry_steps").notNull().default([]),
    observations: jsonb("observations").notNull().default([]),
    matrixFormula: text("matrix_formula").notNull(),
    matrixExplanation: text("matrix_explanation").notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("idx_page_content_module").on(table.module, table.sortOrder)],
)
