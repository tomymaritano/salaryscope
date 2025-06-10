export type RateLimitInfo = {
  count: number;
  lastRequest: number;
};

const globalForRateLimiter = globalThis as unknown as {
  rateLimiter?: Map<string, RateLimitInfo>;
};

const store =
  globalForRateLimiter.rateLimiter ?? new Map<string, RateLimitInfo>();

if (process.env.NODE_ENV !== "production") {
  globalForRateLimiter.rateLimiter = store;
}

const WINDOW = 60_000; // 1 minute
const LIMIT = 5;

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const info = store.get(key);

  if (!info) {
    store.set(key, { count: 1, lastRequest: now });
    return false;
  }

  if (now - info.lastRequest > WINDOW) {
    store.set(key, { count: 1, lastRequest: now });
    return false;
  }

  info.count += 1;
  info.lastRequest = now;
  store.set(key, info);

  return info.count > LIMIT;
}
