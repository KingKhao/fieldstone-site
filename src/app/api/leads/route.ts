import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkRateLimit } from "@/lib/ratelimit";

const PROJECT_TYPES = ["KITCHEN", "BATHROOM", "ADDITION", "WHOLE_HOME", "OTHER"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  const { allowed } = await checkRateLimit(req.headers, "leads", { max: 5, windowSeconds: 600 });
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot — real visitors never see or fill this field.
  if (typeof body.companyWebsite === "string" && body.companyWebsite.trim() !== "") {
    return NextResponse.json({ ok: true }); // pretend success, drop silently
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const projectType = PROJECT_TYPES.includes(body.projectType as string) ? (body.projectType as string) : "OTHER";
  const budgetRange = typeof body.budgetRange === "string" ? body.budgetRange.slice(0, 100) : null;
  const timeline = typeof body.timeline === "string" ? body.timeline.slice(0, 100) : null;
  const zip = typeof body.zip === "string" ? body.zip.slice(0, 20) : null;
  const message = typeof body.message === "string" ? body.message.slice(0, 2000) : null;
  const source = typeof body.source === "string" ? body.source.slice(0, 100) : "unknown";
  const smsConsent = body.smsConsent === true;
  const smsConsentVersion = typeof body.smsConsentVersion === "string" ? body.smsConsentVersion : null;

  if (name.length < 2 || name.length > 200) {
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (phone.replace(/\D/g, "").length < 7) {
    return NextResponse.json({ error: "Please enter a valid phone number." }, { status: 400 });
  }

  const lead = await prisma.lead.create({
    data: {
      name,
      email,
      phone,
      projectType: projectType as "KITCHEN" | "BATHROOM" | "ADDITION" | "WHOLE_HOME" | "OTHER",
      budgetRange,
      timeline,
      zip,
      message,
      source,
      smsConsent,
      smsConsentVersion: smsConsent ? smsConsentVersion : null,
      smsConsentAt: smsConsent ? new Date() : null,
    },
  });

  return NextResponse.json({ ok: true, id: lead.id });
}
