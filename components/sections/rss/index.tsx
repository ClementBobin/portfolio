import { Suspense } from "react";
import { RSSFeedServer } from "./feed-server";
import { FeedSkeleton } from "./feed-skeleton";

interface RSSFeedProps {
  feedUrl: string;
  locale?: string;
  skeletonCount?: number;
}

export function RSSFeed({ feedUrl, locale, skeletonCount }: RSSFeedProps) {
  return (
    <Suspense fallback={<FeedSkeleton count={skeletonCount} />}>
      <RSSFeedServer feedUrl={feedUrl} locale={locale} />
    </Suspense>
  );
}