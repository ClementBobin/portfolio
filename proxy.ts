import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextResponse } from "next/server";
import type { NextUrlLike } from "@/lib/types/global";

const MIRAGE_API_URL = process.env.NEXT_PUBLIC_MIRAGE_API_URL;

const FALLBACK_LOCALES = ["fr", "en"];
const FALLBACK_DEFAULT_LOCALE = "fr";

let cachedLocaleConfig: { locales: string[]; defaultLocale: string } | null =
  null;

/** Fetch available locales from Mirage API, fallback to hardcoded */
async function getLocaleConfig(): Promise<{
  locales: string[];
  defaultLocale: string;
}> {
  if (cachedLocaleConfig) return cachedLocaleConfig;

  try {
    const res = await fetch(`${MIRAGE_API_URL}/config/lang`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    cachedLocaleConfig = {
      locales: data.languages.available as string[],
      defaultLocale: data.languages.default as string,
    };
    return cachedLocaleConfig;
  } catch {
    return {
      locales: FALLBACK_LOCALES,
      defaultLocale: FALLBACK_DEFAULT_LOCALE,
    };
  }
}

/** Extract base locale: fr-FR -> fr */
function getBaseLocale(locale: string): string {
  return locale.split("-")[0];
}

/** Determine preferred locale from Accept-Language */
function getLocale(
  request: { headers: { get(name: string): string | null } },
  locales: string[],
  defaultLocale: string,
): string {
  const acceptLanguage: string =
    request.headers.get("accept-language") || `${defaultLocale};q=0.5`;

  const negotiator = new Negotiator({
    headers: { "accept-language": acceptLanguage },
  });
  const languages = negotiator.languages();

  const matched = match(languages, locales, defaultLocale);
  return getBaseLocale(matched);
}

/** Proxy middleware for locale-based routing */
export async function proxy(request: {
  headers: { get(name: string): string | null };
  nextUrl: NextUrlLike;
}): Promise<NextResponse | undefined> {
  const { pathname } = request.nextUrl;

  // Skip internal paths, API, favicon, or special files
  const skipPaths = ["/robots.txt", "/sitemap.xml", "/navigation-graph.json"];
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    skipPaths.includes(pathname)
  ) {
    return;
  }

  const { locales, defaultLocale } = await getLocaleConfig();
  const baseLocales = locales.map(getBaseLocale);

  // Extract first segment of pathname
  const firstSegment = pathname.split("/")[1];
  const normalizedSegment = getBaseLocale(firstSegment || "");

  // If the path already starts with a supported locale, skip redirect
  if (baseLocales.includes(normalizedSegment)) return;

  // Determine preferred locale and redirect
  const preferredLocale = getLocale(request, locales, defaultLocale);
  request.nextUrl.pathname = `/${preferredLocale}${pathname}`;

  return NextResponse.redirect(request.nextUrl.toString());
}

/** Apply middleware to all pages except _next, api, favicon.ico */
export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
