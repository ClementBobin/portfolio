"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLinkIcon } from "lucide-react";
import type { StrengthItem } from "@/lib/types/portfolio-api";
import { SectionHeading } from "../section-heading";
import { cn } from "@/lib/utils";

interface StrengthSectionProps {
  strengths: StrengthItem[];
  locale: string;
}

// SVG arc progress ring — animates from 0% (grey) to level% (dark green)
// r=36 → circumference = 2π×36 ≈ 226.2
const RADIUS = 36;
const CIRC = 2 * Math.PI * RADIUS;

interface RingProps {
  level: number;       // 0–100
  animated: boolean;
  delay: number;       // ms
  isHovered: boolean;
  label: string;
}

function ProgressRing({ level, animated, delay, isHovered, label }: RingProps) {
  const [displayed, setDisplayed] = useState(0);

  // Animate the counter number separately with rAF
  useEffect(() => {
    if (!animated) return;
    let start: number | null = null;
    const duration = 1400 + delay;

    const step = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start - delay;
      if (elapsed < 0) { requestAnimationFrame(step); return; }
      const progress = Math.min(elapsed / 1200, 1);
      // ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(eased * level));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [animated, level, delay]);

  const strokeDashoffset = CIRC - (animated ? (level / 100) * CIRC : 0);

  return (
    <div className="relative w-20 h-20">
      <svg
        width="80"
        height="80"
        viewBox="0 0 80 80"
        className="-rotate-90"
      >
        {/* Track — always grey */}
        <circle
          cx="40"
          cy="40"
          r={RADIUS}
          fill="none"
          strokeWidth="5"
          className="stroke-muted"
        />
        {/* Progress arc — grey when idle, animates to dark green */}
        <circle
          cx="40"
          cy="40"
          r={RADIUS}
          fill="none"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={CIRC}
          strokeDashoffset={strokeDashoffset}
          className={cn(
            "transition-[stroke-dashoffset,stroke]",
            animated ? "stroke-emerald-700" : "stroke-muted-foreground/30"
          )}
          style={{
            transitionDuration: animated ? "1400ms" : "0ms",
            transitionDelay: animated ? `${delay}ms` : "0ms",
            transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
          }}
        />
      </svg>

      {/* Counter in centre */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-0">
        <span
          className={cn(
            "text-sm font-black tabular-nums leading-none transition-colors duration-700",
            animated ? "text-emerald-700" : "text-muted-foreground/40"
          )}
        >
          {displayed}%
        </span>
      </div>
    </div>
  );
}

export function StrengthSection({ strengths, locale }: StrengthSectionProps) {
  if (!strengths?.length) return null;
  const lang = locale.split("-")[0] as "en" | "fr";
  const sectionRef = useRef<HTMLDivElement>(null);
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
      { threshold: 0.25 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const hoveredStrength = strengths.find((s) => s.id === hovered) ?? null;

  return (
    <section ref={sectionRef} className="space-y-8 min-h-screen">
      <SectionHeading
        title={lang === "fr" ? "Forces" : "Strengths"}
        subtitle={lang === "fr" ? "Compétences évaluées de 0 à 100%" : "Core skills rated from 0 to 100%"}
      />

      {/* Rings row */}
      <div className="overflow-x-auto pb-2">
        <div className="flex items-start justify-between gap-2 min-w-[480px] px-4">
          {strengths.map((s, i) => {
            const isHov = hovered === s.id;
            return (
              <button
                key={s.id}
                className={cn(
                  "flex flex-col items-center gap-3 flex-1 rounded-2xl py-4 px-2 transition-all duration-200 cursor-pointer select-none",
                  isHov
                    ? "bg-emerald-50 dark:bg-emerald-950/30 ring-1 ring-emerald-200 dark:ring-emerald-800"
                    : "hover:bg-muted/50"
                )}
                onMouseEnter={() => setHovered(s.id)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(s.id)}
                onBlur={() => setHovered(null)}
              >
                <ProgressRing
                  level={s.level}
                  animated={animated}
                  delay={i * 120}
                  isHovered={isHov}
                  label={s.label[lang]}
                />
                <span
                  className={cn(
                    "text-xs font-semibold text-center leading-tight transition-colors duration-200",
                    isHov ? "text-emerald-700 dark:text-emerald-400" : "text-foreground"
                  )}
                >
                  {s.label[lang]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Connector progress bar strip */}
      <div className="flex gap-1 px-4">
        {strengths.map((s, i) => (
          <div
            key={s.id}
            className="flex-1 h-1 rounded-full bg-muted overflow-hidden"
          >
            <div
              className={cn(
                "h-full rounded-full transition-[width] ease-[cubic-bezier(0.16,1,0.3,1)]",
                hovered === s.id
                  ? "bg-emerald-600"
                  : "bg-emerald-700/60"
              )}
              style={{
                width: animated ? `${s.level}%` : "0%",
                transitionDuration: animated ? "1400ms" : "0ms",
                transitionDelay: animated ? `${i * 120}ms` : "0ms",
              }}
            />
          </div>
        ))}
      </div>

      {/* Detail card */}
      <div className="min-h-[88px]">
        {hoveredStrength ? (
          <div
            key={hoveredStrength.id}
            className="rounded-xl border border-border bg-card p-4 flex items-start justify-between gap-4 animate-in fade-in slide-in-from-bottom-1 duration-150"
          >
            <div className="space-y-1.5 flex-1">
              <h3 className="text-sm font-bold text-emerald-700 dark:text-emerald-400">
                {hoveredStrength.label[lang]}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {hoveredStrength.description[lang]}
              </p>
              {hoveredStrength.example && (
                <a
                  href={hoveredStrength.example.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium mt-1 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-950/60 transition-colors"
                >
                  <ExternalLinkIcon className="h-3 w-3" />
                  {hoveredStrength.example.label[lang]}
                </a>
              )}
            </div>
            <span className="text-4xl font-black text-emerald-700/20 dark:text-emerald-400/20 shrink-0 tabular-nums">
              {hoveredStrength.level}%
            </span>
          </div>
        ) : (
          <p className="text-center text-xs text-muted-foreground/40 py-6">
            {lang === "fr" ? "Survolez un nœud pour les détails" : "Hover a node for details"}
          </p>
        )}
      </div>
    </section>
  );
}