import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { getTranslations } from "@/hooks/getTranslations";
import type { VisionItem } from "@/lib/types/portfolio-api";
import VisionCard from "./VisionCard";
import { Target } from "lucide-react";

interface VisionProps {
  vision: VisionItem[];
  locale: string;
}

export default async function Vision({ vision, locale }: VisionProps) {
  if (!vision.length) return null;

  const t = await getTranslations(locale, ["portfolio"]);

  return (
    <section
      id="vision"
      className="mx-auto w-full max-w-5xl px-6 py-24"
      aria-label={t("section.vision")}
    >
      <SectionHeader
        eyebrow={
          <>
            <Target aria-hidden width={16} height={16} />
            {t("vision.badge")}
          </>
        }
        title={t("vision.title")}
        subtitle={t("vision.subtitle")}
      >
        <div className="grid gap-6 sm:grid-cols-2">
          {vision.map((item, i) => (
            <ScrollReveal key={item.id} delay={i * 0.1}>
              <VisionCard item={item} locale={locale} />
            </ScrollReveal>
          ))}
        </div>
      </SectionHeader>
    </section>
  );
}