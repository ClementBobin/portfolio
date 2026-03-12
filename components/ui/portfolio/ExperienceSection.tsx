"use client";

import {
  BriefcaseIcon,
  CalendarIcon,
  ChevronDownIcon,
  CodeIcon,
  ExternalLinkIcon,
  FileTextIcon,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
} from "@/components/ui/timeline";
import type { Experience } from "@/lib/types/portfolio-api";
import { cn } from "@/lib/utils";
import { SectionHeading } from "../section-heading";

interface ExperienceSectionProps {
  experiences: Experience[];
  locale: string;
  cvUrl?: string;
}

/** Parse a loose period string into a Date. Returns null if unparseable. */
function parseDate(s: string): Date | null {
  if (!s) return null;
  const lower = s.toLowerCase().trim();
  if (/present|actuel|présent|now/.test(lower)) return new Date();
  const MONTHS: Record<string, number> = {
    jan: 0,
    feb: 1,
    fév: 1,
    mar: 2,
    apr: 3,
    avr: 3,
    may: 4,
    mai: 4,
    jun: 5,
    jul: 6,
    aug: 7,
    sep: 8,
    oct: 9,
    nov: 10,
    dec: 11,
    déc: 11,
  };
  const match = lower.match(/(\w+)\s+(\d{4})/);
  if (match) {
    const m = MONTHS[match[1].slice(0, 3)] ?? 0;
    return new Date(parseInt(match[2], 10), m);
  }
  const yearOnly = lower.match(/(\d{4})/);
  if (yearOnly) return new Date(parseInt(yearOnly[1], 10), 0);
  return null;
}

function durationLabel(periodEn: string): string | null {
  const parts = periodEn.split(/[-–—]/).map((s) => s.trim());
  if (parts.length < 2) return null;
  const start = parseDate(parts[0]);
  const end = parseDate(parts[1]);
  if (!start || !end) return null;
  const ms = end.getTime() - start.getTime();
  const months = Math.round(ms / (1000 * 60 * 60 * 24 * 30.5));
  if (months <= 0) return null;
  if (months < 12) return `${months}mo`;
  const y = Math.floor(months / 12);
  const m = months % 12;
  return m > 0 ? `${y}y ${m}mo` : `${y}y`;
}

function totalWorkDuration(experiences: Experience[]): string {
  let totalMs = 0;
  for (const exp of experiences) {
    if (exp.workType !== "work") continue;
    const periodEn = exp.period?.en ?? "";
    const parts = periodEn.split(/[-–—]/).map((s) => s.trim());
    if (parts.length < 2) continue;
    const start = parseDate(parts[0]);
    const end = parseDate(parts[1]);
    if (start && end) totalMs += Math.max(0, end.getTime() - start.getTime());
  }
  const months = Math.round(totalMs / (1000 * 60 * 60 * 24 * 30.5));
  if (months < 12) return `${months} mois`;
  const y = Math.floor(months / 12);
  const m = months % 12;
  return m > 0 ? `${y} ans ${m} mois` : `${y} ans`;
}

