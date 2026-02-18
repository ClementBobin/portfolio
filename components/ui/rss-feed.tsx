import { Suspense } from "react";
import { rssParser } from "@/lib/rss-parser";
import { getTranslations } from "@/lib/i18n";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { formatDate } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Presence } from "@/components/presence";

import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDescription,
  TimelineDot,
  TimelineHeader,
  TimelineItem,
  TimelineTime,
  TimelineTitle,
} from "@/components/ui/timeline";

interface RSSFeedProps {
  feedUrl: string;
  locale?: string;
}

/* -------------------------------------------------------------------------- */
/* SKELETON */
/* -------------------------------------------------------------------------- */

function FeedSkeleton({ count = 5 }: { count?: number }) {
  return (
    <Timeline activeIndex={-1} className="space-y-6">
      {Array.from({ length: count }).map((_, i) => (
        <TimelineItem key={i}>
          <TimelineDot />
          <TimelineConnector />
          <TimelineContent>
            <TimelineHeader>
              <Skeleton className="h-6 w-3/4 mb-2" />
              <TimelineTime>
                <Skeleton className="h-4 w-1/4" />
              </TimelineTime>
            </TimelineHeader>
            <TimelineDescription>
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-5/6" />
            </TimelineDescription>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}

/* -------------------------------------------------------------------------- */
/* SERVER COMPONENT */
/* -------------------------------------------------------------------------- */

async function RSSFeedServer({
  feedUrl,
  locale = "en",
}: RSSFeedProps) {
  const t = await getTranslations(locale, ["rss"]);
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
    <Timeline activeIndex={0}>
      {feed.items.map((item) => (
        <Presence key={item.link} present>
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <TimelineItem>
              <TimelineDot />
              <TimelineConnector />
              <TimelineContent>
                <TimelineHeader>
                  <TimelineTitle>{item.title}</TimelineTitle>
                  {item.pubDate && (
                    <TimelineTime dateTime={item.pubDate}>
                      {formatDate(item.pubDate, locale)}
                    </TimelineTime>
                  )}
                </TimelineHeader>

                {item.description && (
                  <TimelineDescription>
                    {item.description}
                  </TimelineDescription>
                )}
              </TimelineContent>
            </TimelineItem>
          </div>
        </Presence>
      ))}
    </Timeline>
  );
}

/* -------------------------------------------------------------------------- */
/* WRAPPER WITH AUTO SUSPENSE */
/* -------------------------------------------------------------------------- */

type RSSFeedComponent = ((props: RSSFeedProps) => JSX.Element)

const RSSFeed = ((props: RSSFeedProps) => {
  return (
    <Suspense fallback={<FeedSkeleton />}>
      <RSSFeedServer {...props} />
    </Suspense>
  );
}) as RSSFeedComponent;

export default RSSFeed;
