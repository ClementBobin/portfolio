import Link from "next/link";
import { DynamicLucideIcon } from "@/components/icons/dynamicLucideIcon";
import { CheckCircle2, ArrowUpRight } from "lucide-react";
import type { VisionItem } from "@/types/portfolio-api";
import { getTranslations } from "@/hooks/useTranslation";

interface VisionCardProps {
  item: VisionItem;
  locale: string;
}

export async function VisionCard({ item, locale }: VisionCardProps) {
  const t = await getTranslations(locale, ["portfolio"]);

  const variant = item.variant ?? "checklist";
  const eyebrow = item.eyebrow ? t(item.eyebrow) : undefined;
  const title = t(item.title);
  const description = t(item.description);
  const items = item.items?.map((i) => t(i)) ?? [];
  const subcards = item.subcards?.map((s) => ({
    title: t(s.title),
    description: t(s.description),
  })) ?? [];
  const cta = item.cta ? { label: t(item.cta.label), href: item.cta.href } : undefined;

  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 shadow-sm h-full">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-xl icon-badge"
          style={{ "--icon-accent": item.color } as React.CSSProperties}
        >
          <DynamicLucideIcon name={item.icon} />
        </div>
        <div className="flex flex-col gap-0.5">
          {eyebrow && (
            <span className="text-[10px] font-semibold uppercase tracking-widest text-accent">
              {eyebrow}
            </span>
          )}
          <h3 className="text-lg font-bold text-foreground leading-tight">{title}</h3>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>

      {/* Checklist variant */}
      {variant === "checklist" && items.length > 0 && (
        <ul className="flex flex-col gap-3">
          {items.map((item, i) => {
            // Support "**Bold:** rest" pattern
            const match = item.match(/^\*\*(.+?)\*\*[:\s]*(.*)/);
            return (
              <li key={i} className="flex items-start gap-2.5 text-sm">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                <span className="text-muted-foreground">
                  {match ? (
                    <>
                      <span className="font-semibold text-foreground">{match[1]}:</span>{" "}
                      {match[2]}
                    </>
                  ) : item}
                </span>
              </li>
            );
          })}
        </ul>
      )}

      {/* Subcards variant */}
      {variant === "subcards" && subcards.length > 0 && (
        <div className="flex flex-col gap-3">
          {subcards.map((sub, i) => (
            <div
              key={i}
              className="rounded-xl border border-border bg-background/50 p-4"
            >
              <p className="text-xs font-semibold text-foreground mb-1">{sub.title}</p>
              <p className="text-xs leading-relaxed text-muted-foreground">{sub.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* CTA */}
      {cta && (
        <div className="mt-auto pt-2">
          <Link
            href={cta.href}
            className="inline-flex items-center gap-1.5 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            {cta.label}
            <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </div>
      )}
    </div>
  );
}