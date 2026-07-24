import { DynamicLucideIcon } from "@/components/icons/dynamicLucideIcon";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { getTranslations } from "@/hooks/useTranslation";
import type { VisionSection } from "@/types/portfolio-api";

interface VisionProps {
  vision: VisionSection;
  locale: string;
}

/**
 * Vision section — displays future goals and aspirations as icon cards.
 *
 * @param vision - Vision section data
 * @param locale - Current locale
 */
export default async function Vision({ vision, locale }: VisionProps) {
  if (!vision.items.length) return null;

  const t = await getTranslations(locale, ["portfolio"]);
  const headline = t(vision.headline)
  const subtitle = t(vision.subtitle)

  return (
    <section
      id="vision"
      className="mx-auto w-full max-w-5xl px-6 py-24"
      aria-label={t("section.vision")}
    >
      {headline && (
        <ScrollReveal>
          <p className="mb-4 text-center text-2xl font-semibold text-foreground">
            {headline}
          </p>
        </ScrollReveal>
      )}

      {subtitle && (
        <ScrollReveal delay={0.1}>
          <p className="mb-12 text-center text-muted-foreground">{subtitle}</p>
        </ScrollReveal>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        {vision.items.map((item, i) => {
          const tags = item.tags?.map((tag) => t(tag)) ?? [];

          return (
            <ScrollReveal key={item.id} delay={i * 0.1}>
              <div className="group flex gap-4 rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-md">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
                  <DynamicLucideIcon name={item.icon} />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold text-foreground">
                    {t(item.title)}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{t(item.description)}</p>
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-medium text-accent"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
