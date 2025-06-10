// app/api/salaries/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const page = parseInt(req.nextUrl.searchParams.get('page') || '1', 10);
    const pageSize = parseInt(req.nextUrl.searchParams.get('pageSize') || '10', 10);
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
    return NextResponse.json({ error: 'Error fetching salary entries' }, { status: 500 });
  }
}