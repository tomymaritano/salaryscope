// app/api/salary/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { isRateLimited } from '@/lib/rateLimiter';

const salarySchema = z
  .object({
    country: z.string().trim(),
    role: z.string().trim(),
    stack: z.array(z.string().trim()),
    contract: z.string().trim(),
    seniority: z.string().trim(),
    amount: z.preprocess((v) => Number(v), z.number().int().positive()),
    currency: z
      .string()
      .trim()
      .transform((v) => v.toUpperCase()),
  })
  .strict();

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0] ||
    req.headers.get('x-real-ip') ||
    'unknown';

  if (await isRateLimited(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  try {
    const body = await req.json();
    const parsed = salarySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid data', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const newEntry = await prisma.salaryEntry.create({
      data: {
        country: data.country,
        role: data.role,
        stack: data.stack,
        contract: data.contract,
        seniority: data.seniority,
        amount: data.amount,
        currency: data.currency,
      },
    });

    return NextResponse.json(newEntry, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

