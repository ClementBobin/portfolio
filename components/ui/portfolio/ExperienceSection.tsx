"use client";

import {
  BriefcaseIcon,
  CalendarIcon,
  ChevronDownIcon,
  ExternalLinkIcon,
  FileTextIcon,
  GraduationCapIcon,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
} from "@/components/ui/timeline";
import type { Experience, Education, ExperienceDetails } from "@/lib/types/portfolio-api";
import { cn } from "@/lib/utils";
import { SectionHeading } from "../section-heading";

interface ExperienceSectionProps {
  experiences: Experience[];
  educations?: Education[];
  locale: string;
  cvUrl?: string;
}


function getTasks(
  tasks: ExperienceDetails["tasks"] | undefined,
  lang: "en" | "fr",
): string[] {
  if (!tasks) return [];

  // case: { en: string[], fr: string[] }
  if (typeof tasks === "object" && Array.isArray((tasks as any)[lang])) {
    return (tasks as { en: string[]; fr: string[] })[lang];
  }

  // case: { en: string, fr: string }
  if (typeof tasks === "object" && typeof (tasks as any)[lang] === "string") {
    return [(tasks as { en: string; fr: string })[lang]];
  }

  return [];
}

/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

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

    const parts = exp.period.en.split(/[-–—]/).map((s) => s.trim());

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

/* -------------------------------------------------------------------------- */
/*                           Timeline Data Builder                            */
/* -------------------------------------------------------------------------- */

type TimelineEntry =
  | { type: "experience"; date: Date | null; data: Experience }
  | { type: "education"; date: Date | null; data: Education };

function buildTimeline(
  experiences: Experience[],
  educations: Education[] = [],
): TimelineEntry[] {
  const expEntries: TimelineEntry[] = experiences.map((exp) => ({
    type: "experience",
    data: exp,
    date: parseDate(exp.period.en),
  }));

  const eduEntries: TimelineEntry[] = educations.map((edu) => ({
    type: "education",
    data: edu,
    date: parseDate(edu.period),
  }));

  return [...expEntries, ...eduEntries].sort((a, b) => {
    if (!a.date || !b.date) return 0;
    return b.date.getTime() - a.date.getTime();
  });
}

/* -------------------------------------------------------------------------- */
/*                              Experience Card                               */
/* -------------------------------------------------------------------------- */

function ExperienceCard({ exp, locale }: { exp: Experience; locale: string }) {
  const [expanded, setExpanded] = useState(false);

  const lang = locale.startsWith("fr") ? "fr" : "en";

  const hasDetails = exp.details && (exp.details.tasks || exp.details.context);

  const techList = exp.techs
    .map((t) => (typeof t === "string" ? t : t.name))
    .filter(Boolean);

  const dur = durationLabel(exp.period.en);

  return (
    <div
      className={cn(
        "rounded-xl border bg-card transition-all duration-200",
        exp.isHighlighted
          ? "border-primary/30 bg-primary/3"
          : "border-border hover:border-border/80 hover:shadow-sm",
      )}
    >
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <BriefcaseIcon className="h-4 w-4 text-primary shrink-0" />

              <span className="font-semibold text-sm">
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

            <p className="text-sm text-muted-foreground">
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
                >
                  <ExternalLinkIcon className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>

          {hasDetails && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="h-7 w-7 flex items-center justify-center"
            >
              <ChevronDownIcon
                className={cn(
                  "h-4 w-4 transition-transform",
                  expanded && "rotate-180",
                )}
              />
            </button>
          )}
        </div>

        <p className="mt-2 text-sm text-muted-foreground">
          {exp.description[lang]}
        </p>

        {techList.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {techList.map((t, i) => (
              <span
                key={i}
                className="text-xs px-2 py-0.5 rounded border border-border"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {hasDetails && expanded && (
          <div className="border-t border-border pt-4 mt-4 space-y-3">
            {exp.details?.context?.[lang] && (
              <p className="text-sm italic text-muted-foreground">
                {exp.details.context[lang]}
              </p>
            )}

            {exp.details?.tasks && (
              <ul className="space-y-1">
                {getTasks(exp.details.tasks, lang).map((task: string, i: number) => (
                  <li key={i} className="flex gap-2 text-sm">
                    <span className="w-1 h-1 bg-primary rounded-full mt-2" />
                    {task}
                  </li>
                ))}
              </ul>
            )}

            {exp.details?.env?.[lang] && (
              <div className="text-xs font-mono bg-muted/30 rounded px-3 py-2">
                {exp.details.env[lang]}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                               Education Card                               */
/* -------------------------------------------------------------------------- */

function EducationCard({ edu, locale }: { edu: Education; locale: string }) {
  const lang = locale.startsWith("fr") ? "fr" : "en";

  return (
    <div className="rounded-xl border border-dashed border-border bg-muted/20 p-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">{edu.degree[lang]}</h3>

          <p className="text-sm text-muted-foreground">
            {edu.school[lang]}
          </p>

          {edu.specialty && (
            <p className="text-xs text-muted-foreground mt-1">
              {edu.specialty[lang]}
            </p>
          )}
        </div>

        <span className="text-xs px-3 py-1 rounded-full border">
          {edu.period}
        </span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Section Component                             */
/* -------------------------------------------------------------------------- */

export function ExperienceSection({
  experiences,
  educations = [],
  locale,
  cvUrl = "https://clementbobin.github.io/cv/view",
}: ExperienceSectionProps) {
  const lang = locale.startsWith("fr") ? "fr" : "en";

  const timeline = useMemo(
    () => buildTimeline(experiences, educations),
    [experiences, educations],
  );

  const total = totalWorkDuration(experiences);

  return (
    <section className="space-y-6 min-h-screen">

      <SectionHeading
        title={lang === "fr" ? "Mon parcours" : "My Journey"}
      />

      <div className="flex items-center justify-between flex-wrap gap-4">

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
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground border rounded-lg px-3 py-1.5 bg-card"
        >
          <FileTextIcon className="h-3.5 w-3.5" />
          {lang === "fr" ? "Voir le CV complet" : "View full CV"}
          <ExternalLinkIcon className="h-3 w-3 opacity-60" />
        </a>

      </div>

      <Timeline orientation="vertical">

        {timeline.map((item, i) => (

          <TimelineItem key={i}>

            <TimelineDot
              className={cn(
                item.type === "experience"
                  ? "bg-primary/10 border-primary"
                  : "bg-muted border-border",
              )}
            >
              {item.type === "experience" ? (
                <BriefcaseIcon className="h-3 w-3" />
              ) : (
                <GraduationCapIcon className="h-3 w-3" />
              )}
            </TimelineDot>

            <TimelineConnector />

            <TimelineContent>
              {item.type === "experience" ? (
                <ExperienceCard exp={item.data} locale={locale} />
              ) : (
                <EducationCard edu={item.data} locale={locale} />
              )}
            </TimelineContent>

          </TimelineItem>

        ))}

      </Timeline>

    </section>
  );
}