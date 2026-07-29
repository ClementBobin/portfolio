import { Suspense } from "react";
import RSSFeedServer from "./feed-server";
import FeedSkeleton from "./feed-skeleton";

interface RSSFeedProps {
  feedUrl?: string;
  locale?: string;
  skeletonCount?: number;
}

/**
 * Renders the RSS feed with a loading skeleton fallback.
 *
 * @param feedUrl - Optional RSS feed URL.
 * @param locale - Optional locale used for localized feed content.
 * @param skeletonCount - Number of skeleton items displayed while loading.
 */
export default async function RSSFeed({ feedUrl, locale, skeletonCount }: RSSFeedProps) {
  return (
    <Suspense fallback={<FeedSkeleton count={skeletonCount} />}>
      <RSSFeedServer feedUrl={feedUrl} locale={locale} />
    </Suspense>
  );
}