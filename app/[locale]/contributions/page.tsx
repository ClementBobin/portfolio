import { Suspense } from "react";
import type { Metadata } from "next";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { ContributionsSection, ContributionsSkeleton } from "@/components/sections/Contributions/ContributionsSection";
import { getTranslations } from "@/hooks/useTranslation";
import type { PageParams } from "@/types/global";

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations(locale, ["pages"]);
  return {
    title: t("contributions.metaTitle"),
    description: t("contributions.metaDescription"),
  };
}

export default async function ContributionsPage({ params }: PageParams) {
  const { locale } = await params;
  const t = await getTranslations(locale, ["pages"]);

  return (
    <>
      <main className="mx-auto w-full max-w-2xl px-6 py-24">
        <ScrollReveal>
          <div className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-3">
              {t("contributions.title")}
            </h1>
            <p className="leading-relaxed text-muted-foreground">
              {t("contributions.description")}
            </p>
          </div>
        </ScrollReveal>

        <Suspense fallback={<ContributionsSkeleton />}>
          <ContributionsSection locale={locale} />
        </Suspense>
      </main>
    </>
  );
}