/* eslint-disable no-console */
import React from 'react';
import { render, screen } from '../../test-utils';
import TimeFormat from './TimeFormat';

describe('TimeFormat', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });
  describe('Should set date formats', () => {
    const cases = [
      [undefined, '12:35'],
      ['short', '12:35'],
      ['medium', '12:35:15'],
      ['long', '12:35:15 UTC'],
    ];
    test.each(cases)(
      'given %p, returns %p',
      (input: React.ComponentProps<typeof TimeFormat>['format'], expected: string) => {
        render(<TimeFormat date="2022-02-23T12:35:15.453Z" format={input} />);
        expect(screen.getByText(expected)).toBeInTheDocument();
      }
    );
  });

  it('Should render nothing if its not a date', () => {
    console.error = jest.fn();
    expect(console.error).toHaveBeenCalledTimes(0);
    const { container } = render(<TimeFormat date="NotADate" />);
    expect(container.firstChild).toBeNull();
    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith('TimeFormat: Invalid date!');
  });
});
