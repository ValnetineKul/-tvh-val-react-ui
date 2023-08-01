import { useCallback, useEffect, useState } from 'react';
import * as locales from 'date-fns/locale';

const useDateFnsLocale = (localeCode: string) => {
  const [locale, setLocale] = useState(locales['enGB']);

  const getLocale = useCallback(() => {
    const localeParts = localeCode.split('-');
    let fullLocale;
    if (localeParts[1]) fullLocale = `${localeParts[0].toLowerCase()}${localeParts[1].toUpperCase()}`;
    else fullLocale = localeCode.toLowerCase();

    return (
      locales[fullLocale as keyof typeof locales] ?? locales[localeParts[0] as keyof typeof locales] ?? locales.enGB
    );
  }, [localeCode]);

  const isSameLocale = useCallback(() => {
    const localeCodeSize = locale.code?.length ?? 0;

    return locale.code === localeCode.substring(0, localeCodeSize);
  }, [locale.code, localeCode]);

  useEffect(() => {
    let isMounted = true;

    async function loadLocale() {
      const localeToSet = getLocale();

      if (!isMounted) return;

      setLocale(localeToSet);
    }

    if (!isSameLocale()) {
      loadLocale();
    }

    return () => {
      isMounted = false;
    };
  }, [locale.code, localeCode, getLocale, isSameLocale]);

  return {
    locale,
  };
};

export default useDateFnsLocale;
