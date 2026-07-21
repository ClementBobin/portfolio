import ScrollReveal from "@/components/ui/ScrollReveal";
import SkillBadge from "./SkillBadge";
import type { SkillSection } from "@/types/portfolio-api";

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
export default function Skills({ skills, locale }: SkillsProps) {
  const heading = locale === "fr" ? "Compétences" : "Skills";

  if (!skills.length) return null;

  return (
    <section
      id="skills"
      className="mx-auto w-full max-w-5xl px-6 py-24"
      aria-label={heading}
    >
      <div className="flex flex-col gap-12">
        {skills.map((section, sectionIdx) => {
          const title =
            typeof section.title === "string"
              ? section.title
              : section.title[locale as "en" | "fr"] ?? section.title.en ?? "";

          return (
            <ScrollReveal key={sectionIdx} delay={sectionIdx * 0.1}>
              <div>
                <h3 className="mb-6 font-[family-name:var(--font-playfair)] text-xl font-semibold text-foreground">
                  {title}
                </h3>

                {section.type === "badges" && (
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {section.items.map((item, i) => {
                      const name =
                        typeof item.name === "string"
                          ? item.name
                          : item.name[locale as "en" | "fr"] ?? item.name.en ?? "";
                      const level =
                        item.level == null
                          ? undefined
                          : typeof item.level === "string"
                          ? item.level
                          : item.level[locale as "en" | "fr"] ?? item.level.en;
                      return <SkillBadge key={i} name={name} level={level} />;
                    })}
                  </div>
                )}

                {section.type === "text" && (
                  <ul className="flex flex-wrap gap-2">
                    {section.items.map((item, i) => {
                      const name =
                        typeof item.name === "string"
                          ? item.name
                          : item.name[locale as "en" | "fr"] ?? item.name.en ?? "";
                      return (
                        <li
                          key={i}
                          className="rounded-full border border-border bg-card px-3 py-1 text-sm text-foreground"
                        >
                          {name}
                        </li>
                      );
                    })}
                  </ul>
                )}

                {section.type === "languages" && (
                  <div className="flex flex-col gap-3">
                    {section.items.map((item, i) => {
                      const name =
                        typeof item.name === "string"
                          ? item.name
                          : item.name[locale as "en" | "fr"] ?? item.name.en ?? "";
                      const level =
                        item.level == null
                          ? undefined
                          : typeof item.level === "string"
                          ? item.level
                          : item.level[locale as "en" | "fr"] ?? item.level.en;
                      return (
                        <div key={i} className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3">
                          <span className="font-medium text-foreground">{name}</span>
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
