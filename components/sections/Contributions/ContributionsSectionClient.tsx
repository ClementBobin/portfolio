"use client";

import { useState } from "react";
import { ExternalLinkIcon, GitHubIcon } from "@/components/icons"
import ScrollReveal from "@/components/ui/ScrollReveal";
import { ContributionCard } from "./ContributionCard";
import { ContributionHeatmap } from "./ContributionHeatmap";
import { ContributionModal } from "./ContributionModal";
import type { ContributionItem } from "@/types/contribution";
import { useTranslations } from "@/hooks/useTranslation";

interface ContributionsSectionClientProps {
  items: ContributionItem[];
  locale: string;
  githubUsername?: string;
  githubUrl?: string;
}

export function ContributionsSectionClient({
  items,
  locale,
  githubUsername = "@username",
  githubUrl = "https://github.com",
}: ContributionsSectionClientProps) {
  const [activeItem, setActiveItem] = useState<ContributionItem | null>(null);
  const t = useTranslations(locale, ["portfolio"]);

  return (
    <div className="flex flex-col gap-8">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <span className="flex w-fit items-center gap-2 rounded-full border px-3 py-1 font-mono text-xs font-semibold uppercase tracking-widest">
            <GitHubIcon aria-hidden width={16} height={16} />
            {t("contributions.eyebrow")}
          </span>
          <h1 className="text-4xl font-bold tracking-tight">
            {t("contributions.title")}
          </h1>
          <p className="max-w-lg text-sm leading-relaxed text-white/50">
            {t("contributions.subtitle")}
          </p>
        </div>

        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex shrink-0 items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10"
        >
          {t("contributions.follow")} {githubUsername}
          <ExternalLinkIcon width={16} height={16} />
        </a>
      </div>

      {/* Heatmap */}
      <ContributionHeatmap githubUrl={githubUrl} />

      {/* Cards grid */}
      <ul className="grid list-none grid-cols-1 gap-4 sm:grid-cols-2">
        {items.map((item, i) => (
          <ScrollReveal key={item.slug} delay={i * 0.08}>
            <li>
              <ContributionCard
                item={item}
                locale={locale}
                onOpen={() => setActiveItem(item)}
              />
            </li>
          </ScrollReveal>
        ))}
      </ul>

      {/* Detail modal */}
      <ContributionModal
        item={activeItem}
        open={activeItem !== null}
        onOpenChange={(open) => { if (!open) setActiveItem(null); }}
        locale={locale}
      />
    </div>
  );
}