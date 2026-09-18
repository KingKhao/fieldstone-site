import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminApi } from "@/lib/session";

export async function GET(req: NextRequest) {
  const username = await requireAdminApi(req);
  if (!username) return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  const testimonials = await prisma.testimonial.findMany({ orderBy: { sortOrder: "asc" } });
  return NextResponse.json({ testimonials });
}

export async function POST(req: NextRequest) {
  const username = await requireAdminApi(req);
  if (!username) return NextResponse.json({ error: "Not authenticated." }, { status: 401 });

  const body = await req.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const quote = typeof body?.quote === "string" ? body.quote.trim() : "";
  const location = typeof body?.location === "string" ? body.location.trim() : null;
  const rating = typeof body?.rating === "number" ? Math.min(5, Math.max(1, body.rating)) : 5;

  if (!name || !quote) {
    return NextResponse.json({ error: "Name and quote are required." }, { status: 400 });
  }

  const testimonial = await prisma.testimonial.create({ data: { name, quote, location, rating } });
  return NextResponse.json({ testimonial });
}
