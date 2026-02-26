import { readFileSync } from "node:fs";
import path from "node:path";

const localesFolder = path.join(process.cwd(), "/public/locales");

// Get language code from locale (e.g., "en-US" -> "en", "fr-FR" -> "fr")
const getLanguageCode = (locale: string): string => {
  return locale.split("-")[0];
};

// Load translations from a single namespace file
const loadTranslations = (ns: string): Record<string, unknown> => {
  const filePath = path.join(localesFolder, `${ns}.json`);
  const content = readFileSync(filePath, "utf-8");
  return JSON.parse(content);
};

// Get nested value from object using dot-notation key path
const getNestedValue = (
  obj: Record<string, unknown>,
  keyPath: string,
): unknown => {
  return keyPath.split(".").reduce((current: unknown, key: string) => {
    if (current && typeof current === "object") {
      return (current as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
};

// Create a t function for the given locale and loaded namespace translations
const createTFunction = (
  locale: string,
  translations: Record<string, Record<string, unknown>>,
) => {
  const lang = getLanguageCode(locale);

  return (key: string): string => {
    for (const ns of Object.keys(translations)) {
      const value = getNestedValue(translations[ns], key);

      if (value !== undefined) {
        if (typeof value === "string") {
          return value;
        }
        if (typeof value === "object" && value !== null) {
          const map = value as Record<string, string>;
          return map[lang] ?? map["en"] ?? key;
        }
      }
    }

    if (process.env.NODE_ENV === "development") {
      console.log("Missing Key:", key);
    }
    return key;
  };
};

// Sync version for components that can't be async
export const getTranslations = async (
  lng: string,
  ns: string[] = ["common"],
) => {
  const translations: Record<string, Record<string, unknown>> = {};
  for (const namespace of ns) {
    translations[namespace] = loadTranslations(namespace);
  }
  return createTFunction(lng, translations);
};

// Mapping of short language codes to full locale codes
const LANGUAGE_TO_LOCALE: Record<string, string> = {
  en: "en-US",
  fr: "fr-FR",
};

// Helper function to get available locales
export const getAvailableLocales = (): string[] => {
  try {
    const common = loadTranslations("common");
    // Collect language keys from leaf translation objects
    const langs = new Set<string>();
    const collectLangs = (obj: Record<string, unknown>): void => {
      for (const value of Object.values(obj)) {
        if (value && typeof value === "object") {
          const keys = Object.keys(value as Record<string, unknown>);
          if (keys.every((k) => k in LANGUAGE_TO_LOCALE)) {
            for (const k of keys) langs.add(k);
          } else {
            collectLangs(value as Record<string, unknown>);
          }
        }
      }
    };
    collectLangs(common);
    return Array.from(langs)
      .filter((lang) => lang in LANGUAGE_TO_LOCALE)
      .map((lang) => LANGUAGE_TO_LOCALE[lang]);
  } catch {
    return ["en-US", "fr-FR"];
  }
};

// Keep translator for backward compatibility
export const translator = async ({
  ns,
  lng = "en-US",
}: {
  ns: string[];
  lng?: string;
}) => {
  return getTranslations(lng, ns);
};
