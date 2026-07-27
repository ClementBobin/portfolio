import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function ContributionsSkeleton() {
  return (
    <div className="flex flex-col gap-8">
      {/* Header skeleton */}
      <div className="flex flex-col gap-3">
        <Skeleton className="h-6 w-40 rounded-full" />
        <Skeleton className="h-10 w-80 rounded" />
        <Skeleton className="h-4 w-96 rounded" />
      </div>

      {/* Heatmap skeleton */}
      <div className="rounded-xl border border-white/10 p-5">
        <Skeleton className="mb-4 h-4 w-64 rounded" />
        <Skeleton className="h-20 w-full rounded" />
        <div className="mt-3 flex justify-between">
          <Skeleton className="h-3 w-32 rounded" />
          <Skeleton className="h-3 w-24 rounded" />
        </div>
      </div>

      {/* Cards skeleton */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {[0, 1, 2, 3].map((i) => (
          <Card key={i} className="border-white/10 ring-0">
            <CardHeader className="border-b border-white/10">
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-36 rounded" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
              <Skeleton className="h-3 w-24 rounded" />
            </CardHeader>
            <CardContent className="flex flex-col gap-3 pt-4">
              <Skeleton className="h-14 w-full rounded" />
              <div className="flex gap-1.5">
                {[0, 1, 2].map((j) => (
                  <Skeleton key={j} className="h-4 w-14 rounded-full" />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}