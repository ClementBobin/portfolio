import type { NextRequest } from "next/server";

/**
 * POST /api/contact
 * Receives { name, email, message } and sends an email.
 * Wire up to your preferred email provider (Resend, Nodemailer, SendGrid…).
 */
export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();
    if (!name || !email || !message) {
      return Response.json({ error: "Missing fields" }, { status: 400 });
    }

    // ── Plug your email provider here ──────────────────────────────────────
    // Example with Resend:
    //
    // import { Resend } from "resend";
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: "portfolio@yourdomain.com",
    //   to: process.env.CONTACT_EMAIL!,
    //   subject: `[Portfolio] Message de ${name}`,
    //   text: `De: ${name} <${email}>\n\n${message}`,
    // });
    // ───────────────────────────────────────────────────────────────────────

    console.log("[contact]", { name, email, message });
    return Response.json({ ok: true });
  } catch (err) {
    console.error("[contact] error", err);
    return Response.json({ error: "Internal error" }, { status: 500 });
  }
}