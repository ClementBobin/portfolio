import path from "path";
import { readdirSync, lstatSync } from "fs";

import i18n, { InitOptions, TFunction } from "i18next";
import i18nextFSBackend from "i18next-fs-backend";

let globalInstance: typeof i18n;
const localesFolder = path.join(process.cwd(), "/public/locales");

type UseTranslatorProps = {
  ns: string[];
  lng?: string;
};

type CreateInstanceProps = {
  locale?: string;
  namespaces: string[] | readonly string[];
};

// Function to get available languages from the filesystem
const getAvailableLanguages = (): string[] => {
  return readdirSync(localesFolder).filter((fileName) => {
    const joinedPath = path.join(localesFolder, fileName);
    return lstatSync(joinedPath).isDirectory();
  });
};

const createI18nClient = async ({
  locale = "en-US",
  namespaces,
}: CreateInstanceProps) => {
  let instance: typeof i18n;

  const availableLanguages = getAvailableLanguages();

  // Fallback logic: if requested locale doesn't exist, try base language or default
  const effectiveLocale = availableLanguages.includes(locale)
    ? locale
    : availableLanguages.find((lang) =>
        lang.startsWith(locale.split("-")[0]),
      ) || "en-US";

  const config: InitOptions = {
    initImmediate: false,
    fallbackLng: ["en-US", "fr-FR"], // Add fallback chain
    supportedLngs: availableLanguages, // Explicitly set supported languages
    ns: namespaces,
    lng: effectiveLocale,
    preload: availableLanguages,
    backend: {
      loadPath: path.join(localesFolder, "{{lng}}/{{ns}}.json"),
    },
    load: "currentOnly", // Only load current language
    saveMissing: true,
    saveMissingTo: "all",
    missingKeyNoValueFallbackToKey: true,
    parseMissingKeyHandler: (key) => {
      console.log("Missing Key:", key);
      return "";
    },
    react: { useSuspense: true },
    debug: process.env.NODE_ENV === "development",
  };

  if (!globalInstance) {
    globalInstance = i18n.createInstance(config);
    instance = globalInstance;
  } else {
    instance = globalInstance.cloneInstance(config);
  }

  if (!instance.isInitialized) {
    instance.use(i18nextFSBackend);
    await instance.init(config);
  } else {
    // If already initialized, change language if needed
    if (instance.language !== effectiveLocale) {
      await instance.changeLanguage(effectiveLocale);
    }
  }

  return instance;
};

// returns 't' function after ensuring translations are loaded
export const translator = async ({
  ns,
  lng = "en-US",
}: UseTranslatorProps): Promise<TFunction> => {
  const i18nInstance = await createI18nClient({ namespaces: ns, locale: lng });
  return i18nInstance.t;
};

// Sync version for components that can't be async
export const getTranslations = async (
  lng: string,
  ns: string[] = ["common"],
) => {
  const t = await translator({ ns, lng });
  return t;
};

// Helper function to get available locales
export const getAvailableLocales = (): string[] => {
  return getAvailableLanguages();
};
