"use server";

import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import RSSFeed from "@/components/ui/rss-feed";
import { Separator } from "@/components/ui/separator";
import { getTranslations } from "@/lib/i18n";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations(locale, ["rss"]);

  const rssFeed = "https://clementbobin.github.io/obsidian/index.xml";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Breadcrumb Navigation */}
        <div className="mb-8">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    href={`/${locale}`}
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    Portfolio
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-gray-900 dark:text-white">
                  RSS Feed
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Separator under breadcrumb */}
          <Separator className="mt-4 bg-gray-200 dark:bg-gray-700" />
        </div>

        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t("rssPage.title") || "Latest Updates"}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t("rssPage.description") ||
              "Stay updated with the latest content from various sources"}
          </p>
        </header>

        {/* Multiple Feeds Example */}
        <section className="mb-12">
          <RSSFeed feedUrl={rssFeed} locale={locale} />
        </section>
      </div>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations(locale, ["rss"]);

  return {
    title: t("rssPage.metaTitle") || "My Feeds & Collections",
    description:
      t("rssPage.metaDescription") ||
      "Explore my latest content and curated collections",
  };
}
