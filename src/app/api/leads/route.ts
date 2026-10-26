import { NextResponse } from "next/server";
export async function POST() {
  // Never parse, store, log, or forward the payload on this fictional public demo.
  return NextResponse.json({ ok: true, demo: true, stored: false, message: "Demo complete. Nothing was saved or sent; no estimate or callback was requested." }, { headers: { "Cache-Control": "no-store" } });
}
