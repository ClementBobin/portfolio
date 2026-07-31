"use client";

import { useTranslations } from "@/hooks/useTranslations";
import type { PortfolioPersonal } from "@/lib/types/portfolio-api";
import { BlurReveal } from "@/components/ui/blur-reveal";
import { GradientWaveText } from "@/components/ui/gradient-wave-text";
import { m } from "framer-motion";

interface HeroTextProps {
  personal: PortfolioPersonal;
  locale: string;
  yearsExperience?: number;
}

/**
 * Animated hero text using BlurReveal for entrance and GradientWaveText for the role.
 *
 * @param personal        - Personal portfolio data
 * @param locale          - Current locale
 * @param yearsExperience - Years of experience
 */
export default function HeroText({ personal, locale, yearsExperience }: HeroTextProps) {
  const t = useTranslations(locale, ["portfolio"]);

  const greeting = t("hero.greeting");
  const expText = t("hero.experience", { n: yearsExperience ?? 0 });
  const developerLabel = t("hero.developer");

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      {/* Greeting — blur reveal */}
      <BlurReveal
        as="p"
        delay={0.1}
        speedReveal={1.2}
        speedSegment={0.45}
        className="text-lg italic text-muted-foreground"
      >
        {greeting}
      </BlurReveal>

      {/* Name — blur reveal with bold display treatment */}
      <BlurReveal
        as="h1"
        delay={0.35}
        speedReveal={1.0}
        speedSegment={0.55}
        className="text-5xl font-bold italic leading-tight tracking-tight text-foreground md:text-7xl lg:text-8xl"
      >
        {personal.name}
      </BlurReveal>

      {/* Years of experience */}
      {expText && (
        <m.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-sm text-muted-foreground"
        >
          {expText}
        </m.p>
      )}

      {/* Role — gradient wave */}
      <m.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center gap-2 text-2xl font-medium md:text-3xl"
      >
        <GradientWaveText
          as="span"
          colors={["#c4922a", "#e8b84b", "#f5d78a", "#e0a83a", "#c4922a"]}
          speed={4}
          style={{ fontSize: "1.1em", fontWeight: 600 }}
        >
          {developerLabel}
        </GradientWaveText>
      </m.div>
    </div>
  );
}
