import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminApi } from "@/lib/session";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const username = await requireAdminApi(req);
  if (!username) return NextResponse.json({ error: "Not authenticated." }, { status: 401 });

  const body = await req.json().catch(() => null);
  const data: Record<string, unknown> = {};
  for (const key of ["title", "beforeImage", "afterImage", "description", "category", "location"] as const) {
    if (typeof body?.[key] === "string") data[key] = body[key];
  }
  if (typeof body?.featured === "boolean") data.featured = body.featured;
  if (typeof body?.sortOrder === "number") data.sortOrder = body.sortOrder;

  const project = await prisma.project.update({ where: { id: (await params).id }, data });
  return NextResponse.json({ project });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const username = await requireAdminApi(req);
  if (!username) return NextResponse.json({ error: "Not authenticated." }, { status: 401 });

  await prisma.project.delete({ where: { id: (await params).id } });
  return NextResponse.json({ ok: true });
}
