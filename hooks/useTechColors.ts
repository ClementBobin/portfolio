"use client";

import { useState, useEffect } from "react";

export interface TechColorEntry {
  color: string;
  icon: string;
  iconHref?: string;
}

let moduleCache: Map<string, TechColorEntry> | null = null;
let fetchPromise: Promise<Map<string, TechColorEntry>> | null = null;

/**
 * Fetches tech color config from the resource API and caches it in module scope.
 * Returns a Map keyed by lowercase tech name.
 */
export async function fetchTechColors(): Promise<Map<string, TechColorEntry>> {
  if (moduleCache) return moduleCache;
  if (fetchPromise) return fetchPromise;

  fetchPromise = (async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_RESSOURCE_API_URL;
      if (!apiUrl) return new Map<string, TechColorEntry>();
      const res = await fetch(`${apiUrl}/config/colors/tech`);
      if (!res.ok) return new Map<string, TechColorEntry>();
      const raw = await res.json() as Record<string, TechColorEntry>;
      moduleCache = new Map(
        Object.entries(raw).map(([k, v]) => [k.toLowerCase(), v])
      );
      return moduleCache;
    } catch {
      return new Map<string, TechColorEntry>();
    }
  })();

  return fetchPromise;
}

/**
 * Client-side hook to access tech color data.
 * Returns a Map<techName, TechColorEntry> (keys are lowercase).
 */
export function useTechColors(): Map<string, TechColorEntry> {
  const [colors, setColors] = useState<Map<string, TechColorEntry>>(new Map());

  useEffect(() => {
    fetchTechColors().then(setColors);
  }, []);

  return colors;
}

/**
 * Returns the color entry for a given tech name (case-insensitive).
 */
export function getTechColor(
  colors: Map<string, TechColorEntry>,
  techName: string
): TechColorEntry | undefined {
  return colors.get(techName.toLowerCase());
}
