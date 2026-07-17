-- Drop old tables from previous schema
DROP TABLE IF EXISTS "batik_creations" CASCADE;
DROP TABLE IF EXISTS "chat_messages" CASCADE;
DROP TABLE IF EXISTS "page_content" CASCADE;
DROP TABLE IF EXISTS "subtopic_progress" CASCADE;

-- Drop old User/account tables named with plural convention
DROP TABLE IF EXISTS "account" CASCADE;
DROP TABLE IF EXISTS "session" CASCADE;
DROP TABLE IF EXISTS "quiz_results" CASCADE;
DROP TABLE IF EXISTS "verification" CASCADE;
DROP TABLE IF EXISTS "users" CASCADE;

-- Drop old helper views
DROP VIEW IF EXISTS "student_module_progress" CASCADE;
DROP VIEW IF EXISTS "student_latest_quiz" CASCADE;

-- ── New Schema ───────────────────────────────────────────────────────────

CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"provider_user_id" text,
	"access_token" text,
	"refresh_token" text,
	"access_token_expires_at" timestamp with time zone,
	"refresh_token_expires_at" timestamp with time zone,
	"scope" text,
	"id_token" text,
	"password" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "quiz_results" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"module" text NOT NULL,
	"answers" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"total_score" integer NOT NULL,
	"completed_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "section_progress" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"module" text NOT NULL,
	"tab" text NOT NULL,
	"section_type" text NOT NULL,
	"attempt_1_answer" text,
	"attempt_1_feedback" text,
	"attempt_1_score" integer,
	"attempt_2_answer" text,
	"attempt_2_feedback" text,
	"attempt_2_score" integer,
	"final_score" integer,
	"status" text DEFAULT 'unsubmitted' NOT NULL,
	"completed_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"token" text NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "tab_progress" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"module" text NOT NULL,
	"tab" text NOT NULL,
	"unlocked" boolean DEFAULT false NOT NULL,
	"completed" boolean DEFAULT false NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quiz_results" ADD CONSTRAINT "quiz_results_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "section_progress" ADD CONSTRAINT "section_progress_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tab_progress" ADD CONSTRAINT "tab_progress_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_account_user" ON "account" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_quiz_results_user" ON "quiz_results" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_quiz_results_module" ON "quiz_results" USING btree ("module");--> statement-breakpoint
CREATE UNIQUE INDEX "uq_user_module_tab_section" ON "section_progress" USING btree ("user_id","module","tab","section_type");--> statement-breakpoint
CREATE INDEX "idx_section_progress_user" ON "section_progress" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_session_user" ON "session" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_session_token" ON "session" USING btree ("token");--> statement-breakpoint
CREATE UNIQUE INDEX "uq_user_module_tab" ON "tab_progress" USING btree ("user_id","module","tab");--> statement-breakpoint
CREATE INDEX "idx_tab_progress_user" ON "tab_progress" USING btree ("user_id");