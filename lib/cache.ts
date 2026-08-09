import { Redis } from "@upstash/redis";

/**
 * Shared Upstash Redis client for cross-serverless-instance caching and
 * coordination. Exposes a single lazy singleton so all consumers (rate-limit
 * coordinator, cache helpers) reuse one connection.
 *
 * Server-only — never import from client components.
 */

/** Lazily created Redis client — null when env vars are absent. */
let _redis: Redis | null = null;

/**
 * Returns the Upstash Redis client, or null if the env vars are not set.
 * Uses a lazy singleton so module-level imports never throw and the app
 * degrades gracefully when Redis is absent.
 */
export function getRedis(): Redis | null {
  if (_redis) return _redis;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  _redis = new Redis({ url, token });
  return _redis;
}

/**
 * Read-through cache: returns the cached value if present, otherwise computes
 * it via `fn` and stores it under `key` with the given TTL.
 *
 * Degrades to a direct `fn()` call when Redis is unavailable, so a Redis
 * outage never blocks reads.
 *
 * @param key - Cache key (namespace with a prefix, e.g. `ai:status`).
 * @param fn  - Producer for the value when the cache misses.
 * @param ttl - Time-to-live in seconds (default 300 = 5 minutes).
 */
export async function getOrSet<T>(key: string, fn: () => Promise<T>, ttl = 300): Promise<T> {
  const redis = getRedis();
  if (!redis) return fn();
  try {
    const hit = await redis.get<T>(key);
    if (hit !== null) return hit;
    const value = await fn();
    await redis.set(key, value, { ex: ttl });
    return value;
  } catch (err) {
    console.warn("[cache] getOrSet Redis error, falling back to direct call:", err);
    return fn();
  }
}

/**
 * Deletes a cache key. Safe no-op when Redis is absent.
 */
export async function invalidate(key: string): Promise<void> {
  const redis = getRedis();
  if (!redis) return;
  try {
    await redis.del(key);
  } catch (err) {
    console.warn("[cache] invalidate Redis error:", err);
  }
}
