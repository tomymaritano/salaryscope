import { prisma } from '@/lib/prisma';

export async function createSalary(data: {
  country: string;
  role: string;
  stack: string[];
  contract: string;
  seniority: string;
  amount: number;
  currency: string;
}) {
  return prisma.salaryEntry.create({ data });
}

export async function countSalaries() {
  return prisma.salaryEntry.count();
}

export async function listSalaryEntries(skip: number, take: number) {
  return prisma.salaryEntry.findMany({
    orderBy: { createdAt: 'desc' },
    take,
    skip,
  });
}

export async function listAmountsByCurrency(currency: string) {
  return prisma.salaryEntry.findMany({
    where: { currency },
    select: { amount: true },
  });
}
