"use client";

import { motion } from "framer-motion";
import { useTechColors } from "@/lib/hooks/useTechColors";
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
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="group flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition-colors"
      style={{
        backgroundColor: `${color}12`,
        borderColor: `${color}44`,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = `${color}22`;
        (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 24px ${color}22`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = `${color}12`;
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      <div
        className="flex h-10 w-10 items-center justify-center rounded-full"
        style={{ backgroundColor: `${color}22`, color }}
      >
        <DynamicIcon iconHref={entry?.iconHref} iconClass={entry?.icon} />
      </div>
      <span className="text-sm font-medium text-foreground">{name}</span>
      {level && (
        <span className="text-xs text-muted-foreground">{level}</span>
      )}
    </motion.div>
  );
}
