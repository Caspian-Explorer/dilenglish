import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('session')?.value;
  const isLoginPage = request.nextUrl.pathname.startsWith('/login');

  // Allow API routes, static files and image optimization files to pass through
  if (request.nextUrl.pathname.startsWith('/api') || request.nextUrl.pathname.startsWith('/_next') || /\..*$/.test(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  if (!session) {
    if (isLoginPage) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isLoginPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // The matcher is removed to avoid forcing the middleware to run on the Edge Runtime.
  // This makes it run on the Node.js runtime by default, which is more compatible.
  // matcher: ['/((?!_next/static|favicon.ico|.*\\..*).*)'],
};
