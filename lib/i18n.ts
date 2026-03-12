import { readFileSync } from "node:fs";
import path from "node:path";

const localesFolder = path.join(process.cwd(), "/public/locales");

// Get language code from locale (e.g., "en-US" -> "en", "fr-FR" -> "fr")
export const getLanguageCode = (locale?: string): string => {
  // Use "en" as a fallback if locale is undefined
  const safeLocale = locale || "en";
  return safeLocale.split("-")[0];
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

const RESSOURCES_API_URL = process.env.NEXT_PUBLIC_RESSOURCES_API_URL;

/**
 * Language configuration returned by the Mirage API.
 *
 * @property default - Default language code (e.g. "fr")
 * @property available - List of available language codes (e.g. ["fr", "en"])
 * @property labels - Display labels keyed by language code
 */
export interface LangConfig {
  default: string;
  available: string[];
  labels: Record<string, string>;
}

const FALLBACK_LANG_CONFIG: LangConfig = {
  default: "fr",
  available: ["fr", "en"],
  labels: { fr: "FR", en: "EN" },
};

let cachedLangConfig: LangConfig | null = null;

/** Fetches language configuration from the Mirage API (cached for the process lifetime). */
export const fetchLangConfig = async (): Promise<LangConfig> => {
  if (cachedLangConfig) return cachedLangConfig;
  try {
    const res = await fetch(`${RESSOURCES_API_URL}/config/lang`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    cachedLangConfig = data.languages as LangConfig;
    return cachedLangConfig;
  } catch {
    return FALLBACK_LANG_CONFIG;
  }
};

/** Returns the list of available locale codes from the Mirage API. */
export const getAvailableLocales = async (): Promise<string[]> => {
  const config = await fetchLangConfig();
  return config.available;
};

/** Returns the default locale code from the Mirage API. */
export const getDefaultLocale = async (): Promise<string> => {
  const config = await fetchLangConfig();
  return config.default;
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
