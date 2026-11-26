import "server-only";

/**
 * A small fixed-window rate limit kept in memory. On Vercel each function instance has its own
 * memory, so this is best-effort: it stops one client from hammering a warm instance, not a
 * distributed attack. That is enough for a low-traffic join form backed by the honeypot.
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const MAX_KEYS = 5_000;

const hits = new Map<string, number[]>();

/** Records one attempt for `key` and returns false once it is over the limit. */
export function allowAttempt(key: string, now = Date.now()): boolean {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  // Keep memory bounded: drop the oldest keys.
  if (hits.size > MAX_KEYS) {
    for (const k of hits.keys()) {
      hits.delete(k);
      if (hits.size <= MAX_KEYS) break;
    }
  }
  return true;
}
