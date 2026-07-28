import { z } from "zod";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const ContactSchema = z.object({
  name: z.string().trim().min(1),
  email: z.string().trim().email(),
  subject: z.string().trim().min(1),
  message: z.string().trim().min(1),
});

export async function POST(req: NextRequest) {
  const apiUrl = process.env.RESSOURCE_API_URL;

  if (!apiUrl) {
    return NextResponse.json(
      { ok: false, error: "Contact service unavailable" },
      { status: 500 },
    );
  }

  const parsed = ContactSchema.safeParse(await req.json());

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Invalid request" },
      { status: 400 },
    );
  }

  try {
    const upstream = await fetch(`${apiUrl}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parsed.data),
    });

    if (!upstream.ok) {
      return NextResponse.json(
        { ok: false, error: "Failed to forward contact request" },
        { status: upstream.status },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Failed to forward contact request" },
      { status: 502 },
    );
  }
}