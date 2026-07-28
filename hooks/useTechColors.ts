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
      const apiUrl = process.env.RESSOURCE_API_URL;

      if (!apiUrl) {
        return new Map<string, TechColorEntry>();
      }

      const res = await fetch(`${apiUrl}/config/colors/tech`);

      if (!res.ok) {
        return new Map<string, TechColorEntry>();
      }

      const raw = (await res.json()) as Record<string, TechColorEntry>;

      moduleCache = new Map(
        Object.entries(raw).map(([k, v]) => [k.toLowerCase(), v]),
      );

      return moduleCache;
    } catch {
      return new Map<string, TechColorEntry>();
    } finally {
      fetchPromise = null;
    }
  })();

  return fetchPromise;
}

/**
 * Client-side hook to access tech color data.
 *
 * Returns a Map<techName, TechColorEntry> where keys are lowercase.
 */
export function useTechColors(): Map<string, TechColorEntry> {
  const [colors, setColors] = useState<Map<string, TechColorEntry>>(
    new Map(),
  );

  useEffect(() => {
    let cancelled = false;

    fetchTechColors().then((result) => {
      if (!cancelled) {
        setColors(result);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return colors;
}