/**
 * i18n.ts — Translation utility supporting both server and client environments.
 *
 * Exports:
 *   getTranslations(locale, ns)   → async, Server Components
 *   useTranslations(locale, ns)   → React hook, Client Components
 *
 * The returned t() function is overloaded:
 *   t("nav.home")                     → string  (key lookup from JSON/API namespaces)
 *   t(data.personal.summary)          → string  (localize { en, fr } object)
 *   t(data.seo.keywords)              → string[] (localize { en: [], fr: [] } object)
 */
// ─── Shared helpers ───────────────────────────────────────────────────────────

import type { LocalizedString, LocalizedArray, LoadedNamespaces, TFunction, TranslationNamespace } from "@/types/global";

export const getLanguageCode = (locale?: string): string => (locale || "en").split("-")[0];

function isLocalizedArray(value: unknown): value is LocalizedArray {
  return (
    value !== null &&
    typeof value === "object" &&
    Object.values(value).some(Array.isArray)
  );
}

function resolve(namespaces: LoadedNamespaces, key: string, lang: string): string | undefined {
  for (const ns of Object.values(namespaces)) {
    const direct = ns[key];
    if (direct && typeof direct === "object" && !Array.isArray(direct)) {
      const map = direct as LocalizedString;
      const val = map[lang] ?? map.en;
      if (val !== undefined) return val;
    }

    const parts = key.split(".");
    let current: unknown = ns;
    for (const part of parts) {
      current =
        current && typeof current === "object"
          ? (current as Record<string, unknown>)[part]
          : undefined;
    }
    if (current && typeof current === "object" && !Array.isArray(current)) {
      const map = current as LocalizedString;
      const val = map[lang] ?? map.en;
      if (val !== undefined) return val;
    }
    if (typeof current === "string") return current;
  }
  return undefined;
}

function interpolate(str: string, vars?: Record<string, string | number>): string {
  if (!vars) return str;
  return str.replace(/\{\{(\w+)\}\}/g, (_, k) => String(vars[k] ?? `{{${k}}}`));
}

function createTFunction(lang: string, namespaces: LoadedNamespaces): TFunction {
  function t(key: string, vars?: Record<string, string | number>): string;
  function t(key: LocalizedString, vars?: Record<string, string | number>): string;
  function t(key: LocalizedArray): string[];
  function t(
    key: string | LocalizedString | LocalizedArray | null | undefined,
    vars?: Record<string, string | number>,
  ): string | string[] {

    // null / undefined protection
    if (key == null) {
      if (process.env.NODE_ENV === "development") {
        console.warn("[i18n] t() received undefined/null");
      }
      return "";
    }

    // translation key lookup
    if (typeof key === "string") {
      const val = resolve(namespaces, key, lang);
      if (val !== undefined) return interpolate(val, vars);
      if (process.env.NODE_ENV === "development") {
        console.warn(`[i18n] Missing key: "${key}" (lang: ${lang})`);
      }
      return interpolate(key, vars);
    }

    // sanity check for non-object weirdness
    if (typeof key !== "object") {
      return "";
    }

    // localized array
    if (isLocalizedArray(key)) {
      return key[lang] ?? key.en ?? [];
    }

    // localized string
    return interpolate(
      key[lang] ?? key.en ?? Object.values(key)[0] ?? "",
      vars,
    );
  }

  return t as TFunction;
}

// ─── Server-side ──────────────────────────────────────────────────────────────

async function loadLocalNamespace(ns: string): Promise<TranslationNamespace> {
  try {
    const { readFileSync } = await import("node:fs");
    const { join } = await import("node:path");
    const filePath = join(process.cwd(), "public", "locales", `${ns}.json`);
    console.log(`[i18n] Reading file: ${filePath}`); // ← add
    const raw = readFileSync(filePath, "utf-8");
    console.log(`[i18n] Raw length: ${raw.length}`); // ← add
    const content = JSON.parse(raw);
    return content as TranslationNamespace;
  } catch (e) {
    console.error(`[i18n] Failed to load ${ns}:`, e);
    return {};
  }
}

/**
 * Server-side translation loader (Server Components, route handlers).
 * Merges local JSON + remote API; API wins on conflict.
 *
 * @example
 * const t = await getTranslations(locale, ["common"]);
 * t("nav.home")                    // → "Home"
 * t(data.personal.summary)         // → "Fullstack developer..."
 * t(data.seo.keywords)             // → ["portfolio", "web developer", ...]
 */
export async function getTranslations(
  locale: string,
  ns: string[] = ["common"],
): Promise<TFunction> {
  const lang = getLanguageCode(locale);
  const namespaces: LoadedNamespaces = {};

  await Promise.all(
    ns.map(async (name) => {
      const [local] = await Promise.all([
        loadLocalNamespace(name),
      ]);
      namespaces[name] = { ...local };
    }),
  );

  return createTFunction(lang, namespaces);
}

// ─── Client-side ─────────────────────────────────────────────────────────────

const clientCache = new Map<string, TranslationNamespace>();

async function fetchNamespaceClient(ns: string): Promise<TranslationNamespace> {
  if (clientCache.has(ns)) return clientCache.get(ns)!;

  const result: TranslationNamespace = {};
  try {
    const res = await fetch(`/api/locales/${ns}`, { next: { revalidate: 3600 } });
    if (res.ok) Object.assign(result, await res.json());
  } catch { /* ignore */ }

  clientCache.set(ns, result);
  return result;
}

/**
 * Client-side translation hook (Client Components).
 * Returns a stable t() immediately from cache, updates once async fetch completes.
 *
 * @example
 * "use client";
 * const t = useTranslations(locale, ["common"]);
 * t("nav.home")                    // → "Home"
 * t(data.personal.summary)         // → "Fullstack developer..."
 * t(data.seo.keywords)             // → ["portfolio", "web developer", ...]
 */
export function useTranslations(locale: string, ns: string[] = ["common"]): TFunction {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require("react") as typeof import("react");

  const lang = getLanguageCode(locale);
  const cacheKey = ns.join(",");

  const buildT = React.useCallback(
    (loaded: LoadedNamespaces) => createTFunction(lang, loaded),
    [lang],
  );

  const getInitialNamespaces = (): LoadedNamespaces => {
    const result: LoadedNamespaces = {};
    for (const name of ns) result[name] = clientCache.get(name) ?? {};
    return result;
  };

  const [namespaces, setNamespaces] = React.useState<LoadedNamespaces>(getInitialNamespaces);

  React.useEffect(() => {
    let cancelled = false;
    Promise.all(ns.map(fetchNamespaceClient)).then((results) => {
      if (cancelled) return;
      const loaded: LoadedNamespaces = {};
      ns.forEach((name, i) => {
        loaded[name] = results[i];
      });
      setNamespaces(loaded);
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cacheKey]);

  return buildT(namespaces);
}

// ─── Language config ──────────────────────────────────────────────────────────

export interface LangConfig {
  default: string;
  available: string[];
  labels: Record<string, string>;
}

/** @deprecated Use getTranslations instead */
export const translator = async ({ ns, lng = "en-US" }: { ns: string[]; lng?: string }) => getTranslations(lng, ns);