import { NextResponse } from "next/server"
import { sql } from "drizzle-orm"
import { getDb } from "@/lib/db"
import { getRedis } from "@/lib/cache"

/** Always run live — a health check must probe DB/Redis on every call. */
export const dynamic = "force-dynamic"

/**
 * Public health check for uptime monitors and CI canaries.
 * Reports DB reachability and Redis availability without requiring auth.
 */
export async function GET() {
  let dbOk = false
  let redisOk: boolean | "disabled" = "disabled"

  try {
    const db = getDb()
    await db.execute(sql`SELECT 1`)
    dbOk = true
  } catch {
    dbOk = false
  }

  const redis = getRedis()
  if (redis) {
    try {
      await redis.ping()
      redisOk = true
    } catch {
      redisOk = false
    }
  }

  const ok = dbOk && redisOk !== false
  return NextResponse.json(
    { ok, db: dbOk ? "up" : "down", redis: redisOk },
    { status: ok ? 200 : 503, headers: { "cache-control": "no-store" } },
  )
}
