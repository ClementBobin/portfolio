import { DynamicIcon } from "@/components/icons/dynamicLucideIcon";
import ScrollReveal from "@/components/ui/ScrollReveal";
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
export default function Vision({ vision, locale }: VisionProps) {
  const heading = locale === "fr" ? "Vision & Objectifs" : "Vision & Goals";
  const headline = vision.headline
    ? vision.headline[locale as "en" | "fr"] ?? vision.headline.en
    : null;
  const subtitle = vision.subtitle
    ? vision.subtitle[locale as "en" | "fr"] ?? vision.subtitle.en
    : null;

  if (!vision.items.length) return null;

  return (
    <section
      id="vision"
      className="mx-auto w-full max-w-5xl px-6 py-24"
      aria-label={heading}
    >
      {headline && (
        <ScrollReveal>
          <p className="mb-4 text-center font-[family-name:var(--font-playfair)] text-2xl font-semibold text-foreground">
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
          const title = item.title[locale as "en" | "fr"] ?? item.title.en ?? "";
          const description = item.description[locale as "en" | "fr"] ?? item.description.en ?? "";
          const tags = item.tags?.map((t) => t[locale as "en" | "fr"] ?? t.en ?? "") ?? [];

          return (
            <ScrollReveal key={item.id} delay={i * 0.1}>
              <div className="group flex gap-4 rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-md">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
                  <DynamicIcon iconClass={item.icon} />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-[family-name:var(--font-playfair)] font-semibold text-foreground">
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
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
