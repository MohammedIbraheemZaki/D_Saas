// import { createI18nMiddleware } from 'next-international/middleware'
// import { NextRequest } from 'next/server'

// const I18nMiddleware = createI18nMiddleware({
//   locales: ['en', 'ar'],
//   defaultLocale: 'en'
// })

// export function middleware(request: NextRequest) {
//   return I18nMiddleware(request)
// }

// export const config = {
//   matcher: ['/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)']
// } 


import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Redirect /en or /en/ to /
  if (pathname === '/en' || pathname === '/en/') {
    const newUrl = request.nextUrl.clone()
    newUrl.pathname = '/'
    return NextResponse.redirect(newUrl)
  }

  // Remove /en from any path (e.g., /en/about -> /about)
  if (pathname.startsWith('/en/')) {
    const newUrl = request.nextUrl.clone()
    newUrl.pathname = pathname.replace(/^\/en/, '')
    return NextResponse.redirect(newUrl)
  }

  // Allow all other paths to proceed
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)']
}