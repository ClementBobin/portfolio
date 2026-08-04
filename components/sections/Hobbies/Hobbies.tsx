import ScrollReveal from "@/components/ui/ScrollReveal";
import { DynamicLucideIcon } from "@/components/icons";
import type { Hobby } from "@/lib/types/portfolio-api";
import { getTranslations } from "@/hooks/getTranslations";
import SectionHeader from "@/components/ui/SectionHeader";
import { SlideUpText } from "@/components/ui/slide-up-text";

interface HobbiesProps {
  hobbies: Hobby[];
  locale: string;
}

/**
 * Hobbies section — playful grid of personal interests and passions.
 *
 * @param hobbies - Array of hobby items
 * @param locale  - Current locale
 */
export default async function Hobbies({ hobbies, locale }: HobbiesProps) {
  if (!hobbies.length) return null;

  const t = await getTranslations(locale, ["portfolio"]);

  return (
    <section
      id="hobbies"
      className="mx-auto w-full max-w-5xl px-6 py-24"
      aria-label={t("section.hobbies")}
    >
      <SectionHeader
        title={t("hobbies.title")}
        subtitle={t("hobbies.subtitle")}
      >
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
          {hobbies.map((hobby, i) => {
            const title = t(hobby.title);
            const details = hobby.details?.map((detail) => t(detail)) ?? [];

            return (
              <ScrollReveal key={t(hobby.title)} delay={i * 0.08}>
                <div className="group flex flex-col gap-3 rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-md">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl" role="img" aria-label={title}>
                      <DynamicLucideIcon name={hobby.icon} />
                    </span>
                    <h3 className="text-lg font-semibold text-foreground">
                      <SlideUpText split="characters" stagger={0.03} delay={i * 0.08} inView once>
                        {title}
                      </SlideUpText>
                    </h3>
                  </div>

                  {details.length > 0 && (
                    <ul className="flex flex-col gap-1.5">
                      {details.map((detail) => (
                        <li key={detail} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="mt-0.5 text-accent" aria-hidden="true">•</span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </SectionHeader>
    </section>
  );
}