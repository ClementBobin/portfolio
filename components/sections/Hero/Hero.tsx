"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import type { PortfolioPersonal, Experience, Contact } from "@/lib/types/portfolio-api";
import HeroText from "./HeroText";
import computeYears from "@/lib/utils";
import { ChevronDownIcon } from "@/components/icons";
import { ContactDialog } from "../Contact/Contact";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

interface HeroProps {
  personal: PortfolioPersonal;
  locale: string;
  experiences: Experience[];
  contact: Contact[];
}

/**
 * Hero section — full viewport with Three.js particle canvas.
 * Contains name, role typewriter, status badge, and decorative SVG illustrations.
 *
 * @param personal - Personal portfolio data
 * @param locale - Current locale
 * @param experiences - Work experiences (used to compute years of experience)
 * @param contact - Contact information
 */
export default function Hero({ personal, locale, experiences, contact }: HeroProps) {
  const yearsExperience = personal.yearsExperience ?? computeYears(experiences);
  const cvLabel = locale === "fr" ? "Voir mon CV" : "View my CV";
  const contactLabel = locale === "fr" ? "Me contacter" : "Contact me";

  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden"
      aria-label={locale === "fr" ? "Présentation" : "Introduction"}
    >
      {/* Three.js canvas — dynamically loaded, aria-hidden */}
      <HeroCanvas />

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-6">
        <HeroText personal={personal} locale={locale} yearsExperience={yearsExperience} />

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href={`https://clementbobin.github.io/cv/?lang=${locale}`} // External CV link with locale param
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:brightness-110 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {cvLabel}
          </Link>
          <ContactDialog
            trigger={<div className="rounded-full border border-primary px-6 py-3 text-sm font-semibold text-primary transition-all hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{contactLabel}</div>}
            linkedinUrl={contact.find((c) => c.type === "linkedin")?.href ?? ""}
            linkedinLabel={contact.find((c) => c.type === "linkedin")?.label ?? ""}
            locale="fr"
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground/60"
        aria-hidden="true"
      >
        <div className="h-8 w-px bg-current animate-pulse" />
        <ChevronDownIcon width="12px" height="8px" />
      </div>
    </section>
  );
}