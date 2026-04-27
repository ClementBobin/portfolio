import * as React from "react";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/section-heading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import type { PortfolioPersonal, ContactItem } from "@/lib/types/portfolio-api";

interface AboutProps {
  personal: PortfolioPersonal;
  contact: ContactItem[];
  locale: string;
}

/**
 * About section — displays photo, bio summary, location, and contact links.
 *
 * @param personal - Personal portfolio data
 * @param contact - Contact items
 * @param locale - Current locale
 */
export default function About({ personal, contact, locale }: AboutProps) {
  const summary = personal.summary[locale as "en" | "fr"] ?? personal.summary.en ?? "";
  const title = locale === "fr" ? "À propos" : "About";
  const photoBackEmoji = personal.photoBackEmoji ?? "👨‍💻";

  return (
    <section
      id="about"
      className="mx-auto w-full max-w-5xl px-6 py-24"
      aria-label={title}
    >
      <SectionHeading title={title} />

      <div className="grid gap-12 md:grid-cols-2 md:items-center">
        {/* Photo */}
        <ScrollReveal direction="left">
          <div className="relative mx-auto w-64 md:w-80">
            <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-accent/30 to-primary/20 blur-xl" />
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
              {personal.photo ? (
                <Image
                  src={personal.photo}
                  alt={personal.name}
                  width={320}
                  height={400}
                  className="w-full object-cover"
                  priority
                />
              ) : (
                <div className="flex h-80 items-center justify-center bg-secondary text-8xl">
                  {photoBackEmoji}
                </div>
              )}
            </div>
            {/* Decorative corner accent */}
            <div className="absolute -bottom-3 -right-3 h-12 w-12 rounded-full bg-accent/20 border border-accent/40" />
          </div>
        </ScrollReveal>

        {/* Text content */}
        <ScrollReveal direction="right">
          <div className="flex flex-col gap-6">
            <p className="font-[family-name:var(--font-lora)] text-lg leading-relaxed text-foreground/90">
              {summary}
            </p>

            {/* Location */}
            {personal.location && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>📍</span>
                <span>{personal.location}</span>
              </div>
            )}

            {/* Contact links */}
            {contact.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {contact.map((item) => (
                  <ContactLink key={item.type} item={item} />
                ))}
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

interface ContactLinkProps {
  item: ContactItem;
}

const CONTACT_ICONS: Record<string, string> = {
  github: "🐙",
  linkedin: "💼",
  email: "✉️",
  website: "🌐",
  location: "📍",
  twitter: "🐦",
};

/**
 * Renders a contact link with an appropriate icon.
 */
function ContactLink({ item }: ContactLinkProps) {
  const icon = CONTACT_ICONS[item.type] ?? "🔗";

  if (!item.href) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground">
        <span>{icon}</span>
        {item.label}
      </span>
    );
  }

  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-foreground transition-all hover:border-accent hover:bg-accent/10 hover:text-accent"
    >
      <span>{icon}</span>
      {item.label}
    </a>
  );
}
