"use client";

import { createContext, useMemo } from "react";

export interface TechColorEntry {
  color: string;
  icon: string;
  iconHref?: string;
}

export const TechColorsContext = createContext<
  Map<string, TechColorEntry> | null
>(null);

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