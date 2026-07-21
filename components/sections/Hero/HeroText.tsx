"use client";

import { m } from "framer-motion";
import type { Variants } from "framer-motion";
import { useTranslations } from "@/hooks/useTranslation";
import type { PortfolioPersonal } from "@/types/portfolio-api";

interface HeroTextProps {
  personal: PortfolioPersonal;
  locale: string;
  yearsExperience?: number;
}

/**
 * Animated hero text with typewriter effect for roles.
 * Name animates in with staggered entrance animation.
 *
 * @param personal - Personal portfolio data
 * @param locale - Current locale
 * @param yearsExperience - Years of experience
 */
export default function HeroText({ personal, locale, yearsExperience }: HeroTextProps) {
  const t = useTranslations(locale, ["portfolio"]);

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

  const greeting = t("hero.greeting");
  const expText = t("hero.yearsExperience", { count: yearsExperience ?? 0 });
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
        <span>{developerLabel}</span>
        <span
          className="text-accent"
          style={{ fontSize: "1.2em" }}
        >
          {developerLabel}
        </span>
      </m.div>

      {/* Status badge */}
      {personal.subtitle && (
        <m.div variants={itemVariants}>
          <HangingChalkboard
            text={t(personal.subtitle.libelle)}
            href={personal.subtitle.href}
          />
        </m.div>
      )}
    </m.div>
  );
}

interface HangingChalkboardProps {
  text: string;
  href?: string;
}

/**
 * Animated chalkboard sign that gently sways.
 */
function HangingChalkboard({ text, href }: HangingChalkboardProps) {
  const content = (
    <m.div
      animate={{
        rotate: [0, -2, 2, -1, 1, 0],
        transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
      }}
      className="relative"
    >
      <svg
        width="220"
        height="70"
        viewBox="0 0 220 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <line x1="110" y1="0" x2="110" y2="14" stroke="#7A6555" strokeWidth="1.5" />
        <rect x="4" y="14" width="212" height="50" rx="6" fill="#2C1810" stroke="#6B3F1A" strokeWidth="2" />
        <rect x="8" y="18" width="204" height="42" rx="4" fill="#2C1810" />
        <text
          x="110"
          y="45"
          textAnchor="middle"
          fill="#E8DFD0"
          fontFamily="serif"
          fontSize="14"
          fontStyle="italic"
        >
          {text}
        </text>
      </svg>
    </m.div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return content;
}
