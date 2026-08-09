/**
 * Shared coordinator for Gemini API key rotation and concurrency control.
 *
 * Uses Upstash Redis so that state is shared across all serverless instances
 * on Vercel — fixing the problem where each cold instance starts at key 0
 * and hammers the same quota.
 *
 * Gracefully degrades: if Redis is not configured or unavailable, all
 * functions fall back to simple round-robin / no-op so the app keeps working.
 *
 * Server-only (Layer 3) — never imported by client components.
 */

import { getRedis } from "@/lib/cache";

/** Maximum concurrent in-flight Gemini calls across all instances. */
const MAX_INFLIGHT = 10;

const SEMAPHORE_KEY = "gemini:inflight";

/**
 * Returns the current 60-second window bucket (Unix minutes).
 * All keys within the same minute share the same bucket counter.
 */
function minuteBucket(): number {
  return Math.floor(Date.now() / 60_000);
}

/**
 * Builds the per-minute RPM counter key for a key index.
 * Expires after 120 s so stale windows auto-clean.
 */
function rpmKey(index: number): string {
  return `gemini:rpm:${index}:${minuteBucket()}`;
}

function dateBucket(): string {
  const now = new Date();
  const yyyy = now.getUTCFullYear();
  const mm = String(now.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(now.getUTCDate()).padStart(2, "0");
  return `${yyyy}${mm}${dd}`;
}

function rpdKey(index: number): string {
  return `gemini:rpd:${index}:${dateBucket()}`;
}

/**
 * Tracks daily RPD usage for a key and emits a warning at 80% quota (800 requests).
 */
export async function trackDailyQuota(index: number): Promise<void> {
  const redis = getRedis();
  if (!redis) return;
  try {
    const key = rpdKey(index);
    const count = await redis.incr(key);
    if (count === 1) {
      await redis.expire(key, 172_800); // 48h TTL
    }
    const RPD_WARN_THRESHOLD = 800; // 80% of 1000 free-tier limit
    if (count >= RPD_WARN_THRESHOLD) {
      console.warn(`[coordinator] Key ${index + 1} daily RPD reached ${count}/1000 (>= 80% quota)`);
    }
  } catch (err) {
    console.warn("[coordinator] trackDailyQuota Redis error:", err);
  }
}

/**
 * Picks the API key index with the lowest RPM usage in the current window,
 * skipping any keys that are cooling down after a 429.
 *
 * Falls back to a simple round-robin (cycling by minute) when Redis is
 * unavailable or all keys are cooling down.
 *
 * @param count - Total number of API keys available.
 * @returns The zero-based index of the best key to use next.
 */
export async function pickKeyIndex(count: number): Promise<number> {
  if (count === 0) return 0;
  const redis = getRedis();

  if (!redis) {
    // No Redis → plain round-robin by current second to spread load.
    return Math.floor(Date.now() / 1_000) % count;
  }

  try {
    // Read RPM counters and cooldown status for all keys in parallel.
    const [counts, cooled] = await Promise.all([
      Promise.all(
        Array.from({ length: count }, (_, i) =>
          redis.get<number>(rpmKey(i)),
        ),
      ),
      Promise.all(
        Array.from({ length: count }, (_, i) =>
          redis.get<string>(`gemini:cooldown:${i}`),
        ),
      ),
    ]);

    // Find the non-cooled key with the lowest counter.
    let bestIndex = -1;
    let bestCount = Infinity;
    for (let i = 0; i < count; i++) {
      if (cooled[i] !== null) continue; // skip cooled-down keys
      const c = counts[i] ?? 0;
      if (c < bestCount) {
        bestCount = c;
        bestIndex = i;
      }
    }

    // If all keys are cooling down, fall back to least-used (ignore cooldowns).
    if (bestIndex === -1) {
      console.warn("[coordinator] All keys cooling down — ignoring cooldowns and picking least-used");
      bestIndex = counts.reduce<number>(
        (best, cur, i) => ((cur ?? 0) < (counts[best] ?? 0) ? i : best),
        0,
      );
    }

    return bestIndex;
  } catch (err) {
    console.warn("[coordinator] pickKeyIndex Redis error, falling back to round-robin:", err);
    return Math.floor(Date.now() / 1_000) % count;
  }
}

/**
 * Records that a key was used in the current 60-second window.
 * Increments the RPM counter and ensures it auto-expires after 120 s.
 *
 * @param index - Zero-based key index.
 */
export async function markKeyUsed(index: number): Promise<void> {
  const redis = getRedis();
  if (!redis) return;
  try {
    const key = rpmKey(index);
    await redis.incr(key);
    await redis.expire(key, 120);
    await trackDailyQuota(index);
  } catch (err) {
    console.warn("[coordinator] markKeyUsed Redis error:", err);
  }
}

/**
 * Puts a key into cooldown for the specified duration.
 * Other requests will skip this key via `pickKeyIndex` until the TTL expires.
 *
 * @param index   - Zero-based key index.
 * @param seconds - How long to cool the key down (from the 429 `retryAfter`).
 */
export async function cooldownKey(index: number, seconds: number): Promise<void> {
  const redis = getRedis();
  if (!redis) return;
  try {
    await redis.set(`gemini:cooldown:${index}`, "1", { ex: seconds });
    console.warn(`[coordinator] key ${index + 1} cooling down for ${seconds}s`);
  } catch (err) {
    console.warn("[coordinator] cooldownKey Redis error:", err);
  }
}

/**
 * Acquires one slot in the global in-flight semaphore.
 * Spins until a slot is available or the timeout elapses.
 * Throws `"AI queue full"` when the timeout is reached.
 *
 * @param timeoutMs - Maximum time to wait for a slot (default 5 s).
 */
export async function acquireSlot(timeoutMs = 5_000): Promise<void> {
  const redis = getRedis();
  if (!redis) return; // No Redis → unlimited (same as before)

  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const next = await redis.incr(SEMAPHORE_KEY);
      if (next <= MAX_INFLIGHT) return;
      // Slot over limit — give it back and wait.
      await redis.decr(SEMAPHORE_KEY);
    } catch (err) {
      // Redis error → skip semaphore to avoid blocking the request.
      console.warn("[coordinator] acquireSlot Redis error, skipping semaphore:", err);
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 150));
  }
  throw new Error("AI queue full — too many concurrent requests, please retry");
}

