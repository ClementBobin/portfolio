"use client";

import * as React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useTranslations } from "@/lib/hooks/useTranslation";
import type { PortfolioPersonal } from "@/lib/types/portfolio-api";

interface HeroTextProps {
  personal: PortfolioPersonal;
  locale: string;
  yearsExperience?: number;
}

const TYPEWRITER_SPEED = 80;
const ERASE_SPEED = 40;
const PAUSE_DURATION = 2000;

/**
 * Animated hero text with typewriter effect for roles.
 * Name animates in with staggered entrance animation.
 *
 * @param personal - Personal portfolio data
 * @param locale - Current locale
 * @param yearsExperience - Years of experience
 */
export default function HeroText({ personal, locale, yearsExperience }: HeroTextProps) {
  const t = useTranslations(locale, ["common"]);

  const titleStr = t(personal.title);
  const roleStr = personal.role ? t(personal.role) : null;
  const roles = [titleStr, roleStr].filter(Boolean) as string[];

  const [roleIndex, setRoleIndex] = React.useState(0);
  const [displayed, setDisplayed] = React.useState("");
  const [isErasing, setIsErasing] = React.useState(false);

  React.useEffect(() => {
    if (!roles.length) return;
    const current = roles[roleIndex];

    if (!isErasing && displayed.length < current.length) {
      const timer = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length + 1));
      }, TYPEWRITER_SPEED);
      return () => clearTimeout(timer);
    } else if (!isErasing && displayed.length === current.length) {
      const timer = setTimeout(() => setIsErasing(true), PAUSE_DURATION);
      return () => clearTimeout(timer);
    } else if (isErasing && displayed.length > 0) {
      const timer = setTimeout(() => {
        setDisplayed(displayed.slice(0, -1));
      }, ERASE_SPEED);
      return () => clearTimeout(timer);
    } else if (isErasing && displayed.length === 0) {
      setIsErasing(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }
  }, [displayed, isErasing, roleIndex, roles]);

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

  const greeting = locale === "fr" ? "Salut, je suis" : "Hi, I'm";
  const expText = yearsExperience
    ? locale === "fr"
      ? `${yearsExperience} ans d'expérience`
      : `${yearsExperience} years of experience`
    : null;
  const developerLabel = locale === "fr" ? "Développeur" : "Developer";

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center gap-4 text-center"
    >
      {/* Greeting */}
      <motion.p
        variants={itemVariants}
        className="font-[family-name:var(--font-lora)] text-lg italic text-muted-foreground"
      >
        {greeting}
      </motion.p>

      {/* Name */}
      <motion.h1
        variants={itemVariants}
        className="font-[family-name:var(--font-playfair)] text-5xl font-bold italic leading-tight tracking-tight text-foreground md:text-7xl lg:text-8xl"
      >
        {personal.name}
      </motion.h1>

      {/* Years of experience */}
      {expText && (
        <motion.p variants={itemVariants} className="text-sm text-muted-foreground">
          {expText}
        </motion.p>
      )}

      {/* Role with typewriter */}
      <motion.div
        variants={itemVariants}
        className="flex items-center gap-2 text-2xl font-medium text-foreground md:text-3xl"
      >
        <span className="font-[family-name:var(--font-lora)]">{developerLabel}</span>
        <span
          className="font-[family-name:var(--font-dancing)] text-accent"
          style={{ fontSize: "1.2em" }}
        >
          {displayed}
          <span className="animate-pulse">|</span>
        </span>
      </motion.div>

      {/* Status badge */}
      {personal.subtitle && (
        <motion.div variants={itemVariants}>
          <HangingChalkboard
            text={t(personal.subtitle.libelle)}
            href={personal.subtitle.href}
          />
        </motion.div>
      )}
    </motion.div>
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
    <motion.div
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
    </motion.div>
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
