"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import type { PortfolioPersonal, Experience } from "@/lib/types/portfolio-api";
import HeroText from "./HeroText";
import ParallaxFloat from "@/components/ui/ParallaxFloat";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

interface HeroProps {
  personal: PortfolioPersonal;
  locale: string;
  experiences: Experience[];
}

/**
 * Hero section — full viewport with Three.js particle canvas.
 * Contains name, role typewriter, status badge, and decorative SVG illustrations.
 *
 * @param personal - Personal portfolio data
 * @param locale - Current locale
 * @param experiences - Work experiences (used to compute years of experience)
 */
export default function Hero({ personal, locale, experiences }: HeroProps) {
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

      {/* Decorative SVG — bookshelf top right */}
      <ParallaxFloat intensity={0.03} className="absolute right-4 top-16 hidden opacity-60 lg:block">
        <BookshelfIllustration />
      </ParallaxFloat>

      {/* Decorative SVG — developer desk bottom left */}
      <ParallaxFloat intensity={0.04} className="absolute bottom-8 left-4 hidden opacity-60 lg:block">
        <DeveloperDeskIllustration />
      </ParallaxFloat>

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-6">
        <HeroText personal={personal} locale={locale} yearsExperience={yearsExperience} />

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href={`/${locale}#contact`}
            className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:brightness-110 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {cvLabel}
          </Link>
          <Link
            href={`/${locale}#contact`}
            className="rounded-full border border-primary px-6 py-3 text-sm font-semibold text-primary transition-all hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {contactLabel}
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground/60"
        aria-hidden="true"
      >
        <div className="h-8 w-px bg-current animate-pulse" />
        <svg width="12" height="8" viewBox="0 0 12 8" fill="currentColor">
          <path d="M6 8L0 0h12L6 8z" />
        </svg>
      </div>
    </section>
  );
}

/**
 * Computes years of experience from work experience list.
 */
function computeYears(experiences: Experience[]): number | undefined {
  if (!experiences.length) return undefined;
  const now = new Date().getFullYear();
  let earliest = now;
  for (const exp of experiences) {
    if (exp.workType === "work") {
      const period = exp.period.en ?? exp.period.fr;
      const match = period.match(/\d{4}/);
      if (match) {
        const year = parseInt(match[0], 10);
        if (year < earliest) earliest = year;
      }
    }
  }
  return now - earliest || undefined;
}

/** Warm illustrated bookshelf SVG */
function BookshelfIllustration() {
  return (
    <svg
      width="160"
      height="200"
      viewBox="0 0 160 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="10" y="160" width="140" height="8" rx="2" fill="#6B3F1A" />
      <rect x="10" y="100" width="140" height="8" rx="2" fill="#6B3F1A" />
      <rect x="10" y="40" width="140" height="8" rx="2" fill="#6B3F1A" />
      <rect x="18" y="120" width="16" height="40" rx="2" fill="#C4922A" />
      <rect x="36" y="115" width="14" height="45" rx="2" fill="#8B5A2B" />
      <rect x="52" y="122" width="18" height="38" rx="2" fill="#6B3F1A" />
      <rect x="72" y="118" width="12" height="42" rx="2" fill="#D4A856" />
      <rect x="86" y="124" width="20" height="36" rx="2" fill="#A06830" />
      <rect x="108" y="116" width="15" height="44" rx="2" fill="#C4922A" />
      <rect x="125" y="120" width="18" height="40" rx="2" fill="#8B5A2B" />
      <rect x="18" y="56" width="20" height="44" rx="2" fill="#D4A856" />
      <rect x="40" y="60" width="14" height="40" rx="2" fill="#6B3F1A" />
      <rect x="56" y="54" width="18" height="46" rx="2" fill="#C4922A" />
      <rect x="100" y="68" width="12" height="32" rx="1" fill="#8B5A2B" />
      <circle cx="106" cy="56" r="16" fill="#5A8A3A" opacity="0.7" />
      <circle cx="116" cy="62" r="10" fill="#4A7A2A" opacity="0.6" />
      <circle cx="96" cy="60" r="10" fill="#6A9A4A" opacity="0.5" />
      <ellipse cx="140" cy="78" rx="8" ry="6" fill="#C4922A" opacity="0.8" />
      <rect x="136" y="58" width="8" height="20" rx="2" fill="#D4A856" opacity="0.7" />
      <rect x="134" y="55" width="12" height="6" rx="2" fill="#6B3F1A" />
    </svg>
  );
}

/** Developer at desk SVG */
function DeveloperDeskIllustration() {
  return (
    <svg
      width="180"
      height="140"
      viewBox="0 0 180 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="10" y="100" width="160" height="8" rx="3" fill="#6B3F1A" />
      <rect x="60" y="50" width="70" height="50" rx="4" fill="#2C1810" />
      <rect x="64" y="54" width="62" height="42" rx="2" fill="#1A0E05" />
      <rect x="66" y="56" width="58" height="38" rx="1" fill="#C4922A" opacity="0.15" />
      <rect x="70" y="62" width="30" height="3" rx="1" fill="#C4922A" opacity="0.6" />
      <rect x="70" y="68" width="45" height="3" rx="1" fill="#D4A856" opacity="0.5" />
      <rect x="70" y="74" width="20" height="3" rx="1" fill="#C4922A" opacity="0.4" />
      <rect x="70" y="80" width="38" height="3" rx="1" fill="#8B5A2B" opacity="0.5" />
      <rect x="90" y="100" width="10" height="8" rx="1" fill="#6B3F1A" />
      <circle cx="40" cy="65" r="12" fill="#D4A856" />
      <rect x="28" y="78" width="24" height="25" rx="4" fill="#6B3F1A" />
      <rect x="20" y="95" width="20" height="8" rx="3" fill="#C4922A" />
      <ellipse cx="155" cy="102" rx="12" ry="8" fill="#2C1810" />
      <circle cx="155" cy="94" r="7" fill="#2C1810" />
      <polygon points="149,89 152,82 155,89" fill="#2C1810" />
      <polygon points="155,89 158,82 161,89" fill="#2C1810" />
      <circle cx="153" cy="94" r="1.5" fill="#C4922A" />
      <circle cx="157" cy="94" r="1.5" fill="#C4922A" />
      <rect x="130" y="30" width="40" height="50" rx="3" fill="#E8DFD0" opacity="0.5" />
      <rect x="130" y="30" width="40" height="50" rx="3" stroke="#6B3F1A" strokeWidth="2" fill="none" />
      <line x1="150" y1="30" x2="150" y2="80" stroke="#6B3F1A" strokeWidth="1.5" />
      <line x1="130" y1="55" x2="170" y2="55" stroke="#6B3F1A" strokeWidth="1.5" />
      <circle cx="150" cy="42" r="8" fill="#C4922A" opacity="0.8" />
    </svg>
  );
}
