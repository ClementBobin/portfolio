import { Lock } from "lucide-react";
import { ExternalLinkIcon } from "@/components/icons/externalLink"
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ContributionItem } from "@/types/contribution";
import { useTranslations } from "@/hooks/useTranslation";

interface ContributionModalProps {
  item: ContributionItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  locale: string;
}

function ModalSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="font-mono text-xs font-semibold uppercase tracking-widest text-white/40">
        {label}
      </p>
      {children}
    </div>
  );
}

export function ContributionModal({
  item,
  open,
  onOpenChange,
  locale,
}: ContributionModalProps) {
  const t = useTranslations(locale, ["portfolio"]);
  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-lg"
        showCloseButton={false}
      >
        {/* Close button — custom styled to match dark theme */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 rounded-md border border-white/10 px-3 py-1 font-mono text-xs text-white/50 transition-colors hover:border-white/20 hover:text-white/80"
        >
          Close
        </button>

        <DialogHeader className="gap-3">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-emerald-400">
            Repository Breakdown
          </p>
          <DialogTitle className="font-mono text-2xl font-bold text-white">
            {item.title}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <ModalSection label="The Problem">
            <p className="text-sm leading-relaxed text-white/70">{t(item.description)}</p>
          </ModalSection>

          <ModalSection label="The Technical Solution">
            <p className="text-sm leading-relaxed text-white/70">{t(item.subtitle)}</p>
          </ModalSection>

          {Array.isArray(item.highlights) && item.highlights.length > 0 && (
            <ModalSection label="Key Features & Highlights">
              <ul className="flex flex-col gap-1.5">
                {item.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                    <span className="mt-1.75 size-1.5 shrink-0 rounded-full bg-emerald-400" />
                    {h}
                  </li>
                ))}
              </ul>
            </ModalSection>
          )}
        </div>

        <div className="border-t border-white/10 pt-2">
          {item.href ? (
            <Button asChild variant="secondary" size="sm" className="w-full justify-center gap-2">
              <a href={item.href} target="_blank" rel="noopener noreferrer">
                <ExternalLinkIcon />
                Open on GitHub
              </a>
            </Button>
          ) : item.private ? (
            <span className="inline-flex items-center gap-2 text-sm text-white/30">
              <Lock size={14} />
              Private repository
            </span>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}