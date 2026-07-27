import { DynamicLucideIcon } from "@/components/icons/dynamicLucideIcon";
import { CheckCircle2 } from "lucide-react";
import type { PhilosophyCard as PhilosophyCardType } from "@/types/portfolio-api";

interface PhilosophyCardProps {
  card: PhilosophyCardType;
  t: (key: any) => string;
}

export function PhilosophyCard({ card, t }: PhilosophyCardProps) {
  const title = t(card.title);
  const description = card.description ? t(card.description) : undefined;
  const items = card.items.map((item) => ({
    title: t(item.title),
    description: t(item.description),
  }));

  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 shadow-sm h-full">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
          <DynamicLucideIcon name={card.icon} className="size-5" />
        </div>
        <h3 className="text-lg font-bold text-foreground">{title}</h3>
      </div>

      {/* Optional intro description (checklist variant) */}
      {description && (
        <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
      )}

      {/* Numbered variant */}
      {card.variant === "numbered" && (
        <div className="flex flex-col gap-3">
          {items.map((item, i) => (
            <div
              key={i}
              className="rounded-xl border border-border bg-background/50 p-4"
            >
              <p className="text-xs font-semibold text-foreground font-mono mb-1.5">
                {i + 1}. {item.title}
              </p>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Checklist variant */}
      {card.variant === "checklist" && (
        <ul className="flex flex-col gap-3">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
              <span className="text-muted-foreground leading-relaxed">
                <span className="font-semibold text-foreground">{item.title}: </span>
                {item.description}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}