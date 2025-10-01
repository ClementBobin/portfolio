import { NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

const locales = ["en-US", "fr-FR"];
const defaultLocale = "en-US";

interface MiddlewareRequest {
  headers: {
    get(name: string): string | null;
  };
  nextUrl: {
    pathname: string;
    [key: string]: any;
  };
}

interface MiddlewareNextUrl {
  pathname: string;
  [key: string]: any;
}

interface MiddlewareRequestWithNextUrl extends MiddlewareRequest {
  nextUrl: MiddlewareNextUrl;
}

// Determine best locale from Accept-Language header
function getLocale(request: MiddlewareRequest): string {
  const acceptLanguage: string =
    request.headers.get("accept-language") || "en-US,en;q=0.5";
  const headers: { [key: string]: string } = {
    "accept-language": acceptLanguage,
  };
  const languages: string[] = new Negotiator({ headers }).languages();
  return match(languages, locales, defaultLocale);
}

export function middleware(
  request: MiddlewareRequestWithNextUrl,
): void | NextResponse {
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
