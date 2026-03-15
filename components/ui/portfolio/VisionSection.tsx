import { Building2Icon, GlobeIcon, StarIcon, UsersIcon } from "lucide-react";
import type { VisionSection } from "@/lib/types/portfolio-api";
import { SectionHeading } from "../section-heading";

interface VisionSectionComponentProps {
  vision: VisionSection;
  locale: string;
}

function getIcon(name: string) {
  const map: Record<string, React.ComponentType<{ className?: string }>> = {
    Building2: Building2Icon,
    Globe: GlobeIcon,
    Users: UsersIcon,
  };
  return map[name] ?? StarIcon;
}

const COLORS = ["#d4a574", "#8b7355", "#b89a78", "#a08060"];

export function VisionSectionComponent({
  vision,
  locale,
}: VisionSectionComponentProps) {
  if (!vision?.items?.length) return null;
  const lang = locale?.split("-")[0] === "fr" ? "fr" : "en";

  return (
    <section className="space-y-8 min-h-screen">
      <SectionHeading
        title={
          vision.headline?.[lang] ?? (lang === "fr" ? "Ma vision" : "My Vision")
        }
        subtitle={vision.subtitle?.[lang]}
      />

      <div className="grid gap-5 sm:grid-cols-3">
        {vision.items.map((item, i) => {
          const Icon = getIcon(item.icon);
          const color = COLORS[i % COLORS.length];
          return (
            <div
              key={item.id}
              className="rounded-2xl border border-border bg-card p-6 space-y-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{
                  background: `color-mix(in srgb, ${color} 15%, transparent)`,
                }}
              >
                <Icon className="h-5 w-5" style={{ color }} />
              </div>
              <div>
                <h3 className="font-bold text-sm text-foreground mb-2">
                  {item.title[lang]}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description[lang]}
                </p>
              </div>
              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag, j) => (
                    <span
                      key={j}
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{
                        background: `color-mix(in srgb, ${color} 12%, transparent)`,
                        color,
                      }}
                    >
                      {tag[lang]}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
