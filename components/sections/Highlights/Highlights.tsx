import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import type { Highlight } from "@/types/portfolio-api";
import { DynamicIcon } from "@/components/icons/dynamicLucideIcon";
import { getTranslations } from "@/hooks/useTranslation";

interface HighlightsProps {
  highlights: Highlight[];
  locale: string;
}

/**
 * Highlights section — key achievements displayed as prominent cards.
 *
 * @param highlights - Array of highlight items
 * @param locale - Current locale
 */
export default async function Highlights({ highlights, locale }: HighlightsProps) {
  const t = await getTranslations(locale, ["portfolio"]);

  if (!highlights.length) return null;

  return (
    <section
      id="highlights"
      className="mx-auto w-full max-w-5xl px-6 py-24"
      aria-label={t("section.highlights")}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {highlights.map((item, i) => {
          const description = t(item.description);
          const tags = t(item.tag);

          const cardContent = (
            <div
              className={`group relative flex h-full flex-col gap-3 overflow-hidden rounded-xl border p-5 transition-all hover:shadow-md ${
                item.highlight
                  ? "border-accent/50 bg-accent/5 hover:bg-accent/10"
                  : "border-border bg-card hover:border-accent/30"
              }`}
            >
              {item.highlight && (
                <div className="absolute right-3 top-3 text-lg">⭐</div>
              )}

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/15 text-accent">
                <DynamicIcon iconClass={item.icon} />
              </div>

              <div>
                {tags.length > 0 && (
                  <div className="mb-2 flex flex-wrap gap-1">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <h3 className="font-semibold text-foreground">
                  {t(item.label)}
                </h3>
                {description && (
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
                )}
              </div>

              {(item.href ?? item.githubHref) && (
                <div className="mt-auto flex gap-2">
                  {item.href && (
                    <span className="text-xs text-accent">
                      {t("highlights.view")}
                    </span>
                  )}
                </div>
              )}
            </div>
          );

          const href = item.href ?? item.githubHref;

          return (
            <ScrollReveal key={i} delay={i * 0.07}>
              {href ? (
                <Link href={href} target="_blank" rel="noopener noreferrer" className="flex h-full">
                  {cardContent}
                </Link>
              ) : (
                cardContent
              )}
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}