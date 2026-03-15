"use client";

import { useEffect, useState } from "react";
import type { PresetName } from "@/lib/themes/presets";
import { DEFAULT_PRESET, presets as staticPresets } from "@/lib/themes/presets";
import type { ThemePreset } from "@/lib/types/theme";

type DynamicPresets = Record<string, ThemePreset>;

const STORAGE_KEY = "theme-preset";

/**
 * Converts a camelCase property name to a CSS kebab-case variable name.
 * e.g. `cardForeground` → `card-foreground`
 */
function toKebabCase(str: string): string {
  return str.replace(/([A-Z])/g, (match) => `-${match.toLowerCase()}`);
}

/**
 * Injects (or updates) a `<style>` element in `<head>` that overrides
 * the design-system CSS variables for the chosen preset in both light
 * and dark modes.
 */
function applyPresetFromMap(name: string, presetsMap: DynamicPresets): void {
  const preset = presetsMap[name];
  if (!preset) return;

  const lightVars = Object.entries(preset.light)
    .map(([key, value]) => `  --${toKebabCase(key)}: ${value};`)
    .join("\n");

  const darkVars = Object.entries(preset.dark)
    .map(([key, value]) => `  --${toKebabCase(key)}: ${value};`)
    .join("\n");

  const css = `:root {\n${lightVars}\n}\n.dark {\n${darkVars}\n}`;

  let style = document.getElementById(
    "theme-preset-styles",
  ) as HTMLStyleElement | null;
  if (!style) {
    style = document.createElement("style");
    style.id = "theme-preset-styles";
    document.head.appendChild(style);
  }
  style.textContent = css;
}

/**
 * Hook for managing the active color-palette preset.
 *
 * - On mount, reads the stored preference from `localStorage` and applies the
 *   matching preset from the static bundle immediately (no flash).
 * - Then fetches remote presets from `NEXT_PUBLIC_MIRAGE_API_URL/config/colors/preset`
 *   (in-memory cached) and switches to those, preserving the stored preference
 *   when its key exists in the remote data.
 * - Falls back to the static built-in presets when the remote fetch fails.
 * - Dynamically injects CSS variable overrides so the selection works with
 *   Tailwind CSS and the existing `next-themes` dark-mode toggle.
 *
 * @returns `{ preset, setPreset, presets }` — current name, setter, and the
 *   active presets map (useful for building a selector UI).
 */
export function useThemePreset() {
  const [preset, setPresetState] = useState<string>(DEFAULT_PRESET);
  const [loadedPresets, setLoadedPresets] =
    useState<DynamicPresets>(staticPresets);

  useEffect(() => {
    // Apply stored preference immediately using static presets (no flash).
    const stored = localStorage.getItem(STORAGE_KEY);
    const initial: PresetName =
      stored && Object.hasOwn(staticPresets, stored)
        ? (stored as PresetName)
        : DEFAULT_PRESET;

    setPresetState(initial);
    applyPresetFromMap(initial, staticPresets);

    // Fetch remote presets from the API (no cache).
    const apiUrl = process.env.NEXT_PUBLIC_RESSOURCE_API_URL;
    if (!apiUrl) return;

    const remoteUrl = `${apiUrl}/config/theme`;

    fetch(remoteUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            `Failed to fetch presets from ${remoteUrl}: ${res.status} ${res.statusText}`,
          );
        }
        return res.json() as Promise<DynamicPresets>;
      })
      .then((data) => {
        if (
          data &&
          typeof data === "object" &&
          Object.keys(data).length > 0 &&
          Object.values(data).every(
            (p) => p && typeof p === "object" && "light" in p && "dark" in p,
          )
        ) {
          setLoadedPresets(data);

          // Honour stored preference if its key exists in remote data.
          const storedPref = localStorage.getItem(STORAGE_KEY);
          const resolved =
            storedPref && Object.hasOwn(data, storedPref)
              ? storedPref
              : initial;

          setPresetState(resolved);
          applyPresetFromMap(resolved, data);
        }
      })
      .catch(() => {
        // Remote fetch failed — static presets remain active.
      });
  }, []);

  const setPreset = (name: string) => {
    setPresetState(name);
    localStorage.setItem(STORAGE_KEY, name);
    applyPresetFromMap(name, loadedPresets);
  };

  return { preset, setPreset, presets: loadedPresets };
}
