import { Lock } from "lucide-react";
import { ExternalLinkIcon } from "@/components/icons/externalLink"
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ContributionItem } from "@/lib/types/contribution";
import { getTranslations } from "@/hooks/getTranslations";

interface ContributionModalProps {
  item: ContributionItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  locale: string;
}

interface ModalSectionProps {
  label: string;
  children: React.ReactNode;
}

/**
 * Renders a labelled content block inside the contribution modal.
 *
 * @param label    - Section heading displayed in monospace uppercase.
 * @param children - Section body content.
 */
export async function ModalSection({ label, children }: ModalSectionProps) {
  return (
    <div className="flex flex-col gap-1">
      <p className="font-mono text-xs font-semibold uppercase tracking-widest text-white/40">
        {label}
      </p>
      {children}
    </div>
  );
}

/**
 * Displays a detailed breakdown of a contribution item in a modal dialog.
 *
 * Renders the problem description, technical solution, optional highlights
 * list, and a footer link to the repository or a private-repo indicator.
 * Returns null when no item is provided.
 *
 * @param item         - Contribution item to display, or null to render nothing.
 * @param open         - Whether the dialog is currently open.
 * @param onOpenChange - Callback invoked when the dialog open state changes.
 * @param locale       - BCP 47 locale used to resolve translated string values.
 */
export async function ContributionModal({
  item,
  open,
  onOpenChange,
  locale,
}: ContributionModalProps) {
  const t = await getTranslations(locale, ["portfolio"]);
  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
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
                {item.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm text-white/70">
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