// app/api/salary/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // tu cliente Prisma

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Validación básica
    if (
      !data.country ||
      !data.role ||
      !data.amount ||
      !data.currency ||
      !data.stack ||
      !data.contract ||
      !data.seniority
    ) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Crear la entrada de salario
    const newEntry = await prisma.salaryEntry.create({
      data: {
        country: data.country,
        role: data.role,
        stack: data.stack, // array de strings
        contract: data.contract,
        seniority: data.seniority,
        amount: Number(data.amount),
        currency: data.currency,
        // source: lo puedes dejar por default ("user") o custom
      }
    });

    return NextResponse.json(newEntry, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}