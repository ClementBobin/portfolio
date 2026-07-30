import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";
import SkillSectionCard from "./SkillSectionCard";
import type { SkillSection } from "@/lib/types/portfolio-api";
import { getTranslations } from "@/hooks/getTranslations";
import { Wrench } from "lucide-react";

interface SkillsProps {
  skills: SkillSection[];
  locale: string;
}

/**
 * Renders the Skills section of the portfolio, grouping skill sections by
 * display type into a badge card grid and a flat list for text and language
 * entries.
 *
 * @param skills - Array of skill sections to display.
 * @param locale - BCP 47 locale used for translating section and item labels.
 */
export default async function Skills({ skills, locale }: SkillsProps) {
  if (!skills.length) return null;

  const t = await getTranslations(locale, ["portfolio"]);

  const badgeSections = skills.filter((s) => s.type === "badges");
  const otherSections = skills.filter((s) => s.type !== "badges");

  return (
    <section
      id="skills"
      className="mx-auto w-full max-w-5xl px-6 py-24"
      aria-label={t("section.skills")}
    >
      <SectionHeader
        eyebrow={
          <>
            <Wrench aria-hidden width={16} height={16} />
            {t("skills.badge")}
          </>
        }
        title={t("skills.title")}
        subtitle={t("skills.subtitle")}
      >
        <div className="flex flex-col gap-12">
          {/* Badge sections — card grid, 2 cols */}
          {badgeSections.length > 0 && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {badgeSections.map((section, i) => (
                <ScrollReveal key={t(section.title)} delay={i * 0.07}>
                  <SkillSectionCard section={section} locale={locale} />
                </ScrollReveal>
              ))}
            </div>
          )}

          {/* text + language sections — flat list, original style */}
          {otherSections.map((section, i) => (
            <ScrollReveal
              key={t(section.title)}
              delay={(badgeSections.length + i) * 0.07}
            >
              <div className="flex flex-col gap-5">
                <h3 className="text-xl font-semibold text-foreground">
                  {t(section.title)}
                </h3>

                {section.type === "text" && (
                  <ul className="flex flex-wrap gap-2">
                    {section.items.map((item) => (
                      <li
                        key={t(item.name)}
                        className="rounded-full border border-border bg-card px-3 py-1 text-sm text-foreground"
                      >
                        {t(item.name)}
                      </li>
                    ))}
                  </ul>
                )}

                {section.type === "languages" && (
                  <div className="flex flex-col gap-3">
                    {section.items.map((item) => {
                      const level = t(item.level);
                      return (
                        <div
                          key={t(item.name)}
                          className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3"
                        >
                          <span className="font-medium text-foreground">
                            {t(item.name)}
                          </span>
                          {level && (
                            <span className="text-sm font-medium text-accent">
                              {level}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </SectionHeader>
    </section>
  );
}