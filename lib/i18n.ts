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

// ─── Types ────────────────────────────────────────────────────────────────────

type LocalizedValue = Record<string, string>;
type TranslationNamespace = Record<string, LocalizedValue | Record<string, unknown>>;
type LoadedNamespaces = Record<string, TranslationNamespace>;

export type LocalizedString = Record<string, string>;
export type LocalizedArray = Record<string, string[]>;

export interface TFunction {
  (key: string): string;
  (key: LocalizedString): string;
  (key: LocalizedArray): string[];
}

// ─── Shared helpers ───────────────────────────────────────────────────────────

export const getLanguageCode = (locale?: string): string => (locale || "en").split("-")[0];

function isLocalizedArray(value: object): value is LocalizedArray {
  return Object.values(value).some((v) => Array.isArray(v));
}

function resolve(namespaces: LoadedNamespaces, key: string, lang: string): string | undefined {
  for (const ns of Object.values(namespaces)) {
    const direct = ns[key];
    if (direct && typeof direct === "object" && !Array.isArray(direct)) {
      const map = direct as LocalizedValue;
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
      const map = current as LocalizedValue;
      const val = map[lang] ?? map.en;
      if (val !== undefined) return val;
    }
    if (typeof current === "string") return current;
  }
  return undefined;
}

function createTFunction(lang: string, namespaces: LoadedNamespaces): TFunction {
  function t(key: string): string;
  function t(key: LocalizedString): string;
  function t(key: LocalizedArray): string[];
  function t(key: string | LocalizedString | LocalizedArray): string | string[] {
    // string key → namespace lookup
    if (typeof key === "string") {
      const val = resolve(namespaces, key, lang);
      if (val !== undefined) return val;
      if (process.env.NODE_ENV === "development") {
        console.warn(`[i18n] Missing key: "${key}" (lang: ${lang})`);
      }
      return key;
    }

    // object → localized array
    if (isLocalizedArray(key)) {
      return (key as LocalizedArray)[lang] ?? (key as LocalizedArray).en ?? [];
    }

    // object → localized string
    return (
      (key as LocalizedString)[lang] ??
      (key as LocalizedString).en ??
      Object.values(key as LocalizedString)[0] ??
      ""
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
    return JSON.parse(readFileSync(filePath, "utf-8")) as TranslationNamespace;
  } catch {
    return {};
  }
}

async function loadRemoteNamespace(ns: string): Promise<TranslationNamespace> {
  const apiUrl = process.env.NEXT_PUBLIC_RESSOURCE_API_URL;
  if (!apiUrl) return {};
  try {
    const res = await fetch(`${apiUrl}/config/i18n/${ns}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return {};
    return (await res.json()) as TranslationNamespace;
  } catch {
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
      const [local, remote] = await Promise.all([
        loadLocalNamespace(name),
        loadRemoteNamespace(name),
      ]);
      namespaces[name] = { ...local, ...remote };
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
    const res = await fetch(`/locales/${ns}.json`);
    if (res.ok) Object.assign(result, await res.json());
  } catch {
    /* ignore */
  }

  const apiUrl = process.env.NEXT_PUBLIC_RESSOURCE_API_URL;
  if (apiUrl) {
    try {
      const res = await fetch(`${apiUrl}/config/i18n/${ns}`);
      if (res.ok) Object.assign(result, await res.json());
    } catch {
      /* ignore */
    }
  }

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

const FALLBACK_LANG_CONFIG: LangConfig = {
  default: "fr",
  available: ["fr", "en"],
  labels: { fr: "FR", en: "EN" },
};

let cachedLangConfig: LangConfig | null = null;

export const fetchLangConfig = async (): Promise<LangConfig> => {
  if (cachedLangConfig) return cachedLangConfig;
  try {
    const apiUrl = process.env.NEXT_PUBLIC_RESSOURCE_API_URL;
    const res = await fetch(`${apiUrl}/config/lang`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    cachedLangConfig = data.languages as LangConfig;
    return cachedLangConfig;
  } catch {
    return FALLBACK_LANG_CONFIG;
  }
};

export const getAvailableLocales = async (): Promise<string[]> =>
  (await fetchLangConfig()).available;

export const getDefaultLocale = async (): Promise<string> =>
  (await fetchLangConfig()).default;

/** @deprecated Use getTranslations instead */
export const translator = async ({ ns, lng = "en-US" }: { ns: string[]; lng?: string }) => getTranslations(lng, ns);