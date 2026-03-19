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
import { durationLabel, parseDate, totalWorkDuration } from "@/lib/duration";
import { getLanguageCode, useTranslations } from "@/lib/i18n";
import type { Education, Experience, ExperienceDetails } from "@/lib/types/portfolio-api";
import { cn } from "@/lib/utils";
import { SectionHeading } from "../section-heading";

interface ExperienceSectionProps {
  experiences?: Experience[];
  educations?: Education[];
  locale: string;
  cvUrl?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getTasks(
  tasks: ExperienceDetails["tasks"] | undefined,
  lang: "en" | "fr",
): string[] {
  if (!tasks) return [];
  if (typeof tasks === "object" && Array.isArray((tasks as any)[lang])) {
    return (tasks as { en: string[]; fr: string[] })[lang];
  }
  if (typeof tasks === "object" && typeof (tasks as any)[lang] === "string") {
    return [(tasks as { en: string; fr: string })[lang]];
  }
  return [];
}

// ─── Timeline builder ─────────────────────────────────────────────────────────

type TimelineEntry =
  | { type: "experience"; date: Date | null; data: Experience }
  | { type: "education"; date: Date | null; data: Education };

function buildTimeline(
  experiences: Experience[],
  educations: Education[],
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

// ─── Experience Card ──────────────────────────────────────────────────────────

function ExperienceCard({ exp, locale }: { exp: Experience; locale: string }) {
  const [expanded, setExpanded] = useState(false);
  const lang = getLanguageCode(locale) as "en" | "fr";
  const t = useTranslations(locale);
  const hasDetails = exp.details && (exp.details.tasks || exp.details.context);
  const techList = exp.techs
    .map((tech) => (typeof tech === "string" ? tech : tech.name))
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
              <span className="font-semibold text-sm">{t(exp.company)}</span>
              <Badge
                variant={exp.isHighlighted ? "default" : "secondary"}
                className="text-[10px]"
              >
                {t(exp.type)}
              </Badge>
              {exp.isHighlighted && (
                <Badge variant="outline" className="text-[10px] text-primary border-primary/30">
                  {lang === "fr" ? "Actuel" : "Current"}
                </Badge>
              )}
            </div>

            <p className="text-sm text-muted-foreground">{t(exp.role)}</p>

            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <CalendarIcon className="h-3 w-3" />
                {t(exp.period)}
              </span>
              {dur && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-accent text-accent-foreground font-medium">
                  {dur}
                </span>
              )}
              {exp.href && (
                <a href={exp.href} target="_blank" rel="noopener noreferrer">
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
                className={cn("h-4 w-4 transition-transform", expanded && "rotate-180")}
              />
            </button>
          )}
        </div>

        <p className="mt-2 text-sm text-muted-foreground">{t(exp.description)}</p>

        {techList.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {techList.map((tech, i) => (
              <span key={i} className="text-xs px-2 py-0.5 rounded border border-border">
                {tech}
              </span>
            ))}
          </div>
        )}

        {hasDetails && expanded && (
          <div className="border-t border-border pt-4 mt-4 space-y-3">
            {exp.details?.context && (
              <p className="text-sm italic text-muted-foreground">
                {t(exp.details.context)}
              </p>
            )}
            {exp.details?.tasks && (
              <ul className="space-y-1">
                {getTasks(exp.details.tasks, lang).map((task, i) => (
                  <li key={i} className="flex gap-2 text-sm">
                    <span className="w-1 h-1 bg-primary rounded-full mt-2" />
                    {task}
                  </li>
                ))}
              </ul>
            )}
            {exp.details?.env && (
              <div className="text-xs font-mono bg-muted/30 rounded px-3 py-2">
                {t(exp.details.env)}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Education Card ───────────────────────────────────────────────────────────

function EducationCard({ edu, locale }: { edu: Education; locale: string }) {
  const t = useTranslations(locale);

  return (
    <div className="rounded-xl border border-dashed border-border bg-muted/20 p-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">{t(edu.degree)}</h3>
          <p className="text-sm text-muted-foreground">{t(edu.school)}</p>
          {edu.specialty && (
            <p className="text-xs text-muted-foreground mt-1">{t(edu.specialty)}</p>
          )}
        </div>
        {/* period is a plain string, not localized */}
        <span className="text-xs px-3 py-1 rounded-full border">{edu.period}</span>
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function ExperienceSection({
  experiences = [],
  educations = [],
  locale,
  cvUrl,
}: ExperienceSectionProps) {
  const lang = getLanguageCode(locale) as "en" | "fr";

  const timeline = useMemo(
    () => buildTimeline(experiences, educations),
    [experiences, educations],
  );

  const total = totalWorkDuration(experiences, lang);

  return (
    <section className="space-y-6 min-h-screen">
      <SectionHeading title={lang === "fr" ? "Mon parcours" : "My Journey"} />

      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/25 bg-primary/5 text-sm font-medium text-primary">
          <BriefcaseIcon className="h-4 w-4" />
          {total}{" "}
          {lang === "fr" ? "d'expérience professionnelle" : "of professional experience"}
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