// app/api/salaries/stats/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSalaryStats } from '@/lib/salaryService';

export async function GET(req: NextRequest) {
  try {
    const currency = req.nextUrl.searchParams.get('currency') || 'USD';
    const data = await getSalaryStats(currency);
    return NextResponse.json(data, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
