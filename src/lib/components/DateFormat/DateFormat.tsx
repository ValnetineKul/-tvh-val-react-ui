import type { FC } from 'react';
import React from 'react';
import { useConfigContext } from '../../../themes/core';
import checkDateValidity from '../RelativeTime/helpers/checkDateValidity';

export interface DateFormatProps {
  date: string;
  format?: 'full' | 'long' | 'medium' | 'short' | 'monthAndYear';
  className?: string;
}

const DateFormat: FC<DateFormatProps> = ({ date, format, className }) => {
  const { locale } = useConfigContext();
  const d = new Date(date);

  /* eslint-disable no-console */
  if (!checkDateValidity(d)) {
    console.error('DateFormat: Invalid date!');
    return null;
  }
  /* eslint-enable no-console */

  const dateParts = new Intl.DateTimeFormat(locale).formatToParts(d);

  let formattedDate: string;

  const year = dateParts.find((el) => el.type === 'year')?.value;
  const shortMonthFormat = dateParts.find((el) => el.type === 'month')?.value;
  const dateFormat = (dateStyle: Intl.DateTimeFormatOptions['dateStyle']) =>
    new Intl.DateTimeFormat(locale, { dateStyle }).format(d);
  const capitalize = (word: string) => word.slice(0, 1).toUpperCase() + word.slice(1);

  if (format === 'monthAndYear') {
    formattedDate = `${shortMonthFormat}/${year}`;
  } else if (['full', 'long', 'medium'].includes(format)) {
    formattedDate = capitalize(dateFormat(format));
  } else {
    formattedDate = new Intl.DateTimeFormat(locale).format(new Date(date));
  }

  return <span className={className}>{formattedDate}</span>;
};
export default DateFormat;
