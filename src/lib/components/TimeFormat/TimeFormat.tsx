import type { FC } from 'react';
import React from 'react';
import { useConfigContext } from '../../../themes/core';
import checkDateValidity from '../RelativeTime/helpers/checkDateValidity';

export interface TimeFormatProps {
  date: string;
  format?: 'long' | 'medium' | 'short';
  className?: string;
}

const TimeFormat: FC<TimeFormatProps> = ({ date, format = 'short', className }) => {
  const { locale } = useConfigContext();

  const d = new Date(date);

  /* eslint-disable no-console */
  if (!checkDateValidity(d)) {
    console.error('TimeFormat: Invalid date!');
    return null;
  }
  /* eslint-enable no-console */

  const formattedTime = new Intl.DateTimeFormat(locale, { timeStyle: format }).format(d);

  return <span className={className}>{formattedTime}</span>;
};
export default TimeFormat;
