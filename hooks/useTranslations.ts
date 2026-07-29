"use client";

import { useCallback, useEffect, useState } from "react";

import type {
  LoadedNamespaces,
  TranslationNamespace,
  TFunction,
} from "@/lib/types/global";

import {
  createTFunction,
  getLanguageCode,
} from "@/lib/translations";

const clientCache = new Map<string, TranslationNamespace>();

/**
 * Fetches a translation namespace from the client locale API.
 *
 * Results are stored in memory to avoid duplicate requests for the same
 * namespace during the client session.
 *
 * Only successful responses are cached. Non-ok responses and network errors
 * are not cached, allowing subsequent calls to retry the fetch.
 *
 * @param ns - Namespace identifier.
 * @returns Loaded translation namespace.
 */
async function fetchNamespaceClient(
  ns: string,
): Promise<TranslationNamespace> {
  const cached = clientCache.get(ns);

  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(`/api/locales/${ns}`);

    if (response.ok) {
      const result: TranslationNamespace = await response.json();
      clientCache.set(ns, result);
      return result;
    }
  } catch {
    // Ignore failed client-side translation loading.
  }

  // Return an empty namespace without caching so the next call can retry.
  return {};
}

/**
 * React client-side translation hook.
 *
 * Provides a translation function that initially uses cached namespaces
 * and updates after asynchronous namespace loading completes.
 *
 * @param locale - Active locale identifier.
 * @param ns - Translation namespaces to load.
 * @returns Translation lookup function.
 *
 * @example
 * const t = useTranslations("fr", ["common"]);
 * t("nav.home");
 */
export function useTranslations(
  locale: string,
  ns: string[] = ["common"],
): TFunction {
  const lang = getLanguageCode(locale);
  const cacheKey = ns.join(",");

  const buildT = useCallback(
    (loaded: LoadedNamespaces) => createTFunction(lang, loaded),
    [lang],
  );

  const [namespaces, setNamespaces] =
    useState<LoadedNamespaces>(() => {
      const initial: LoadedNamespaces = {};

      for (const name of ns) {
        initial[name] = clientCache.get(name) ?? {};
      }

      return initial;
    });

  useEffect(() => {
    let cancelled = false;

    Promise.all(ns.map(fetchNamespaceClient)).then((results) => {
      if (cancelled) {
        return;
      }

      const loaded: LoadedNamespaces = {};

      ns.forEach((name, index) => {
        loaded[name] = results[index];
      });

      setNamespaces(loaded);
    });

    return () => {
      cancelled = true;
    };
  }, [cacheKey]);

  return buildT(namespaces);
}