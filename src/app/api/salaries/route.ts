// app/api/salaries/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const salaries = await prisma.salaryEntry.findMany({
            orderBy: { createdAt: 'desc' },
            take: 100,
        });
        return NextResponse.json(salaries, { status: 200 });
    } catch (e) {
        console.error(e); // <-- Usás la variable y el warning desaparece
        return NextResponse.json({ error: 'Error creating salary entry' }, { status: 500 });
    }
}