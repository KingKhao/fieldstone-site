import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminApi } from "@/lib/session";

export async function GET(req: NextRequest) {
  const username = await requireAdminApi(req);
  if (!username) return NextResponse.json({ error: "Not authenticated." }, { status: 401 });

  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    include: { notes: false },
  });
  return NextResponse.json({ leads });
}
