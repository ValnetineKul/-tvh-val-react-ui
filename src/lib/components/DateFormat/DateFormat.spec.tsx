/* eslint-disable no-console */
import React from 'react';
import { render, screen } from '../../test-utils';
import DateFormat from './DateFormat';

describe('DateFormat', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });
  describe('Should set date formats', () => {
    const cases = [
      [undefined, '23/02/2022'],
      ['short', '23/02/2022'],
      ['medium', '23 Feb 2022'],
      ['long', '23 February 2022'],
      ['full', 'Wednesday, 23 February 2022'],
      ['monthAndYear', '02/2022'],
    ];
    test.each(cases)(
      'given %p, returns %p',
      (input: React.ComponentProps<typeof DateFormat>['format'], expected: string) => {
        render(<DateFormat date="2022-02-23T12:35:15.453Z" format={input} />);
        expect(screen.getByText(expected)).toBeInTheDocument();
      }
    );
  });

  it('Should render nothing if its not a date', () => {
    console.error = jest.fn();
    expect(console.error).toHaveBeenCalledTimes(0);
    const { container } = render(<DateFormat date="NotADate" />);
    expect(container.firstChild).toBeNull();
    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith('DateFormat: Invalid date!');
  });
});
