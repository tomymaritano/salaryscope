export const locales = ['en', 'es'] as const;
export const defaultLocale = 'es';

export async function getMessages(locale: string) {
  return (await import(`@/messages/${locale}.json`)).default;
}
