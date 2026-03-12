import { ExternalLinkIcon } from "lucide-react";
import type { Education } from "@/lib/types/portfolio-api";
import { SectionHeading } from "../section-heading";
import { Badge } from "@/components/ui/badge";

interface EducationSectionProps {
  education: Education[];
  locale: string;
}

export function EducationSection({ education, locale }: EducationSectionProps) {
  const lang = locale.split("-")[0] as "en" | "fr";

  return (
    <section className="space-y-6">
      <SectionHeading title={lang === "fr" ? "Formation" : "Education"} />

      <div className="relative">
        {/* Vertical timeline line */}
        <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-primary/50 via-border to-transparent" />

        <div className="space-y-6 ml-0">
          {education.map((edu, i) => (
            <div key={i} className="relative flex gap-6 pl-10">
              {/* Dot */}
              <div className="absolute left-2.5 top-1 w-3 h-3 rounded-full border-2 border-primary bg-background shadow-sm" />

              {/* Content */}
              <div className="flex-1 space-y-1 pb-1">
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-base">
                        {edu.school[lang]}
                      </span>
                      {edu.href && (
                        <a
                          href={edu.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary/60 hover:text-primary transition-colors"
                        >
                          <ExternalLinkIcon className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm text-muted-foreground">
                        {edu.degree[lang]}
                      </p>
                      {edu.degreeHref && (
                        <a
                          href={edu.degreeHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary/60 hover:text-primary transition-colors"
                        >
                          <ExternalLinkIcon className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground tabular-nums whitespace-nowrap">
                    {edu.period}
                  </span>
                </div>

                {edu.specialty && (
                  <Badge variant="secondary" className="text-xs mt-1">
                    {edu.specialty[lang]}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}