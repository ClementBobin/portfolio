import ScrollReveal from "@/components/ui/ScrollReveal";
import SkillBadge from "./SkillBadge";
import type { SkillSection } from "@/types/portfolio-api";
import { getTranslations } from "@/hooks/useTranslation";

interface SkillsProps {
  skills: SkillSection[];
  locale: string;
}

/**
 * Skills section — renders grouped skill sections with badges/text/language items.
 *
 * @param skills - Array of skill sections
 * @param locale - Current locale
 */
export default async function Skills({ skills, locale }: SkillsProps) {
  const t = await getTranslations(locale, ["portfolio"]);

  if (!skills.length) return null;

  return (
    <section
      id="skills"
      className="mx-auto w-full max-w-5xl px-6 py-24"
      aria-label={t("section.skills")}
    >
      <div className="flex flex-col gap-12">
        {skills.map((section, sectionIdx) => {

          return (
            <ScrollReveal key={sectionIdx} delay={sectionIdx * 0.1}>
              <div>
                <h3 className="mb-6 text-xl font-semibold text-foreground">
                  {t(section.title)}
                </h3>

                {section.type === "badges" && (
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {section.items.map((item, i) => {
                      return <SkillBadge key={i} name={t(item.name)} level={t(item.level)} />;
                    })}
                  </div>
                )}

                {section.type === "text" && (
                  <ul className="flex flex-wrap gap-2">
                    {section.items.map((item, i) => {
                      return (
                        <li
                          key={i}
                          className="rounded-full border border-border bg-card px-3 py-1 text-sm text-foreground"
                        >
                          {t(item.name)}
                        </li>
                      );
                    })}
                  </ul>
                )}

                {section.type === "languages" && (
                  <div className="flex flex-col gap-3">
                    {section.items.map((item, i) => {
                      const level = t(item.level)
                      return (
                        <div key={i} className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3">
                          <span className="font-medium text-foreground">{t(item.name)}</span>
                          {level && (
                            <span className="text-sm text-accent font-medium">{level}</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}