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

// -----------------------------------------------
// This function determines the best locale for the user
// by examining the Accept-Language header
//----------------------------------------------------

function getLocale(request: MiddlewareRequest): string {
  // Get the Accept-Language header from the actual request
  const acceptLanguage: string =
    request.headers.get("accept-language") || "en-US,en;q=0.5";
  const headers: { [key: string]: string } = {
    "accept-language": acceptLanguage,
  };

  // Use Negotiator to extract languages from the header
  const languages: string[] = new Negotiator({ headers }).languages();

  // Match against your supported locales
  return match(languages, locales, defaultLocale);
}

export function middleware(
  request: MiddlewareRequestWithNextUrl,
): void | NextResponse {
  const { pathname } = request.nextUrl;

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
