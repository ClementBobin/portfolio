import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextResponse } from "next/server";
import type { NextUrlLike } from "@/lib/types";

const MIRAGE_API_URL =
  process.env.MIRAGE_API_URL ?? "https://mirage-api-ruddy.vercel.app/api";

const FALLBACK_LOCALES = ["fr", "en"];
const FALLBACK_DEFAULT_LOCALE = "fr";

let cachedLocaleConfig: { locales: string[]; defaultLocale: string } | null =
  null;

/**
 * Fetches available locales and the default locale from the Mirage API.
 * Caches the result for the process lifetime and falls back to hardcoded
 * values if the request fails.
 */
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
    return { locales: FALLBACK_LOCALES, defaultLocale: FALLBACK_DEFAULT_LOCALE };
  }
}

/**
 * Interface for proxy request headers.
 */
interface ProxyRequest {
  headers: {
    get(name: string): string | null;
  };
  nextUrl: NextUrlLike;
}

/**
 * Interface for proxy request with Next.js URL object.
 */
interface ProxyRequestWithNextUrl extends ProxyRequest {
  nextUrl: NextUrlLike;
}

/**
 * Determines the best locale from the Accept-Language header.
 *
 * @param request - The incoming request object
 * @param locales - List of supported locales
 * @param defaultLocale - Default locale to fall back to
 * @returns The matched locale string
 */
function getLocale(
  request: ProxyRequest,
  locales: string[],
  defaultLocale: string,
): string {
  const acceptLanguage: string =
    request.headers.get("accept-language") || `${defaultLocale};q=0.5`;
  const headers: { [key: string]: string } = {
    "accept-language": acceptLanguage,
  };
  const languages: string[] = new Negotiator({ headers }).languages();
  return match(languages, locales, defaultLocale);
}

/**
 * Proxy middleware function for handling locale-based routing.
 *
 * @param request - The incoming request with Next.js URL
 * @returns NextResponse redirect or undefined if no redirect needed
 */
export async function proxy(
  request: ProxyRequestWithNextUrl,
): Promise<undefined | NextResponse> {
  const { pathname } = request.nextUrl;

  // ❌ Skip internal Next.js paths, API routes, favicon, and sitemap/robots
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

  // Check if the pathname already includes a supported locale
  const pathnameHasLocale: boolean = locales.some(
    (locale: string) =>
      pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return;

  // Get the preferred locale and redirect
  const locale: string = getLocale(request, locales, defaultLocale);
  request.nextUrl.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(request.nextUrl.toString());
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next|api|favicon.ico).*)",
  ],
};
