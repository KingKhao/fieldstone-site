import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminApi } from "@/lib/session";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const username = await requireAdminApi(req);
  if (!username) return NextResponse.json({ error: "Not authenticated." }, { status: 401 });

  await prisma.testimonial.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
