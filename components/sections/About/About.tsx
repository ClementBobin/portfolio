import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import type { PortfolioPersonal } from "@/types/portfolio-api";
import { getTranslations } from "@/hooks/useTranslation";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Sparkles } from "lucide-react";

interface AboutProps {
  personal: PortfolioPersonal;
  locale: string;
}

/**
 * About section — displays photo, bio summary, location, and contact links.
 *
 * @param personal - Personal portfolio data
 * @param contact - Contact items
 * @param locale - Current locale
 */
export default async function About({ personal, locale }: AboutProps) {
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
            <div className="relative mx-auto w-64 md:w-80">
              <div className="absolute -inset-2 rounded-2xl bg-linear-to-br from-accent/30 to-primary/20 blur-xl" />
              <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
                {personal.photo ? (
                  <AspectRatio ratio={4 / 4} className="w-full">
                    <Image
                      src={personal.photo}
                      alt={personal.name}
                      width={320}
                      height={320}
                      priority
                      className="object-cover"
                    />
                  </AspectRatio>
                ) : (
                  <div className="flex h-80 items-center justify-center bg-secondary text-8xl">
                    {personal.name.charAt(0)}
                  </div>
                )}
              </div>
              {/* Decorative corner accent */}
              <div className="absolute -bottom-3 -right-3 h-12 w-12 rounded-full bg-accent/20 border border-accent/40" />
            </div>
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