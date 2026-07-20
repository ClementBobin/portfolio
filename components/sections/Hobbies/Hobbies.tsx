import ScrollReveal from "@/components/ui/ScrollReveal";
import {DynamicLucideIcon} from "@/components/icons";
import type { Hobby } from "@/lib/types/portfolio-api";

interface HobbiesProps {
  hobbies: Hobby[];
  locale: string;
}

/**
 * Hobbies section — playful grid of personal interests and passions.
 *
 * @param hobbies - Array of hobby items
 * @param locale - Current locale
 */
export default function Hobbies({ hobbies, locale }: HobbiesProps) {
  const heading = locale === "fr" ? "Centres d'intérêt" : "Hobbies & Interests";
  const lang = locale as "en" | "fr";

  if (!hobbies.length) return null;

  return (
    <section
      id="hobbies"
      className="mx-auto w-full max-w-5xl px-6 py-24"
      aria-label={heading}
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {hobbies.map((hobby, i) => {
        const title =
          hobby.title?.[lang] ??
          hobby.title?.en ??
          "";

        const details = (hobby.details ?? []).map(
          d => d?.[lang] ?? d?.en ?? ""
        );

          return (
            <ScrollReveal key={i} delay={i * 0.08}>
              <div className="group flex flex-col gap-3 rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-md">
                <div className="flex items-center gap-3">
                  <span className="text-3xl" role="img" aria-label={title}>
                    <DynamicLucideIcon name={hobby.icon} />
                  </span>
                  <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-foreground">
                    {title}
                  </h3>
                </div>

                {details.length > 0 && (
                  <ul className="flex flex-col gap-1.5">
                    {details.map((detail, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
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
    </section>
  );
}
