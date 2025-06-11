import { z } from 'zod';
import { prisma } from './prisma';
import { isRateLimited } from './rateLimiter';

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

  return prisma.salaryEntry.create({
    data: parsed.data,
  });
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
    prisma.salaryEntry.count(),
    prisma.salaryEntry.findMany({
      orderBy: { createdAt: 'desc' },
      take: pageSize,
      skip,
    }),
  ]);

  return { salaries, total };
}

export async function getSalaryStats(currency?: string) {
  const cur = (currency || 'USD').toUpperCase();

  const salaries: { amount: number }[] = await prisma.salaryEntry.findMany({
    where: { currency: cur },
    select: { amount: true },
  });

  if (!salaries.length) {
    return { total: 0, avg: 0, currency: cur };
  }

  const total = salaries.length;
  const avg = Math.round(salaries.reduce((a, b) => a + b.amount, 0) / total);

  return { total, avg, currency: cur };
}
