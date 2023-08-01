import getValidLocale from './getValidLocale';

describe('getValidLocale', () => {
  describe('Should return the correct locale', () => {
    const cases = [
      ['en-MX', 'es-MX'],
      ['en-US', 'en-US'],
      [undefined, 'en-GB'],
    ];
    test.each(cases)('given %p, returns %p', (input: string, expected: string) => {
      expect(getValidLocale(input)).toEqual(expected);
    });
  });
});
