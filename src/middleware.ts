import { NextRequest, NextResponse } from 'next/server';
import { authAdmin } from '@/lib/firebase-admin';

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('session')?.value || '';

  // If no session cookie, redirect to login
  if (!session) {
    if (request.nextUrl.pathname.startsWith('/api/')) {
       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    // Verify session cookie
    await authAdmin.verifySessionCookie(session, true);
    return NextResponse.next();
  } catch (error) {
    // Session cookie is invalid, redirect to login
     if (request.nextUrl.pathname.startsWith('/api/')) {
       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('session');
    return response;
  }
}

export const config = {
  matcher: ['/((?!login|_next/static|favicon.ico|.*\\..*).*)'],
};
