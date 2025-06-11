// app/api/salaries/route.ts
import { NextRequest, NextResponse } from 'next/server';
import {
  listSalaries,
  ServiceError,
} from '@/features/salaries/services/salaryService';

export async function GET(req: NextRequest) {
  try {
    const data = await listSalaries({
      page: req.nextUrl.searchParams.get('page'),
      pageSize: req.nextUrl.searchParams.get('pageSize'),
    });

    return NextResponse.json(data, { status: 200 });
  } catch (e) {
    if (e instanceof ServiceError) {
      return NextResponse.json({ error: e.message }, { status: e.status });
    }

    console.error(e);
    return NextResponse.json(
      { error: 'Error fetching salary entries' },
      { status: 500 }
    );
  }
}
