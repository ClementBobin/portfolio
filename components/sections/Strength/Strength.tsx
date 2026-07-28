import ScrollReveal from "@/components/ui/ScrollReveal";
import type { StrengthItem } from "@/lib/types/portfolio-api";
import { getTranslations } from "@/hooks/getTranslations";
import { StrengthExampleModal } from "./StrengthExampleModal";

interface StrengthProps {
  strength: StrengthItem;
  locale: string;
}

function getStrengthColor(value: number) {
  const percentage = Math.min(Math.max(value, 0), 100);
  const saturation = 15 + percentage * 0.7;
  const lightness = 78 - percentage * 0.45;
  return `hsl(145 ${saturation}% ${lightness}%)`;
}

export default async function Strength({ strength, locale }: StrengthProps) {
  const t = await getTranslations(locale, ["portfolio"]);

  if (!strength.strengths.length) return null;

  const example = strength.detail?.example;

  return (
    <section
      id="strengths"
      className="mx-auto w-full max-w-5xl px-6 py-24"
      aria-label={t("section.strengths")}
    >
      ...
      {example && (
        <StrengthExampleModal
          example={example}
          label={t(strength.detail!.short!) || "See a real example"}
          t={t}
        />
      )}
      ...
    </section>
  );
}