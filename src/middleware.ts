import {NextRequest, NextResponse} from 'next/server';
import {authAdmin} from '@/lib/firebase-admin';

const protectedPaths = ['/dashboard', '/profile', '/progress', '/pronunciation', '/dialogues', '/vocabulary'];

function isProtected(path: string) {
  return protectedPaths.some((p) => path.startsWith(p));
}

export async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('session')?.value;
  const {pathname} = request.nextUrl;

  if (pathname === '/login') {
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

  if (isProtected(pathname)) {
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

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
