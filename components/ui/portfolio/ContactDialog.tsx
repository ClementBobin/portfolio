"use client";

import { useState } from "react";
import { X, Mail, Linkedin, Copy, Check, ExternalLink } from "lucide-react";
import type { ContactItem } from "@/lib/types/portfolio-api";
import { cn } from "@/lib/utils";

interface ContactDialogProps {
  open: boolean;
  onClose: () => void;
  contact: ContactItem[];
}

type SendState = "idle" | "sending" | "sent" | "error";

export function ContactDialog({ open, onClose, contact }: ContactDialogProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sendState, setSendState] = useState<SendState>("idle");
  const [copied, setCopied] = useState(false);

  const emailContact = contact.find((c) => c.type === "email");
  const linkedin = contact.find((c) => c.type === "linkedin");

  const emailAddress = emailContact?.label ?? emailContact?.href?.replace("mailto:", "") ?? null;

  async function handleCopy() {
    if (!emailAddress) return;
    await navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSendState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      setSendState(res.ok ? "sent" : "error");
    } catch {
      setSendState("error");
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />

      {/* Dialog panel */}
      <div
        className="relative z-10 w-full max-w-sm rounded-2xl shadow-2xl animate-in zoom-in-95 fade-in duration-200 flex flex-col"
        style={{ background: "var(--background)", border: "1px solid var(--border)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4">
          <h2 className="text-base font-semibold" style={{ color: "var(--foreground)" }}>
            Me contacter
          </h2>
          <button
            onClick={onClose}
            className="h-7 w-7 rounded-md flex items-center justify-center transition-colors hover:bg-accent"
            style={{ color: "var(--muted-foreground)" }}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto px-5 pb-5 space-y-3">

          {/* Email card */}
          {emailAddress && (
            <div
              className="rounded-xl p-4 space-y-3"
              style={{ background: "var(--card)", border: "1px solid var(--border)" }}
            >
              {/* Card header */}
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-md flex items-center justify-center"
                  style={{ background: "color-mix(in srgb, var(--primary) 12%, transparent)" }}
                >
                  <Mail className="h-4 w-4" style={{ color: "var(--primary)" }} />
                </div>
                <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                  Email
                </span>
              </div>

              {/* Email row */}
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm truncate" style={{ color: "var(--muted-foreground)" }}>
                  {emailAddress}
                </span>
                <button
                  onClick={handleCopy}
                  className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                  style={{
                    background: "var(--background)",
                    border: "1px solid var(--border)",
                    color: copied ? "var(--primary)" : "var(--foreground)",
                  }}
                >
                  {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  {copied ? "Copié" : "Copier"}
                </button>
              </div>
            </div>
          )}

          {/* LinkedIn card */}
          {linkedin?.href && (
            <div
              className="rounded-xl p-4 space-y-3"
              style={{ background: "var(--card)", border: "1px solid var(--border)" }}
            >
              {/* Card header */}
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ background: "#0A66C2" }}>
                  <Linkedin className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                  LinkedIn
                </span>
              </div>

              {/* Profile link button */}
              <a
                href={linkedin.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors hover:opacity-80"
                style={{
                  background: "var(--background)",
                  border: "1px solid var(--border)",
                  color: "#0A66C2",
                  textDecoration: "none",
                }}
              >
                Voir mon profil
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          )}

          {/* Divider */}
          <div className="flex items-center gap-3 py-1">
            <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
            <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
              ou envoyez-moi un message
            </span>
            <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
          </div>

          {/* Form */}
          {sendState === "sent" ? (
            <div className="flex flex-col items-center gap-2 py-8 text-center">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-1"
                style={{ background: "color-mix(in srgb, #22c55e 15%, transparent)" }}
              >
                <Check className="h-6 w-6 text-green-500" />
              </div>
              <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                Message envoyé !
              </p>
              <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                Je vous répondrai dès que possible.
              </p>
              <button
                onClick={() => { setSendState("idle"); setName(""); setEmail(""); setMessage(""); }}
                className="text-xs mt-2 underline underline-offset-2 text-primary"
              >
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Nom */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium" style={{ color: "var(--foreground)" }}>
                  Nom
                </label>
                <input
                  type="text"
                  placeholder="Votre nom"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-3 py-2.5 rounded-lg text-sm outline-none transition"
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    color: "var(--foreground)",
                    caretColor: "var(--primary)",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--primary)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium" style={{ color: "var(--foreground)" }}>
                  Email
                </label>
                <input
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2.5 rounded-lg text-sm outline-none transition"
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    color: "var(--foreground)",
                    caretColor: "var(--primary)",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--primary)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                />
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium" style={{ color: "var(--foreground)" }}>
                  Message
                </label>
                <textarea
                  placeholder="Votre message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={4}
                  className="w-full px-3 py-2.5 rounded-lg text-sm outline-none transition resize-none"
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    color: "var(--foreground)",
                    caretColor: "var(--primary)",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--primary)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                />
              </div>

              {sendState === "error" && (
                <p className="text-xs text-red-500">Une erreur est survenue. Réessayez.</p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={sendState === "sending"}
                className={cn(
                  "w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all",
                  sendState === "sending" ? "opacity-60 cursor-not-allowed" : "hover:opacity-90 active:scale-[0.98]"
                )}
                style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
              >
                {sendState === "sending" ? (
                  <>
                    <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Envoi…
                  </>
                ) : (
                  "Envoyer"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}