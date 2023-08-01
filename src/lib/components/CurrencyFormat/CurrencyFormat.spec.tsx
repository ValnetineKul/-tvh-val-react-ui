import React from 'react';
import { ConfigContext } from '../../../themes/core';
import { render, screen } from '../../test-utils';
import CurrencyFormat from './CurrencyFormat';

describe('CurrencyFormat', () => {
  describe('Should return correct currency format', () => {
    beforeEach(() => {
      // eslint-disable-next-line no-console
      console.error = jest.fn();
    });

    const cases = [
      ['en-US', '$12,345.67'],
      ['en-GB', '£12,345.67'],
      ['fr-BE', '12 345,67 €'],
      ['nl-BE', '€ 12.345,67'],
      ['es-CA', '12.345,67 CAD'],
      [undefined, '£12,345.67'],
      ['qw-ERT', '£12,345.67'],
    ];
    test.each(cases)('given %p, returns %p', (input: string, expected: string) => {
      render(
        <ConfigContext.Provider value={{ locale: input, settedLocale: input }}>
          <CurrencyFormat value={12345.67} />
        </ConfigContext.Provider>
      );
      expect(screen.getByText(expected)).toBeInTheDocument();
    });
  });

  it('Should show error in concole if location is wrong', () => {
    // with mockImplementation no message will be printed to the console
    const mockLogSpy = jest.spyOn(global.console, 'error').mockImplementation(() => {});

    render(
      <ConfigContext.Provider value={{ locale: 'qw-ERT', settedLocale: 'qw-ERT' }}>
        <CurrencyFormat value={12345.67} />
      </ConfigContext.Provider>
    );
    expect(mockLogSpy).toHaveBeenCalledTimes(1);
  });
});
