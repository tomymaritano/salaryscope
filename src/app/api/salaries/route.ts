// app/api/salaries/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

export async function GET(req: NextRequest) {
  try {
    const querySchema = z.object({
      page: z.preprocess(
        (v) => (v === null || v === undefined ? 1 : parseInt(String(v), 10)),
        z.number().int().positive()
      ),
      pageSize: z.preprocess(
        (v) => (v === null || v === undefined ? 10 : parseInt(String(v), 10)),
        z.number().int().positive().max(100)
      ),
    });

    const parsed = querySchema.safeParse({
      page: req.nextUrl.searchParams.get('page'),
      pageSize: req.nextUrl.searchParams.get('pageSize'),
    });

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid pagination parameters' }, { status: 400 });
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

    return NextResponse.json({ salaries, total }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: 'Error fetching salary entries' },
      { status: 500 }
    );
  }
}
