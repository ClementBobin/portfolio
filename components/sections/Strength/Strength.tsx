"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";
import type { StrengthItem } from "@/types/portfolio-api";
import { useTranslations } from "@/hooks/useTranslation";

interface StrengthProps {
  strength: StrengthItem;
  locale: string;
}

/**
 * Convert percentage into a progressive grey -> green color.
 */
function getStrengthColor(value: number) {
  const percentage = Math.min(Math.max(value, 0), 100);

  // Grey at 0%, green at 100%
  const saturation = 15 + percentage * 0.7;
  const lightness = 78 - percentage * 0.45;

  return `hsl(145 ${saturation}% ${lightness}%)`;
}

export default function Strength({
  strength,
  locale,
}: StrengthProps) {
  const t = useTranslations(locale, ["portfolio"]);

  if (!strength.strengths.length) return null;

  return (
    <section
      id="strengths"
      className="mx-auto w-full max-w-5xl px-6 py-24"
      aria-label={t("section.strengths")}
    >
      <ScrollReveal>
        <h2 className="mb-16 text-center text-4xl font-bold text-foreground">
          {t("section.strengths")}
        </h2>
      </ScrollReveal>


      {/* Timeline */}
      <ScrollReveal delay={0.1}>
        <div className="relative">

          {/* Background line */}
          <div className="absolute left-0 right-0 top-5 h-0.75 bg-secondary" />


          {/* Progressive colored line */}
          <div className="absolute left-0 right-0 top-5 flex h-0.75 overflow-hidden">
            {strength.strengths
              .slice(0, -1)
              .map((item, index) => {
                const next = strength.strengths[index + 1];

                const average =
                  (item.percentage + next.percentage) / 2;

                return (
                  <div
                    key={`${item.id}-line`}
                    className="flex-1 transition-colors duration-700"
                    style={{
                      backgroundColor: getStrengthColor(
                        average
                      ),
                    }}
                  />
                );
              })}
          </div>


          {/* Nodes */}
          <div className="relative z-10 flex justify-between">
            {strength.strengths.map((item) => {
              const color = getStrengthColor(
                item.percentage
              );

              return (
                <div
                  key={item.id}
                  className="flex flex-col items-center gap-4"
                >

                  {/* Circle */}
                  <div
                    className="
                      flex h-10 w-10
                      items-center justify-center
                      rounded-full
                      ring-4 ring-background
                      transition-colors duration-700
                    "
                    style={{
                      backgroundColor: color,
                    }}
                  >
                    <div className="h-3 w-3 rounded-full bg-white" />
                  </div>


                  {/* Label */}
                  <div className="flex flex-col items-center">
                    <span
                      className="
                        text-sm font-medium
                        transition-colors duration-700
                      "
                      style={{
                        color,
                      }}
                    >
                      {t(item.label)}
                    </span>

                    <span className="text-xs text-muted-foreground">
                      {item.percentage}%
                    </span>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </ScrollReveal>


      {/* Detail section */}
      {strength.detail && (
        <ScrollReveal
          delay={0.3}
          className="mt-16"
        >
          <div className="rounded-xl border border-border bg-card p-6">

            <h3 className="mb-2 text-xl font-semibold text-foreground">
              {t(strength.detail.title)}
            </h3>


            {strength.detail.short && (
              <p className="mb-4 text-sm font-medium text-accent">
                {t(strength.detail.short)}
              </p>
            )}


            {strength.detail.description && (
              <p className="text-sm leading-relaxed text-muted-foreground">
                {t(strength.detail.description)}
              </p>
            )}


            {strength.detail.categories && (
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {strength.detail.categories.map((cat) => (
                  <div
                    key={cat.id}
                    className="
                      rounded-lg
                      border border-border
                      bg-secondary/50
                      p-3
                    "
                  >
                    <h4 className="mb-1 text-sm font-semibold text-foreground">
                      {t(cat.title)}
                    </h4>

                    <p className="text-xs text-muted-foreground">
                      {t(cat.description)}
                    </p>
                  </div>
                ))}
              </div>
            )}

          </div>
        </ScrollReveal>
      )}

    </section>
  );
}