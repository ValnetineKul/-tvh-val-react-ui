/* eslint-disable no-console */
import React from 'react';
import { render, screen } from '../../test-utils';
import getWeekDaysRange from './helpers/getWeekDaysRange';
import RelativeTime from './RelativeTime';

const today = new Date('20 Aug 2020 02:00:00 GMT');
const day = today.getDate();
const month = today.getMonth();
const year = today.getFullYear();
const hours = today.getHours();

describe('RelativeTime', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('20 Aug 2020 02:00:00 GMT').getTime());
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  describe('Should set hours precision', () => {
    const hourAgo = new Date(year, month, day, hours - 1);
    const inHour = new Date(year, month, day, hours + 1);
    const inMinutes = new Date(year, month, day, hours, 30);

    const cases = [
      [today.toISOString(), 'Less than a minute'],
      [inHour.toISOString(), 'In 1 hour'],
      [hourAgo.toISOString(), '1 hour ago'],
      [inMinutes.toISOString(), 'In 30 minutes'],
    ];
    test.each(cases)(
      'given %p, returns %p',
      (input: React.ComponentProps<typeof RelativeTime>['date'], expected: string) => {
        render(<RelativeTime date={input} precision="1hour" />);
        expect(screen.getByText(expected)).toBeInTheDocument();
      }
    );
  });

  it('Should set today precision', () => {
    render(<RelativeTime date={today.toISOString()} precision="sameday" />);
    expect(screen.getByText('Today')).toBeInTheDocument();
  });

  describe('Should set 1day precision', () => {
    const yesterday = new Date(year, month, day - 1);
    const tomorrow = new Date(year, month, day + 1);

    const cases = [
      [today.toISOString(), 'Today'],
      [tomorrow.toISOString(), 'Tomorrow'],
      [yesterday.toISOString(), 'Yesterday'],
    ];
    test.each(cases)(
      'given %p, returns %p',
      (input: React.ComponentProps<typeof RelativeTime>['date'], expected: string) => {
        render(<RelativeTime date={input} precision="1day" />);
        expect(screen.getByText(expected)).toBeInTheDocument();
      }
    );
  });

  describe('Should set 7days precision', () => {
    const cases = [
      [new Date(year, month, day).toISOString(), 'Today'],
      [new Date(year, month, day + 1).toISOString(), 'In 1 day'],
      [new Date(year, month, day + 2).toISOString(), 'In 2 days'],
      [new Date(year, month, day + 3).toISOString(), 'In 3 days'],
      [new Date(year, month, day + 4).toISOString(), 'In 4 days'],
      [new Date(year, month, day + 5).toISOString(), 'In 5 days'],
      [new Date(year, month, day + 6).toISOString(), 'In 6 days'],
      [new Date(year, month, day + 7).toISOString(), 'In 7 days'],
      [new Date(year, month, day - 1).toISOString(), '1 day ago'],
      [new Date(year, month, day - 2).toISOString(), '2 days ago'],
      [new Date(year, month, day - 3).toISOString(), '3 days ago'],
      [new Date(year, month, day - 4).toISOString(), '4 days ago'],
      [new Date(year, month, day - 5).toISOString(), '5 days ago'],
      [new Date(year, month, day - 6).toISOString(), '6 days ago'],
      [new Date(year, month, day - 7).toISOString(), '7 days ago'],
    ];
    test.each(cases)(
      'given %p, returns %p',
      (input: React.ComponentProps<typeof RelativeTime>['date'], expected: string) => {
        render(<RelativeTime date={input} precision="7days" />);
        expect(screen.getByText(expected)).toBeInTheDocument();
      }
    );
  });

  describe('Should set samemonth precision', () => {
    it('Should show "This month"', () => {
      render(<RelativeTime date={new Date(year, month, day).toISOString()} precision="samemonth" />);
      expect(screen.getByText('This month')).toBeInTheDocument();
    });

    it('Should not show "This month" if not the same year', () => {
      render(<RelativeTime date={new Date(year - 1, month, day).toISOString()} precision="samemonth" />);
      expect(screen.queryByText('This month')).not.toBeInTheDocument();
    });
  });

  describe('Should set 1month precision', () => {
    const cases = [
      [new Date(year, month, 28).toISOString(), 'This month'],
      [new Date(year, month - 1, 28).toISOString(), 'Last month'],
      [new Date(year, month + 1, 28).toISOString(), 'Next month'],
    ];
    test.each(cases)(
      'given %p, returns %p',
      (input: React.ComponentProps<typeof RelativeTime>['date'], expected: string) => {
        render(<RelativeTime date={input} precision="1month" />);
        expect(screen.getByText(expected)).toBeInTheDocument();
      }
    );
  });

  describe('Should set sameweek precision', () => {
    const { firstWeekDay, lastWeekDay } = getWeekDaysRange(today);

    const cases = [
      new Date(today).toISOString(),
      new Date(year, month, firstWeekDay).toISOString(),
      new Date(year, month, lastWeekDay).toISOString(),
    ];
    test.each(cases)('given %p', (input: React.ComponentProps<typeof RelativeTime>['date']) => {
      render(<RelativeTime date={input} precision="sameweek" />);
      expect(screen.getByText('This week')).toBeInTheDocument();
    });
  });

  describe('Should set 1week precision', () => {
    const { firstWeekDay, lastWeekDay } = getWeekDaysRange(today);

    const cases = [
      [new Date(today).toISOString(), 'This week'],
      [new Date(year, month, firstWeekDay - 1).toISOString(), 'Last week'],
      [new Date(year, month, lastWeekDay + 1).toISOString(), 'Next week'],
    ];
    test.each(cases)(
      'given %p, returns %p',
      (input: React.ComponentProps<typeof RelativeTime>['date'], expected: string) => {
        render(<RelativeTime date={input} precision="1week" />);
        expect(screen.getByText(expected)).toBeInTheDocument();
      }
    );
  });

  it('Should set sameyear precision', () => {
    render(<RelativeTime date={new Date(year, month, day).toISOString()} precision="sameyear" />);
    expect(screen.getByText('This year')).toBeInTheDocument();
  });

  describe('Should set 1year precision', () => {
    const cases = [
      [new Date(year, month, day).toISOString(), 'This year'],
      [new Date(year + 1, month, day).toISOString(), 'Next year'],
      [new Date(year - 1, month, day).toISOString(), 'Last year'],
    ];
    test.each(cases)(
      'given %p, returns %p',
      (input: React.ComponentProps<typeof RelativeTime>['date'], expected: string) => {
        render(<RelativeTime date={input} precision="1year" />);
        expect(screen.getByText(expected)).toBeInTheDocument();
      }
    );
  });

  it('Should render nothing if its not a date', () => {
    console.error = jest.fn();
    expect(console.error).toHaveBeenCalledTimes(0);
    const { container } = render(<RelativeTime date="NotADate" />);
    expect(container.firstChild).toBeNull();
    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith('RelativeTime: Invalid date!');
  });
});
