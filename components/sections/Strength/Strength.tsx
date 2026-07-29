import type { StrengthItem } from "@/lib/types/portfolio-api";
import { getTranslations } from "@/hooks/getTranslations";
import StrengthExampleModal from "./StrengthExampleModal";

interface StrengthProps {
  strength: StrengthItem;
  locale: string;
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
      {example && (
        <StrengthExampleModal
          example={example}
          label={t(strength.detail!.short!) || "See a real example"}
          locale={locale}
        />
      )}
    </section>
  );
}