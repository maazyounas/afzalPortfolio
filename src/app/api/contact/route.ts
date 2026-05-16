import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // In real app you'd validate and forward this to email/CRM
    // For now just log to server console (visible in server logs)
    console.log("/api/contact received", body);
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
