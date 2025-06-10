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

describe('GET /api/salaries', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('paginates results based on page and pageSize', async () => {
    (prisma.salaryEntry.count as jest.Mock).mockResolvedValue(5);
    (prisma.salaryEntry.findMany as jest.Mock).mockResolvedValue([
      { id: '3' },
      { id: '2' },
    ]);

    const req = {
      nextUrl: { searchParams: new URLSearchParams('page=2&pageSize=2') },
    } as any;

    const res = await GET(req);
    expect(prisma.salaryEntry.findMany).toHaveBeenCalledWith({
      orderBy: { createdAt: 'desc' },
      take: 2,
      skip: 2,
    });
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.total).toBe(5);
    expect(body.salaries).toHaveLength(2);
  });

  it('returns 500 for invalid parameters', async () => {
    (prisma.salaryEntry.count as jest.Mock).mockResolvedValue(0);
    (prisma.salaryEntry.findMany as jest.Mock).mockRejectedValue(new Error('bad'));

    const req = {
      nextUrl: { searchParams: new URLSearchParams('page=foo&pageSize=bar') },
    } as any;

    const res = await GET(req);
    expect(res.status).toBe(500);
    const body = await res.json();
    expect(body.error).toBeDefined();
  });
});
