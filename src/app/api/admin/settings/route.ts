import { NextRequest, NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/session";
import { getSettings, setSetting, SETTINGS_DEFAULTS } from "@/lib/settings";

export async function PATCH(req: NextRequest) {
  const username = await requireAdminApi(req);
  if (!username) return NextResponse.json({ error: "Not authenticated." }, { status: 401 });

  const body = await req.json().catch(() => null);
  const current = await getSettings();

  const home = { ...current.home };
  for (const key of Object.keys(SETTINGS_DEFAULTS.home) as (keyof typeof SETTINGS_DEFAULTS.home)[]) {
    if (typeof body?.home?.[key] === "string") home[key] = body.home[key];
  }

  await setSetting("home", home);
  return NextResponse.json({ home });
}
