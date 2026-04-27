import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Maps a Lucide icon name string to the corresponding Lucide icon component.
 * Falls back to Code2 if the icon name is not found.
 *
 * @param name - The Lucide icon name (e.g., "Code2", "Globe", "Database")
 * @returns The corresponding Lucide icon component
 */
export function getTechIcon(name: string): LucideIcon {
  const icons = LucideIcons as unknown as Record<string, LucideIcon>;
  return icons[name] ?? icons["Code2"] ?? (() => null);
}
