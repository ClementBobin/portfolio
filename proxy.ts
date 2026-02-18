import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextResponse } from "next/server";
import type { NextUrlLike } from "@/lib/types";

const locales = ["en-US", "fr-FR"];
const defaultLocale = "en-US";

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
 * @returns The matched locale string
 */
function getLocale(request: ProxyRequest): string {
  const acceptLanguage: string =
    request.headers.get("accept-language") || "en-US,en;q=0.5";
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
export function proxy(
  request: ProxyRequestWithNextUrl,
): undefined | NextResponse {
  const { pathname } = request.nextUrl;

  // ❌ Skip internal Next.js paths, API routes, favicon, and sitemap/robots
  const skipPaths = ["/robots.txt", "/sitemap.xml"];
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    skipPaths.includes(pathname)
  ) {
    return;
  }

  // Check if the pathname already includes a supported locale
  const pathnameHasLocale: boolean = locales.some(
    (locale: string) =>
      pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return;

  // Get the preferred locale and redirect
  const locale: string = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(request.nextUrl.toString());
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next|api|favicon.ico).*)",
  ],
};
