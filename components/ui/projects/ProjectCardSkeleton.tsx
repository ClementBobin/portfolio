import { Skeleton } from "@/components/ui/skeleton";

export async function ProjectCardSkeleton() {
  return (
    <div className="group h-full overflow-hidden border bg-card p-4 space-y-4 animate-pulse">
      <div className="flex items-center justify-between gap-2">
        <Skeleton className="h-5 w-20 rounded" />
        <Skeleton className="h-4 w-4 rounded-full" />
      </div>
      <Skeleton className="h-4 w-full rounded" />
      <Skeleton className="h-4 w-3/4 rounded" />

      <div className="flex flex-wrap items-center gap-3 mt-2">
        <Skeleton className="h-6 w-12 rounded-full" />
        <Skeleton className="h-4 w-8 rounded-full" />
        <Skeleton className="h-4 w-8 rounded-full" />
      </div>

      <Skeleton className="h-3 w-20 rounded mt-2" />
    </div>
  );
}