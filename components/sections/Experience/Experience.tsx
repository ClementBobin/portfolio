import ExperienceTimeline from "./ExperienceTimeline";
import type { Education, Experience } from "@/types/portfolio-api";
import { getTranslations } from "@/hooks/useTranslation";

interface ExperienceProps {
  experiences: Experience[];
  education: Education[];
  locale: string;
}

/**
 * Unified experience + education section — both rendered in one sorted timeline.
 *
 * @param experiences - Work and project experiences
 * @param education - Education entries to interleave
 * @param locale - Current locale
 */
export default async function Experience({
  experiences,
  education,
  locale,
}: ExperienceProps) {
  const t = await getTranslations(locale, ["portfolio"]);

  if (!experiences.length && !education.length) return null;

  return (
    <section
      id="experience"
      className="mx-auto w-full max-w-5xl px-6 py-24"
      aria-label={t("section.experience")}
    >
      <ExperienceTimeline
        experiences={experiences}
        education={education}
        locale={locale}
      />
    </section>
  );
}