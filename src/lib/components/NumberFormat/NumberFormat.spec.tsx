/* eslint-disable no-console */
import React from 'react';
import { ConfigContext } from '../../../themes/core';
import { render, screen } from '../../test-utils';
import NumberFormat from './NumberFormat';

describe('NumberFormat', () => {
  describe('Should return correct number format', () => {
    const cases = [
      ['en-US', '12,345.67'],
      ['en-GB', '12,345.67'],
      ['fr-BE', '12 345,67'],
      ['nl-BE', '12.345,67'],
      ['es-CA', '12.345,67'],
      ['ab-CD', '12,345.67'],
    ];
    test.each(cases)('given %p, returns %p', (input: string, expected: string) => {
      render(
        <ConfigContext.Provider value={{ locale: input }}>
          <NumberFormat number={12345.67} />
        </ConfigContext.Provider>
      );
      expect(screen.getByText(expected)).toBeInTheDocument();
    });
  });
});
