import {
  CodeIcon,
  LayersIcon,
  SearchIcon,
  ShieldCheckIcon,
  StarIcon,
  UsersIcon,
  ZapIcon,
} from "lucide-react";
import type { ValueCard } from "@/lib/types/portfolio-api";
import { SectionHeading } from "../section-heading";

interface WhatIBringSectionProps {
  title: string;
  subtitle: string;
  cards: ValueCard[];
  locale: string;
}

function getIcon(name: string) {
  const map: Record<string, React.ComponentType<{ className?: string }>> = {
    Layers: LayersIcon,
    Search: SearchIcon,
    Zap: ZapIcon,
    ShieldCheck: ShieldCheckIcon,
    Users: UsersIcon,
    Code: CodeIcon,
  };
  return map[name] ?? StarIcon;
}

export function WhatIBringSection({ cards, locale }: WhatIBringSectionProps) {
  if (!cards?.length) return null;
  const lang = locale?.split("-")[0] === "fr" ? "fr" : "en";

  return (
    <section className="space-y-8 min-h-screen">
      <SectionHeading
        title={lang === "fr" ? "Ce que j'apporte" : "What I Bring"}
        subtitle={lang === "fr" ? "Voici ce que j'apporte à chaque projet." : "Here's what I bring to each project."}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, i) => {
          const Icon = getIcon(card.icon);
          const color = card.color ?? "var(--primary)";
          return (
            <div
              key={i}
              className="group rounded-xl border border-border bg-card p-5 space-y-3 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{
                  background: `color-mix(in srgb, ${color} 15%, transparent)`,
                }}
              >
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-sm text-foreground">
                {card.title[lang]}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {card.description[lang]}
              </p>
            </div>
          );
        })}
      </div>

      {/* Closing quote */}
      <blockquote
        className="text-center text-base italic text-muted-foreground max-w-xl mx-auto px-6 py-5 rounded-2xl border border-border bg-card"
        style={{ fontFamily: "Georgia, serif" }}
      >
        {lang === "fr"
          ? "« Je ne livre pas du code — je livre des solutions qui durent. »"
          : '"I don\'t ship code — I ship solutions that last."'}
      </blockquote>
    </section>
  );
}
