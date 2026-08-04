"use client";

import { use } from "react";
import { GitBranch } from "lucide-react";
import { ActivityGraph } from "@/components/ui/activity-graph";
import { fetchGitHubContributions } from "@/lib/github";

// Created once when the module loads — survives re-renders and Suspense cycles
const contributionsCache = new Map<string, ReturnType<typeof fetchGitHubContributions>>();

function getContributions(username: string) {
  if (!contributionsCache.has(username)) {
    contributionsCache.set(username, fetchGitHubContributions(username));
  }
  return contributionsCache.get(username)!;
}

interface ContributionHeatmapProps {
  githubUsername?: string;
  githubUrl?: string;
}

export default function ContributionHeatmap({
  githubUsername = "clementbobin",
  githubUrl = "https://github.com",
}: ContributionHeatmapProps) {
  const username = githubUsername.replace(/^@/, "");
  const contributions = use(getContributions(username));

  return (
    <div className="rounded-xl border p-5">
      <div className="mb-4 flex items-center justify-between">
        <span className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-emerald-400">
          <GitBranch size={12} aria-hidden />
          {contributions
            ? `${contributions.total} contributions in the last year`
            : "Commit Activity (Past Year)"}
        </span>
        <span className="font-mono text-xs text-white/30">
          {githubUrl.replace("https://", "")}
        </span>
      </div>

      <ActivityGraph data={contributions?.entries ?? []} weeks={52} />

      <div className="mt-3">
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs text-white/30 transition-colors hover:text-white/60"
        >
          View on GitHub
        </a>
      </div>
    </div>
  );
}