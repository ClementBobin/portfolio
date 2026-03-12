"use client";

import { useState } from "react";
import {
  ChevronDownIcon,
  ExternalLinkIcon,
  BriefcaseIcon,
  CalendarIcon,
  CodeIcon,
  GraduationCapIcon,
  HeartIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Experience, Education } from "@/lib/types/portfolio-api";
import { SectionHeading } from "../section-heading";

interface TimelineSectionProps {
  experiences: Experience[];
  education: Education[];
  locale: string;
}

type TimelineItem =
  | { kind: "experience"; data: Experience; year: number }
  | { kind: "education"; data: Education; year: number };

function parseYear(period: string): number {
  // Extract first year from period strings like "Sep 2025 - Présent" or "2025 - 2026"
  const match = period.match(/\d{4}/);
  return match ? parseInt(match[0]) : 0;
}

function ExperienceCard({ exp, locale, isLast }: { exp: Experience; locale: string; isLast: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const lang = locale.split("-")[0] as "en" | "fr";
  const hasDetails = exp.details && (exp.details.tasks || exp.details.context);
  const techList = exp.techs.map((t) => (typeof t === "string" ? t : t.name)).filter(Boolean);

  const iconMap: Record<string, typeof BriefcaseIcon> = {
    work: BriefcaseIcon,
    experience: HeartIcon,
  };
  const Icon = iconMap[exp.workType] ?? BriefcaseIcon;

  return (
    <div className="relative pl-10">
      {/* Connector line */}
      {!isLast && (
        <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-gradient-to-b from-border to-transparent" />
      )}
      {/* Icon dot */}
      <div
        className={cn(
          "absolute left-2 top-2 h-4 w-4 rounded-full border-2 flex items-center justify-center",
          exp.isHighlighted
            ? "border-primary bg-primary shadow-[0_0_8px_rgba(var(--primary),0.4)]"
            : "border-border bg-background",
        )}
      >
        <Icon className={cn("h-2 w-2", exp.isHighlighted ? "text-primary-foreground" : "text-muted-foreground")} />
      </div>

      <div
        className={cn(
          "rounded-2xl border-2 p-5 transition-all duration-300",
          exp.isHighlighted
            ? "border-primary/30 bg-primary/5 hover:border-primary/50"
            : "border-border/60 bg-card hover:border-border",
          expanded && "shadow-md",
        )}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-base">{exp.company[lang]}</span>
              <Badge
                variant={exp.isHighlighted ? "default" : "secondary"}
                className="text-[10px]"
              >
                {exp.type[lang]}
              </Badge>
              {exp.isHighlighted && (
                <span className="text-[10px] font-semibold text-primary bg-primary/10 border border-primary/30 rounded-md px-1.5 py-0.5">
                  {lang === "fr" ? "Actuel" : "Current"}
                </span>
              )}
            </div>
            <p className="mt-0.5 text-sm font-medium text-muted-foreground">{exp.role[lang]}</p>
            <div className="flex items-center gap-1.5 mt-1">
              <CalendarIcon className="h-3 w-3 text-muted-foreground/50" />
              <span className="text-xs text-muted-foreground">{exp.period[lang]}</span>
              {exp.href && (
                <a href={exp.href} target="_blank" rel="noopener noreferrer"
                  className="ml-1 text-primary/60 hover:text-primary transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLinkIcon className="h-2.5 w-2.5" />
                </a>
              )}
            </div>
          </div>
          {hasDetails && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="shrink-0 h-8 w-8 rounded-xl hover:bg-muted flex items-center justify-center transition-colors"
            >
              <ChevronDownIcon
                className={cn("h-4 w-4 text-muted-foreground transition-transform duration-300", expanded && "rotate-180")}
              />
            </button>
          )}
        </div>

        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{exp.description[lang]}</p>

        {techList.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {techList.map((tech, i) => (
              <Badge key={i} variant="outline" className="text-xs">{tech}</Badge>
            ))}
          </div>
        )}

        {hasDetails && (
          <div
            className={cn(
              "overflow-hidden transition-all duration-300",
              expanded ? "max-h-[600px] opacity-100 mt-4" : "max-h-0 opacity-0",
            )}
          >
            <div className="border-t border-border pt-4 space-y-3">
              {exp.details?.context && (
                <p className="text-sm text-muted-foreground bg-muted/50 rounded-xl px-3 py-2 italic">
                  {exp.details.context[lang]}
                </p>
              )}
              {exp.details?.tasks && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <CodeIcon className="h-3.5 w-3.5 text-primary" />
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {lang === "fr" ? "Tâches" : "Tasks"}
                    </span>
                  </div>
                  <ul className="space-y-1.5">
                    {(exp.details.tasks[lang] as string[]).map((task, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                        <span className="mt-2 w-1 h-1 rounded-full bg-primary/60 shrink-0" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {exp.details?.env && (
                <div className="text-xs text-muted-foreground bg-muted/30 rounded-lg px-3 py-2 font-mono">
                  {exp.details.env[lang]}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function EducationCard({ edu, locale, isLast }: { edu: Education; locale: string; isLast: boolean }) {
  const lang = locale.split("-")[0] as "en" | "fr";

  return (
    <div className="relative pl-10">
      {!isLast && (
        <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-gradient-to-b from-border to-transparent" />
      )}
      <div className="absolute left-2 top-2 h-4 w-4 rounded-full border-2 border-primary/40 bg-primary/10 flex items-center justify-center">
        <GraduationCapIcon className="h-2 w-2 text-primary/70" />
      </div>

      <div className="rounded-2xl border-2 border-border/60 bg-card hover:border-border p-5 transition-all duration-300">
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="font-bold text-base">{edu.school[lang]}</span>
              {edu.href && (
                <a href={edu.href} target="_blank" rel="noopener noreferrer"
                  className="text-primary/60 hover:text-primary transition-colors"
                >
                  <ExternalLinkIcon className="h-3 w-3" />
                </a>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{edu.degree[lang]}</p>
          </div>
          <span className="text-xs text-muted-foreground tabular-nums whitespace-nowrap">
            {edu.period}
          </span>
        </div>
        {edu.specialty && (
          <Badge variant="secondary" className="text-xs mt-2">{edu.specialty[lang]}</Badge>
        )}
      </div>
    </div>
  );
}

export function TimelineSection({ experiences, education, locale }: TimelineSectionProps) {
  const lang = locale.split("-")[0] as "en" | "fr";

  // Merge all items with parsed years, sort descending
  const items: TimelineItem[] = [
    ...experiences.map((exp) => ({
      kind: "experience" as const,
      data: exp,
      year: parseYear(exp.period[lang]),
    })),
    ...education.map((edu) => ({
      kind: "education" as const,
      data: edu,
      year: parseYear(edu.period),
    })),
  ].sort((a, b) => b.year - a.year);

  // Group by year
  const grouped: Record<number, TimelineItem[]> = {};
  for (const item of items) {
    const y = item.year || 0;
    if (!grouped[y]) grouped[y] = [];
    grouped[y].push(item);
  }

  const years = Object.keys(grouped)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <section id="timeline" className="space-y-6">
      <SectionHeading
        title={lang === "fr" ? "Parcours" : "Journey"}
        subtitle={lang === "fr" ? "Expériences & Formation" : "Experience & Education"}
      />

      <div className="space-y-8">
        {years.map((year) => (
          <div key={year} className="relative">
            {/* Year marker */}
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border" />
              <div className="flex items-center gap-1.5 bg-primary/10 border border-primary/20 rounded-full px-3 py-1">
                <span className="text-xs font-bold text-primary tabular-nums">{year || "—"}</span>
              </div>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border" />
            </div>

            <div className="space-y-4">
              {grouped[year].map((item, idx) => {
                const isLastInGroup = idx === grouped[year].length - 1;
                const isLastYear = year === years[years.length - 1];
                const isLast = isLastInGroup && isLastYear;

                if (item.kind === "experience") {
                  return (
                    <ExperienceCard
                      key={item.data.id}
                      exp={item.data}
                      locale={locale}
                      isLast={isLast}
                    />
                  );
                }
                return (
                  <EducationCard
                    key={`${item.data.school[lang]}-${item.data.period}`}
                    edu={item.data}
                    locale={locale}
                    isLast={isLast}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}