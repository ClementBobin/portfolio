"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useTechColors } from "@/lib/hooks/useTechColors";
import { getTechIcon } from "@/lib/utils/techIcon";
import { cn } from "@/lib/utils";

interface TechBadgeProps {
  name: string;
  className?: string;
  size?: "sm" | "md";
}

/**
 * A tech badge that displays a Lucide icon and tech name.
 * Colors are fetched from the resource API via useTechColors.
 * Falls back to neutral colors if the tech is not found in the API.
 *
 * @param name - Tech name (e.g. "React", "TypeScript")
 * @param className - Optional class name
 * @param size - Badge size: 'sm' or 'md'
 */
export default function TechBadge({ name, className, size = "md" }: TechBadgeProps) {
  const colors = useTechColors();
  const entry = colors.get(name.toLowerCase());
  const color = entry?.color ?? "#7A6555";
  const iconName = entry?.icon ?? "Code2";

  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        size === "sm" && "px-2 py-0.5 text-xs",
        className
      )}
      style={{
        backgroundColor: `${color}26`,
        borderColor: `${color}66`,
        color,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 16px ${color}33`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      {React.createElement(getTechIcon(iconName), { size: size === "sm" ? 10 : 12, "aria-hidden": "true" })}
      {name}
    </motion.span>
  );
}
