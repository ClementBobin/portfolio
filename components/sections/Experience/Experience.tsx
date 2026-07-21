import ExperienceTimeline from "./ExperienceTimeline";
import type { Experience } from "@/types/portfolio-api";
import { getTranslations } from "@/hooks/useTranslation";

interface ExperienceProps {
  experiences: Experience[];
  locale: string;
}

/**
 * Experience section — work and project experiences in a timeline layout.
 *
 * @param experiences - List of experience items
 * @param locale - Current locale
 */
export default async function ExperienceSection({ experiences, locale }: ExperienceProps) {
  const t = await getTranslations(locale, ["portfolio"]);

  const workExperiences = experiences.filter((e) => e.workType === "work");
  const projectExperiences = experiences.filter((e) => e.workType === "experience");

  if (!experiences.length) return null;

  return (
    <section
      id="experience"
      className="mx-auto w-full max-w-5xl px-6 py-24"
      aria-label={t("section.experience")}
    >
      {workExperiences.length > 0 && (
        <div className="mb-16">
          <h3 className="mb-8 text-lg italic text-muted-foreground">
            {t("section.workExperience")}
          </h3>
          <ExperienceTimeline experiences={workExperiences} locale={locale} />
        </div>
      )}

      {projectExperiences.length > 0 && (
        <div>
          <h3 className="mb-8 text-lg italic text-muted-foreground">
            {t("section.projectExperience")}
          </h3>
          <ExperienceTimeline experiences={projectExperiences} locale={locale} />
        </div>
      )}
    </section>
  );
}