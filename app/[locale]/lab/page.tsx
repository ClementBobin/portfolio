import { Suspense } from "react";
import type { Metadata } from "next";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { LabsSection, LabsSkeleton } from "@/components/sections/Labs/LabsSection";
import { getTranslations } from "@/hooks/getTranslations";
import type { PageParams } from "@/lib/types/global";

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations(locale, ["pages"]);
  return {
    title: t("labs.metaTitle"),
    description: t("labs.metaDescription"),
  };
}

export default async function LabsPage({ params }: PageParams) {
  const { locale } = await params;
  const t = await getTranslations(locale, ["pages"]);

  return (
    <>
      <main className="mx-auto w-full max-w-2xl px-6 py-24">
        <ScrollReveal>
          <div className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-2">
              {t("labs.title")}
            </h1>
            <p className="text-muted-foreground">
              {t("labs.description")}
            </p>
          </div>
        </ScrollReveal>

        <Suspense fallback={<LabsSkeleton />}>
          <LabsSection locale={locale} />
        </Suspense>
      </main>
    </>
  );
}