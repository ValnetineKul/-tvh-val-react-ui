import type { FC } from 'react';
import React from 'react';
import LocaleCurrency from 'locale-currency';
import { defaultLocale, useConfigContext } from '../../../themes/core';
import getValidLocale from './helpers/getValidLocale';

export interface CurrencyFormatProps {
  value: number;
  className?: string;
}

const CurrencyFormat: FC<CurrencyFormatProps> = ({ value, className }) => {
  const { settedLocale: locale } = useConfigContext();

  const getFormattedNumber = (usedLocale: string) => {
    const currency = LocaleCurrency.getCurrency(getValidLocale(usedLocale));
    return new Intl.NumberFormat(usedLocale, { style: 'currency', currency }).format(value);
  };

  let formattedNumber;

  /* eslint-disable no-console */
  try {
    formattedNumber = getFormattedNumber(locale);
  } catch (e) {
    console.error('Invalid locale code used ', e);
    formattedNumber = getFormattedNumber(defaultLocale);
  }
  /* eslint-enable no-console */

  return <span className={className}>{formattedNumber}</span>;
};

export default CurrencyFormat;
