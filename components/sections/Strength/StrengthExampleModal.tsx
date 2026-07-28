"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import type { StrengthItem } from "@/lib/types/portfolio-api";
import type { TFunction } from "@/lib/types/global";

type Example = NonNullable<NonNullable<StrengthItem["detail"]>["example"]>;

interface StrengthExampleModalProps {
  example: Example;
  label: string;
  t: TFunction;
}

/**
 * Displays a modal containing a real-world strength example.
 * Includes optional media, quotes, and translated category details.
 *
 * @param example - Example content displayed inside the modal
 * @param label - Trigger button label
 * @param t - Translation function
 */
export default function StrengthExampleModal({
  example,
  label,
  t,
}: StrengthExampleModalProps) {
  const [open, setOpen] = useState(false);

  const categories = example.categories.map((c) => ({
    id: c.id,
    title: t(c.title),
    description: t(c.description),
  }));

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mx-auto mt-10 flex items-center gap-2 rounded-full border border-border px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
      >
        {label}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-border bg-card shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              {example.mediaCaption && (
                <p className="text-sm font-medium text-foreground">
                  {t(example.mediaCaption)}
                </p>
              )}

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="ml-auto rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                aria-label={t("common.close")}
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="grid sm:grid-cols-2">
              <div className="flex flex-col gap-4 border-r border-border p-5">
                {example.media && (
                  <div className="overflow-hidden rounded-xl border border-border">
                    <Image
                      src={example.media}
                      alt={
                        example.mediaCaption
                          ? t(example.mediaCaption)
                          : t("common.example")
                      }
                      width={480}
                      height={300}
                      className="w-full object-cover"
                    />
                  </div>
                )}

                {example.quote && (
                  <div className="rounded-xl border-l-2 border-accent bg-accent/5 p-4">
                    <p className="text-sm leading-relaxed text-foreground">
                      {t(example.quote)}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-col divide-y divide-border">
                {categories.map((cat) => (
                  <div key={cat.id} className="px-5 py-4">
                    <p className="mb-1 text-sm font-semibold text-foreground">
                      {cat.title}
                    </p>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {cat.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}