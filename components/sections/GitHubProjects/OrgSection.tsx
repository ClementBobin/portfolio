import ScrollReveal from "@/components/ui/ScrollReveal";
import { Skeleton } from "@/components/ui/skeleton";
import { RepoCard, type GithubRepo } from "./RepoCard";

async function fetchOrgRepos(): Promise<GithubRepo[]> {
  const res = await fetch(
    "https://api.github.com/search/repositories?q=user:Latitude-OpenDATA-SIO-Saintbe&per_page=50",
    {
      headers: { Accept: "application/vnd.github.v3+json" },
      next: { revalidate: 3600 },
    }
  );
  if (!res.ok) return [];
  const data = await res.json();
  return data.items ?? [];
}

export async function OrgSection() {
  const repos = await fetchOrgRepos();
  if (!repos.length) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {repos.map((repo, i) => (
        <ScrollReveal key={repo.id} delay={i * 0.04}>
          <RepoCard repo={repo} />
        </ScrollReveal>
      ))}
    </div>
  );
}

export function OrgSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="h-28 rounded-2xl" />
      ))}
    </div>
  );
}