/**
 * Cache-Control header presets for route handlers.
 *
 * `public` — shared, slow-changing data that is safe to cache at the CDN edge
 *            (e.g. public config). Never use for user-scoped payloads.
 * `private` — user-scoped data (progress, quiz results). Browsers may reuse
 *            within the session; shared caches must not. Freshness is managed
 *            client-side by TanStack Query.
 * `no-store` — must not be cached anywhere (auth responses, mutations).
 */
export const CACHE_CONTROL = {
  public: "public, s-maxage=300, stale-while-revalidate=3600",
  private: "private, no-store",
  noStore: "no-store",
} as const;

export type CacheControlKind = keyof typeof CACHE_CONTROL;

/**
 * Returns a headers object with the Cache-Control value for the given kind.
 * Spread into a `NextResponse.json` init, e.g.:
 * `NextResponse.json({ ok: true, data }, { headers: cacheControl("private") })`.
 */
export function cacheControl(kind: CacheControlKind): Record<string, string> {
  return { "cache-control": CACHE_CONTROL[kind] };
}
