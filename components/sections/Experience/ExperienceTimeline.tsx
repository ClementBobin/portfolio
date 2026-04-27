import * as React from "react";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import TechBadge from "@/components/ui/TechBadge";
import type { Experience } from "@/lib/types/portfolio-api";

interface ExperienceTimelineProps {
  experiences: Experience[];
  locale: string;
}

/**
 * Timeline-style experience list with tech badges and expandable details.
 *
 * @param experiences - List of experience items
 * @param locale - Current locale
 */
export default function ExperienceTimeline({ experiences, locale }: ExperienceTimelineProps) {
  return (
    <div className="relative flex flex-col gap-0">
      {/* Vertical line */}
      <div className="absolute left-6 top-0 h-full w-px bg-border" aria-hidden="true" />

      {experiences.map((exp, i) => {
        const company = exp.company[locale as "en" | "fr"] ?? exp.company.en ?? "";
        const role = exp.role[locale as "en" | "fr"] ?? exp.role.en ?? "";
        const period = exp.period[locale as "en" | "fr"] ?? exp.period.en ?? "";
        const description = exp.description[locale as "en" | "fr"] ?? exp.description.en ?? "";
        const type = exp.type[locale as "en" | "fr"] ?? exp.type.en ?? "";

        const techs = exp.techs.map((t) =>
          typeof t === "string" ? t : t.name
        );

        return (
          <ScrollReveal key={exp.id} delay={i * 0.08}>
            <div className="relative flex gap-8 pb-10 pl-16">
              {/* Timeline dot */}
              <div
                className={`absolute left-4 top-1 h-4 w-4 -translate-x-1/2 rounded-full border-2 ${
                  exp.isHighlighted
                    ? "border-accent bg-accent"
                    : "border-primary bg-card"
                }`}
                aria-hidden="true"
              />

              {/* Content card */}
              <div
                className={`w-full rounded-xl border p-5 ${
                  exp.isHighlighted
                    ? "border-accent/50 bg-accent/5"
                    : "border-border bg-card"
                } shadow-sm transition-shadow hover:shadow-md`}
              >
                <div className="mb-1 flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-foreground">
                      {role}
                    </h3>
                    {exp.href ? (
                      <Link
                        href={exp.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-accent hover:underline"
                      >
                        {company}
                      </Link>
                    ) : (
                      <span className="text-sm font-medium text-accent">{company}</span>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-xs text-muted-foreground">{period}</span>
                    <span className="rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground">
                      {type}
                    </span>
                  </div>
                </div>

                {description && (
                  <p className="mb-3 text-sm leading-relaxed text-foreground/80">{description}</p>
                )}

                {techs.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {techs.map((tech) => (
                      <TechBadge key={tech} name={tech} size="sm" />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </ScrollReveal>
        );
      })}
    </div>
  );
}
