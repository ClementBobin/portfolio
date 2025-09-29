import { rssParser } from "@/lib/rss-parser";
import { getTranslations } from "@/lib/i18n";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

interface RSSFeedProps {
  feedUrls: string[];
  maxItemsPerFeed?: number;
  locale?: string;
  className?: string;
}

// Format date consistently
function formatDate(dateString: string, locale: string = "en"): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });
  } catch {
    return dateString;
  }
}

// Skeleton loader component
function FeedSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} className="animate-pulse">
          <CardHeader>
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3" />
          </CardContent>
          <CardFooter>
            <Skeleton className="h-4 w-1/3" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default async function RSSFeed({
  feedUrls,
  maxItemsPerFeed = 3,
  className = "",
  locale = "en",
}: RSSFeedProps) {
  const t = await getTranslations(locale, ["rss"]);

  try {
    const feeds = await rssParser.parseMultipleFeeds(feedUrls, maxItemsPerFeed);

    // If only one feed, display without tabs
    if (feeds.length === 1) {
      const feed = feeds[0];

      return (
        <div className={className}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>📰</span>
                {feed.title || t("rss.defaultTitle")}
              </CardTitle>
              <CardDescription>
                {feed.items.length} {t("rss.itemsAvailable")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {feed.error ? (
                <Alert variant="destructive">
                  <AlertTitle>{t("rss.error")}</AlertTitle>
                  <AlertDescription>{feed.error}</AlertDescription>
                </Alert>
              ) : feed.items.length === 0 ? (
                <Alert>
                  <AlertTitle>{t("rss.noItems")}</AlertTitle>
                  <AlertDescription>
                    {t("rss.noItemsDescription")}
                  </AlertDescription>
                </Alert>
              ) : (
                feed.items.map((item, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-4">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block hover:no-underline"
                      >
                        <CardTitle className="text-lg mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                          {item.title}
                        </CardTitle>
                      </a>

                      {item.pubDate && (
                        <CardDescription className="mb-3">
                          📅 {formatDate(item.pubDate, locale)}
                        </CardDescription>
                      )}

                      {item.description && (
                        <div
                          className="text-gray-700 dark:text-gray-300 line-clamp-2 text-sm mb-3"
                          dangerouslySetInnerHTML={{ __html: item.description }}
                        />
                      )}

                      {item.author && (
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          👤 {t("rss.by")} {item.author}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      );
    }

    // Multiple feeds with tabs
    return (
      <div className={className}>
        <Tabs defaultValue={feeds[0]?.url || "feed-0"} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-6">
            {feeds.map((feed, index) => (
              <TabsTrigger
                key={feed.url || `feed-${index}`}
                value={feed.url || `feed-${index}`}
                className="flex items-center gap-2"
              >
                <span>📰</span>
                <span className="truncate">
                  {feed.title || `${t("rss.feed")} ${index + 1}`}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>

          {feeds.map((feed, index) => (
            <TabsContent
              key={feed.url || `feed-${index}`}
              value={feed.url || `feed-${index}`}
              className="space-y-4"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {feed.title || `${t("rss.feed")} ${index + 1}`}
                  </CardTitle>
                  <CardDescription>
                    {feed.items.length} {t("rss.itemsAvailable")}
                    {feed.url && (
                      <span className="block text-xs mt-1">{feed.url}</span>
                    )}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {feed.error ? (
                    <Alert variant="destructive">
                      <AlertTitle>{t("rss.error")}</AlertTitle>
                      <AlertDescription>{feed.error}</AlertDescription>
                    </Alert>
                  ) : feed.items.length === 0 ? (
                    <Alert>
                      <AlertTitle>{t("rss.noItems")}</AlertTitle>
                      <AlertDescription>
                        {t("rss.noItemsDescription")}
                      </AlertDescription>
                    </Alert>
                  ) : (
                    feed.items.map((item, itemIndex) => (
                      <Card
                        key={itemIndex}
                        className="hover:shadow-md transition-shadow border-l-4 border-l-blue-500"
                      >
                        <CardContent className="p-4">
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block hover:no-underline"
                          >
                            <CardTitle className="text-lg mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                              {item.title}
                            </CardTitle>
                          </a>

                          <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                            {item.pubDate && (
                              <span className="flex items-center gap-1">
                                📅 {formatDate(item.pubDate, locale)}
                              </span>
                            )}
                            {item.author && (
                              <span className="flex items-center gap-1">
                                👤 {t("rss.by")} {item.author}
                              </span>
                            )}
                          </div>

                          {item.description && (
                            <div
                              className="text-gray-700 dark:text-gray-300 line-clamp-3 prose prose-sm max-w-none"
                              dangerouslySetInnerHTML={{
                                __html: item.description,
                              }}
                            />
                          )}

                          <CardFooter className="p-0 pt-3">
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
                            >
                              {t("rss.readMore")} →
                            </a>
                          </CardFooter>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    );
  } catch (error) {
    console.error("RSS feed error:", error);

    return (
      <Alert variant="destructive" className={className}>
        <AlertTitle>
          {t("rss.loadErrorTitle") || "Error Loading Feeds"}
        </AlertTitle>
        <AlertDescription>
          {t("rss.loadErrorMessage") ||
            "Failed to load RSS feeds. Please try again later."}
          <div className="mt-2 text-sm opacity-75">
            Error: {error instanceof Error ? error.message : "Unknown error"}
          </div>
        </AlertDescription>
      </Alert>
    );
  }
}

// Export skeleton for use in loading states
export { FeedSkeleton };
