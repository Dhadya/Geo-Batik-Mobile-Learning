CREATE TABLE "ai_feedback_cache" (
	"id" serial PRIMARY KEY NOT NULL,
	"cache_key" text NOT NULL,
	"result" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "ai_feedback_cache_cache_key_unique" UNIQUE("cache_key")
);
--> statement-breakpoint
DROP INDEX "uq_quiz_results_attempt";