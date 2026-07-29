import { GitBranch, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ExternalLinkIcon } from "@/components/icons/externalLink"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Status, StatusIndicator, StatusLabel } from "@/components/ui/status";
import type { ContributionItem } from "@/lib/types/contribution";
import { useTranslations } from "@/hooks/useTranslations";

interface ContributionCardProps {
  item: ContributionItem;
  locale: string;
  onOpen: () => void;
}

export function ContributionCard({ item, locale, onOpen }: ContributionCardProps) {
  const t = useTranslations(locale, ["portfolio"]);

  return (
    <Card
      className="transition-colors hover:border-accent"
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.target !== event.currentTarget) return;

        if (event.key === "Enter") {
          onOpen();
        }

        if (event.key === " ") {
          event.preventDefault();
          onOpen();
        }
      }}
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <GitBranch size={15} className="shrink-0 text-emerald-400" aria-hidden />
            <CardTitle className="font-mono text-base font-bold text-white">
              {item.title}
            </CardTitle>
          </div>

          <div className="flex shrink-0 items-center gap-2 pt-0.5">
            <Status variant={item.private ? "warning" : "success"}>
              <StatusIndicator />
              <StatusLabel>{t(item.status)}</StatusLabel>
            </Status>
            {item.private && (
              <span title="Private" className="text-white/30">
                <Lock size={13} />
              </span>
            )}
            {item.href && (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/30 transition-colors hover:text-white/70"
                onClick={(e) => e.stopPropagation()}
                aria-label={`Open ${item.title} on GitHub`}
              >
                <ExternalLinkIcon scale={1.2} />
              </a>
            )}
          </div>
        </div>

        <CardDescription className="text-xs font-medium uppercase tracking-wide text-white/40">
          {t(item.subtitle)}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-3 pt-4">
        <p className="text-sm leading-relaxed text-white/50 line-clamp-3">
          {t(item.description)}
        </p>

        {item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="border-white/10 bg-white/5 font-mono text-[11px] text-white/50"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter>
        <button
          type="button"
          className="font-mono text-xs font-semibold text-[#7c3aed] transition-colors hover:text-[#a78bfa]"
        >
          Read Case Study →
        </button>
      </CardFooter>
    </Card>
  );
}