import { NextRequest, NextResponse } from "next/server"
import { withRequestLog } from "@/lib/api/logger"
import { deleteExpiredCache } from "@/features/modules/services/aiCache"

/** Number of days of AI feedback cache to retain. */
const CACHE_RETENTION_DAYS = 30

/** Protect the cron route with a shared secret, matching Vercel Cron's Authorization header. */
function isAuthorized(request: NextRequest): boolean {
  const secret = process.env.CRON_SECRET
  if (!secret) return false
  const header = request.headers.get("authorization")
  return header === `Bearer ${secret}`
}

/** POST /api/cron/ai-cache-cleanup — Vercel Cron job that purges cached AI feedback older than 30 days. */
export const POST = withRequestLog(async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, error: { code: "UNAUTHORIZED", message: "Unauthorized" } }, { status: 401, headers: { "cache-control": "no-store" } })
  }

  try {
    const deleted = await deleteExpiredCache(CACHE_RETENTION_DAYS)
    return NextResponse.json(
      { ok: true, data: { deleted, retentionDays: CACHE_RETENTION_DAYS } },
      { headers: { "cache-control": "no-store" } },
    )
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Cron cleanup failed"
    console.error("[cron] ai-cache-cleanup failed:", msg)
    return NextResponse.json(
      { ok: false, error: { code: "INTERNAL_ERROR", message: "Gagal membersihkan cache AI" } },
      { status: 500, headers: { "cache-control": "no-store" } },
    )
  }
})

/** GET is not used — keep it 405 to avoid accidental manual triggers. */
export const GET = withRequestLog(async function GET() {
  return NextResponse.json({ ok: false, error: { code: "INVALID_REQUEST", message: "Method not allowed" } }, { status: 405, headers: { "cache-control": "no-store" } })
})
