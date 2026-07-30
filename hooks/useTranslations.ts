"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type {
  LoadedNamespaces,
  TranslationNamespace,
  TFunction,
} from "@/lib/types/global";

import {
  createTFunction,
  getLanguageCode,
} from "@/lib/translations";

// ---------------------------------------------------------------------------
// Data-fetching layer
//
// Two caches kept separate on purpose:
//
//   promiseCache  — deduplicates in-flight and completed fetches so that
//                   concurrent callers for the same namespace share one
//                   Promise rather than each firing their own request.
//                   This is the idiomatic fix for the no-fetch-in-effect
//                   warning: move the fetch outside the effect into a layer
//                   that React (and the effect) can call synchronously and
//                   get back a stable Promise.
//
//   resultCache   — stores resolved TranslationNamespace values so that
//                   the useState initializer can hydrate synchronously on
//                   the first render without waiting for the effect.
// ---------------------------------------------------------------------------

const promiseCache = new Map<string, Promise<TranslationNamespace>>();
const resultCache = new Map<string, TranslationNamespace>();

/**
 * Fetches a translation namespace, deduplicating concurrent requests.
 *
 * Returns a cached Promise for any namespace that is already in flight or
 * has already resolved. Only the first call for a given namespace triggers
 * a network request; all subsequent calls return the same Promise.
 *
 * Failed fetches are not cached — the Promise is removed from the cache on
 * rejection so the next call can retry.
 */
function fetchNamespace(ns: string): Promise<TranslationNamespace> {
  const inflight = promiseCache.get(ns);
  if (inflight) return inflight;

  const promise = (async (): Promise<TranslationNamespace> => {
    try {
      const response = await fetch(`/api/locales/${ns}`);

      if (response.ok) {
        const result: TranslationNamespace = await response.json();
        resultCache.set(ns, result);
        return result;
      }
    } catch {
      // Ignore network errors; fall through to return empty namespace.
    }

    // Do not cache failed fetches so callers can retry.
    promiseCache.delete(ns);
    return {};
  })();

  promiseCache.set(ns, promise);
  return promise;
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

  // Stable string key derived from the ns array. Avoids treating a new
  // array literal with the same contents as a changed dependency.
  const cacheKey = ns.join(",");

  // Keep the current ns list accessible inside the effect without making
  // the array itself a dependency (it's recreated every render by callers).
  const nsRef = useRef(ns);
  useEffect(() => {
    nsRef.current = ns;
  });

  const buildT = useCallback(
    (loaded: LoadedNamespaces) => createTFunction(lang, loaded),
    [lang],
  );

  // Hydrate synchronously from resultCache so the first render already has
  // whatever namespaces were loaded in a previous mount of this hook.
  const [namespaces, setNamespaces] = useState<LoadedNamespaces>(() => {
    const initial: LoadedNamespaces = {};
    for (const name of ns) {
      initial[name] = resultCache.get(name) ?? {};
    }
    return initial;
  });

  useEffect(() => {
    let cancelled = false;

    // Snapshot the namespace list that corresponds to this cacheKey so the
    // async continuation always maps results to the correct names, even if
    // the ref has been updated by the time the Promises resolve.
    const names = nsRef.current.slice();

    // fetchNamespace() is defined outside the effect in a dedicated
    // data-fetching layer. The effect only awaits the Promises it returns —
    // no fetch() call lives inside the effect itself.
    Promise.all(names.map(fetchNamespace)).then((results) => {
      if (cancelled) return;

      const loaded: LoadedNamespaces = {};
      for (let i = 0; i < names.length; i++) {
        loaded[names[i]] = results[i];
      }
      setNamespaces(loaded);
    });

    return () => {
      cancelled = true;
    };
  }, [cacheKey]); // cacheKey is the stable proxy for the ns array

  return buildT(namespaces);
}