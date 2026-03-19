import { CalendarIcon, ExternalLinkIcon } from "lucide-react";
import { Suspense } from "react";
import { Presence } from "@/components/presence";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getTranslations } from "@/lib/i18n";
import { rssParser } from "@/lib/rss-parser";
import { formatDate } from "@/lib/utils";

interface RSSFeedProps {
  feedUrl?: string;
  locale?: string;
}

/* -------------------------------------------------------------------------- */
/* SKELETON */
/* -------------------------------------------------------------------------- */

function FeedSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <CardHeader className="space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* SERVER COMPONENT */
/* -------------------------------------------------------------------------- */

async function RSSFeedServer({ feedUrl, locale = "en" }: RSSFeedProps) {
  const t = await getTranslations(locale, ["rss"]);

  if (!feedUrl) {
    return (
      <Alert variant="destructive">
        <AlertTitle>{t("rss.error")}</AlertTitle>
        <AlertDescription>No feed URL provided.</AlertDescription>
      </Alert>
    );
  }

  const feed = await rssParser.parseURL(feedUrl);

  if (feed.error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>{t("rss.error")}</AlertTitle>
        <AlertDescription>{feed.error}</AlertDescription>
      </Alert>
    );
  }

  if (feed.items.length === 0) {
    return (
      <Alert>
        <AlertTitle>{t("rss.noItems")}</AlertTitle>
        <AlertDescription>{t("rss.noItemsDescription")}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {feed.items.map((item, index) => (
        <Presence key={item.link} present>
          <div
            className="animate-in fade-in slide-in-from-bottom-2 duration-500"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <Card className="group h-full overflow-hidden border bg-card transition-all hover:shadow-lg hover:border-primary/50">
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                <CardHeader className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-xl font-semibold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                      {item.title}
                    </CardTitle>
                    <ExternalLinkIcon className="h-4 w-4 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground" />
                  </div>

                  {item.pubDate && (
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <CalendarIcon className="h-3.5 w-3.5" />
                        <time dateTime={item.pubDate}>
                          {formatDate(item.pubDate, locale)}
                        </time>
                      </div>
                    </div>
                  )}
                </CardHeader>

                {item.description && (
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed line-clamp-3">
                      {item.description}
                    </CardDescription>
                  </CardContent>
                )}
              </a>
            </Card>
          </div>
        </Presence>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* WRAPPER WITH AUTO SUSPENSE */
/* -------------------------------------------------------------------------- */

type RSSFeedComponent = (props: RSSFeedProps) => React.JSX.Element;

const RSSFeed = ((props: RSSFeedProps) => {
  return (
    <Suspense fallback={<FeedSkeleton />}>
      <RSSFeedServer {...props} />
    </Suspense>
  );
}) as RSSFeedComponent;

export default RSSFeed;
