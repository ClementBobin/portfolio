import ScrollReveal from "@/components/ui/ScrollReveal";
import type { StrengthItem } from "@/types/portfolio-api";
import { getTranslations } from "@/hooks/useTranslation";

interface StrengthProps {
  strength: StrengthItem;
  locale: string;
}

/**
 * Strength section — horizontal timeline of strengths with percentage bars.
 *
 * @param strength - Strength section data
 * @param locale - Current locale
 */
export default async function Strength({ strength, locale }: StrengthProps) {
  const t = await getTranslations(locale, ["portfolio"]);

  if (!strength.strengths.length) return null;

  return (
    <section
      id="strengths"
      className="mx-auto w-full max-w-5xl px-6 py-24"
      aria-label={t("section.strengths")}
    >
      <div className="flex flex-col gap-6">
        {strength.strengths.map((item, i) => {
          const description = t(item.description);

          return (
            <ScrollReveal key={item.id} delay={i * 0.08}>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">{t(item.label)}</span>
                  <span className="text-sm font-semibold text-accent">{item.percentage}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-1000"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                {description && (
                  <p className="text-xs text-muted-foreground">{description}</p>
                )}
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      {/* Detail section */}
      {strength.detail && (
        <ScrollReveal delay={0.3} className="mt-12">
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-2 font-[family-name:var(--font-playfair)] text-xl font-semibold text-foreground">
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
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {strength.detail.categories.map((cat) => (
                  <div key={cat.id} className="rounded-lg border border-border bg-secondary/50 p-3">
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