import { defaultLocale } from '../ConfigProvider.constants';
import getValidLocale from './getValidLocale';

describe('getValidLocale', () => {
  describe('Should return the correct locale', () => {
    const cases = [
      ['en-MX', defaultLocale],
      ['en-US', 'en-US'],
      [undefined, defaultLocale],
    ];
    test.each(cases)('given %p, returns %p', (input: string, expected: string) => {
      expect(getValidLocale(input)).toEqual(expected);
    });
  });
});
