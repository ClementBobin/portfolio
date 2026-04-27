import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const apiUrl = process.env.NEXT_PUBLIC_RESSOURCE_API_URL;

  if (apiUrl) {
    try {
      const body = await req.json();
      await fetch(`${apiUrl}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch {
      /* fall through */
    }
  }

  return NextResponse.json({ ok: true });
}