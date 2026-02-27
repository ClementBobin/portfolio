/**
 * Simple in-memory cache with TTL support.
 * Works in both server (module-level singleton per process) and client
 * (module-level singleton per page load) contexts.
 */

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

const cache = new Map<string, CacheEntry<unknown>>();

/** Default TTL: 5 minutes. */
const DEFAULT_TTL_MS = 5 * 60 * 1000;

/**
 * Returns the cached value for `key`, or `undefined` if missing / expired.
 */
export function getCached<T>(key: string): T | undefined {
  const entry = cache.get(key);
  if (!entry) return undefined;
  if (Date.now() > entry.expiresAt) {
    cache.delete(key);
    return undefined;
  }
  return entry.data as T;
}

/**
 * Stores `data` under `key` with the given TTL (default 5 min).
 */
export function setCached<T>(
  key: string,
  data: T,
  ttlMs = DEFAULT_TTL_MS,
): void {
  cache.set(key, { data, expiresAt: Date.now() + ttlMs });
}

/**
 * Returns the cached result for `url`, fetching and caching it on a miss.
 * The `fetcher` is only called when the cache is empty or expired.
 */
export async function fetchWithCache<T>(
  url: string,
  fetcher: () => Promise<T>,
  ttlMs = DEFAULT_TTL_MS,
): Promise<T> {
  const cached = getCached<T>(url);
  if (cached !== undefined) return cached;
  const data = await fetcher();
  setCached(url, data, ttlMs);
  return data;
}
