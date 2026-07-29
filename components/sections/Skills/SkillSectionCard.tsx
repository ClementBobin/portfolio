import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DynamicLucideIcon } from "@/components/icons";
import SkillBadge from "./SkillBadge";
import type { SkillSection } from "@/lib/types/portfolio-api";
import { getTranslations } from "@/hooks/getTranslations";

interface SkillSectionCardProps {
  section: SkillSection;
  locale: string;
}

/**
 * Renders a single skill section as a card with a labeled icon header
 * and a grid of skill badges.
 *
 * @param section - Skill section data including title, icon, color, and items.
 * @param locale  - BCP 47 locale used for translating section and item labels.
 */
export default async function SkillSectionCard({
  section,
  locale,
}: SkillSectionCardProps) {
  const t = await getTranslations(locale, ["portfolio"]);
  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-base font-semibold">
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border icon-badge"
            style={{ "--icon-accent": section.color } as React.CSSProperties}
          >
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