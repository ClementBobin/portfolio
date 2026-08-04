"use client";

import dynamic from "next/dynamic";
import type { PortfolioPersonal, Experience, ContactItem } from "@/lib/types/portfolio-api";
import HeroText from "./HeroText";
import computeYears from "@/lib/utils";
import { ChevronDownIcon } from "@/components/icons";
import { ContactDialog } from "../Contact/Contact";
import { useTranslations } from "@/hooks/useTranslations";
import { Button } from "@/components/ui/button";
import { ShimmerText } from "@/components/ui/shimmer-text";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

interface HeroProps {
  personal: PortfolioPersonal;
  locale: string;
  experiences: Experience[];
  contact: ContactItem[];
}

/**
 * Hero section — full viewport with Three.js particle canvas.
 * Contains name, role typewriter, status badge, and decorative SVG illustrations.
 *
 * @param personal    - Personal portfolio data
 * @param locale      - Current locale
 * @param experiences - Work experiences (used to compute years of experience)
 * @param contact     - Contact information
 */
export default function Hero({ personal, locale, experiences, contact }: HeroProps) {
  const t = useTranslations(locale, ["portfolio"]);
  const yearsExperience = personal.yearsExperience ?? computeYears(experiences);

  return (
    <section
      id="hero"
      className="relative flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden"
      aria-label={t("hero.label")}
    >
      {/* Three.js canvas — dynamically loaded, aria-hidden */}
      <HeroCanvas />

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-6">
        <HeroText personal={personal} locale={locale} yearsExperience={yearsExperience} />

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={`https://clementbobin.github.io/cv/?lang=${locale}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-colors hover:brightness-110 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {t("hero.viewCv")}
          </a>
          <ContactDialog
            trigger={
              <Button
                type="button"
                variant="outline"
                className="px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label={t("hero.contact")}
              >
                <ShimmerText duration={3} delay={2}>
                  {t("hero.contact")}
                </ShimmerText>
              </Button>
            }
            linkedinUrl={contact.find((c) => c.type === "linkedin")?.href ?? ""}
            linkedinLabel={contact.find((c) => c.type === "linkedin")?.label ?? ""}
            locale={locale}
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