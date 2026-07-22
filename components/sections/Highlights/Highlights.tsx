import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import type { Highlight } from "@/types/portfolio-api";
import { DynamicLucideIcon } from "@/components/icons/dynamicLucideIcon";
import { ExternalLinkIcon, GitHubIcon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getTranslations } from "@/hooks/useTranslation";

interface HighlightsProps {
  highlights: Highlight[];
  locale: string;
}

export default async function Highlights({ highlights, locale }: HighlightsProps) {
  const t = await getTranslations(locale, ["portfolio"]);

  if (!highlights.length) return null;

  return (
    <section
      id="highlights"
      className="mx-auto w-full max-w-5xl px-6 py-24"
      aria-label={t("section.highlights")}
    >
      <ScrollReveal>
        <SectionHeader
          eyebrow={t("highlights.eyebrow")}
          title={t("highlights.title")}
        />
      </ScrollReveal>

      <div className="grid gap-4 sm:grid-cols-2">
        {highlights.map((item, i) => {
          const label = t(item.label);
          const description = item.description ? t(item.description) : undefined;
          const tags = item.tag?.map((tag) => t(tag)) ?? [];
          const href = item.href ?? item.githubHref;

          const cardContent = (
            <Card
              className={`h-full transition-all hover:shadow-md ${
                item.highlight
                  ? "border-accent/40 bg-accent/5 hover:bg-accent/8"
                  : "hover:border-accent/20"
              }`}
            >
              <CardHeader>
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
                    {item.icon ? (
                      <DynamicLucideIcon name={item.icon} size={20} />
                    ) : (
                      <span className="text-lg">⭐</span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5 min-w-0">
                    <CardTitle className="font-[family-name:var(--font-playfair)] text-base leading-snug">
                      {label}
                    </CardTitle>
                    {/* Tags */}
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs h-5">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>

              {description && (
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {description}
                  </CardDescription>
                </CardContent>
              )}

              {/* Links */}
              {(item.href || item.githubHref) && (
                <CardFooter className="gap-4">
                  {item.href && (
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                      {t("highlights.view")}
                      <ExternalLinkIcon className="size-3.5" />
                    </span>
                  )}
                  {item.githubHref && (
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
                      {t("highlights.code")}
                      <GitHubIcon className="size-3.5" />
                    </span>
                  )}
                </CardFooter>
              )}
            </Card>
          );

          return (
            <ScrollReveal key={i} delay={i * 0.06}>
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