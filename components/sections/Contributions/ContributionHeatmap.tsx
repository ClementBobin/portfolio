import { GitBranch } from "lucide-react";

// Deterministic pseudo-random commit counts for visual demo.
// Swap `data` for a real GitHub contributions API payload when available.
function generateHeatmapData(weeks: number, days: number): number[] {
  return Array.from({ length: weeks * days }, (_, i) => {
    const seed = (i * 1103515245 + 12345) & 0x7fffffff;
    const rand = (seed % 100) / 100;
    if (rand > 0.6) return 0;
    if (rand > 0.4) return Math.floor(rand * 4) + 1;
    if (rand > 0.2) return Math.floor(rand * 8) + 3;
    return Math.floor(rand * 15) + 6;
  });
}

function getColor(count: number, max: number): string {
  if (count === 0) return "bg-[#161b22]";
  const intensity = count / max;
  if (intensity < 0.25) return "bg-[#0e4429]";
  if (intensity < 0.5) return "bg-[#006d32]";
  if (intensity < 0.75) return "bg-[#26a641]";
  return "bg-[#39d353]";
}

const LEGEND_COLORS = [
  "bg-[#161b22]",
  "bg-[#0e4429]",
  "bg-[#006d32]",
  "bg-[#26a641]",
  "bg-[#39d353]",
];

interface ContributionHeatmapProps {
  weeks?: number;
  githubUrl?: string;
}

export function ContributionHeatmap({
  weeks = 53,
  githubUrl = "https://github.com",
}: ContributionHeatmapProps) {
  const days = 7;
  const data = generateHeatmapData(weeks, days);
  const max = Math.max(...data);

  return (
    <div className="rounded-xl border p-5">
      <div className="mb-4 flex items-center justify-between">
        <span className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-emerald-400">
          <GitBranch size={12} aria-hidden />
          Continuous Commit Activity (Past Year)
        </span>
        <span className="font-mono text-xs text-white/30">{githubUrl.replace("https://", "")}</span>
      </div>

      <div className="overflow-x-auto">
        <div
          role="img"
          aria-label="GitHub contribution heatmap for the past year"
          className="grid gap-0.75"
          style={{
            gridTemplateColumns: `repeat(${weeks}, minmax(10px, 1fr))`,
            gridTemplateRows: `repeat(${days}, 10px)`,
            gridAutoFlow: "column",
          }}
        >
          {data.map((count, i) => (
            <div
              key={i}
              title={`${count} contribution${count !== 1 ? "s" : ""}`}
              className={`rounded-xs ${getColor(count, max)}`}
            />
          ))}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs text-white/30 transition-colors hover:text-white/60"
        >
          Learn more on GitHub
        </a>
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-xs text-white/30">Less</span>
          {LEGEND_COLORS.map((c, i) => (
            <div key={i} className={`size-2.5 rounded-xs ${c}`} />
          ))}
          <span className="font-mono text-xs text-white/30">More</span>
        </div>
      </div>
    </div>
  );
}