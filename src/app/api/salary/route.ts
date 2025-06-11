// app/api/salary/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createSalaryEntry, ServiceError } from '@/lib/salaryService';

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0] ||
    req.headers.get('x-real-ip') ||
    'unknown';

  try {
    const body = await req.json();
    const entry = await createSalaryEntry(body, ip);
    return NextResponse.json(entry, { status: 201 });
  } catch (error) {
    if (error instanceof ServiceError) {
      const status = error.status;
      const resBody = error.details
        ? { error: error.message, details: error.details }
        : { error: error.message };
      return NextResponse.json(resBody, { status });
    }

    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
