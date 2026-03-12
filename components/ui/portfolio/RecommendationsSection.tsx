"use client";

import { useState } from "react";
import { LinkedinIcon, XIcon, QuoteIcon, UserCircleIcon, ExternalLinkIcon } from "lucide-react";
import type { Recommendation } from "@/lib/types/portfolio-api";
import { SectionHeading } from "../section-heading";
import { cn } from "@/lib/utils";

interface RecommendationsSectionProps {
  recommendations: Recommendation[];
  locale: string;
}

interface RecommendationDialogProps {
  rec: Recommendation;
  locale: string;
  onClose: () => void;
}

function RecommendationDialog({ rec, locale, onClose }: RecommendationDialogProps) {
  const lang = locale.split("-")[0] as "en" | "fr";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg rounded-2xl border border-border bg-card shadow-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 fade-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            {rec.author.photo ? (
              <img src={rec.author.photo} alt={rec.author.name}
                className="w-10 h-10 rounded-full object-cover border border-border" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <UserCircleIcon className="h-6 w-6 text-muted-foreground" />
              </div>
            )}
            <div>
              <p className="font-semibold text-sm text-foreground">{rec.author.name}</p>
              <p className="text-xs text-muted-foreground">{rec.author.role[lang]} · {rec.author.company[lang]}</p>
            </div>
          </div>
          <button onClick={onClose}
            className="h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-accent transition-colors">
            <XIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Context */}
          {rec.context?.[lang] && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                {lang === "fr" ? "Contexte" : "Context"}
              </h4>
              <p className="text-sm text-foreground/80 leading-relaxed">{rec.context[lang]}</p>
            </div>
          )}

          {/* Strengths */}
          {rec.strengths && rec.strengths.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                {lang === "fr" ? "Points forts" : "Key Strengths"}
              </h4>
              <div className="space-y-3">
                {rec.strengths.map((s, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-1 rounded-full bg-primary/40 shrink-0 mt-1" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">{s.label[lang]}</p>
                      {s.description?.[lang] && (
                        <p className="text-sm text-muted-foreground mt-0.5">{s.description[lang]}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Collaboration */}
          {rec.collaboration?.[lang] && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                {lang === "fr" ? "Collaboration" : "Collaboration"}
              </h4>
              <p className="text-sm text-foreground/80 leading-relaxed italic">
                "{rec.collaboration[lang]}"
              </p>
            </div>
          )}

          {/* LinkedIn button */}
          {rec.author.linkedinUrl && (
            <a
              href={rec.author.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90 w-full justify-center"
              style={{ background: "#0A66C2", color: "#fff" }}
            >
              <LinkedinIcon className="h-4 w-4" />
              {lang === "fr" ? "Voir le profil LinkedIn" : "View LinkedIn profile"}
              <ExternalLinkIcon className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function RecommendationCard({ rec, locale, onOpen }: { rec: Recommendation; locale: string; onOpen: () => void }) {
  const lang = locale?.split("-")[0] === "fr" ? "fr" : "en";

  return (
    <div className="rounded-xl border border-border bg-card p-5 flex flex-col gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      {/* Quote icon */}
      <QuoteIcon className="h-6 w-6 text-primary/30" />

      {/* Excerpt */}
      <p className="text-sm text-foreground/80 leading-relaxed flex-1 italic">
        "{rec.excerpt[lang]}"
      </p>

      {/* Author */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          {rec.author.photo ? (
            <img src={rec.author.photo} alt={rec.author.name}
              className="w-8 h-8 rounded-full object-cover border border-border shrink-0" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
              <UserCircleIcon className="h-5 w-5 text-muted-foreground" />
            </div>
          )}
          <div>
            <p className="text-xs font-semibold text-foreground">{rec.author.name}</p>
            <p className="text-xs text-muted-foreground">{rec.author.role[lang]}</p>
          </div>
        </div>
        <button
          onClick={onOpen}
          className="text-xs font-medium text-primary hover:text-primary/80 transition-colors whitespace-nowrap border border-primary/20 rounded-lg px-3 py-1.5 hover:bg-primary/5"
        >
          {lang === "fr" ? "Voir plus" : "Read more"}
        </button>
      </div>
    </div>
  );
}

export function RecommendationsSection({ recommendations, locale }: RecommendationsSectionProps) {
  if (!recommendations?.length) return null;
  const lang = locale?.split("-")[0] === "fr" ? "fr" : "en";
  const [open, setOpen] = useState<Recommendation | null>(null);

  return (
    <>
      <section className="space-y-8">
        <SectionHeading
          title={lang === "fr" ? "Recommandations" : "Recommendations"}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {recommendations.map((rec) => (
            <RecommendationCard
              key={rec.id}
              rec={rec}
              locale={locale}
              onOpen={() => setOpen(rec)}
            />
          ))}
        </div>
      </section>

      {open && (
        <RecommendationDialog
          rec={open}
          locale={locale}
          onClose={() => setOpen(null)}
        />
      )}
    </>
  );
}