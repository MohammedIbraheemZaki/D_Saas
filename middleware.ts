import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createI18nMiddleware } from 'next-international/middleware'

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
    const response = NextResponse.redirect(newUrl)
    // Set secure cookie attributes
    response.cookies.set('NEXT_LOCALE', 'en', {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      httpOnly: true // Prevents JavaScript access to the cookie
    })
    return response
  }

  const response = I18nMiddleware(request)
  // Ensure all responses have secure cookie settings
  const locale = response.cookies.get('NEXT_LOCALE')?.value || 'en'
  response.cookies.set('NEXT_LOCALE', locale, {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    httpOnly: true
  })
  return response
}

export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)']
}