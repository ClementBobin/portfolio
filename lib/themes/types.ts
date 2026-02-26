/**
 * Represents the set of CSS color variables for a single color mode (light or dark).
 * Property names map to CSS variables via camelCase → kebab-case conversion.
 * e.g. `cardForeground` → `--card-foreground`
 */
export interface ThemeColors {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  border: string;
  input: string;
  ring: string;
  sidebar: string;
  sidebarForeground: string;
  sidebarPrimary: string;
  sidebarPrimaryForeground: string;
  sidebarAccent: string;
  sidebarAccentForeground: string;
  sidebarBorder: string;
  sidebarRing: string;
}

/**
 * A theme preset containing a display label and colors for both light and dark modes.
 */
export interface ThemePreset {
  label: string;
  light: ThemeColors;
  dark: ThemeColors;
}

/**
 * Union of all available theme preset names.
 */
export type PresetName =
  | "default"
  | "warm"
  | "ocean"
  | "forest"
  | "slate"
  | "lilac"
  | "minimal";
