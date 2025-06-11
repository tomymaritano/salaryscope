import { z } from 'zod';
import { isRateLimited } from '@/lib/rateLimiter';
import {
  createSalary,
  countSalaries,
  listSalaryEntries,
  listAmountsByCurrency,
} from '../repositories/salaryRepository';

export class ServiceError extends Error {
  status: number;
  details?: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

const salarySchema = z
  .object({
    country: z.string().trim(),
    role: z.string().trim(),
    stack: z.array(z.string().trim()),
    contract: z.string().trim(),
    seniority: z.string().trim(),
    amount: z.preprocess((v) => Number(v), z.number().int().positive()),
    currency: z
      .string()
      .trim()
      .transform((v) => v.toUpperCase()),
  })
  .strict();

export async function createSalaryEntry(payload: unknown, ip: string) {
  if (await isRateLimited(ip)) {
    throw new ServiceError('Too many requests', 429);
  }

  const parsed = salarySchema.safeParse(payload);
  if (!parsed.success) {
    throw new ServiceError('Invalid data', 400, parsed.error.flatten());
  }

  return createSalary(parsed.data);
}

const listQuerySchema = z.object({
  page: z.preprocess(
    (v) => (v === null || v === undefined ? 1 : parseInt(String(v), 10)),
    z.number().int().positive()
  ),
  pageSize: z.preprocess(
    (v) => (v === null || v === undefined ? 10 : parseInt(String(v), 10)),
    z.number().int().positive().max(100)
  ),
});

export type ListParams = {
  page?: string | number | null;
  pageSize?: string | number | null;
};

export async function listSalaries(params: ListParams) {
  const parsed = listQuerySchema.safeParse(params);
  if (!parsed.success) {
    throw new ServiceError('Invalid pagination parameters', 400);
  }

  const { page, pageSize } = parsed.data;
  const skip = (page - 1) * pageSize;

  const [total, salaries] = await Promise.all([
    countSalaries(),
    listSalaryEntries(skip, pageSize),
  ]);

  return { salaries, total };
}

export async function getSalaryStats(currency?: string) {
  const cur = (currency || 'USD').toUpperCase();

  const salaries = await listAmountsByCurrency(cur);

  if (!salaries.length) {
    return { total: 0, avg: 0, currency: cur };
  }

  const total = salaries.length;
  const avg = Math.round(salaries.reduce((a, b) => a + b.amount, 0) / total);

  return { total, avg, currency: cur };
}
