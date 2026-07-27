import ScrollReveal from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getTranslations } from "@/hooks/useTranslation";
import type { PhilosophySection } from "@/types/portfolio-api";
import { PhilosophyCard } from "./PhilosophyCard";

interface PhilosophyProps {
  philosophy: PhilosophySection;
  locale: string;
}

export default async function Philosophy({ philosophy, locale }: PhilosophyProps) {
  if (!philosophy.cards.length) return null;

  const t = await getTranslations(locale, ["portfolio"]);

  return (
    <section
      id="philosophy"
      className="mx-auto w-full max-w-5xl px-6 py-24"
      aria-label={t(philosophy.title)}
    >
      <SectionHeader
        eyebrow={philosophy.eyebrow ? t(philosophy.eyebrow) : undefined}
        title={t(philosophy.title)}
        subtitle={philosophy.subtitle ? t(philosophy.subtitle) : undefined}
      >
        <div className="grid gap-6 sm:grid-cols-2">
          {philosophy.cards.map((card, i) => (
            <ScrollReveal key={card.id} delay={i * 0.1}>
              <PhilosophyCard card={card} t={t} />
            </ScrollReveal>
          ))}
        </div>
      </SectionHeader>
    </section>
  );
}