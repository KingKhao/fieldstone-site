import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import crypto from "node:crypto";

// One-time-only setup endpoint: creates the first Admin user if (and only
// if) the Admin table is empty, and returns the generated password exactly
// once. Permanently 409s after the first successful call. This exists so
// the initial admin password never has to travel through a Vercel "Sensitive"
// env var (see lib/session.ts) or a plaintext seed script/commit.
export async function POST() {
  const existing = await prisma.admin.findFirst();
  if (existing) {
    return NextResponse.json({ error: "Admin already provisioned." }, { status: 409 });
  }

  const username = "marcus";
  const password = crypto.randomBytes(9).toString("base64url"); // 12 chars
  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.admin.create({ data: { username, passwordHash } });

  return NextResponse.json({ ok: true, username, password });
}
