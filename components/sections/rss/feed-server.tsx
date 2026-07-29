import { rssParser } from "@/lib/rss-parser";
import { getTranslations } from "@/hooks/getTranslations";
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
  feedUrl?: string;
  locale?: string;
}

/**
 * Strips HTML tags from a string, returning plain readable text.
 *
 * Used to sanitize RSS item titles and descriptions before rendering,
 * since feed content frequently embeds inline markup or CDATA remnants.
 *
 * @param value - Raw string that may contain HTML tags.
 * @returns Plain text with all tags removed.
 */
function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, "").trim();
}

/**
 * Server component that fetches and renders an RSS feed as a timeline.
 *
 * Handles missing feed URL, fetch/parse errors, and empty feeds with
 * appropriate fallback UI. Item titles and descriptions are sanitized
 * to strip embedded HTML before rendering.
 *
 * @param feedUrl - URL of the RSS feed to fetch and display.
 * @param locale  - BCP 47 locale used for date formatting and translations.
 *                  Defaults to `"en"`.
 */
export default async function RSSFeedServer({ feedUrl, locale = "en" }: RSSFeedServerProps) {
  const t = await getTranslations(locale, ["pages"]);
  if (!feedUrl) {
    return (
      <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-5 py-4">
        <p className="font-medium text-destructive">{t("rss.noFeedUrl")}</p>
        <p className="mt-1 text-sm text-destructive/80">{t("rss.noFeedUrlDescription")}</p>
      </div>
    );
  }
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
      {feed.items.map((item, i) => {
        const title = item.title ? stripHtml(item.title) : undefined;
        const description = item.description ? stripHtml(item.description) : undefined;

        return (
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
                      {title}
                    </a>
                  ) : (
                    title
                  )}
                </TimelineTitle>
                {item.pubDate && (
                  <TimelineTime dateTime={item.pubDate}>
                    {formatDate(item.pubDate, locale)}
                  </TimelineTime>
                )}
              </TimelineHeader>
              {description && (
                <TimelineDescription className="mt-2 line-clamp-3">
                  {description}
                </TimelineDescription>
              )}
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
}