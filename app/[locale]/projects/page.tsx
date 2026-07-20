import { Suspense } from "react";
import { ExternalLink, GitFork, Star } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Skeleton } from "@/components/ui/skeleton";
import { Status, StatusIndicator, StatusLabel } from "@/components/ui/status";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineHeader,
  TimelineItem,
  TimelineTitle,
} from "@/components/ui/timeline";

// ─── Types ────────────────────────────────────────────────────────────────────

interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  created_at: string;
  updated_at: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  fork: boolean;
}

interface GroupedRepos {
  [year: string]: {
    [month: string]: GithubRepo[];
  };
}

// ─── Data fetching ────────────────────────────────────────────────────────────

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

// ─── Helpers ──────────────────────────────────────────────────────────────────

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

function relativeTime(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86_400_000);
  if (days === 0) return "today";
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "bg-blue-500",
  JavaScript: "bg-yellow-400",
  Kotlin: "bg-purple-500",
  Python: "bg-green-500",
  "C#": "bg-green-700",
  Nix: "bg-sky-500",
  HTML: "bg-orange-500",
  CSS: "bg-pink-500",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function RepoCard({ repo }: { repo: GithubRepo }) {
  const color = repo.language ? (LANGUAGE_COLORS[repo.language] ?? "bg-muted-foreground") : null;

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-2 rounded-lg border bg-card p-4 transition-colors hover:bg-accent/15"
    >
      <div className="flex items-start justify-between gap-2">
        <span className="font-medium text-sm group-hover:underline underline-offset-4 break-all">
          {repo.name}
        </span>
        <ExternalLink
          size={13}
          className="mt-0.5 shrink-0 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
        />
      </div>

      {repo.description && (
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {repo.description}
        </p>
      )}

      <div className="mt-auto flex flex-wrap items-center gap-3 pt-1">
        {color && repo.language && (
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className={`size-2 rounded-full ${color}`} />
            {repo.language}
          </span>
        )}
        {repo.stargazers_count > 0 && (
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star size={11} />
            {repo.stargazers_count}
          </span>
        )}
        {repo.forks_count > 0 && (
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <GitFork size={11} />
            {repo.forks_count}
          </span>
        )}
        <span className="ml-auto text-xs text-muted-foreground">
          {relativeTime(repo.updated_at)}
        </span>
      </div>
    </a>
  );
}

function RepoGridSkeleton() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="h-28 rounded-lg" />
      ))}
    </div>
  );
}

// ─── Async sections ───────────────────────────────────────────────────────────

async function PersonalSection() {
  const repos = await fetchPersonalRepos();
  const grouped = groupByYearMonth(repos);

  return (
    <Timeline orientation="vertical">
      {Object.entries(grouped)
        .sort(([a], [b]) => Number(b) - Number(a))
        .map(([year, months], yi) => (
          <TimelineItem key={year}>
            <TimelineDot />
            <TimelineConnector />
            <TimelineContent>
              <ScrollReveal delay={yi * 0.05}>
                <TimelineHeader>
                  <TimelineTitle className="text-base">{year}</TimelineTitle>
                </TimelineHeader>

                <div className="mt-4 flex flex-col gap-6">
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

async function OrgSection() {
  const repos = await fetchOrgRepos();

  if (!repos.length) return null;

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {repos.map((repo, i) => (
        <ScrollReveal key={repo.id} delay={i * 0.04}>
          <RepoCard repo={repo} />
        </ScrollReveal>
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

interface PageParams {
  params: Promise<{ locale: string }>;
}

export default async function ProjectsPage({ params }: PageParams) {
  await params; // locale available if needed for i18n later

  return (
    <main className="mx-auto max-w-4xl px-6 py-20">
      {/* Header */}
      <ScrollReveal>
        <div className="mb-16">
          <Status variant="info" className="mb-4">
            <StatusIndicator />
            <StatusLabel>Open source</StatusLabel>
          </Status>
          <h1 className="text-3xl font-bold tracking-tight mb-3">Projects</h1>
          <p className="text-muted-foreground leading-relaxed max-w-xl">
            A chronological view of everything I have shipped — personal repos
            and organization contributions, grouped by creation date.
          </p>
        </div>
      </ScrollReveal>

      {/* Personal repos */}
      <section className="mb-20">
        <ScrollReveal>
          <h2 className="mb-8 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Personal projects
          </h2>
        </ScrollReveal>

        <Suspense fallback={<RepoGridSkeleton />}>
          <PersonalSection />
        </Suspense>
      </section>

      {/* Org contributions */}
      <section>
        <ScrollReveal>
          <h2 className="mb-8 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Organization contributions
          </h2>
        </ScrollReveal>

        <Suspense fallback={<RepoGridSkeleton />}>
          <OrgSection />
        </Suspense>
      </section>
    </main>
  );
}