import { NextResponse, type NextRequest } from 'next/server';

/**
 * Security-focused middleware / proxy.
 *
 * 1. Injects standard security headers into every response.
 * 2. Prevents caching of API responses at the browser level.
 *
 * This runs at the Vercel edge (or Node.js server) before the route handler,
 * so headers are applied even when the response is served from the ISR cache.
 */

const SECURITY_HEADERS: [string, string][] = [
  ['X-Content-Type-Options', 'nosniff'],
  ['X-Frame-Options', 'DENY'],
  ['X-XSS-Protection', '1; mode=block'],
  ['Referrer-Policy', 'strict-origin-when-cross-origin'],
  ['Permissions-Policy', 'camera=(), microphone=(), geolocation=(), browsing-topics=()'],
  ['Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload'],
];

export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  // Apply security headers to every response
  for (const [key, value] of SECURITY_HEADERS) {
    response.headers.set(key, value);
  }

  // Prevent browser caching of API responses
  if (request.nextUrl.pathname.startsWith('/api/')) {
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
  }

  return response;
}

export const config = {
  /**
   * Match all routes except:
   * - _next/static (static assets)
   * - _next/image (image optimization)
   * - favicon.ico, sitemap.xml, robots.txt, manifest.webmanifest
   * - public folder assets (images, etc.)
   */
  matcher: [
    '/((?!_next/static|_next/image|favicon\\.ico|sitemap\\.xml|robots\\.txt|manifest\\.webmanifest|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|woff|woff2|ttf|eot)).*)',
  ],
};
