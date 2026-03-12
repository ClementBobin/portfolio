"use client";

import { useState } from "react";
import { ChevronDownIcon, ExternalLinkIcon, BriefcaseIcon, CalendarIcon, CodeIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Experience } from "@/lib/types/portfolio-api";
import { SectionHeading } from "./SkillsSection";

interface ExperienceSectionProps {
  experiences: Experience[];
  locale: string;
}

function ExperienceCard({ exp, locale }: { exp: Experience; locale: string }) {
  const [expanded, setExpanded] = useState(false);
  const lang = locale.split("-")[0] as "en" | "fr";
  const hasDetails = exp.details && (exp.details.tasks || exp.details.context);

  const techList = exp.techs
    .map((t) => (typeof t === "string" ? t : t.name))
    .filter(Boolean);

  return (
    <Card
      className={cn(
        "border transition-all duration-300",
        exp.isHighlighted
          ? "border-primary/40 bg-primary/5 hover:border-primary/60"
          : "bg-card hover:border-border/80 hover:shadow-sm",
        expanded && "shadow-md"
      )}
    >
      <CardContent className="p-5">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              {exp.workType === "work" ? (
                <BriefcaseIcon className="h-4 w-4 text-primary shrink-0" />
              ) : (
                <CalendarIcon className="h-4 w-4 text-muted-foreground shrink-0" />
              )}
              <span className="font-semibold text-base leading-tight">
                {exp.company[lang]}
              </span>
              <Badge
                variant={exp.isHighlighted ? "default" : "secondary"}
                className="text-[10px] font-medium"
              >
                {exp.type[lang]}
              </Badge>
              {exp.isHighlighted && (
                <Badge variant="outline" className="text-[10px] text-primary border-primary/40">
                  {lang === "fr" ? "Actuel" : "Current"}
                </Badge>
              )}
            </div>

            <p className="mt-1 text-sm text-muted-foreground font-medium">
              {exp.role[lang]}
            </p>

            <div className="flex items-center gap-1.5 mt-1">
              <CalendarIcon className="h-3 w-3 text-muted-foreground/60" />
              <span className="text-xs text-muted-foreground">{exp.period[lang]}</span>
              {exp.href && (
                <a
                  href={exp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1 inline-flex items-center gap-0.5 text-xs text-primary/70 hover:text-primary transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLinkIcon className="h-2.5 w-2.5" />
                </a>
              )}
            </div>
          </div>

          {/* Expand button */}
          {hasDetails && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="shrink-0 h-8 w-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors"
              aria-label={expanded ? "Collapse" : "Expand"}
            >
              <ChevronDownIcon
                className={cn("h-4 w-4 text-muted-foreground transition-transform duration-300", expanded && "rotate-180")}
              />
            </button>
          )}
        </div>

        {/* Description */}
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          {exp.description[lang]}
        </p>

        {/* Tech badges */}
        {techList.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {techList.map((tech, i) => (
              <Badge key={i} variant="outline" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>
        )}

        {/* Expanded details */}
        {hasDetails && (
          <div
            className={cn(
              "overflow-hidden transition-all duration-300",
              expanded ? "max-h-[600px] opacity-100 mt-4" : "max-h-0 opacity-0"
            )}
          >
            <div className="border-t border-border pt-4 space-y-4">
              {exp.details?.context && (
                <div className="text-sm text-muted-foreground bg-muted/50 rounded-lg px-3 py-2 italic">
                  {exp.details.context[lang]}
                </div>
              )}

              {exp.details?.tasks && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <CodeIcon className="h-3.5 w-3.5 text-primary" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {lang === "fr" ? "Tâches principales" : "Main tasks"}
                    </span>
                  </div>
                  <ul className="space-y-1.5 ml-1">
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
                <div className="text-xs text-muted-foreground bg-muted/30 rounded px-3 py-2 font-mono">
                  {exp.details.env[lang]}
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function ExperienceSection({ experiences, locale }: ExperienceSectionProps) {
  const lang = locale.split("-")[0];
  return (
    <section className="space-y-6">
      <SectionHeading title={lang === "fr" ? "Expérience" : "Experience"} />
      <div className="space-y-3">
        {experiences.map((exp) => (
          <ExperienceCard key={exp.id} exp={exp} locale={locale} />
        ))}
      </div>
    </section>
  );
}