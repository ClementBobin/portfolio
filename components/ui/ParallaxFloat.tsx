"use client";

import { m, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

interface ParallaxFloatProps {
  children: React.ReactNode;
  intensity?: number;
  className?: string;
}

/**
 * Applies a mouse-position parallax effect to children.
 * Uses Framer Motion's useMotionValue + useTransform.
 *
 * @param children - Content to apply parallax to
 * @param intensity - Parallax strength (0-1, default: 0.05)
 * @param className - Optional class name
 */
export default function ParallaxFloat({
  children,
  intensity = 0.05,
  className,
}: ParallaxFloatProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const x = useTransform(mouseX, [-1, 1], [-20 * intensity, 20 * intensity]);
  const y = useTransform(mouseY, [-1, 1], [-20 * intensity, 20 * intensity]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, [mouseX, mouseY]);

  return (
    <m.div style={{ x, y }} className={className}>
      {children}
    </m.div>
  );
}
