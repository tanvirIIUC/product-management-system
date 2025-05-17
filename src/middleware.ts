import { NextRequest, NextResponse } from 'next/server'
export async function middleware(req: NextRequest) {


const token =
req.cookies.get("next-auth.session-token")?.value || 
req.cookies.get("__Secure-next-auth.session-token")?.value;

  if (token) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL('/login', req.url));
}

export const config = {
  matcher: ['/dashboard','/dashboard/:path*','/products','/products/:path*', '/myBooking/:path*'],
};
