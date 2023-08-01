const DEFAULT_THOUSAND_SEPARATOR = ',';
const DEFAULT_DECIMAL_SEPARATOR = '.';

const getSeparatorsForLocale = (locale: string) => {
  try {
    const parts: Partial<Record<'group' | 'decimal', string>> = Object.fromEntries(
      new Intl.NumberFormat(locale)
        .formatToParts(12345.6)
        .filter(({ type }) => type === 'group' || type === 'decimal')
        .map(({ type, value }) => [type, value])
    );
    return {
      thousandSeparator: parts.group ?? DEFAULT_THOUSAND_SEPARATOR,
      decimalSeparator: parts.decimal ?? DEFAULT_DECIMAL_SEPARATOR,
    };
  } catch (error) {
    return {
      thousandSeparator: DEFAULT_THOUSAND_SEPARATOR,
      decimalSeparator: DEFAULT_DECIMAL_SEPARATOR,
    };
  }
};

export default getSeparatorsForLocale;
