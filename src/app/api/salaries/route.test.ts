import { GET } from './route';
import { prisma } from '@/lib/prisma';

jest.mock('@/lib/prisma', () => ({
  prisma: {
    salaryEntry: {
      count: jest.fn(),
      findMany: jest.fn(),
    },
  },
}));

const mockedPrisma = prisma as unknown as {
  salaryEntry: {
    count: jest.Mock;
    findMany: jest.Mock;
  };
};

describe('GET /api/salaries', () => {
  beforeEach(() => {
    mockedPrisma.salaryEntry.count.mockResolvedValue(0);
    mockedPrisma.salaryEntry.findMany.mockResolvedValue([]);
  });

  it('returns paginated salaries', async () => {
    const req = {
      nextUrl: { searchParams: new URLSearchParams({ page: '2', pageSize: '5' }) },
    } as any;

    const res = await GET(req);
    expect(mockedPrisma.salaryEntry.findMany).toHaveBeenCalledWith({
      orderBy: { createdAt: 'desc' },
      take: 5,
      skip: 5,
    });
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual({ salaries: [], total: 0 });
  });

  it('handles invalid pagination parameters', async () => {
    const req = {
      nextUrl: { searchParams: new URLSearchParams({ page: 'abc', pageSize: '-1' }) },
    } as any;

    const res = await GET(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(Array.isArray(body.salaries)).toBe(true);
    expect(typeof body.total).toBe('number');
  });
});
