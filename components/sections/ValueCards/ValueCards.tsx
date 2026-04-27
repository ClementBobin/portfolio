import * as React from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { getTechIcon } from "@/lib/utils/techIcon";
import type { ValueCard } from "@/lib/types/portfolio-api";

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
  const heading = locale === "fr" ? "Ce que j'apporte" : "What I Bring";

  if (!valueCards.length) return null;

  return (
    <section
      id="values"
      className="mx-auto w-full max-w-5xl px-6 py-24"
      aria-label={heading}
    >
      <SectionHeading title={heading} />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {valueCards.map((card, i) => {
          const title = card.title[locale as "en" | "fr"] ?? card.title.en ?? "";
          const description = card.description[locale as "en" | "fr"] ?? card.description.en ?? "";
          const color = card.color ?? "#C4922A";
          const Icon = getTechIcon(card.icon);

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
                  <Icon size={24} aria-hidden="true" />
                </div>
                <div>
                  <h3
                    className="font-[family-name:var(--font-playfair)] text-lg font-semibold"
                    style={{ color }}
                  >
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/80">{description}</p>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
