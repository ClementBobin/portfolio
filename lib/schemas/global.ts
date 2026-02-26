import { z } from "zod";

/**
 * Simple localized string
 * Example: { en: "Hello", fr: "Bonjour" }
 */
export const LocalizedStringSchema = z.record(z.string(), z.string());

/**
 * Localized array of strings
 * Example: { en: ["Item 1", "Item 2"], fr: ["Élément 1"] }
 */
export const LocalizedStringArraySchema = z.record(
  z.string(),
  z.array(z.string())
);

export type LocalizedString = z.infer<typeof LocalizedStringSchema>;
export type LocalizedStringArray = z.infer<typeof LocalizedStringArraySchema>;
