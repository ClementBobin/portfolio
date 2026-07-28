import ExperienceTimeline from "./ExperienceTimeline";
import type { Education, Experience } from "@/lib/types/portfolio-api";
import { getTranslations } from "@/hooks/getTranslations";
import { SectionHeader } from "@/components/ui/SectionHeader"
import { GraduationCap } from "lucide-react";

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
      <SectionHeader
        eyebrow={
          <>
            <GraduationCap aria-hidden width={16} height={16} />
            {t("skills.badge")}
          </>
        }
        title={t("skills.title")}
        subtitle={t("skills.subtitle")}
      >
        <ExperienceTimeline
          experiences={experiences}
          education={education}
          locale={locale}
        />
      </SectionHeader>
    </section>
  );
}