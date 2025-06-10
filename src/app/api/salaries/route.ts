// app/api/salaries/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

export async function GET(req: NextRequest) {
  try {
    const pageParam = req.nextUrl.searchParams.get('page');
    const pageSizeParam = req.nextUrl.searchParams.get('pageSize');

    const querySchema = z.object({
      page: z
        .preprocess(
          (v) => (v === undefined ? undefined : Number(v)),
          z.number().int().positive().default(1)
        ),
      pageSize: z
        .preprocess(
          (v) => (v === undefined ? undefined : Number(v)),
          z.number().int().positive().default(10)
        ),
    });

    const parsed = querySchema.safeParse({
      page: pageParam ?? undefined,
      pageSize: pageSizeParam ?? undefined,
    });

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid pagination parameters' },
        { status: 400 }
      );
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
