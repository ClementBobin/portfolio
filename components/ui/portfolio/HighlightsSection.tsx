import type { Highlight } from "@/lib/types/portfolio-api";
import { BriefcaseIcon, FolderOpenIcon, LayersIcon, SparklesIcon } from "lucide-react";

interface HighlightsSectionProps {
  highlights: Highlight[];
  locale: string;
}

function getIcon(name?: string) {
  switch (name) {
    case "Briefcase": return BriefcaseIcon;
    case "FolderOpen": return FolderOpenIcon;
    case "Layers": return LayersIcon;
    default: return SparklesIcon;
  }
}

export function HighlightsSection({ highlights, locale }: HighlightsSectionProps) {
  if (!highlights?.length) return null;
  const lang = locale?.split("-")[0] === "fr" ? "fr" : "en";

  return (
    <section className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {highlights.map((h) => {
          const Icon = getIcon(h.icon);
          return (
            <div
              key={h.id}
              className="flex flex-col items-center text-center gap-2 p-6 rounded-2xl border border-border bg-card hover:shadow-sm transition-shadow"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-1">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <span className="text-3xl font-black text-foreground" style={{ fontFamily: "Georgia, serif" }}>
                {h.value}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {h.label[lang]}
              </span>
              {h.description?.[lang] && (
                <span className="text-xs text-muted-foreground/70">{h.description[lang]}</span>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}