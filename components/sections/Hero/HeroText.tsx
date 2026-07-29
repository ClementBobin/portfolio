"use client";

import { m } from "framer-motion";
import type { Variants } from "framer-motion";
import { useTranslations } from "@/hooks/useTranslations";
import type { PortfolioPersonal } from "@/lib/types/portfolio-api";

interface HeroTextProps {
  personal: PortfolioPersonal;
  locale: string;
  yearsExperience?: number;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/**
 * Animated hero text with typewriter effect for roles.
 * Name animates in with staggered entrance animation.
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
    <m.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center gap-4 text-center"
    >
      {/* Greeting */}
      <m.p
        variants={itemVariants}
        className="text-lg italic text-muted-foreground"
      >
        {greeting}
      </m.p>

      {/* Name */}
      <m.h1
        variants={itemVariants}
        className="text-5xl font-bold italic leading-tight tracking-tight text-foreground md:text-7xl lg:text-8xl"
      >
        {personal.name}
      </m.h1>

      {/* Years of experience */}
      {expText && (
        <m.p variants={itemVariants} className="text-sm text-muted-foreground">
          {expText}
        </m.p>
      )}

      {/* Role */}
      <m.div
        variants={itemVariants}
        className="flex items-center gap-2 text-2xl font-medium text-foreground md:text-3xl"
      >
        <span
          className="text-accent"
          style={{ fontSize: "1.2em" }}
        >
          {developerLabel}
        </span>
      </m.div>
    </m.div>
  );
}