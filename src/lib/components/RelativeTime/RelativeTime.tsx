import type { FC } from 'react';
import React from 'react';
import { capitalize } from '@mui/material/utils';
import { formatDistance } from 'date-fns';
import { useConfigContext } from '../../../themes/core';
import getISO8601WeekNumber from './helpers/getISO8601WeekNumber';
import isSameDay from './helpers/isSameDay';
import DateFormat from '../DateFormat';
import useDateFnsLocale from '../DateField/hooks/useDateFnsLocale';
import getWeekDaysRange from './helpers/getWeekDaysRange';
import checkDateValidity from './helpers/checkDateValidity';
import getSafeDateOfMonth from './helpers/getSafeDateOfMonth';
import isSameMonth from './helpers/isSameMonth';

export interface RelativeTimeProps {
  date: string;
  precision?:
    | '1hour'
    | 'sameday'
    | '1day'
    | '7days'
    | 'sameweek'
    | '1week'
    | 'samemonth'
    | '1month'
    | 'sameyear'
    | '1year';
  className?: string;
}

const RelativeTime: FC<RelativeTimeProps> = ({ date, precision, className }) => {
  const { locale } = useConfigContext();
  const { locale: localeCode } = useDateFnsLocale(locale);
  const today = new Date();
  const dayToday = today.getDate();
  const monthToday = today.getMonth();
  const yearToday = today.getFullYear();

  const d = new Date(date);

  /* eslint-disable no-console */
  if (!checkDateValidity(d)) {
    console.error('RelativeTime: Invalid date!');
    return null;
  }
  /* eslint-enable no-console */

  const relative = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  const oneHourPrecision = (a: Date) => {
    const now = new Date();

    const timeDifference = a.getTime() - now.getTime();
    const minutesDifference = Math.round(timeDifference / (60 * 1000));

    if (minutesDifference > -1 && minutesDifference < 1) {
      return formatDistance(now, now, { locale: localeCode });
    }

    if (minutesDifference > -60 && minutesDifference < 60) {
      return relative.format(minutesDifference, 'minute');
    }

    const hoursDifference = Math.round(timeDifference / (60 * 60 * 1000));

    if (hoursDifference <= 24 && hoursDifference >= -24) {
      return relative.format(hoursDifference, 'hour');
    }

    return null;
  };

  const oneDayPrecisionDate = (a: Date) => {
    const yesterday = new Date(yearToday, monthToday, dayToday - 1);
    const tomorrow = new Date(yearToday, monthToday, dayToday + 1);

    if (isSameDay(a, today)) {
      return relative.format(0, 'day');
    }

    if (isSameDay(a, tomorrow)) {
      return relative.format(1, 'day');
    }

    if (isSameDay(a, yesterday)) {
      return relative.format(-1, 'day');
    }

    return null;
  };

  const sevenDaysPrecisionDate = (a: Date) => {
    const distance = new Intl.RelativeTimeFormat(locale, { style: 'narrow' });

    if (isSameDay(a, today)) {
      return relative.format(0, 'day');
    }

    for (let i = 1; i <= 7; i++) {
      if (isSameDay(a, new Date(yearToday, monthToday, dayToday + i))) {
        return distance.format(i, 'day');
      }

      if (isSameDay(a, new Date(yearToday, monthToday, dayToday - i))) {
        return distance.format(-i, 'day');
      }
    }

    return null;
  };

  const sameWeekPrecisionDate = (a: Date) => {
    const currentWeek = getISO8601WeekNumber(today);
    return getISO8601WeekNumber(a) === currentWeek ? relative.format(0, 'week') : null;
  };

  const oneWeekPrecisionDate = (a: Date) => {
    const { firstWeekDay, lastWeekDay } = getWeekDaysRange(today);
    const week = getISO8601WeekNumber(a);
    const currentWeek = getISO8601WeekNumber(today);
    const lastWeek = getISO8601WeekNumber(new Date(yearToday, monthToday, firstWeekDay - 1));
    const nextWeek = getISO8601WeekNumber(new Date(yearToday, monthToday, lastWeekDay + 1));

    if (week === currentWeek) {
      return relative.format(0, 'week');
    }
    if (week === lastWeek) {
      return relative.format(-1, 'week');
    }
    if (week === nextWeek) {
      return relative.format(1, 'week');
    }

    return null;
  };

  const sameMonthPrecisionDate = (a: Date) => {
    const isSameMonthAndYear = a.getFullYear() === today.getFullYear() && a.getMonth() === today.getMonth();
    return isSameMonthAndYear ? relative.format(0, 'month') : null;
  };

  const oneMonthPrecisionDate = (a: Date) => {
    const lastDate = getSafeDateOfMonth(monthToday - 1);
    const nextDate = getSafeDateOfMonth(monthToday + 1);

    if (isSameMonth(a, today)) {
      return relative.format(0, 'month');
    }

    if (isSameMonth(a, lastDate)) {
      return relative.format(-1, 'month');
    }

    if (isSameMonth(a, nextDate)) {
      return relative.format(1, 'month');
    }

    return null;
  };

  const sameYearPrecisionDate = (a: Date) => {
    const isSameYear = a.getFullYear() === today.getFullYear();
    return isSameYear ? relative.format(0, 'year') : null;
  };

  const oneYearPrecisionDate = (a: Date) => {
    const delta = a.getFullYear() - today.getFullYear();
    if (delta >= -1 && delta <= 1) return relative.format(delta, 'year');

    return null;
  };

  let precisionDate: string;
  switch (precision) {
    case '1hour':
      precisionDate = oneHourPrecision(d);
      break;
    case 'sameday':
      precisionDate = isSameDay(d, today) ? relative.format(0, 'day') : null;
      break;
    case '1day':
      precisionDate = oneDayPrecisionDate(d);
      break;
    case '7days':
      precisionDate = sevenDaysPrecisionDate(d);
      break;
    case 'sameweek':
      precisionDate = sameWeekPrecisionDate(d);
      break;
    case '1week':
      precisionDate = oneWeekPrecisionDate(d);
      break;
    case 'samemonth':
      precisionDate = sameMonthPrecisionDate(d);
      break;
    case '1month':
      precisionDate = oneMonthPrecisionDate(d);
      break;
    case 'sameyear':
      precisionDate = sameYearPrecisionDate(d);
      break;
    case '1year':
      precisionDate = oneYearPrecisionDate(d);
      break;
    default:
      precisionDate = null;
  }

  return <span className={className}>{precisionDate ? capitalize(precisionDate) : <DateFormat date={date} />}</span>;
};
export default RelativeTime;
