import { NextResponse, type NextRequest } from 'next/server';

// This is the only runtime the middleware should use.
export const runtime = 'nodejs';

const protectedPaths = ['/dashboard', '/profile', '/progress', '/pronunciation', '/dialogues', '/vocabulary', '/admin'];

// The middleware is now lightweight and only handles routing logic.
// It does NOT import firebase-admin.
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get('session')?.value;

  const isProtected = protectedPaths.some(p => pathname.startsWith(p));

  // If the user is trying to access a protected path without a session cookie, redirect to login.
  if (isProtected && !sessionCookie) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // If the user is logged in (has a session cookie) and tries to access the login page, redirect to dashboard.
  if (pathname === '/login' && sessionCookie) {
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// This config matches all paths except for static assets.
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
