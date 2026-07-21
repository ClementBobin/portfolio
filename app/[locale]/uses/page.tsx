import { Suspense } from "react";
import type { Metadata } from "next";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { UsesSection, UsesSkeleton } from "@/components/sections/Uses/UsesSection";
import { getTranslations } from "@/lib/hooks/useTranslation";

interface PageParams {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations(locale, ["pages"]);
  return {
    title: t("uses.metaTitle"),
    description: t("uses.metaDescription"),
  };
}

export default async function UsesPage({ params }: PageParams) {
  const { locale } = await params;
  const t = await getTranslations(locale, ["pages"]);

  return (
      <main className="mx-auto w-full max-w-2xl px-6 py-24">
        {/* Header */}
        <ScrollReveal>
          <div className="mb-16">
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-bold tracking-tight mb-3">
              {t("uses.title")}
            </h1>
            <p className="leading-relaxed text-muted-foreground">
              {t("uses.description")}
            </p>
          </div>
        </ScrollReveal>

        {/* Content */}
        <Suspense fallback={<UsesSkeleton />}>
          <UsesSection locale={locale} errorLabel={t("uses.error")} />
        </Suspense>
      </main>
  );
}