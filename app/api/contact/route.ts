import { z } from "zod";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const ContactSchema = z.object({
  name: z.string().trim().min(1),
  email: z.string().trim().email(),
  message: z.string().trim().min(1),
});

const UPSTREAM_TIMEOUT_MS = 8_000;

export async function POST(req: NextRequest) {
  const apiUrl = process.env.RESSOURCE_API_URL;

  if (!apiUrl) {
    return NextResponse.json(
      { ok: false, error: "Contact service unavailable" },
      { status: 500 },
    );
  }

  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request" },
      { status: 400 },
    );
  }

  const parsed = ContactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Invalid request" },
      { status: 400 },
    );
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);

  try {
    const upstream = await fetch(`${apiUrl}/contact/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parsed.data),
      signal: controller.signal,
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
  } finally {
    clearTimeout(timeout);
  }
}