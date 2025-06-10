import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './src/lib/i18n';

export default createMiddleware({
  locales: Array.from(locales),
  defaultLocale,
  localePrefix: 'as-needed'
});

export const config = {
  matcher: ['/', '/(en|es)/:path*']
};
