"use client";

import { useEffect } from "react";
import { XIcon, NetworkIcon } from "lucide-react";
import { Presence } from "@/components/presence";
import { cn } from "@/lib/utils";
import { MindmapNavigation } from "./mindmap-navigation";

interface MindmapPopupProps {
  open: boolean;
  onClose: () => void;
}

export function MindmapPopup({ open, onClose }: MindmapPopupProps) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <Presence present={open}>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Bubble */}
        <div
          className={cn(
            "relative z-10",
            "w-[90vw] md:w-[80vw] lg:w-[70vw]",
            "h-[70vh] md:h-[75vh]",
            "rounded-2xl border bg-background shadow-xl",
            "animate-in zoom-in-95 fade-in duration-200",
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <div className="flex items-center gap-2 font-semibold">
              <NetworkIcon className="h-5 w-5" />
              Navigation Mindmap
            </div>
            <button
              onClick={onClose}
              className="h-8 w-8 rounded-md hover:bg-accent flex items-center justify-center"
              aria-label="Close mindmap"
            >
              <XIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="h-[calc(100%-3.5rem)] p-3">
            <MindmapNavigation />
          </div>
        </div>
      </div>
    </Presence>
  );
}