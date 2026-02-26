/**
 * Simple localized string
 * Example: { en: "Hello", fr: "Bonjour" }
 */
export type LocalizedString = Record<string, string>;

/**
 * Localized array of strings
 * Example: { en: ["Item 1", "Item 2"], fr: ["Élément 1"] }
 */
export type LocalizedStringArray = Record<string, string[]>;