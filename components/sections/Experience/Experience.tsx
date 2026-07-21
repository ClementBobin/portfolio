import ExperienceTimeline from "./ExperienceTimeline";
import type { Experience } from "@/types/portfolio-api";

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
export default function ExperienceSection({ experiences, locale }: ExperienceProps) {
  const heading = locale === "fr" ? "Expériences" : "Experience";

  const workExperiences = experiences.filter((e) => e.workType === "work");
  const projectExperiences = experiences.filter((e) => e.workType === "experience");

  if (!experiences.length) return null;

  return (
    <section
      id="experience"
      className="mx-auto w-full max-w-5xl px-6 py-24"
      aria-label={heading}
    >
      {workExperiences.length > 0 && (
        <div className="mb-16">
          <h3 className="mb-8 font-[family-name:var(--font-lora)] text-lg italic text-muted-foreground">
            {locale === "fr" ? "Expériences professionnelles" : "Work Experience"}
          </h3>
          <ExperienceTimeline experiences={workExperiences} locale={locale} />
        </div>
      )}

      {projectExperiences.length > 0 && (
        <div>
          <h3 className="mb-8 font-[family-name:var(--font-lora)] text-lg italic text-muted-foreground">
            {locale === "fr" ? "Projets & Expériences" : "Projects & Experience"}
          </h3>
          <ExperienceTimeline experiences={projectExperiences} locale={locale} />
        </div>
      )}
    </section>
  );
}
