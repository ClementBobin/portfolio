"use client";

import { useMemo } from "react";
import { TechColorsContext, type TechColorEntry } from "./TechColorsContext";

export type { TechColorEntry };

export function TechColorsProvider({
  techColors,
  children,
}: {
  techColors: Record<string, TechColorEntry>;
  children: React.ReactNode;
}) {
  const map = useMemo(
    () =>
      new Map(
        Object.entries(techColors).map(([k, v]) => [k.toLowerCase(), v]),
      ),
    [techColors],
  );

  return (
    <TechColorsContext.Provider value={map}>
      {children}
    </TechColorsContext.Provider>
  );
}