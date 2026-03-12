import {
  BookOpenIcon,
  HeartIcon,
  ServerIcon,
  SettingsIcon,
  StarIcon,
  ZapIcon,
} from "lucide-react";
import type { Hobby } from "@/lib/types/portfolio-api";
import { SectionHeading } from "../section-heading";

interface PassionSectionProps {
  hobbies: Hobby[];
  locale: string;
}

function getIcon(name: string) {
  const map: Record<string, React.ComponentType<{ className?: string }>> = {
    Heart: HeartIcon,
    BookOpen: BookOpenIcon,
    Settings: SettingsIcon,
    Server: ServerIcon,
    Zap: ZapIcon,
  };
  return map[name] ?? StarIcon;
}

const COLORS = [
  "#d4a574",
  "#8b7355",
  "#b89a78",
  "#a08060",
  "#7c6b4e",
  "#c4956a",
];

export function PassionSection({ hobbies, locale }: PassionSectionProps) {
  if (!hobbies?.length) return null;
  const lang = locale?.split("-")[0] === "fr" ? "fr" : "en";

  return (
    <section className="space-y-8">
      <SectionHeading title={lang === "fr" ? "Mes passions" : "My Passions"} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {hobbies.map((hobby, i) => {
          const Icon = getIcon(hobby.icon);
          const color = COLORS[i % COLORS.length];
          return (
            <div
              key={i}
              className="group rounded-2xl border border-border bg-card p-6 flex gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform"
                style={{
                  background: `color-mix(in srgb, ${color} 15%, transparent)`,
                }}
              >
                {hobby.emoji ?? <Icon className="h-6 w-6" style={{ color }} />}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm text-foreground mb-2">
                  {hobby.title[lang]}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {hobby.details.map((d, j) => (
                    <span
                      key={j}
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{
                        background: `color-mix(in srgb, ${color} 12%, transparent)`,
                        color,
                      }}
                    >
                      {d[lang]}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
