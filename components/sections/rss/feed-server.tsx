"use server";

import { rssParser } from "@/lib/rss-parser";
import { getTranslations } from "@/lib/i18n";
import { formatDate } from "@/lib/utils";
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

interface RSSFeedServerProps {
  feedUrl: string;
  locale?: string;
}

export async function RSSFeedServer({
  feedUrl,
  locale = "en",
}: RSSFeedServerProps) {
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