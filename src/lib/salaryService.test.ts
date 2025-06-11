import {
  createSalaryEntry,
  listSalaries,
  getSalaryStats,
} from './salaryService';
import { prisma } from '@/lib/prisma';
import { isRateLimited } from '@/lib/rateLimiter';

jest.mock('@/lib/prisma', () => ({
  prisma: {
    salaryEntry: {
      create: jest.fn(),
      count: jest.fn(),
      findMany: jest.fn(),
    },
  },
}));

jest.mock('@/lib/rateLimiter', () => ({
  isRateLimited: jest.fn(),
}));

describe('salaryService', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('createSalaryEntry', () => {
    it('throws 400 when data is invalid', async () => {
      await expect(createSalaryEntry({}, 'ip')).rejects.toMatchObject({
        status: 400,
      });
    });

    it('throws 429 when rate limited', async () => {
      (isRateLimited as jest.Mock).mockResolvedValue(true);
      await expect(createSalaryEntry({}, 'ip')).rejects.toMatchObject({
        status: 429,
      });
    });

    it('creates entry when valid', async () => {
      (isRateLimited as jest.Mock).mockResolvedValue(false);
      (prisma.salaryEntry.create as jest.Mock).mockResolvedValue({
        id: '1',
        country: 'AR',
      });

      const data = {
        country: 'AR',
        role: 'Dev',
        stack: ['TS'],
        contract: 'FT',
        seniority: 'Junior',
        amount: 100,
        currency: 'usd',
      };

      const res = await createSalaryEntry(data, 'ip');
      expect(prisma.salaryEntry.create).toHaveBeenCalled();
      expect(res.id).toBe('1');
    });
  });

  describe('listSalaries', () => {
    it('returns paginated results', async () => {
      (prisma.salaryEntry.count as jest.Mock).mockResolvedValue(5);
      (prisma.salaryEntry.findMany as jest.Mock).mockResolvedValue([
        { id: '3' },
        { id: '2' },
      ]);

      const res = await listSalaries({ page: '2', pageSize: '2' });
      expect(prisma.salaryEntry.findMany).toHaveBeenCalledWith({
        orderBy: { createdAt: 'desc' },
        take: 2,
        skip: 2,
      });
      expect(res.total).toBe(5);
      expect(res.salaries).toHaveLength(2);
    });

    it('throws 400 for invalid parameters', async () => {
      await expect(
        listSalaries({ page: 'foo', pageSize: 'bar' })
      ).rejects.toMatchObject({ status: 400 });
    });
  });

  describe('getSalaryStats', () => {
    it('returns zeros when no salaries', async () => {
      (prisma.salaryEntry.findMany as jest.Mock).mockResolvedValue([]);
      const res = await getSalaryStats('EUR');
      expect(res).toEqual({ total: 0, avg: 0, currency: 'EUR' });
    });

    it('calculates stats', async () => {
      (prisma.salaryEntry.findMany as jest.Mock).mockResolvedValue([
        { amount: 50 },
        { amount: 100 },
      ]);
      const res = await getSalaryStats('usd');
      expect(prisma.salaryEntry.findMany).toHaveBeenCalledWith({
        where: { currency: 'USD' },
        select: { amount: true },
      });
      expect(res.total).toBe(2);
      expect(res.avg).toBe(75);
      expect(res.currency).toBe('USD');
    });
  });
});
