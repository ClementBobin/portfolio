"use client";

import { useEffect, useState } from "react";
import type { PresetName } from "@/lib/themes/presets";
import { DEFAULT_PRESET, presets } from "@/lib/themes/presets";

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
function applyPreset(name: PresetName): void {
  const preset = presets[name];
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
 * - Reads the stored preference from `localStorage` on mount.
 * - Falls back to `DEFAULT_PRESET` ("warm") when no preference is stored.
 * - Dynamically injects CSS variable overrides so the selection works with
 *   Tailwind CSS and the existing `next-themes` dark-mode toggle.
 *
 * @returns `{ preset, setPreset, presets }` — current name, setter, and the
 *   full presets map (useful for building a selector UI).
 */
export function useThemePreset() {
  const [preset, setPresetState] = useState<PresetName>(DEFAULT_PRESET);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const initial: PresetName =
      stored && Object.hasOwn(presets, stored)
        ? (stored as PresetName)
        : DEFAULT_PRESET;
    setPresetState(initial);
    applyPreset(initial);
  }, []);

  const setPreset = (name: PresetName) => {
    setPresetState(name);
    localStorage.setItem(STORAGE_KEY, name);
    applyPreset(name);
  };

  return { preset, setPreset, presets };
}
