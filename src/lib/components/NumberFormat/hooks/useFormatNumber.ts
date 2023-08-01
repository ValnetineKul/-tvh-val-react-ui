import { useConfigContext } from '../../../../themes/core';

const useFormatNumber = () => {
  const { locale } = useConfigContext();

  const formatNumber = (number: number, minimumFractionDigits?: number, maximumFractionDigits?: number) => {
    /* eslint-disable no-console */
    if (minimumFractionDigits > maximumFractionDigits) {
      console.error('NumberFormat: Invalid maximumFractionDigits and maximumFractionDigits!');
      return null;
    }
    /* eslint-enable no-console */

    return new Intl.NumberFormat(locale, { maximumFractionDigits, minimumFractionDigits }).format(number);
  };

  return { formatNumber };
};

export default useFormatNumber;
