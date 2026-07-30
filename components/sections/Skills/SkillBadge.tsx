"use client";

import { m } from "framer-motion";
import { useTechColors } from "@/hooks/useTechColors";
import { DynamicIcon } from "@/components/icons";

interface SkillBadgeProps {
  name: string;
  level?: string;
}

/**
 * Animated skill badge with tech icon and optional level indicator.
 * Color comes from the resource API via useTechColors.
 *
 * @param name - Skill name
 * @param level - Optional proficiency level string
 */
export default function SkillBadge({ name, level }: SkillBadgeProps) {
  const colors = useTechColors();
  const entry = colors.get(name.toLowerCase());
  const color = entry?.color ?? "#7A6555";

  return (
    <m.div
      whileHover={{ scale: 1.05, y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="group flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition-shadow hover:shadow-lg"
      style={{
        "--skill-color": color,
      } as React.CSSProperties}
    >
      <div
        className="flex h-10 w-10 items-center justify-center rounded-full pl-1"
        style={{
          backgroundColor: "color-mix(in srgb, var(--skill-color) 13%, transparent)",
          color: "var(--skill-color)",
        }}
      >
        <DynamicIcon iconHref={entry?.iconHref} />
      </div>

      <span className="text-sm font-medium text-foreground">{name}</span>

      {level && (
        <span className="text-xs text-muted-foreground">{level}</span>
      )}
    </m.div>
  );
}