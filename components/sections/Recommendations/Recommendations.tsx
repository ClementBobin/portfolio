import { getTranslations } from "@/hooks/useTranslation";
import { SectionHeader } from "@/components/ui/SectionHeader";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { RecommendationCard } from "./RecommendationCard";
import type { Recommendation } from "@/types/portfolio-api";
import { Users } from "lucide-react";

interface RecommendationsProps {
  recommendations: Recommendation[];
  locale: string;
}

export default async function Recommendations({ recommendations, locale }: RecommendationsProps) {
  if (!recommendations.length) return null;
  const t = await getTranslations(locale, ["portfolio"]);

  return (
    <section
      id="recommendations"
      className="mx-auto w-full max-w-5xl px-6 py-24"
      aria-label={t("section.recommendations")}
    >
      <SectionHeader
        eyebrow={
          <>
            <Users aria-hidden width={16} height={16} />
            {t("recommendations.badge")}
          </>
        }
        title={t("recommendations.title")}
        subtitle={t("recommendations.subtitle")}
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {recommendations.map((rec, i) => (
            <ScrollReveal key={rec.id} delay={i * 0.07}>
              <RecommendationCard rec={rec} locale={locale} />
            </ScrollReveal>
          ))}
        </div>
      </SectionHeader>
    </section>
  );
}