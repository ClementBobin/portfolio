import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import type { Education } from "@/types/portfolio-api";
import { getTranslations } from "@/hooks/useTranslation";

interface EducationProps {
  education: Education[];
  locale: string;
}

/**
 * Education section — displays school, degree, specialty, and period in card layout.
 *
 * @param education - Array of education items
 * @param locale - Current locale
 */
export default async function EducationSection({ education, locale }: EducationProps) {
  const t = await getTranslations(locale, ["portfolio"]);

  if (!education.length) return null;

  return (
    <section
      id="education"
      className="mx-auto w-full max-w-5xl px-6 py-24"
      aria-label={t("section.education")}
    >

      <div className="grid gap-6 md:grid-cols-2">
        {education.map((edu, i) => {
          const school = t(edu.school);
          const degree = t(edu.degree);
          const specialty = t(edu.specialty);

          return (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                {/* Decorative accent */}
                <div className="absolute left-0 top-0 h-full w-1 rounded-l-xl bg-linear-to-b from-accent to-primary" />

                <div className="pl-2">
                  <div className="mb-1 flex items-start justify-between gap-2">
                    {edu.href ? (
                      <Link
                        href={edu.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg font-semibold text-foreground hover:text-accent transition-colors"
                      >
                        {school}
                      </Link>
                    ) : (
                      <span className="text-lg font-semibold text-foreground">
                        {school}
                      </span>
                    )}
                    <span className="shrink-0 text-xs text-muted-foreground">{edu.period}</span>
                  </div>

                  {edu.degreeHref ? (
                    <Link
                      href={edu.degreeHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-accent hover:underline"
                    >
                      {degree}
                    </Link>
                  ) : (
                    <span className="text-sm font-medium text-accent">{degree}</span>
                  )}

                  {specialty && (
                    <p className="mt-1 text-sm text-muted-foreground">{specialty}</p>
                  )}
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}