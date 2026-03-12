"use client";

import { ExternalLinkIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { StrengthItem } from "@/lib/types/portfolio-api";
import { SectionHeading } from "../section-heading";

interface StrengthSectionProps {
  strengths: StrengthItem[];
  locale: string;
}

export function StrengthSection({ strengths, locale }: StrengthSectionProps) {
  if (!strengths?.length) return null;
  const lang = locale?.split("-")[0] === "fr" ? "fr" : "en";
  const ref = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const count = strengths.length;

  return (
    <section ref={ref} className="space-y-8">
      <SectionHeading
        title={lang === "fr" ? "Forces" : "Strengths"}
        subtitle={
          lang === "fr"
            ? "Compétences évaluées de 0 à 100%"
            : "Core skills rated from 0 to 100%"
        }
      />

      <div className="overflow-x-auto pb-4">
        <div className="min-w-[520px]">
          {/* Nodes row */}
          <div className="relative flex items-start justify-between px-6">
            {/* Connector line */}
            <div className="absolute top-6 left-[calc(6px+3rem)] right-[calc(6px+3rem)] h-0.5 bg-border" />

            {strengths.map((s, i) => {
              const isHov = hovered === s.id;
              const pct = animated ? s.level : 0;
              return (
                <div
                  key={s.id}
                  className="relative flex flex-col items-center gap-3 cursor-pointer"
                  style={{ width: `${100 / count}%` }}
                  onMouseEnter={() => setHovered(s.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* Colored connector segments */}
                  {i < count - 1 && (
                    <div
                      className="absolute top-6 left-1/2 right-[-50%] h-0.5 transition-all duration-700 z-0"
                      style={{
                        background: `linear-gradient(to right, ${s.color}, ${strengths[i + 1].color})`,
                        opacity: animated ? 0.7 : 0.2,
                        transitionDelay: `${i * 200}ms`,
                      }}
                    />
                  )}

                  {/* Node circle */}
                  <div className="relative z-10 flex flex-col items-center gap-1">
                    {isHov && (
                      <div
                        className="absolute w-14 h-14 rounded-full animate-ping opacity-20"
                        style={{ background: s.color }}
                      />
                    )}
                    <div
                      className="relative z-10 w-12 h-12 rounded-full border-2 flex items-center justify-center text-xs font-bold shadow-sm transition-transform duration-200"
                      style={{
                        borderColor: s.color,
                        background: animated
                          ? `color-mix(in srgb, ${s.color} ${Math.round(s.level * 0.35)}%, var(--background))`
                          : "var(--background)",
                        color: s.color,
                        transform: isHov ? "scale(1.15)" : "scale(1)",
                        transition: "transform 0.2s ease, background 1.4s ease",
                      }}
                    >
                      {animated ? `${s.level}%` : "0%"}
                    </div>
                  </div>

                  {/* Label */}
                  <span
                    className="text-xs font-semibold text-center leading-tight transition-colors"
                    style={{ color: isHov ? s.color : "var(--foreground)" }}
                  >
                    {s.label[lang]}
                  </span>

                  {/* Mini bar */}
                  <div className="w-full px-1">
                    <div className="h-1 rounded-full bg-border overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          background: s.color,
                          width: `${pct}%`,
                          transition: "width 1.6s cubic-bezier(0.16,1,0.3,1)",
                          transitionDelay: `${i * 150}ms`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detail card */}
          <div className="mt-6 min-h-[80px]">
            {strengths.map((s) => {
              if (hovered !== s.id) return null;
              return (
                <div
                  key={s.id}
                  className="rounded-xl border border-border bg-card p-4 flex items-start justify-between gap-4 animate-in fade-in slide-in-from-bottom-2 duration-150"
                >
                  <div className="space-y-1 flex-1">
                    <h3
                      className="text-sm font-semibold"
                      style={{ color: s.color }}
                    >
                      {s.label[lang]}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {s.description[lang]}
                    </p>
                    {s.example && (
                      <a
                        href={s.example.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium mt-1 px-2.5 py-1 rounded-lg"
                        style={{
                          background: `color-mix(in srgb, ${s.color} 15%, transparent)`,
                          color: s.color,
                        }}
                      >
                        <ExternalLinkIcon className="h-3 w-3" />
                        {s.example.label[lang]}
                      </a>
                    )}
                  </div>
                  <div
                    className="text-4xl font-black opacity-20 shrink-0"
                    style={{ color: s.color }}
                  >
                    {s.level}%
                  </div>
                </div>
              );
            })}
            {!hovered && (
              <p className="text-center text-xs text-muted-foreground/50 py-4">
                {lang === "fr"
                  ? "Survolez un nœud pour les détails"
                  : "Hover a node for details"}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
