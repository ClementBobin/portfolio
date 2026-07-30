import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

/**
 * Renders a placeholder skeleton list while lab experiment data is loading.
 */
export default async function LabsSkeleton() {
  return (
    <ul className="flex flex-col gap-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <li key={i}>
          <Card>
            <CardHeader>
              <Skeleton className="h-5 w-48 rounded" />
              <Skeleton className="h-4 w-3/4 rounded" />
            </CardHeader>
            <CardContent>
              <div className="flex gap-1.5">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-12 rounded-full" />
                <Skeleton className="h-5 w-20 rounded-full" />
              </div>
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  );
}