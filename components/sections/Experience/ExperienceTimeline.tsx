import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import type { Education, Experience } from "@/types/portfolio-api";
import { ExternalLinkIcon } from "@/components/icons/externalLink";
import { getTranslations } from "@/hooks/useTranslation";
import { Badge } from "@/components/ui/badge";
import {
  Timeline,
  TimelineItem,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  TimelineHeader,
  TimelineTitle,
  TimelineDescription,
  TimelineTime,
} from "@/components/ui/timeline";

interface ExperienceTimelineProps {
  experiences: Experience[];
  education?: Education[];
  locale: string;
}

type TimelineItem =
  | { kind: "experience"; data: Experience; sortKey: string }
  | { kind: "education"; data: Education; sortKey: string };

function parseSortKey(period: string): string {
  const years = period.match(/\d{4}/g);
  if (!years) return "0000";
  return years[years.length - 1];
}

export default async function ExperienceTimeline({
  experiences,
  education = [],
  locale,
}: ExperienceTimelineProps) {
  const t = await getTranslations(locale, ["portfolio"]);

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
    <Timeline orientation="vertical">
      {items.map((item, i) => {
        if (item.kind === "experience") {
          const exp = item.data;
          const company = t(exp.company);
          const description = t(exp.description);
          const techs = exp.techs.map((tech) =>
            typeof tech === "string" ? tech : tech.name
          );

          return (
            <TimelineItem key={`exp-${exp.id}`}>
              <TimelineDot
                className={
                  exp.isHighlighted
                    ? "border-accent bg-accent"
                    : "border-primary bg-card"
                }
              />
              <TimelineConnector />
              <TimelineContent>
                <ScrollReveal delay={i * 0.07}>
                  <div
                    className={`rounded-xl border p-5 shadow-sm transition-shadow hover:shadow-md ${
                      exp.isHighlighted
                        ? "border-accent/50 bg-accent/5"
                        : "border-border bg-card"
                    }`}
                  >
                    <TimelineHeader>
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div className="flex flex-col gap-1">
                          <TimelineTitle className="text-base">
                            {t(exp.role)}
                          </TimelineTitle>
                          {exp.href ? (
                            <Link
                              href={exp.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline underline-offset-4"
                            >
                              {company}
                              <ExternalLinkIcon className="size-3" />
                            </Link>
                          ) : (
                            <span className="text-sm font-medium text-accent">
                              {company}
                            </span>
                          )}
                        </div>
                        <div className="flex flex-col items-end gap-1.5">
                          <TimelineTime>{t(exp.period)}</TimelineTime>
                          <Badge variant="outline" className="text-xs">
                            {t(exp.type)}
                          </Badge>
                        </div>
                      </div>
                    </TimelineHeader>

                    {description && (
                      <TimelineDescription className="mt-2 leading-relaxed">
                        {description}
                      </TimelineDescription>
                    )}

                    {techs.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {techs.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              </TimelineContent>
            </TimelineItem>
          );
        }

        // Education
        const edu = item.data;
        const school = t(edu.school);
        const degree = t(edu.degree);
        const specialty = edu.specialty ? t(edu.specialty) : undefined;

        return (
          <TimelineItem key={`edu-${school}-${edu.period}`}>
            {/* Diamond dot for education */}
            <TimelineDot className="rotate-45 rounded-none border-primary bg-background" />
            <TimelineConnector />
            <TimelineContent>
              <ScrollReveal delay={i * 0.07}>
                <div className="rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
                  <TimelineHeader>
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="flex flex-col gap-1">
                        {edu.href ? (
                          <Link
                            href={edu.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-base font-semibold text-foreground hover:text-accent transition-colors"
                          >
                            <TimelineTitle className="text-base">{school}</TimelineTitle>
                            <ExternalLinkIcon className="size-3" />
                          </Link>
                        ) : (
                          <TimelineTitle className="text-base">{school}</TimelineTitle>
                        )}

                        {edu.degreeHref ? (
                          <Link
                            href={edu.degreeHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline underline-offset-4"
                          >
                            {degree}
                            <ExternalLinkIcon className="size-3" />
                          </Link>
                        ) : (
                          <span className="text-sm font-medium text-accent">{degree}</span>
                        )}

                        {specialty && (
                          <TimelineDescription className="mt-1">
                            {specialty}
                          </TimelineDescription>
                        )}
                      </div>

                      <div className="flex flex-col items-end gap-1.5">
                        <TimelineTime>{edu.period}</TimelineTime>
                        <Badge variant="outline" className="text-xs">
                          {locale === "fr" ? "Formation" : "Education"}
                        </Badge>
                      </div>
                    </div>
                  </TimelineHeader>
                </div>
              </ScrollReveal>
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
}