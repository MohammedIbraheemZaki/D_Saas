import { NextResponse } from 'next/server'
import { createI18nMiddleware } from 'next-international/middleware'
import type { NextRequest } from 'next/server'

const I18nMiddleware = createI18nMiddleware({
  locales: ['en', 'ar'],
  defaultLocale: 'en'
})

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Handle root path
  if (pathname === '/') {
    const newUrl = request.nextUrl.clone()
    newUrl.pathname = '/en'
    return NextResponse.redirect(newUrl)
  }

  return I18nMiddleware(request)
}

export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)']
}