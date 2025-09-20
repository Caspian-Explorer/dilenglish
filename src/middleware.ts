import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  // The matcher is removed to avoid forcing the middleware to run on the Edge Runtime.
  // This makes it run on the Node.js runtime by default, which is more compatible.
  // matcher: ['/((?!_next/static|favicon.ico|.*\\..*).*)'],
};
