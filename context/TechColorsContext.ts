import { createContext } from "react";

export interface TechColorEntry {
  color: string;
  icon: string;
  iconHref?: string;
}

export const TechColorsContext = createContext<
  Map<string, TechColorEntry> | null
>(null);