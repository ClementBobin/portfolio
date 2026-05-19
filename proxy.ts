import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const LOCALES = ['fr', 'en']
const DEFAULT_LOCALE = 'fr'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const hasLocale = LOCALES.some(l => pathname.startsWith(`/${l}/`) || pathname === `/${l}`)
  if (!hasLocale) {
    return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}${pathname}`, request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}
