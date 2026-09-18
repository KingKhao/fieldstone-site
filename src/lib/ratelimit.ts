import { prisma } from "./prisma";

async function hashKey(raw: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(process.env.SESSION_SECRET || "unset"),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(raw));
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function getClientIp(headers: Headers): string {
  const fwd = headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return headers.get("x-real-ip") ?? "unknown";
}

// Fixed-window rate limit backed by Postgres, keyed by a salted hash of IP
// (never the raw address) — holds up across serverless cold starts, unlike
// an in-memory counter.
export async function checkRateLimit(
  headers: Headers,
  bucket: string,
  { max, windowSeconds }: { max: number; windowSeconds: number }
): Promise<{ allowed: boolean }> {
  const keyHash = await hashKey(getClientIp(headers));
  const since = new Date(Date.now() - windowSeconds * 1000);

  const count = await prisma.rateLimitHit.count({
    where: { bucket, keyHash, createdAt: { gte: since } },
  });
  if (count >= max) return { allowed: false };

  await prisma.rateLimitHit.create({ data: { bucket, keyHash } });

  if (Math.random() < 0.02) {
    await prisma.rateLimitHit.deleteMany({ where: { createdAt: { lt: new Date(Date.now() - 86400000) } } });
  }

  return { allowed: true };
}
