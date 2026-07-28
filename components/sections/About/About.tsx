import ScrollReveal from "@/components/ui/ScrollReveal";
import type { PortfolioPersonal, PortfolioData } from "@/lib/types/portfolio-api";
import { getTranslations } from "@/hooks/getTranslations";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Sparkles } from "lucide-react";
import { AboutInteractive } from "./AboutInteractive";

interface AboutProps {
  personal: PortfolioPersonal;
  portfolio: PortfolioData;
  locale: string;
}

/**
 * About section — displays photo, bio summary, location, and contact links.
 *
 * @param personal - Personal portfolio data
 * @param contact - Contact items
 * @param locale - Current locale
 */
export default async function About({ personal, portfolio, locale }: AboutProps) {
  const t = await getTranslations(locale, ["portfolio"]);

  return (
    <section
      id="about"
      className="mx-auto w-full max-w-5xl px-6 py-24"
      aria-label={t("section.about")}
    >
      <SectionHeader
        eyebrow={
          <>
            <Sparkles aria-hidden width={16} height={16} />
            {t("about.badge")}
          </>
        }
      >
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          {/* Photo */}
          <ScrollReveal direction="left">
            <AboutInteractive personal={personal} portfolio={portfolio} locale={locale} />
          </ScrollReveal>

          {/* Text content */}
          <ScrollReveal direction="right">
            <div className="flex flex-col gap-6">
              <p className="text-lg leading-relaxed text-foreground/90">
                {t(personal.summary)}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </SectionHeader>
    </section>
  );
}