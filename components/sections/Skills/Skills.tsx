import ScrollReveal from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DynamicLucideIcon } from "@/components/icons";
import SkillBadge from "./SkillBadge";
import type { SkillSection } from "@/types/portfolio-api";
import { getTranslations } from "@/hooks/useTranslation";
import { Wrench } from "lucide-react";

interface SkillsProps {
  skills: SkillSection[];
  locale: string;
}

async function SkillSectionCard({
  section,
  locale
}: {
  section: SkillSection;
  locale: string;
}) {
  const t = await getTranslations(locale, ["portfolio"]);
  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-base font-semibold">
          <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border icon-badge `} style={{ "--icon-accent": section.color } as React.CSSProperties}>
            <DynamicLucideIcon name={section.icon} size={18} />
          </span>
          {t(section.title)}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-3">
        <div className="grid grid-cols-3 gap-2">
          {section.items.map((item) => (
            <SkillBadge
              key={t(item.name)}
              name={t(item.name)}
              level={t(item.level)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

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
                <ScrollReveal key={i} delay={i * 0.07}>
                  <SkillSectionCard section={section} locale={locale} />
                </ScrollReveal>
              ))}
            </div>
          )}

          {/* text + language sections — flat list, original style */}
          {otherSections.map((section, i) => (
            <ScrollReveal key={i} delay={(badgeSections.length + i) * 0.07}>
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