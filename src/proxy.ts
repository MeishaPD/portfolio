import { NextRequest, NextResponse } from 'next/server'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    pathname === '/works' ||
    pathname.startsWith('/works/') ||
    pathname === '/contact' ||
    pathname.startsWith('/contact/') ||
    pathname === '/about' ||
    pathname.startsWith('/about/')
  ) {
    return NextResponse.redirect(new URL('/underconstruction', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/works/:path*', '/contact/:path*', '/about/:path*'],
}
