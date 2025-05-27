import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { locales, defaultLocale } from '@/i18n/config'

// Get the preferred locale from the request headers
function getLocale(request: NextRequest) {
  // Check for locale in cookie
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale
  }

  // Check for locale in Accept-Language header
  const acceptLanguage = request.headers.get('accept-language')
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage
      .split(',')
      .map(lang => lang.split(';')[0].trim())
      .find(lang => locales.includes(lang))
    
    if (preferredLocale) {
      return preferredLocale
    }
  }

  return defaultLocale
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Check if the pathname starts with a locale
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  // Get the locale (either from cookie, headers, or default)
  const locale = getLocale(request)
  
  // Create the response
  const response = pathnameHasLocale 
    ? NextResponse.next()
    : NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url))

  // Set or update the locale cookie if it doesn't exist or is different
  const currentCookie = request.cookies.get('NEXT_LOCALE')?.value
  if (!currentCookie || currentCookie !== locale) {
    response.cookies.set('NEXT_LOCALE', locale, {
      expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
      path: '/',
      sameSite: 'lax',
    })
  }
  
  return response
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|favicon.ico).*)',
  ],
} 