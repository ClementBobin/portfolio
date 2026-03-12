import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SkillSection } from "@/lib/types/portfolio-api";

interface SkillsSectionProps {
  skills: SkillSection[];
  locale: string;
}

function resolveString(val: string | { en: string; fr: string }, lang: string): string {
  if (typeof val === "string") return val;
  return val[lang as "en" | "fr"] ?? val.en ?? "";
}

export function SkillsSection({ skills, locale }: SkillsSectionProps) {
  const lang = locale.split("-")[0];

  return (
    <section className="space-y-6">
      <SectionHeading title={lang === "fr" ? "Compétences" : "Skills"} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((section, i) => (
          <Card
            key={i}
            className="border bg-card hover:shadow-md transition-all hover:border-primary/30 group"
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground group-hover:text-primary transition-colors">
                {section.title[lang as "en" | "fr"] ?? section.title.en}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {section.type === "badges" && (
                <div className="flex flex-wrap gap-1.5">
                  {section.items.map((item, j) => (
                    <Badge
                      key={j}
                      variant="secondary"
                      className="text-xs font-medium hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-colors cursor-default"
                    >
                      {resolveString(item.name, lang)}
                    </Badge>
                  ))}
                </div>
              )}

              {section.type === "text" && (
                <p className="text-sm text-muted-foreground">
                  {section.items.map((item) => resolveString(item.name, lang)).join(", ")}
                </p>
              )}

              {section.type === "languages" && (
                <div className="space-y-2">
                  {section.items.map((item, j) => (
                    <div key={j} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{resolveString(item.name, lang)}</span>
                      {item.level && (
                        <Badge variant="outline" className="text-xs">
                          {resolveString(item.level, lang)}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground px-2">
          {title}
        </h2>
        <div className="h-px flex-1 bg-gradient-to-l from-border to-transparent" />
      </div>
      {subtitle && <p className="text-center text-sm text-muted-foreground">{subtitle}</p>}
    </div>
  );
}