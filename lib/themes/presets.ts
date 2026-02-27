import type { ThemeColors, ThemePreset } from "../types/theme";

/**
 * Theme preset definitions.
 *
 * To add a new preset, add a new entry here — no other files need to change.
 * `PresetName` is automatically derived from the keys of this object.
 */
export const presets = {
  /**
   * Default — the original design-system palette using oklch colors.
   */
  deepOcean: {
    label: "Deep Ocean",
    light: {
      background: "oklch(1 0 0)",
      foreground: "oklch(0.129 0.042 264.695)",
      card: "oklch(1 0 0)",
      cardForeground: "oklch(0.129 0.042 264.695)",
      popover: "oklch(1 0 0)",
      popoverForeground: "oklch(0.129 0.042 264.695)",
      primary: "oklch(0.208 0.042 265.755)",
      primaryForeground: "oklch(0.984 0.003 247.858)",
      secondary: "oklch(0.968 0.007 247.896)",
      secondaryForeground: "oklch(0.208 0.042 265.755)",
      muted: "oklch(0.968 0.007 247.896)",
      mutedForeground: "oklch(0.554 0.046 257.417)",
      accent: "oklch(0.968 0.007 247.896)",
      accentForeground: "oklch(0.208 0.042 265.755)",
      destructive: "oklch(0.577 0.245 27.325)",
      border: "oklch(0.929 0.013 255.508)",
      input: "oklch(0.929 0.013 255.508)",
      ring: "oklch(0.704 0.04 256.788)",
      sidebar: "oklch(0.984 0.003 247.858)",
      sidebarForeground: "oklch(0.129 0.042 264.695)",
      sidebarPrimary: "oklch(0.208 0.042 265.755)",
      sidebarPrimaryForeground: "oklch(0.984 0.003 247.858)",
      sidebarAccent: "oklch(0.968 0.007 247.896)",
      sidebarAccentForeground: "oklch(0.208 0.042 265.755)",
      sidebarBorder: "oklch(0.929 0.013 255.508)",
      sidebarRing: "oklch(0.704 0.04 256.788)",
    } satisfies ThemeColors,
    dark: {
      background: "oklch(0.129 0.042 264.695)",
      foreground: "oklch(0.984 0.003 247.858)",
      card: "oklch(0.208 0.042 265.755)",
      cardForeground: "oklch(0.984 0.003 247.858)",
      popover: "oklch(0.208 0.042 265.755)",
      popoverForeground: "oklch(0.984 0.003 247.858)",
      primary: "oklch(0.929 0.013 255.508)",
      primaryForeground: "oklch(0.208 0.042 265.755)",
      secondary: "oklch(0.279 0.041 260.031)",
      secondaryForeground: "oklch(0.984 0.003 247.858)",
      muted: "oklch(0.279 0.041 260.031)",
      mutedForeground: "oklch(0.704 0.04 256.788)",
      accent: "oklch(0.279 0.041 260.031)",
      accentForeground: "oklch(0.984 0.003 247.858)",
      destructive: "oklch(0.704 0.191 22.216)",
      border: "oklch(1 0 0 / 10%)",
      input: "oklch(1 0 0 / 15%)",
      ring: "oklch(0.551 0.027 264.364)",
      sidebar: "oklch(0.208 0.042 265.755)",
      sidebarForeground: "oklch(0.984 0.003 247.858)",
      sidebarPrimary: "oklch(0.488 0.243 264.376)",
      sidebarPrimaryForeground: "oklch(0.984 0.003 247.858)",
      sidebarAccent: "oklch(0.279 0.041 260.031)",
      sidebarAccentForeground: "oklch(0.984 0.003 247.858)",
      sidebarBorder: "oklch(1 0 0 / 10%)",
      sidebarRing: "oklch(0.551 0.027 264.364)",
    } satisfies ThemeColors,
  } satisfies ThemePreset,

  /**
   * Warm — earthy browns and creams.
   */
  warm: {
    label: "Warm",
    light: {
      background: "#faf6f1",
      foreground: "#2c1810",
      card: "#fffcf8",
      cardForeground: "#2c1810",
      popover: "#fffcf8",
      popoverForeground: "#2c1810",
      primary: "#8B5A2B",
      primaryForeground: "#faf6f1",
      secondary: "#f0e8de",
      secondaryForeground: "#2c1810",
      muted: "#f0e8de",
      mutedForeground: "#7a6455",
      accent: "#f0e8de",
      accentForeground: "#2c1810",
      destructive: "#dc2626",
      border: "#e5d9ce",
      input: "#e5d9ce",
      ring: "#D4A574",
      sidebar: "#f5f0ea",
      sidebarForeground: "#2c1810",
      sidebarPrimary: "#8B5A2B",
      sidebarPrimaryForeground: "#faf6f1",
      sidebarAccent: "#ebe4db",
      sidebarAccentForeground: "#2c1810",
      sidebarBorder: "#ebe4db",
      sidebarRing: "#D4A574",
    } satisfies ThemeColors,
    dark: {
      background: "#0f0b08",
      foreground: "#f5ebe0",
      card: "#1f1812",
      cardForeground: "#f5ebe0",
      popover: "#1f1812",
      popoverForeground: "#f5ebe0",
      primary: "#D4A574",
      primaryForeground: "#0f0b08",
      secondary: "#2a1f15",
      secondaryForeground: "#f5ebe0",
      muted: "#2a1f15",
      mutedForeground: "#b8a898",
      accent: "#2a1f15",
      accentForeground: "#f5ebe0",
      destructive: "#ef4444",
      border: "rgb(255 255 255 / 10%)",
      input: "rgb(255 255 255 / 15%)",
      ring: "#E8C9A0",
      sidebar: "#150f0a",
      sidebarForeground: "#f5ebe0",
      sidebarPrimary: "#D4A574",
      sidebarPrimaryForeground: "#0f0b08",
      sidebarAccent: "#2a1f15",
      sidebarAccentForeground: "#f5ebe0",
      sidebarBorder: "#0f0b08",
      sidebarRing: "#E8C9A0",
    } satisfies ThemeColors,
  } satisfies ThemePreset,
} satisfies Record<string, ThemePreset>;

/** All available preset names – automatically derived from the keys of {@link presets}. */
export type PresetName = keyof typeof presets;

/** The preset applied when no stored preference exists. */
export const DEFAULT_PRESET: PresetName = "warm";
