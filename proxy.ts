import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const LOCALES = ['fr', 'en']
const DEFAULT_LOCALE = 'fr'

/** Routes blocked from direct access (without locale prefix) */
const BLOCKED_ROUTES: string[] = []

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Block direct access to protected routes (e.g. /uses → 404)
  const isBlocked = BLOCKED_ROUTES.some(
    route => pathname === route || pathname.startsWith(`${route}/`)
  )
  if (isBlocked) {
    return NextResponse.rewrite(new URL('/404', request.url))
  }

  // Redirect to default locale if no locale prefix
  const hasLocale = LOCALES.some(
    l => pathname.startsWith(`/${l}/`) || pathname === `/${l}`
  )
  if (!hasLocale) {
    return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}${pathname}`, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}