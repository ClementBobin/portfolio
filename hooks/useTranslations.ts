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
// Data-fetching layer (module scope — completely outside React)
//
//   promiseCache  — deduplicates in-flight and completed fetches.
//   resultCache   — stores resolved values for synchronous hydration.
//   subscribers   — notifies hooks when a namespace resolves.
// ---------------------------------------------------------------------------

const promiseCache = new Map<string, Promise<TranslationNamespace>>();
const resultCache = new Map<string, TranslationNamespace>();
const subscribers = new Set<() => void>();

function notify() {
  subscribers.forEach((fn) => fn());
}

/**
 * Fetches a translation namespace, deduplicating concurrent requests.
 * Safe to call at module scope or in event handlers — never needs to live
 * inside a useEffect.
 */
export function preloadNamespace(ns: string): Promise<TranslationNamespace> {
  const cached = promiseCache.get(ns);
  if (cached) return cached;

  const promise = (async (): Promise<TranslationNamespace> => {
    try {
      const response = await fetch(`/api/locales/${ns}`);
      if (response.ok) {
        const result: TranslationNamespace = await response.json();
        resultCache.set(ns, result);
        notify();
        return result;
      }
    } catch {
      // Ignore network errors; fall through to empty namespace.
    }

    // Remove failed promises so the next call can retry.
    promiseCache.delete(ns);
    return {};
  })();

  promiseCache.set(ns, promise);
  return promise;
}

/** Reads the current resultCache for a list of namespace names. */
function readNamespaces(names: string[]): LoadedNamespaces {
  const loaded: LoadedNamespaces = {};
  for (const name of names) {
    loaded[name] = resultCache.get(name) ?? {};
  }
  return loaded;
}

/**
 * React client-side translation hook.
 *
 * Provides a translation function that initially uses cached namespaces
 * and updates after asynchronous namespace loading completes.
 *
 * @param locale - Active locale identifier.
 * @param ns     - Translation namespaces to load.
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

  // Keep the latest ns list accessible in the effect without making the
  // array itself a dependency (callers pass new array literals each render).
  const nsRef = useRef(ns);
  useEffect(() => {
    nsRef.current = ns;
  });

  const buildT = useCallback(
    (loaded: LoadedNamespaces) => createTFunction(lang, loaded),
    [lang],
  );

  const [namespaces, setNamespaces] = useState<LoadedNamespaces>(() => {
    // Kick off fetches for any namespace not yet in flight. The initializer
    // runs once on mount — ns is used directly here (not via the ref) so
    // no ref access occurs during render.
    for (const name of ns) {
      preloadNamespace(name);
    }
    return readNamespaces(ns);
  });

  useEffect(() => {
    // Kick off fetches for any new namespaces introduced by a cacheKey change.
    for (const name of nsRef.current) {
      preloadNamespace(name);
    }

    // Subscribe to resolution notifications. The effect body contains no
    // fetch() calls — it only reads resultCache and updates state.
    function onUpdate() {
      setNamespaces(readNamespaces(nsRef.current));
    }

    subscribers.add(onUpdate);
    return () => {
      subscribers.delete(onUpdate);
    };
  }, [cacheKey]);

  return buildT(namespaces);
}