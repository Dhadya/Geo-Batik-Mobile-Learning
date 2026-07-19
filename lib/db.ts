import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/drizzle/schema";

const connectionString = process.env.DATABASE_URL!;

const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client, { schema });

let database: ReturnType<typeof drizzle<typeof schema>> | undefined;
let queryClient: postgres.Sql | undefined;

export function getDb() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }
  queryClient ??= postgres(process.env.DATABASE_URL, { max: 10 });
  database ??= drizzle(queryClient, { schema });
  return database;
}
