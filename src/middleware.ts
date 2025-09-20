import {NextRequest, NextResponse} from 'next/server';
import {authAdmin} from '@/lib/firebase-admin';

export async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('session')?.value;

  if (request.nextUrl.pathname.startsWith('/login')) {
    if (sessionCookie) {
      try {
        await authAdmin.verifySessionCookie(sessionCookie, true);
        return NextResponse.redirect(new URL('/dashboard', request.url));
      } catch (error) {
        // Invalid cookie, let them go to the login page
      }
    }
    return NextResponse.next();
  }

  if (!sessionCookie) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    await authAdmin.verifySessionCookie(sessionCookie, true);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
