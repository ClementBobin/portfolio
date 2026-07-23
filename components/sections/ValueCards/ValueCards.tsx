"use client"

import { DynamicLucideIcon } from "@/components/icons/dynamicLucideIcon";
import ScrollReveal from "@/components/ui/ScrollReveal";
import type { ValueCard } from "@/types/portfolio-api";
import { useTranslations } from "@/hooks/useTranslation";

interface ValueCardsProps {
  valueCards: ValueCard[];
  locale: string;
}

/**
 * ValueCards section — displays "What I Bring" cards with icons and descriptions.
 *
 * @param valueCards - Array of value card items
 * @param locale - Current locale
 */
export default function ValueCards({ valueCards, locale }: ValueCardsProps) {
  const t = useTranslations(locale, ["portfolio"]);

  if (!valueCards.length) return null;

  return (
    <section
      id="values"
      className="mx-auto w-full max-w-5xl px-6 py-24"
      aria-label={t("section.values")}
    >
      <div className="grid gap-6 grid-cols-2">
        {valueCards.map((card, i) => {
          const color = card.color ?? "#C4922A";

          return (
            <ScrollReveal key={i} delay={i * 0.08}>
              <div
                className="group flex flex-col gap-4 rounded-xl border p-6 transition-all hover:shadow-md"
                style={{ borderColor: `${color}44`, backgroundColor: `${color}08` }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = `${color}14`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = `${color}08`;
                }}
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${color}22`, color }}
                >
                  <DynamicLucideIcon name={card.icon} />
                </div>
                <div>
                  <h3
                    className="text-lg font-semibold"
                    style={{ color }}
                  >
                    {t(card.title)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/80">{t(card.description)}</p>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}