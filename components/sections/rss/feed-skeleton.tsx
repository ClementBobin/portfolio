import { Skeleton } from "@/components/ui/skeleton";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDescription,
  TimelineDot,
  TimelineHeader,
  TimelineItem,
  TimelineTime,
} from "@/components/ui/timeline";

/**
 * Renders a loading skeleton for RSS feed items.
 *
 * @param count - Number of feed item placeholders to display.
 */
export default function FeedSkeleton({ count = 5 }: { count?: number }) {
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