/**
 * Releases one slot from the global in-flight semaphore.
 * Always call this in a `finally` block after `acquireSlot`.
 */
export async function releaseSlot(): Promise<void> {
  const redis = getRedis();
  if (!redis) return;
  try {
    await redis.decr(SEMAPHORE_KEY);
  } catch (err) {
    console.warn("[coordinator] releaseSlot Redis error:", err);
  }
}

export interface KeyStatusInfo {
  index: number;
  rpm: number;
  rpd: number;
  isCoolingDown: boolean;
}

export interface CoordinatorStatusResponse {
  redisConfigured: boolean;
  maxInflight: number;
  currentInflight: number;
  keys: KeyStatusInfo[];
}

/**
 * Returns current usage statistics across all configured Gemini keys.
 */
export async function getQuotaStatus(keyCount: number): Promise<CoordinatorStatusResponse> {
  const redis = getRedis();
  if (!redis) {
    return {
      redisConfigured: false,
      maxInflight: MAX_INFLIGHT,
      currentInflight: 0,
      keys: Array.from({ length: keyCount }, (_, i) => ({
        index: i,
        rpm: 0,
        rpd: 0,
        isCoolingDown: false,
      })),
    };
  }

  try {
    const [inflight, rpms, rpds, cooldowns] = await Promise.all([
      redis.get<number>(SEMAPHORE_KEY),
      Promise.all(Array.from({ length: keyCount }, (_, i) => redis.get<number>(rpmKey(i)))),
      Promise.all(Array.from({ length: keyCount }, (_, i) => redis.get<number>(rpdKey(i)))),
      Promise.all(Array.from({ length: keyCount }, (_, i) => redis.get<string>(`gemini:cooldown:${i}`))),
    ]);

    return {
      redisConfigured: true,
      maxInflight: MAX_INFLIGHT,
      currentInflight: Math.max(0, inflight ?? 0),
      keys: Array.from({ length: keyCount }, (_, i) => ({
        index: i,
        rpm: rpms[i] ?? 0,
        rpd: rpds[i] ?? 0,
        isCoolingDown: cooldowns[i] !== null,
      })),
    };
  } catch (err) {
    console.warn("[coordinator] getQuotaStatus Redis error:", err);
    return {
      redisConfigured: false,
      maxInflight: MAX_INFLIGHT,
      currentInflight: 0,
      keys: [],
    };
  }
}
