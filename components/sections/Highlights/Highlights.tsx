import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import type { Highlight } from "@/lib/types/portfolio-api";
import { DynamicIcon } from "@/components/icons/dynamicLucideIcon";
import { Item } from "three/examples/jsm/inspector/ui/Item.js";

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
export default function Highlights({ highlights, locale }: HighlightsProps) {
  const heading = locale === "fr" ? "Points forts" : "Highlights";

  if (!highlights.length) return null;

  return (
    <section
      id="highlights"
      className="mx-auto w-full max-w-5xl px-6 py-24"
      aria-label={heading}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {highlights.map((item, i) => {
          const label = item.label[locale as "en" | "fr"] ?? item.label.en ?? "";
          const description = item.description
            ? item.description[locale as "en" | "fr"] ?? item.description.en
            : undefined;
          const tags = item.tag?.map((t) => t[locale as "en" | "fr"] ?? t.en ?? "") ?? [];

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
                <h3 className="font-[family-name:var(--font-playfair)] font-semibold text-foreground">
                  {label}
                </h3>
                {description && (
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
                )}
              </div>

              {(item.href ?? item.githubHref) && (
                <div className="mt-auto flex gap-2">
                  {item.href && (
                    <span className="text-xs text-accent">
                      {locale === "fr" ? "Voir →" : "View →"}
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
