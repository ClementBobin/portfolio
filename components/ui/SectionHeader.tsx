import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  className?: string;
}

/**
 * Reusable section header matching the design:
 * small uppercase eyebrow label + large Playfair title.
 */
export function SectionHeader({ eyebrow, title, className }: SectionHeaderProps) {
  return (
    <div className={cn("mb-12 flex flex-col items-center gap-3 text-center", className)}>
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          {eyebrow}
        </p>
      )}
      <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-bold tracking-tight text-foreground">
        {title}
      </h2>
    </div>
  );
}