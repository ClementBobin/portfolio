"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "@/lib/hooks/useTranslation";
import type { ContactItem } from "@/lib/types/portfolio-api";

interface ContactProps {
  contact: ContactItem[];
  locale: string;
}

/**
 * Contact section — form + contact links for reaching out.
 * Submits to /api/contact (may be unavailable).
 *
 * @param contact - Contact items
 * @param locale - Current locale
 */
export default function Contact({ contact, locale }: ContactProps) {
  const t = useTranslations(locale, ["common"]);
  const heading = locale === "fr" ? "Contact" : "Contact";
  const subtitle = locale === "fr"
    ? "Discutons de votre projet"
    : "Let's discuss your project";

  const [status, setStatus] = React.useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = React.useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setStatus("sending");
      const form = e.currentTarget;
      const data = {
        name: (form.elements.namedItem("name") as HTMLInputElement).value,
        email: (form.elements.namedItem("email") as HTMLInputElement).value,
        message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
      };

      try {
        await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        setStatus("sent");
        form.reset();
      } catch {
        setStatus("error");
      }
    },
    []
  );

  const labels = {
    name: locale === "fr" ? "Nom" : "Name",
    email: locale === "fr" ? "Email" : "Email",
    message: locale === "fr" ? "Message" : "Message",
    send: locale === "fr" ? "Envoyer" : "Send",
    sending: locale === "fr" ? "Envoi…" : "Sending…",
    sent: locale === "fr" ? "Message envoyé ! 🎉" : "Message sent! 🎉",
    error: locale === "fr" ? "Erreur. Veuillez réessayer." : "Error. Please try again.",
    namePlaceholder: locale === "fr" ? "Votre nom" : "Your name",
    emailPlaceholder: locale === "fr" ? "votre@email.com" : "you@email.com",
    messagePlaceholder:
      locale === "fr"
        ? "Décrivez votre projet ou votre message…"
        : "Describe your project or message…",
  };

  // suppress unused t warning – t is available for future i18n key lookups
  void t;

  return (
    <section
      id="contact"
      className="mx-auto w-full max-w-5xl px-6 py-24"
      aria-label={heading}
    >
      <div className="mx-auto max-w-2xl">
        <div className="mb-10 text-center">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-foreground">
            {heading}
          </h2>
          <p className="mt-2 text-muted-foreground">{subtitle}</p>
        </div>

        <div className="grid gap-10 md:grid-cols-5">
          {/* Contact links */}
          {contact.length > 0 && (
            <aside className="md:col-span-2 flex flex-col gap-3">
              {contact.map((item) => (
                <ContactCard key={item.type} item={item} />
              ))}
            </aside>
          )}

          {/* Form */}
          <div className={contact.length > 0 ? "md:col-span-3" : "md:col-span-5"}>
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-4"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-sm font-medium text-foreground">
                    {labels.name}
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder={labels.namePlaceholder}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">
                    {labels.email}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder={labels.emailPlaceholder}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-sm font-medium text-foreground">
                  {labels.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder={labels.messagePlaceholder}
                  className="w-full resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending" || status === "sent"}
                className="w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {status === "sending" ? labels.sending : labels.send}
              </button>

              {status === "sent" && (
                <p className="text-center text-sm text-accent">{labels.sent}</p>
              )}
              {status === "error" && (
                <p className="text-center text-sm text-destructive">{labels.error}</p>
              )}
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
}

interface ContactCardProps {
  item: ContactItem;
}

const ICONS: Record<string, string> = {
  github: "🐙",
  linkedin: "💼",
  email: "✉️",
  website: "🌐",
  location: "📍",
  twitter: "🐦",
};

/**
 * Individual contact method card.
 */
function ContactCard({ item }: ContactCardProps) {
  const icon = ICONS[item.type] ?? "🔗";
  const inner = (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground transition-all hover:border-accent hover:text-accent">
      <span>{icon}</span>
      <span className="font-medium">{item.label}</span>
    </div>
  );

  if (item.href) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }

  return inner;
}
