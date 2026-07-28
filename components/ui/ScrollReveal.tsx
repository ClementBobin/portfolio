"use client";

import * as React from "react";
import { m, useInView } from "framer-motion";

type RevealDirection = "up" | "left" | "right" | "down";

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: RevealDirection;
  delay?: number;
  className?: string;
  once?: boolean;
}

const DIR_MAP: Record<RevealDirection, { x?: number; y?: number }> = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: 40 },
  right: { x: -40 },
};

/**
 * Wraps children with a scroll-triggered entrance animation.
 * Uses Framer Motion's useInView for intersection-based reveal.
 *
 * @param children - Content to reveal
 * @param direction - Slide-in direction: 'up', 'down', 'left', 'right'
 * @param delay - Animation delay in seconds
 * @param className - Optional wrapper class name
 * @param once - Whether to only animate once (default: true)
 */
export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  className,
  once = true,
}: ScrollRevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-80px" });

  const initial = { opacity: 0, ...DIR_MAP[direction] };

  return (
    <m.div
      ref={ref}
      initial={initial}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : initial}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </m.div>
  );
}