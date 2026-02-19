"use server";

import { RssIcon, SparklesIcon } from "lucide-react";
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

/**
 * Props for RSS page component.
 *
 * @property params - Route parameters containing locale
 */
interface RSSPageProps {
  params: Promise<{ locale: string }>;
}

/**
 * RSS Feed page displaying latest updates from various sources.
 * Features professional layout with hero section and organized feed display.
 */
export default async function Home({ params }: RSSPageProps) {
  const { locale } = await params;
  const t = await getTranslations(locale, ["rss"]);

  const rssFeed = "https://clementbobin.github.io/obsidian/index.xml";

  return (
    <div className="min-h-screen bg-background">
      <div className="w-screen mx-auto px-4 max-w-6xl">
        {/* Breadcrumb Navigation */}
        <div className="py-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    href={`/${locale}`}
                    className="transition-colors hover:text-foreground"
                  >
                    Portfolio
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>RSS Feed</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Hero Section */}
        <header className="py-12 md:py-16 space-y-6">
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
              <div className="relative bg-primary/10 p-3 rounded-2xl">
                <RssIcon className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              {t("rssPage.title") || "Latest Updates"}
            </h1>
          </div>

          <div className="max-w-3xl mx-auto md:mx-0 text-center md:text-left space-y-4">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              {t("rssPage.description") ||
                "Stay updated with the latest content from various sources"}
            </p>

            <div className="flex items-center gap-2 text-sm text-muted-foreground justify-center md:justify-start">
              <SparklesIcon className="h-4 w-4 text-primary" />
              <span>Real-time updates from my blog and notes</span>
            </div>
          </div>
        </header>

        <Separator className="my-8" />

        {/* Feed Section */}
        <section className="pb-16">
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Recent Posts</h2>
              <a
                href={rssFeed}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <RssIcon className="h-4 w-4" />
                Subscribe to RSS
              </a>
            </div>

            <RSSFeed feedUrl={rssFeed} locale={locale} />
          </div>
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
