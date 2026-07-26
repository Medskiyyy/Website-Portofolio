import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    /*
     * Everything except API routes, Next internals, and files with an
     * extension. `apple-icon` and `icon` are named explicitly because
     * Next generates them without one, so the extension rule misses them and
     * they would be redirected to /<locale>/apple-icon and 404.
     */
    '/((?!api|_next|_vercel|apple-icon|icon|opengraph-image|twitter-image|.*\\..*).*)',
    '/'
  ]
};
