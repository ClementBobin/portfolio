"use client";

import * as Icons from "lucide-react";
import type { Highlight } from "@/lib/types/portfolio-api";
import { SectionHeading } from "../section-heading";

interface HighlightsSectionProps {
  highlights: Highlight[];
  locale: string;
}

function getIcon(name?: string) {
  if (!name) return Icons.Sparkles;

  const Icon = (Icons as any)[`${name}Icon`] || (Icons as any)[name];

  return Icon || Icons.Sparkles;
}

export function HighlightsSection({
  highlights,
  locale,
}: HighlightsSectionProps) {
  if (!highlights?.length) return null;

  const lang = locale?.startsWith("fr") ? "fr" : "en";

  return (
    <section className="space-y-10 min-h-screen">
      <SectionHeading
        title="Highlights"
        subtitle={lang === "fr" ? "Ce que j'ai réalisé" : "What I've done"}
      />

      {/* Cards */}
      <div className="grid md:grid-cols-2 gap-6">

        {highlights.map((h) => {
          const Icon = getIcon(h.icon);

          return (
            <div
              key={h.label[lang]}
              className={`
                rounded-2xl border p-6 transition-all
                ${
                  h.highlight
                    ? "border-primary/30 bg-primary/5"
                    : "border-border bg-card"
                }
                hover:shadow-sm
              `}
            >
              <div className="flex gap-4">

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>

                {/* Content */}
                <div className="space-y-2 flex-1">

                  {/* Title */}
                  <h3
                    className="text-lg font-semibold text-foreground"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    {h.label[lang]}
                  </h3>

                  {/* Tags */}
                  {h.tag?.length && (
                    <div className="flex flex-wrap gap-2">
                      {h.tag.map((tag, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                        >
                          {tag[lang]}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Description */}
                  {h.description?.[lang] && (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {h.description[lang]}
                    </p>
                  )}

                  {/* Links */}
                  {(h.githubHref || h.href) && (
                    <div className="flex gap-4 pt-1 text-sm">

                      {h.href && (
                        <a
                          href={h.href}
                          target="_blank"
                          className="text-primary hover:underline flex items-center gap-1"
                        >
                          {lang === "fr" ? "Voir le projet" : "View project"}
                          <Icons.ExternalLinkIcon className="w-3 h-3" />
                        </a>
                      )}

                      {h.githubHref && (
                        <a
                          href={h.githubHref}
                          target="_blank"
                          className="text-muted-foreground hover:underline flex items-center gap-1"
                        >
                          {lang === "fr" ? "Voir le code" : "View code"}
                          <Icons.GithubIcon className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

      </div>
    </section>
  );
}