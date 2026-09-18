import { NextRequest, NextResponse } from "next/server";
import { getSessionUsername, changeAdminPassword } from "@/lib/session";

export async function POST(req: NextRequest) {
  const username = await getSessionUsername();
  if (!username) return NextResponse.json({ error: "Not authenticated." }, { status: 401 });

  const body = await req.json().catch(() => null);
  const currentPassword = typeof body?.currentPassword === "string" ? body.currentPassword : "";
  const newPassword = typeof body?.newPassword === "string" ? body.newPassword : "";

  if (newPassword.length < 10) {
    return NextResponse.json({ error: "New password must be at least 10 characters." }, { status: 400 });
  }

  const ok = await changeAdminPassword(username, currentPassword, newPassword);
  if (!ok) return NextResponse.json({ error: "Current password is incorrect." }, { status: 401 });

  return NextResponse.json({ ok: true });
}
