import { NextResponse, type NextRequest } from 'next/server';

export const runtime = 'nodejs';

const protectedPaths = ['/dashboard', '/profile', '/progress', '/pronunciation', '/dialogues', '/vocabulary', '/admin'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get('session')?.value;

  const isProtected = protectedPaths.some(p => pathname.startsWith(p));

  // If the user is trying to access a protected path without a session cookie, redirect to login.
  if (isProtected && !sessionCookie) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If the user is logged in (has a session cookie) and tries to access the login page, redirect to dashboard.
  if (pathname === '/login' && sessionCookie) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // A full verification of the session cookie will happen on the protected pages themselves.
  // The middleware is just for basic routing.

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
