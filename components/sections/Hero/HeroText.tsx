"use client";

import { useTranslations } from "@/hooks/useTranslations";
import type { PortfolioPersonal } from "@/lib/types/portfolio-api";
import { BlurReveal } from "@/components/ui/blur-reveal";
import { GradientWaveText } from "@/components/ui/gradient-wave-text";
import { m } from "framer-motion";
import { Signature } from "@/components/ui/signature";

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
        className="text-lg italic text-muted-foreground"
      >
        {greeting}
      </BlurReveal>

      {/* Name — blur reveal with bold display treatment */}
      <Signature
        text={personal.name}
        inView={true}
        once={true}
        color="#c4922a"
        fontSize={32}
        duration={1.5}
        className="font-bold text-4xl md:text-5xl h-12 md:h-16"
        delay={0.35}
      />
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
          customColors={["#c4922a", "#e8b84b", "#f5d78a", "#e0a83a", "#c4922a"]}
          speed={4}
        >
          {developerLabel}
        </GradientWaveText>
      </m.div>
    </div>
  );
}
