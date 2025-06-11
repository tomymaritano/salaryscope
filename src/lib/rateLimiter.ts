const URL = process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

// Window duration and request limit for the rate limiter.
// Values are read from environment variables and fall back to sensible defaults.
const WINDOW = Number(process.env.RATE_LIMIT_WINDOW ?? '60'); // seconds
const LIMIT = Number(process.env.RATE_LIMIT_LIMIT ?? '5');

async function incr(key: string): Promise<number> {
  if (!URL || !TOKEN) {
    return 0;
  }

  const res = await fetch(`${URL}/incr/${key}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
    cache: 'no-store',
  });

  if (!res.ok) {
    console.error('Rate limit error', await res.text());
    return 0;
  }

  const data = (await res.json()) as { result: number };
  return data.result;
}

async function expire(key: string) {
  if (!URL || !TOKEN) return;
  await fetch(`${URL}/expire/${key}/${WINDOW}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
    cache: 'no-store',
  });
}

export async function isRateLimited(key: string): Promise<boolean> {
  try {
    const count = await incr(key);
    if (count === 1) {
      await expire(key);
    }
    return count > LIMIT;
  } catch (err) {
    console.error('Rate limit check failed', err);
    return false;
  }
}
