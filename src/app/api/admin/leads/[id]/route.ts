import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminApi } from "@/lib/session";

const STATUSES = ["NEW", "CONTACTED", "QUOTED", "WON", "LOST"];

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const username = await requireAdminApi(req);
  if (!username) return NextResponse.json({ error: "Not authenticated." }, { status: 401 });

  const lead = await prisma.lead.findUnique({
    where: { id: (await params).id },
    include: { notes: { orderBy: { createdAt: "desc" } } },
  });
  if (!lead) return NextResponse.json({ error: "Not found." }, { status: 404 });
  return NextResponse.json({ lead });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const username = await requireAdminApi(req);
  if (!username) return NextResponse.json({ error: "Not authenticated." }, { status: 401 });

  const body = await req.json().catch(() => null);

  if (typeof body?.status === "string") {
    if (!STATUSES.includes(body.status)) {
      return NextResponse.json({ error: "Invalid status." }, { status: 400 });
    }
    await prisma.lead.update({ where: { id: (await params).id }, data: { status: body.status } });
  }

  if (typeof body?.note === "string" && body.note.trim()) {
    await prisma.leadNote.create({ data: { leadId: (await params).id, body: body.note.trim().slice(0, 4000) } });
  }

  const lead = await prisma.lead.findUnique({
    where: { id: (await params).id },
    include: { notes: { orderBy: { createdAt: "desc" } } },
  });
  return NextResponse.json({ lead });
}