function ExperienceCard({ exp, locale }: { exp: Experience; locale: string }) {
  const [expanded, setExpanded] = useState(false);
  const lang = locale?.split("-")[0] === "fr" ? "fr" : "en";
  const hasDetails = exp.details && (exp.details.tasks || exp.details.context);
  const techList = exp.techs
    .map((t) => (typeof t === "string" ? t : t.name))
    .filter(Boolean);
  const dur = durationLabel(exp.period?.en ?? "");

  return (
    <div
      className={cn(
        "rounded-xl border bg-card transition-all duration-200",
        exp.isHighlighted
          ? "border-primary/30 bg-primary/[0.03] hover:border-primary/50"
          : "border-border hover:border-border/80 hover:shadow-sm",
      )}
    >
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              {exp.workType === "work" ? (
                <BriefcaseIcon className="h-4 w-4 text-primary shrink-0" />
              ) : (
                <CalendarIcon className="h-4 w-4 text-muted-foreground shrink-0" />
              )}
              <span className="font-semibold text-sm text-foreground">
                {exp.company[lang]}
              </span>
              <Badge
                variant={exp.isHighlighted ? "default" : "secondary"}
                className="text-[10px]"
              >
                {exp.type[lang]}
              </Badge>
              {exp.isHighlighted && (
                <Badge
                  variant="outline"
                  className="text-[10px] text-primary border-primary/30"
                >
                  {lang === "fr" ? "Actuel" : "Current"}
                </Badge>
              )}
            </div>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {exp.role[lang]}
            </p>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <CalendarIcon className="h-3 w-3" />
                {exp.period[lang]}
              </span>
              {dur && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-accent text-accent-foreground font-medium">
                  {dur}
                </span>
              )}
              {exp.href && (
                <a
                  href={exp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary/70 hover:text-primary transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLinkIcon className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>
          {hasDetails && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="shrink-0 h-7 w-7 rounded-lg flex items-center justify-center hover:bg-accent transition-colors"
            >
              <ChevronDownIcon
                className={cn(
                  "h-4 w-4 text-muted-foreground transition-transform duration-200",
                  expanded && "rotate-180",
                )}
              />
            </button>
          )}
        </div>

        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          {exp.description[lang]}
        </p>

        {techList.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {techList.map((t, i) => (
              <span
                key={i}
                className="text-xs px-2 py-0.5 rounded border border-border text-foreground/80"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Expandable details */}
        {hasDetails && (
          <div
            className={cn(
              "overflow-hidden transition-all duration-300",
              expanded ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0",
            )}
          >
            <div className="border-t border-border pt-4 space-y-3">
              {exp.details?.context?.[lang] && (
                <p className="text-sm italic text-muted-foreground bg-muted/50 rounded-lg px-3 py-2">
                  {exp.details.context[lang]}
                </p>
              )}
              {exp.details?.tasks && (
                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <CodeIcon className="h-3.5 w-3.5 text-primary" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {lang === "fr" ? "Tâches principales" : "Main tasks"}
                    </span>
                  </div>
                  <ul className="space-y-1">
                    {(
                      (exp.details.tasks as Record<string, string[]>)[lang] ??
                      []
                    ).map((task: string, i: number) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-foreground/80"
                      >
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-primary/60 shrink-0" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {exp.details?.env?.[lang] && (
                <div className="text-xs font-mono bg-muted/30 rounded px-3 py-2 text-muted-foreground">
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

export function ExperienceSection({
  experiences,
  locale,
  cvUrl = "https://clementbobin.github.io/cv/view",
}: ExperienceSectionProps) {
  if (!experiences?.length) return null;
  const lang = locale?.split("-")[0] === "fr" ? "fr" : "en";
  const total = totalWorkDuration(experiences);

  return (
    <section className="space-y-6">
      <SectionHeading title={lang === "fr" ? "Expérience" : "Experience"} />

      {/* Total + CV link row */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/25 bg-primary/5 text-sm font-medium text-primary">
          <BriefcaseIcon className="h-4 w-4" />
          {total}{" "}
          {lang === "fr"
            ? "d'expérience professionnelle"
            : "of professional experience"}
        </div>
        <a
          href={cvUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors border border-border rounded-lg px-3 py-1.5 bg-card hover:border-primary/30"
        >
          <FileTextIcon className="h-3.5 w-3.5" />
          {lang === "fr" ? "Voir le CV complet" : "View full CV"}
          <ExternalLinkIcon className="h-3 w-3 opacity-60" />
        </a>
      </div>

      {/* Timeline using the existing Timeline component */}
      <Timeline orientation="vertical" variant="default">
        {experiences.map((exp, _i) => (
          <TimelineItem key={exp.id}>
            <TimelineDot
              className={cn(
                exp.isHighlighted ? "border-primary" : "border-border",
                exp.workType === "work" ? "bg-primary/10" : "bg-background",
              )}
            />
            <TimelineConnector />
            <TimelineContent>
              <ExperienceCard exp={exp} locale={locale} />
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </section>
  );
}
