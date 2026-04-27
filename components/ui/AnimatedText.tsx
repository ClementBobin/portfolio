"use client";

import * as React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type AnimatedTextMode = "chars" | "words" | "lines";

interface AnimatedTextProps {
  text: string;
  mode?: AnimatedTextMode;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
}

/**
 * Animates text by splitting into chars/words/lines and staggering each unit in.
 * Uses Framer Motion for smooth entrance animations.
 *
 * @param text - The text to animate
 * @param mode - Split mode: 'chars', 'words', or 'lines'
 * @param className - Optional class name
 * @param delay - Initial delay before animation starts (seconds)
 * @param duration - Duration per unit animation (seconds)
 * @param stagger - Delay between each unit (seconds)
 */
export default function AnimatedText({
  text,
  mode = "words",
  className,
  delay = 0,
  duration = 0.5,
  stagger = 0.05,
}: AnimatedTextProps) {
  const units =
    mode === "chars" ? text.split("") : mode === "words" ? text.split(" ") : [text];

  const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const unitVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration, ease: EASE },
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn("inline-flex flex-wrap gap-x-[0.25em]", className)}
      aria-label={text}
    >
      {units.map((unit, i) => (
        <motion.span key={i} variants={unitVariants} className="inline-block">
          {unit === "" ? "\u00A0" : unit}
        </motion.span>
      ))}
    </motion.span>
  );
}
