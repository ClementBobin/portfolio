import { Skeleton } from "@/components/ui/skeleton";

export function PortfolioFallback() {
  return (
    <div className="container mx-auto px-4 max-w-5xl py-12 space-y-20">
      {/* Hero skeleton */}
      <section className="flex flex-col md:flex-row items-center gap-10">
        <Skeleton className="w-44 h-44 rounded-2xl shrink-0" />
        <div className="flex-1 space-y-4 w-full">
          <Skeleton className="h-5 w-48 rounded-full" />
          <Skeleton className="h-12 w-3/4 rounded-xl" />
          <Skeleton className="h-6 w-2/3 rounded-lg" />
          <Skeleton className="h-16 w-full rounded-lg" />
          <div className="flex gap-2 flex-wrap">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-9 w-28 rounded-xl" />
            ))}
          </div>
        </div>
      </section>

      {/* Skills skeleton */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <Skeleton className="h-px flex-1" />
          <Skeleton className="h-4 w-20 rounded" />
          <Skeleton className="h-px flex-1" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-36 rounded-xl" />
          ))}
        </div>
      </section>

      {/* Experience skeleton */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <Skeleton className="h-px flex-1" />
          <Skeleton className="h-4 w-24 rounded" />
          <Skeleton className="h-px flex-1" />
        </div>
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-32 rounded-xl" />
        ))}
      </section>

      {/* Education skeleton */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <Skeleton className="h-px flex-1" />
          <Skeleton className="h-4 w-20 rounded" />
          <Skeleton className="h-px flex-1" />
        </div>
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-20 rounded-xl" />
        ))}
      </section>

      {/* Projects skeleton */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <Skeleton className="h-px flex-1" />
          <Skeleton className="h-4 w-16 rounded" />
          <Skeleton className="h-px flex-1" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-44 rounded-xl" />
          ))}
        </div>
      </section>
    </div>
  );
}
