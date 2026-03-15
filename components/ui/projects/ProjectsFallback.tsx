import { Skeleton } from "@/components/ui/skeleton";
import { ProjectCardSkeleton } from "./ProjectCardSkeleton";

export async function ProjectsFallback() {
  return (
    <div className="space-y-12 w-full px-4 py-12 md:py-16">
      {/* Header skeleton */}
      <div className="space-y-6">
        <Skeleton className="h-10 w-64 rounded" />
        <Skeleton className="h-4 w-3/4 rounded" />
        <Skeleton className="h-4 w-2/3 rounded" />
      </div>

      {/* Stats skeleton */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-24 w-full rounded-lg" />
        ))}
      </div>

      {/* Project cards skeleton */}
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProjectCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
