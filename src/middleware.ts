import {NextRequest, NextResponse} from 'next/server';

const protectedPaths = ['/dashboard', '/profile', '/progress', '/pronunciation', '/dialogues', '/vocabulary'];
const publicPaths = ['/login', '/'];

function isProtected(path: string) {
  return protectedPaths.some((p) => path.startsWith(p));
}

export async function middleware(request: NextRequest) {
  const {pathname} = request.nextUrl;
  const sessionCookie = request.cookies.get('session')?.value;

  // Allow static files and API routes
  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.includes('.')) {
    return NextResponse.next();
  }

  // If user is authenticated
  if (sessionCookie) {
    // If on a public-only path like login, redirect to dashboard
    if (pathname === '/login') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  } 
  // If user is not authenticated
  else {
    // If on a protected path, redirect to login
    if (isProtected(pathname)) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|favicon.ico).*)'],
};
