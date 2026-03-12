import { Suspense } from "react";
import {
  RSSPageContent,
  type RSSPageProps,
} from "@/components/ui/rss/RSSPageContent";
import { RSSPageFallback } from "@/components/ui/rss/RSSPageFallback";

/**
 * Server Component wrapper using Suspense
 */
export default function PageWrapper({ params }: RSSPageProps) {
  return (
    <Suspense fallback={<RSSPageFallback />}>
      <RSSPageContent params={params} />
    </Suspense>
  );
}
