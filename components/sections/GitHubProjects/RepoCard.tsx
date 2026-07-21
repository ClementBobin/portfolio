import { ExternalLink, GitFork, Star } from "lucide-react";

export interface GithubRepo {
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

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "bg-blue-500",
  JavaScript: "bg-yellow-400",
  Kotlin: "bg-purple-500",
  Python: "bg-green-500",
  "C#": "bg-green-700",
  Nix: "bg-sky-500",
  HTML: "bg-orange-500",
  CSS: "bg-pink-500",
  Rust: "bg-orange-700",
  Go: "bg-cyan-500",
};

function relativeTime(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86_400_000);
  if (days === 0) return "today";
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

export function RepoCard({ repo }: { repo: GithubRepo }) {
  const color = repo.language
    ? (LANGUAGE_COLORS[repo.language] ?? "bg-muted-foreground")
    : null;

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-2 rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:border-accent/40 hover:bg-accent/5 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-2">
        <span className="break-all font-medium text-sm text-foreground group-hover:underline underline-offset-4">
          {repo.name}
        </span>
        <ExternalLink
          size={13}
          className="mt-0.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
        />
      </div>

      {repo.description && (
        <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
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