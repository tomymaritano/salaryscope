export type RateLimitInfo = {
  count: number;
  lastRequest: number;
};

import type { Redis } from 'ioredis';

let redis: Redis | null = null;
if (process.env.REDIS_URL) {
  try {
    const Redis = require('ioredis');
    redis = new Redis(process.env.REDIS_URL);
  } catch {
    console.warn('ioredis not installed, falling back to in-memory store');
  }
}

const globalForRateLimiter = globalThis as unknown as {
  rateLimiter?: Map<string, RateLimitInfo>;
};

const store =
  globalForRateLimiter.rateLimiter ?? new Map<string, RateLimitInfo>();

if (process.env.NODE_ENV !== 'production') {
  globalForRateLimiter.rateLimiter = store;
}

const WINDOW = parseInt(process.env.RATE_LIMIT_WINDOW || '60000', 10);
const LIMIT = parseInt(process.env.RATE_LIMIT_LIMIT || '5', 10);

export async function isRateLimited(key: string): Promise<boolean> {
  if (redis) {
    const redisKey = `ratelimit:${key}`;
    const count = await redis.incr(redisKey);
    if (count === 1) {
      await redis.pexpire(redisKey, WINDOW);
    }
    return count > LIMIT;
  }

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
