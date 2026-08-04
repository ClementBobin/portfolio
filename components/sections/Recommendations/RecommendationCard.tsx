"use client"

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { LinkedInIcon } from "@/components/icons";
import { SlideUpText } from "@/components/ui/slide-up-text";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Recommendation } from "@/lib/types/portfolio-api";
import { useTranslations } from "@/hooks/useTranslations";
import Avatar from "@/components/ui/Avatar";
import LinkedInBadge from "./LinkedInBadge";

interface RecommendationCardProps {
  rec: Recommendation;
  locale: string;
}

export default function RecommendationCard({ rec, locale }: RecommendationCardProps) {
  const t = useTranslations(locale, ["portfolio"]);
  const [open, setOpen] = useState(false);

  const role = t(rec.author.role);
  const company = t(rec.author.company);
  const excerpt = t(rec.excerpt);
  const context = rec.context ? t(rec.context) : null;
  const collaboration = rec.collaboration ? t(rec.collaboration) : null;

  // Flatten strengths into a single paragraph
  const strengthsText = rec.strengths
    ?.map((s) => {
      const label = t(s.label);
      const desc = s.description ? t(s.description) : null;
      return desc ? `${label}: ${desc}` : label;
    })
    .join(" ");

  return (
    <>
      <Card className="flex h-full flex-col gap-0 py-0">
        <CardContent className="flex flex-1 flex-col gap-4 p-6">
          {/* Quote mark */}
          <span className="font-serif text-4xl leading-none text-muted-foreground/30 select-none">
            &quot;
          </span>

          {/* Excerpt */}
          <p className="flex-1 text-sm italic leading-relaxed text-foreground/80">
            <SlideUpText split="words" stagger={0.03} delay={0.05} inView once>
              {excerpt}
            </SlideUpText>
          </p>

          {/* Author */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar src={rec.author.photo} name={rec.author.name} />
              {rec.author.linkedinUrl && (
                <LinkedInBadge href={rec.author.linkedinUrl} />
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-foreground">
                {rec.author.name}
              </span>
              <span className="text-xs text-muted-foreground">
                {role} @ {company}
              </span>
              {rec.date && (
                <span className="text-xs text-accent">{rec.date}</span>
              )}
            </div>
          </div>

          {/* Show more trigger */}
          {(context || strengthsText || collaboration) && (
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="mt-1 flex w-full items-center justify-center gap-1.5 rounded-lg border border-border py-2 text-xs font-medium text-accent transition-colors hover:bg-muted"
            >
              Show more
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
          )}
        </CardContent>
      </Card>

      {/* Detail dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar src={rec.author.photo} name={rec.author.name} />
                {rec.author.linkedinUrl && (
                  <LinkedInBadge href={rec.author.linkedinUrl} />
                )}
              </div>
              <div>
                <DialogTitle className="text-base font-semibold">
                  {rec.author.name}
                </DialogTitle>
                <p className="text-xs text-muted-foreground">
                  {role} @ {company}
                </p>
              </div>
            </div>
          </DialogHeader>

          <div className="flex flex-col gap-4 text-sm">
            {context && (
              <div className="flex flex-col gap-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                  Context
                </p>
                <p className="leading-relaxed text-foreground/80">{context}</p>
              </div>
            )}

            {strengthsText && (
              <div className="flex flex-col gap-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                  Strengths
                </p>
                <p className="leading-relaxed text-foreground/80">{strengthsText}</p>
              </div>
            )}

            {collaboration && (
              <div className="flex flex-col gap-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                  Collaboration
                </p>
                <p className="leading-relaxed text-foreground/80">{collaboration}</p>
              </div>
            )}
          </div>

          {rec.author.linkedinUrl && (
            <Button asChild className="mt-2 w-full rounded-full bg-[#0A66C2] hover:bg-[#004182]">
              <a
                href={rec.author.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <LinkedInIcon className="h-4 w-4" />
                View LinkedIn profile
              </a>
            </Button>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}