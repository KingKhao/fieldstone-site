import { cookies } from "next/headers";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";
import {
  createSessionToken,
  verifySessionToken,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
} from "./session-token";

export { createSessionToken, verifySessionToken, SESSION_COOKIE_NAME, SESSION_MAX_AGE_SECONDS };

export async function getSessionUsername(): Promise<string | null> {
  const token = cookies().get(SESSION_COOKIE_NAME)?.value;
  return verifySessionToken(token);
}

// --- Password storage ---------------------------------------------------
//
// Learned this the hard way on a sibling project: a password living only in
// a Vercel env var can become permanently unreadable (a "Sensitive" env var
// is write-only from the CLI) with no way back in for anyone. The admin
// password here lives in Postgres (bcrypt hash, Admin.passwordHash) from
// day one instead, with a normal username+password login and a
// self-service change-password flow once logged in.

export async function verifyAdminPassword(username: string, password: string): Promise<boolean> {
  const admin = await prisma.admin.findUnique({ where: { username } });
  if (!admin) return false;
  return bcrypt.compare(password, admin.passwordHash);
}

export async function changeAdminPassword(username: string, currentPassword: string, newPassword: string) {
  const ok = await verifyAdminPassword(username, currentPassword);
  if (!ok) return false;
  const passwordHash = await bcrypt.hash(newPassword, 10);
  await prisma.admin.update({ where: { username }, data: { passwordHash } });
  return true;
}

// For API route handlers: returns the logged-in admin's username, or null.
export async function requireAdminApi(req: { headers: Headers }): Promise<string | null> {
  const cookieHeader = req.headers.get("cookie") || "";
  const match = cookieHeader.match(new RegExp(`${SESSION_COOKIE_NAME}=([^;]+)`));
  const token = match ? decodeURIComponent(match[1]) : null;
  return verifySessionToken(token);
}
