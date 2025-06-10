import { GET } from './route';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

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

    // Use a minimal mock of NextRequest
    const req = {
      nextUrl: {
        searchParams: new URLSearchParams('page=2&pageSize=2'),
        // Add any other properties your GET handler might use if needed
      },
    } as unknown as import('next/server').NextRequest;

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
    const req = new NextRequest('http://localhost/api/salaries?page=foo&pageSize=bar');

    const res = await GET(req);
    expect(res.status).toBe(500);
    const body = await res.json();
    expect(body.error).toBeDefined();
  });
});
