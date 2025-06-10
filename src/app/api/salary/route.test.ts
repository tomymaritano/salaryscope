import { POST } from './route';

jest.mock('@/lib/prisma', () => ({
  prisma: {
    salaryEntry: {
      create: jest.fn(async ({ data }) => ({ id: '1', ...data })),
    },
  },
}));

describe('POST /api/salary', () => {
  it('returns 400 when required fields are missing', async () => {
    const req = { json: async () => ({}) } as any;
    const res = await POST(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBeDefined();
  });

  it('creates salary entry when data is valid', async () => {
    const data = {
      country: 'AR',
      role: 'Dev',
      stack: ['TS'],
      contract: 'FT',
      seniority: 'Junior',
      amount: 100,
      currency: 'USD',
    };
    const req = { json: async () => data } as any;
    const res = await POST(req);
    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body.country).toBe('AR');
  });
});
