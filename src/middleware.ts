import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// const supportedLangs = ['id', 'en'];
const defaultLang = 'id';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith('/berita')) {
    const pathnameIsMissingLang = /^\/berita/.test(pathname);

    if (pathnameIsMissingLang) {
      const newPath = pathname.replace('/berita', `/${defaultLang}/berita`);
      return NextResponse.redirect(new URL(newPath, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|beranda_assets|canvas_theme|favicon.ico).*)',
  ],
};