import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionHeaderProps {
  /** Content inside the pill — typically an icon + label string */
  children: ReactNode;
  eyebrow?: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;
  className?: string;
}

/**
 * Reusable section header: eyebrow pill → h2 title → subtitle.
 * Used wherever a page section needs the standard label/title/subtitle trio.
 */
export function SectionHeader({
  children,
  eyebrow,
  title,
  subtitle,
  className,
}: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-16">
      <div className={cn("flex flex-col gap-2", className)}>
        {eyebrow && (
          <span className="flex w-fit items-center gap-2 rounded-full border px-3 py-1 font-mono text-xs font-semibold uppercase tracking-widest text-foreground/60">
            {eyebrow}
          </span>
        )}
        {title && (
          <h2 className="text-4xl font-bold tracking-tight">{title}</h2>
        )}
        {subtitle && (
          <p className="max-w-lg leading-relaxed text-muted-foreground">{subtitle}</p>
        )}
      </div>

      {children}
    </div>
  );
}