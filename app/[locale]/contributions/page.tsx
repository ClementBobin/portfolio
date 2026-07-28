import { Suspense } from "react";
import type { Metadata } from "next";
import { ContributionsSection, ContributionsSkeleton } from "@/components/sections/Contributions";
import type { PageParams } from "@/lib/types/global";
import { getTranslations } from "@/hooks/getTranslations";

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

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-24">
      <Suspense fallback={<ContributionsSkeleton />}>
        <ContributionsSection
          locale={locale}
          githubUsername="@clementbobin"
          githubUrl="https://github.com/clementbobin"
        />
      </Suspense>
    </main>
  );
}