// app/api/salaries/stats/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const currency = req.nextUrl.searchParams.get("currency") || "USD";

  const salaries: { amount: number }[] = await prisma.salaryEntry.findMany({
  where: { currency: currency.toUpperCase() },
  select: { amount: true },
});

  if (!salaries.length) {
    return NextResponse.json({ total: 0, avg: 0, currency }, { status: 200 });
  }

  const total = salaries.length;
  const avg = Math.round(salaries.reduce((a, b) => a + b.amount, 0) / total);

  return NextResponse.json({ total, avg, currency }, { status: 200 });
}