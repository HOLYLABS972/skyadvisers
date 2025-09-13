import { NextRequest, NextResponse } from 'next/server'

const locales = ['en', 'he']
const defaultLocale = 'en'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Skip admin routes - they don't need locale prefixes
  if (pathname.startsWith('/admin')) {
    return
  }

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    // Always redirect to default locale to avoid loops
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${pathname}`, request.url)
    )
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next), API routes, admin routes, and static files
    '/((?!_next|api|admin|favicon.ico|.*\\..*).*)',
  ],
}