import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/drizzle/schema";

let database: ReturnType<typeof drizzle<typeof schema>> | undefined;
let queryClient: postgres.Sql | undefined;

/**
 * Returns the lazy-initialized Drizzle ORM instance.
 * Must be called inside service functions — never at module level.
 * Throws if `DATABASE_URL` is not set in the environment.
 *
 * Uses `idle_timeout` to release idle connections and prevent
 * accumulating leaked pools across hot reloads.
 *
 * The pool targets the Supabase transaction pooler (port 6543): `prepare` is
 * disabled (required by the pooler) and `statement_timeout` is applied per
 * connection so a slow query never pins a pooled connection forever.
 */
export function getDb() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }
  if (!queryClient) {
    queryClient = postgres(process.env.DATABASE_URL, {
      max: 5,
      idle_timeout: 10,
      connect_timeout: 10,
      prepare: false,
      connection: {
        statement_timeout: 5000,
        application_name: "gematri",
      },
      onnotice: (notice) => {
        if (notice && (notice.severity === "WARNING" || notice.severity === "ERROR")) {
          console.warn("[db.notice]", notice);
        }
      },
    });
    database = drizzle(queryClient, { schema });
  }
  return database!;
}
