"use client";

import {
  ExternalLinkIcon,
  FileTextIcon,
  MapPinIcon,
  MessageCircleIcon,
} from "lucide-react";
import { useState } from "react";
import type { ContactItem, PortfolioPersonal } from "@/lib/types/portfolio-api";
import { ContactDialog } from "./ContactDialog";

interface HeroSectionProps {
  personal: PortfolioPersonal;
  contact: ContactItem[];
  locale: string;
  cvUrl?: string;
}

export function HeroSection({
  personal,
  contact,
  locale,
  cvUrl = "https://clementbobin.github.io/cv/view",
}: HeroSectionProps) {
  const lang = locale?.split("-")[0] === "fr" ? "fr" : "en";
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <section>
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background">
        {/* Soft glow */}
        <div
          className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-[0.06]"
          style={{
            background:
              "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-2xl mx-auto gap-5">
          {/* Eyebrow */}
          <p
            className="text-base md:text-lg tracking-wide text-muted-foreground"
            style={{ fontFamily: "Georgia, serif" }}
          >
            {lang === "fr" ? "Salut, je suis" : "Hi, I'm"}
          </p>

          {/* Name */}
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-black text-foreground leading-none tracking-tight"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            {personal.name}
          </h1>

          {/* Years of experience */}
          {personal.yearsExperience != null && (
            <p className="text-sm text-muted-foreground tracking-widest">
              {personal.yearsExperience}
              {lang === "fr" ? " ans d'expérience" : " years of experience"}
            </p>
          )}

          {/* Role */}
          {personal.role?.[lang] && (
            <p
              className="text-xl md:text-2xl text-foreground/80 font-light"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {lang === "fr" ? "Développeur " : "Developer — "}
              <span
                className="italic font-semibold"
                style={{ color: "var(--primary)" }}
              >
                {personal.role[lang].replace(
                  /^(développeur|developer)\s*—?\s*/i,
                  "",
                )}
              </span>
            </p>
          )}

          {/* Status badge */}
          {personal.subtitle?.[lang]?.trim() && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card text-sm text-muted-foreground shadow-sm">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0" />
              {personal.subtitle[lang]}
            </div>
          )}

          {/* CTAs */}
          <div className="flex items-center gap-3 flex-wrap justify-center mt-2">
            <a
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-sm transition-all hover:opacity-90 hover:shadow-lg active:scale-95"
              style={{
                background: "var(--primary)",
                color: "var(--primary-foreground)",
              }}
            >
              <FileTextIcon className="h-4 w-4" />
              {lang === "fr" ? "Voir mon CV" : "View Resume"}
            </a>
            <button
              onClick={() => setContactOpen(true)}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-sm transition-all hover:bg-accent active:scale-95 border border-border bg-card text-foreground"
            >
              <MessageCircleIcon className="h-4 w-4" />
              {lang === "fr" ? "Me contacter" : "Contact me"}
            </button>
          </div>

          {/* Location contacts */}
          {contact.some(c => c.type === "location") && (
            <div className="flex flex-wrap items-center justify-center gap-2 mt-1">
              {contact
                .filter(c => c.type === "location")
                .map((item, index) =>
                  item.href ? (
                    <a
                      key={index}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-muted-foreground px-3 py-1.5 rounded-full border border-border bg-card hover:border-primary/40 hover:text-foreground transition-colors"
                    >
                      <MapPinIcon className="h-3 w-3" />
                      {item.label}
                      <ExternalLinkIcon className="h-2.5 w-2.5 opacity-40" />
                    </a>
                  ) : (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1.5 text-xs text-muted-foreground px-3 py-1.5 rounded-full border border-border bg-card"
                    >
                      <MapPinIcon className="h-3 w-3" />
                      {item.label}
                    </span>
                  )
                )}
            </div>
          )}
        </div>
      </section>

      <ContactDialog
        open={contactOpen}
        onClose={() => setContactOpen(false)}
        contact={contact}
      />
    </section>
  );
}
