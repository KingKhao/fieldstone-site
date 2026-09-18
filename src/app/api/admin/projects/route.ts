import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminApi } from "@/lib/session";

export async function GET(req: NextRequest) {
  const username = await requireAdminApi(req);
  if (!username) return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  const projects = await prisma.project.findMany({ orderBy: { sortOrder: "asc" } });
  return NextResponse.json({ projects });
}

export async function POST(req: NextRequest) {
  const username = await requireAdminApi(req);
  if (!username) return NextResponse.json({ error: "Not authenticated." }, { status: 401 });

  const body = await req.json().catch(() => null);
  const title = typeof body?.title === "string" ? body.title.trim() : "";
  const beforeImage = typeof body?.beforeImage === "string" ? body.beforeImage.trim() : "";
  const afterImage = typeof body?.afterImage === "string" ? body.afterImage.trim() : "";
  const description = typeof body?.description === "string" ? body.description.trim() : "";
  const category = typeof body?.category === "string" ? body.category : "KITCHEN";
  const location = typeof body?.location === "string" ? body.location.trim() : null;
  const featured = body?.featured === true;

  if (!title || !beforeImage || !afterImage) {
    return NextResponse.json({ error: "Title, before image, and after image are required." }, { status: 400 });
  }

  const project = await prisma.project.create({
    data: { title, beforeImage, afterImage, description, category, location, featured },
  });
  return NextResponse.json({ project });
}
