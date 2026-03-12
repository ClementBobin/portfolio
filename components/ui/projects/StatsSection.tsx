import { BookmarkIcon, GitForkIcon, StarIcon } from "lucide-react";
import { StatsCard } from "./StatsCard";

interface StatsSectionProps {
  totalProjects: number;
  totalStars: number;
  totalForks: number;
}

export function StatsSection({
  totalProjects,
  totalStars,
  totalForks,
}: StatsSectionProps) {
  return (
    <section>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatsCard
          icon={BookmarkIcon}
          label="Total Projects"
          value={totalProjects}
        />
        <StatsCard icon={StarIcon} label="Total Stars" value={totalStars} />
        <StatsCard icon={GitForkIcon} label="Total Forks" value={totalForks} />
      </div>
    </section>
  );
}
