import { Suspense } from "react";
import type { Metadata } from "next";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { RSSFeed } from "@/components/sections/rss";
import { FeedSkeleton } from "@/components/sections/rss/feed-skeleton";
import { getTranslations } from "@/lib/hooks/useTranslation";

const VEILLE_FEED = "https://clementbobin.github.io/obsidian/index.xml";

interface PageParams {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations(locale, ["pages"]);
  return {
    title: t("veille.metaTitle"),
    description: t("veille.metaDescription"),
  };
}

export default async function VeillePage({ params }: PageParams) {
  const { locale } = await params;
  const t = await getTranslations(locale, ["pages"]);

  return (
      <main className="mx-auto w-full max-w-3xl px-6 py-24">
        {/* Header */}
        <ScrollReveal>
          <div className="mb-16">
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-bold tracking-tight mb-3">
              {t("veille.title")}
            </h1>
            <p className="leading-relaxed text-muted-foreground">
              {t("veille.description")}
            </p>
          </div>
        </ScrollReveal>

        {/* Feed */}
        <ScrollReveal delay={0.1}>
          <Suspense fallback={<FeedSkeleton count={8} />}>
            <RSSFeed feedUrl={VEILLE_FEED} locale={locale} />
          </Suspense>
        </ScrollReveal>
      </main>
  );
}