import { Skeleton } from "@/components/ui/skeleton";

export async function RSSPageFallback() {
  return (
    <div className="min-h-screen bg-background px-4 py-12 md:py-16 max-w-6xl mx-auto space-y-8">
      {/* Breadcrumb skeleton */}
      <Skeleton className="h-4 w-40 rounded" />

      {/* Hero section skeleton */}
      <div className="flex items-center gap-4">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-10 w-64 rounded" />
      </div>
      <Skeleton className="h-4 w-3/4 rounded mt-4" />
      <Skeleton className="h-4 w-1/2 rounded" />

      {/* Feed section skeleton */}
      <div className="mt-8 space-y-4">
        <Skeleton className="h-6 w-48 rounded" />
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full rounded" />
        ))}
      </div>
    </div>
  );
}
