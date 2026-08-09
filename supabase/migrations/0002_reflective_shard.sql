CREATE INDEX "idx_account_provider" ON "account" USING btree ("provider_id","provider_user_id");--> statement-breakpoint
CREATE INDEX "idx_ai_cache_created" ON "ai_feedback_cache" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "idx_quiz_results_user_module_completed" ON "quiz_results" USING btree ("user_id","module","completed_at" desc);--> statement-breakpoint
CREATE INDEX "idx_quiz_results_user_module_attempt" ON "quiz_results" USING btree ("user_id","module","attempt_number");--> statement-breakpoint
CREATE INDEX "idx_session_expires" ON "session" USING btree ("expires_at");