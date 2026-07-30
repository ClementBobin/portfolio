import type {
  LocalizedArray,
  LocalizedString,
  LoadedNamespaces,
  TFunction,
} from "@/lib/types/global";

/**
 * Checks whether a value is a localized array object.
 *
 * @param value - Unknown value to inspect.
 * @returns True when the value contains localized arrays.
 */
export function isLocalizedArray(value: unknown): value is LocalizedArray {
  return (
    value !== null &&
    typeof value === "object" &&
    Object.values(value).some(Array.isArray)
  );
}

/**
 * Resolves a translation key from loaded namespaces.
 *
 * Supports direct namespace keys and nested dot notation paths.
 *
 * @param namespaces - Loaded translation namespaces.
 * @param key - Translation key to resolve.
 * @param lang - Active language code.
 * @returns The translated string when found.
 */
export function resolve(
  namespaces: LoadedNamespaces,
  key: string,
  lang: string,
): string | undefined {
  for (const ns of Object.values(namespaces)) {
    const direct = ns[key];

    if (direct && typeof direct === "object" && !Array.isArray(direct)) {
      const map = direct as LocalizedString;
      const value = map[lang] ?? map.en;

      if (value !== undefined) return value;
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
      const value = map[lang] ?? map.en;

      if (value !== undefined) return value;
    }

    if (typeof current === "string") {
      return current;
    }
  }

  return undefined;
}

/**
 * Replaces interpolation variables in translated strings.
 *
 * @param str - String containing interpolation placeholders.
 * @param vars - Variables used for replacement.
 * @returns Interpolated string.
 */
export function interpolate(
  str: string,
  vars?: Record<string, string | number>,
): string {
  if (!vars) return str;

  return str.replace(
    /\{\{(\w+)\}\}/g,
    (_, key) => String(vars[key] ?? `{{${key}}}`),
  );
}

/**
 * Creates a translation function bound to a language and namespace collection.
 *
 * Supports:
 * - translation key lookups
 * - localized string objects
 * - localized array objects
 *
 * @param lang - Active language code.
 * @param namespaces - Loaded translation namespaces.
 * @returns Translation lookup function.
 */
export function createTFunction(
  lang: string,
  namespaces: LoadedNamespaces,
): TFunction {
  function t(key: string, vars?: Record<string, string | number>): string;
  function t(key: LocalizedString, vars?: Record<string, string | number>): string;
  function t(key: LocalizedArray): string[];

  function t(
    key: string | LocalizedString | LocalizedArray | null | undefined,
    vars?: Record<string, string | number>,
  ): string | string[] {
    if (key == null) {
      return "";
    }

    if (typeof key === "string") {
      const value = resolve(namespaces, key, lang);

      if (value !== undefined) {
        return interpolate(value, vars);
      }

      return interpolate(key, vars);
    }

    if (typeof key !== "object") {
      return "";
    }

    if (isLocalizedArray(key)) {
      return key[lang] ?? key.en ?? [];
    }

    return interpolate(
      key[lang] ?? key.en ?? Object.values(key)[0] ?? "",
      vars,
    );
  }

  return t as TFunction;
}

/**
 * Extracts the base language code from a locale identifier.
 *
 * @param locale - Locale string such as "fr-FR" or "en".
 * @returns Normalized language code.
 */
export function getLanguageCode(locale: string): string {
  const normalized = (locale ?? "").trim().toLowerCase();

  if (!normalized) return "en";

  return normalized.split(/[-_]/)[0] || "en";
}