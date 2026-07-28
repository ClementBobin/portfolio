import { cache } from "react";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import type {
  LoadedNamespaces,
  TranslationNamespace,
  TFunction,
} from "@/lib/types/global";

import {
  createTFunction,
  getLanguageCode,
} from "@/lib/translations";

const namespaceCache = new Map<string, Promise<TranslationNamespace>>();

/**
 * Loads a local translation namespace from disk.
 *
 * Uses an in-memory cache to avoid repeated filesystem reads and JSON parsing.
 *
 * @param ns - Namespace name without the .json extension.
 * @returns Loaded translation namespace or an empty object when loading fails.
 */
async function loadLocalNamespace(
  ns: string,
): Promise<TranslationNamespace> {
  const cached = namespaceCache.get(ns);

  if (cached) {
    return cached;
  }

  const loading = (async () => {
    try {
      const filePath = join(
        process.cwd(),
        "public",
        "locales",
        `${ns}.json`,
      );

      const raw = await readFile(filePath, "utf-8");

      return JSON.parse(raw) as TranslationNamespace;
    } catch (error) {
      console.error(`[i18n] Failed to load ${ns}:`, error);

      return {};
    }
  })();

  namespaceCache.set(ns, loading);

  return loading;
}

/**
 * Loads server-side translations from local JSON namespaces.
 *
 * Translation namespaces are cached during render passes with React cache()
 * and local files are cached in memory to prevent repeated disk reads.
 *
 * @param locale - Active locale identifier.
 * @param ns - Translation namespaces to load.
 * @returns Translation lookup function.
 *
 * @example
 * const t = await getTranslations(locale, ["common"]);
 * t("nav.home");
 */
export const getTranslations = cache(
  async (
    locale: string,
    ns: string[] = ["common"],
  ): Promise<TFunction> => {
    const lang = getLanguageCode(locale);

    const namespaces: LoadedNamespaces = {};

    await Promise.all(
      ns.map(async (name) => {
        namespaces[name] = {
          ...(await loadLocalNamespace(name)),
        };
      }),
    );

    return createTFunction(lang, namespaces);
  },
);