import ScrollReveal from "@/components/ui/ScrollReveal";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineHeader,
  TimelineItem,
  TimelineTitle,
} from "@/components/ui/timeline";
import { RepoCard, type GithubRepo } from "./RepoCard";

type GroupedRepos = Record<string, Record<string, GithubRepo[]>>;

function groupByYearMonth(repos: GithubRepo[]): GroupedRepos {
  return repos.reduce<GroupedRepos>((acc, repo) => {
    const date = new Date(repo.created_at);
    const year = String(date.getFullYear());
    const month = date.toLocaleString("en", { month: "long" });
    acc[year] ??= {};
    acc[year][month] ??= [];
    acc[year][month].push(repo);
    return acc;
  }, {});
}

async function fetchPersonalRepos(): Promise<GithubRepo[]> {
  const res = await fetch(
    "https://api.github.com/users/clementbobin/repos?sort=updated&direction=desc&per_page=100",
    {
      headers: { Accept: "application/vnd.github.v3+json" },
      next: { revalidate: 3600 },
    }
  );
  if (!res.ok) return [];
  return res.json();
}

export async function PersonalSection() {
  const repos = await fetchPersonalRepos();
  const grouped = groupByYearMonth(repos);

  if (!repos.length) return null;

  return (
    <Timeline orientation="vertical">
      {Object.entries(grouped)
        .sort(([a], [b]) => Number(b) - Number(a))
        .map(([year, months], yi) => (
          <TimelineItem key={year}>
            <TimelineDot />
            <TimelineConnector />
            <TimelineContent>
              <ScrollReveal delay={yi * 0.06}>
                <TimelineHeader>
                  <TimelineTitle className="font-[family-name:var(--font-playfair)] text-base">
                    {year}
                  </TimelineTitle>
                </TimelineHeader>

                <div className="mt-4 flex flex-col gap-8">
                  {Object.entries(months)
                    .sort(
                      ([a], [b]) =>
                        new Date(`${b} 1 ${year}`).getTime() -
                        new Date(`${a} 1 ${year}`).getTime()
                    )
                    .map(([month, mRepos]) => (
                      <div key={month}>
                        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                          {month}
                        </p>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {mRepos.map((repo) => (
                            <RepoCard key={repo.id} repo={repo} />
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              </ScrollReveal>
            </TimelineContent>
          </TimelineItem>
        ))}
    </Timeline>
  );
}

export function PersonalSkeleton() {
  return (
    <div className="flex flex-col gap-10">
      {[0, 1, 2].map((i) => (
        <div key={i}>
          <Skeleton className="mb-4 h-5 w-16 rounded" />
          <div className="grid gap-3 sm:grid-cols-2">
            {[0, 1, 2, 3].map((j) => (
              <Skeleton key={j} className="h-28 rounded-2xl" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}