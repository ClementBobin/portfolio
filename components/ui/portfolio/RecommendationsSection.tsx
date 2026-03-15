"use client";

import {
  ExternalLinkIcon,
  LinkedinIcon,
  QuoteIcon,
  UserCircleIcon,
  XIcon,
} from "lucide-react";
import { useState } from "react";
import type { Recommendation } from "@/lib/types/portfolio-api";
import { SectionHeading } from "../section-heading";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "../card";
import { Button } from "../button";

interface RecommendationsSectionProps {
  recommendations: Recommendation[];
  locale: string;
}

interface RecommendationDialogProps {
  rec: Recommendation;
  locale: string;
  onClose: () => void;
}

function RecommendationDialog({
  rec,
  locale,
  onClose,
}: RecommendationDialogProps) {
  const lang = locale.split("-")[0] as "en" | "fr";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <Card className="relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto animate-in zoom-in-95 fade-in duration-200">
        <CardHeader className="flex items-center justify-between border-b border-border p-6">
          <div className="flex items-center gap-3">
            {rec.author.photo ? (
              <img
                src={rec.author.photo}
                alt={rec.author.name}
                className="w-10 h-10 rounded-full object-cover border border-border"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <UserCircleIcon className="h-6 w-6 text-muted-foreground" />
              </div>
            )}
            <div>
              <p className="font-semibold text-sm text-foreground">
                {rec.author.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {rec.author.role[lang]} · {rec.author.company[lang]}
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon-xs"
            onClick={onClose}
            className="h-8 w-8"
          >
            <XIcon className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-5 p-6">
          {/* Context */}
          {rec.context?.[lang] && (
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                {lang === "fr" ? "Contexte" : "Context"}
              </p>
              <p className="text-sm text-foreground/80 leading-relaxed">
                {rec.context[lang]}
              </p>
            </div>
          )}

          {/* Strengths */}
          {rec.strengths?.length > 0 && (
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                {lang === "fr" ? "Points forts" : "Key Strengths"}
              </p>
              <div className="space-y-3">
                {rec.strengths.map((s, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-1 rounded-full bg-primary/40 shrink-0 mt-1" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {s.label[lang]}
                      </p>
                      {s.description?.[lang] && (
                        <p className="text-sm text-muted-foreground mt-0.5">
                          {s.description[lang]}
                        </p>
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
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                {lang === "fr" ? "Collaboration" : "Collaboration"}
              </p>
              <p className="text-sm text-foreground/80 leading-relaxed italic">
                "{rec.collaboration[lang]}"
              </p>
            </div>
          )}

          {/* LinkedIn */}
          {rec.author.linkedinUrl && (
            <Button
              asChild
              className="w-full justify-center mt-2"
              style={{ background: "#0A66C2", color: "#fff" }}
            >
              <a href={rec.author.linkedinUrl} target="_blank" rel="noopener noreferrer">
                <LinkedinIcon className="h-4 w-4 mr-2 inline-block" />
                {lang === "fr"
                  ? "Voir le profil LinkedIn"
                  : "View LinkedIn profile"}
                <ExternalLinkIcon className="h-3.5 w-3.5 ml-2 inline-block" />
              </a>
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function RecommendationCard({
  rec,
  locale,
  onOpen,
}: {
  rec: Recommendation;
  locale: string;
  onOpen: () => void;
}) {
  const lang = locale?.split("-")[0] === "fr" ? "fr" : "en";

  return (
    <Card className="p-5 flex flex-col gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      <QuoteIcon className="h-6 w-6 text-primary/30" />

      <p className="text-sm text-foreground/80 leading-relaxed flex-1 italic">
        "{rec.excerpt[lang]}"
      </p>

      <CardFooter className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          {rec.author.photo ? (
            <img
              src={rec.author.photo}
              alt={rec.author.name}
              className="w-8 h-8 rounded-full object-cover border border-border shrink-0"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
              <UserCircleIcon className="h-5 w-5 text-muted-foreground" />
            </div>
          )}
          <div>
            <p className="text-xs font-semibold text-foreground">
              {rec.author.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {rec.author.role[lang]}
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={onOpen}
          className="whitespace-nowrap"
        >
          {lang === "fr" ? "Voir plus" : "Read more"}
        </Button>
      </CardFooter>
    </Card>
  );
}

export function RecommendationsSection({
  recommendations,
  locale,
}: RecommendationsSectionProps) {
  if (!recommendations?.length) return null;

  const [open, setOpen] = useState<Recommendation | null>(null);

  return (
    <>
      <section className="space-y-8 min-h-screen">
        <SectionHeading
          title={locale.split("-")[0] === "fr" ? "Recommandations" : "Recommendations"}
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