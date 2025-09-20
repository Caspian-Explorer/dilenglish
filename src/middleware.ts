import {NextRequest, NextResponse} from 'next/server';

const protectedPaths = ['/dashboard', '/profile', '/progress', '/pronunciation', '/dialogues', '/vocabulary', '/languages'];
const adminPaths = ['/admin'];

function isProtected(path: string) {
  return protectedPaths.some((p) => path.startsWith(p)) || adminPaths.some((p) => path.startsWith(p));
}

// This middleware is now Edge-safe as it doesn't import any Node.js-specific modules.
export function middleware(request: NextRequest) {
  const {pathname} = request.nextUrl;
  const sessionCookie = request.cookies.get('session')?.value;

  // If user is not authenticated and is trying to access a protected path, redirect to login.
  if (!sessionCookie && isProtected(pathname)) {
    // allow access to main languages page
    if (pathname === '/languages') return NextResponse.next();
    
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // If user is authenticated and tries to access login page, redirect to dashboard.
  if (sessionCookie && pathname === '/login') {
     return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Matcher is configured to run on all paths except for static files, etc.
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
