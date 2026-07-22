import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import type { Education, Experience } from "@/types/portfolio-api";
import { DynamicIcon } from "@/components/icons/dynamicLucideIcon";
import { ExternalLinkIcon } from "@/components/icons/externalLink";
import { getTranslations } from "@/hooks/useTranslation";

interface ExperienceTimelineProps {
  experiences: Experience[];
  education?: Education[];
  locale: string;
}

type TimelineItem =
  | { kind: "experience"; data: Experience; sortKey: string }
  | { kind: "education"; data: Education; sortKey: string };

/** Extract a sortable key from a period string like "2022 – 2024" or "2024 – présent". */
function parseSortKey(period: string): string {
  // Grab the last 4-digit year mentioned — end date takes priority for ordering
  const years = period.match(/\d{4}/g);
  if (!years) return "0000";
  return years[years.length - 1];
}

/**
 * Unified timeline for work experiences and education entries, sorted newest-first.
 *
 * @param experiences - Work/project experiences
 * @param education - Optional education entries to interleave
 * @param locale - Current locale
 */
export default async function ExperienceTimeline({
  experiences,
  education = [],
  locale,
}: ExperienceTimelineProps) {
  const t = await getTranslations(locale);

  const items: TimelineItem[] = [
    ...experiences.map((exp) => ({
      kind: "experience" as const,
      data: exp,
      sortKey: parseSortKey(t(exp.period)),
    })),
    ...education.map((edu) => ({
      kind: "education" as const,
      data: edu,
      sortKey: parseSortKey(edu.period),
    })),
  ].sort((a, b) => b.sortKey.localeCompare(a.sortKey));

  return (
    <div className="relative flex flex-col gap-0">
      {/* Vertical line */}
      <div className="absolute left-6 top-0 h-full w-px bg-border" aria-hidden="true" />

      {items.map((item, i) => {
        if (item.kind === "experience") {
          const exp = item.data;
          const company = t(exp.company);
          const description = t(exp.description);
          const techs = exp.techs.map((tech) =>
            typeof tech === "string" ? tech : tech.name
          );

          return (
            <ScrollReveal key={`exp-${exp.id}`} delay={i * 0.08}>
              <div className="relative flex gap-8 pb-10 pl-16">
                {/* Timeline dot — filled circle for work */}
                <div
                  className={`absolute left-4 top-1 h-4 w-4 -translate-x-1/2 rounded-full border-2 ${
                    exp.isHighlighted
                      ? "border-accent bg-accent"
                      : "border-primary bg-card"
                  }`}
                  aria-hidden="true"
                />

                <div
                  className={`w-full rounded-xl border p-5 ${
                    exp.isHighlighted
                      ? "border-accent/50 bg-accent/5"
                      : "border-border bg-card"
                  } shadow-sm transition-shadow hover:shadow-md`}
                >
                  <div className="mb-1 flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {t(exp.role)}
                      </h3>
                      {exp.href ? (
                        <Link
                          href={exp.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-accent hover:underline"
                        >
                          {company}
                          <ExternalLinkIcon className="ml-1 inline-block size-3" />
                        </Link>
                      ) : (
                        <span className="text-sm font-medium text-accent">{company}</span>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-xs text-muted-foreground">{t(exp.period)}</span>
                      <span className="rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground">
                        {t(exp.type)}
                      </span>
                    </div>
                  </div>

                  {description && (
                    <p className="mb-3 text-sm leading-relaxed text-foreground/80">
                      {description}
                    </p>
                  )}

                  {techs.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {techs.map((tech) => (
                        <DynamicIcon key={tech} iconClass={tech} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>
          );
        }

        // Education entry
        const edu = item.data;
        const school = t(edu.school);
        const degree = t(edu.degree);
        const specialty = edu.specialty ? t(edu.specialty) : undefined;

        return (
          <ScrollReveal key={`edu-${school}-${edu.period}`} delay={i * 0.08}>
            <div className="relative flex gap-8 pb-10 pl-16">
              {/* Timeline dot — hollow diamond for education */}
              <div
                className="absolute left-4 top-1 h-4 w-4 -translate-x-1/2 rotate-45 border-2 border-primary bg-background"
                aria-hidden="true"
              />

              <div className="w-full rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-1 flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <div className="mb-1 flex items-center gap-2">
                      {edu.href ? (
                        <Link
                          href={edu.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-lg font-semibold text-foreground hover:text-accent transition-colors"
                        >
                          {school}
                          <ExternalLinkIcon className="ml-1 inline-block size-3" />
                        </Link>
                      ) : (
                        <span className="text-lg font-semibold text-foreground">{school}</span>
                      )}
                    </div>
                    {edu.degreeHref ? (
                      <Link
                        href={edu.degreeHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-accent hover:underline"
                      >
                        {degree}
                        <ExternalLinkIcon className="ml-1 inline-block size-3" />
                      </Link>
                    ) : (
                      <span className="text-sm font-medium text-accent">{degree}</span>
                    )}
                    {specialty && (
                      <p className="mt-1 text-sm text-muted-foreground">{specialty}</p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-xs text-muted-foreground">{edu.period}</span>
                    <span className="rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground">
                      Formation
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        );
      })}
    </div>
  );
}