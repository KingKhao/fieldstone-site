import { NextResponse } from "next/server";
export async function POST() { return NextResponse.json({ error: "Public admin setup is disabled. Use the owner-controlled local provisioning script." }, { status: 410 }); }
