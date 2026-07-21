ALTER TABLE "quiz_results" ADD COLUMN "attempt_number" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "quiz_results" ADD COLUMN "package_id" integer NOT NULL;--> statement-breakpoint
CREATE INDEX "idx_quiz_results_attempt" ON "quiz_results" USING btree ("user_id","module","attempt_number");