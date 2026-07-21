"use server";

import { rssParser } from "@/lib/rss-parser";
import { getTranslations } from "@/lib/hooks/useTranslation";
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

export async function RSSFeedServer({ feedUrl, locale = "en" }: RSSFeedServerProps) {
  const t = await getTranslations(locale, ["pages"]);
  const feed = await rssParser.parseURL(feedUrl);

  if (feed.error) {
    return (
      <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-5 py-4">
        <p className="font-medium text-destructive">{t("rss.error")}</p>
        <p className="mt-1 text-sm text-destructive/80">{feed.error}</p>
      </div>
    );
  }

  if (feed.items.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card px-5 py-4 text-muted-foreground">
        <p className="font-medium">{t("rss.noItems")}</p>
        <p className="mt-1 text-sm">{t("rss.noItemsDescription")}</p>
      </div>
    );
  }

  return (
    <Timeline activeIndex={0}>
      {feed.items.map((item, i) => (
        <TimelineItem key={item.link ?? i}>
          <TimelineDot />
          <TimelineConnector />
          <TimelineContent className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <TimelineHeader>
              <TimelineTitle>
                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline underline-offset-4 transition-colors hover:text-accent"
                  >
                    {item.title}
                  </a>
                ) : (
                  item.title
                )}
              </TimelineTitle>
              {item.pubDate && (
                <TimelineTime dateTime={item.pubDate}>
                  {formatDate(item.pubDate, locale)}
                </TimelineTime>
              )}
            </TimelineHeader>
            {item.description && (
              <TimelineDescription className="mt-2 line-clamp-3">
                {item.description}
              </TimelineDescription>
            )}
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}