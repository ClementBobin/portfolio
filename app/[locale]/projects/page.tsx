import { Suspense } from "react";
import type { Metadata } from "next";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { PersonalSection, PersonalSkeleton } from "@/components/sections/GitHubProjects/PersonalSection";
import { OrgSection, OrgSkeleton } from "@/components/sections/GitHubProjects/OrgSection";
import { getTranslations } from "@/lib/hooks/useTranslation";

interface PageParams {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations(locale, ["pages"]);
  return {
    title: t("projects.metaTitle"),
    description: t("projects.metaDescription"),
  };
}

export default async function ProjectsPage({ params }: PageParams) {
  const { locale } = await params;
  const t = await getTranslations(locale, ["pages"]);

  return (
      <main className="mx-auto w-full max-w-4xl px-6 py-24">
        {/* Header */}
        <ScrollReveal>
          <div className="mb-16">
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-bold tracking-tight mb-3">
              {t("projects.title")}
            </h1>
            <p className="max-w-xl leading-relaxed text-muted-foreground">
              {t("projects.description")}
            </p>
          </div>        </ScrollReveal>

        {/* Personal repos */}
        <section className="mb-20">
          <ScrollReveal>
            <h2 className="mb-8 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {t("projects.personal")}
            </h2>
          </ScrollReveal>
          <Suspense fallback={<PersonalSkeleton />}>
            <PersonalSection />
          </Suspense>        </section>

        {/* Org contributions */}
        <section>
          <ScrollReveal>
            <h2 className="mb-8 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {t("projects.org")}
            </h2>
          </ScrollReveal>
          <Suspense fallback={<OrgSkeleton />}>
            <OrgSection />
          </Suspense>
        </section>
      </main>
  );
}