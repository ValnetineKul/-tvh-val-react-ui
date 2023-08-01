import { defaultLocale } from '../../../../themes/core';

const getValidLocale = (locale: string) => {
  if (!locale) return defaultLocale;
  if (locale.toLowerCase() === 'en-mx') return 'es-MX';
  return locale;
};

export default getValidLocale;
