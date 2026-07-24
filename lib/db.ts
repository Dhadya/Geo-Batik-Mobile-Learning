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
    });
    database = drizzle(queryClient, { schema });
  }
  return database!;
}
