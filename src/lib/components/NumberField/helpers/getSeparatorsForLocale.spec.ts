import getSeparatorsForLocale from './getSeparatorsForLocale';

describe('getSeparatorsForLocale', () => {
  describe('Should return correct separators for locale', () => {
    const cases = [
      ['en-US', { thousandSeparator: ',', decimalSeparator: '.' }],
      ['en-GB', { thousandSeparator: ',', decimalSeparator: '.' }],
      ['de-DE', { thousandSeparator: '.', decimalSeparator: ',' }],
      ['fr-FR', { thousandSeparator: ' ', decimalSeparator: ',' }],
      ['es-CA', { thousandSeparator: '.', decimalSeparator: ',' }],
      ['wrong-tag-format', { thousandSeparator: ',', decimalSeparator: '.' }],
      ['ab-cd', { thousandSeparator: ',', decimalSeparator: '.' }],
    ];
    test.each(cases)(
      'given %p, returns %p',
      (input: string, expected: { thousandSeparator: string; decimalSeparator: string }) => {
        const separators = getSeparatorsForLocale(input);
        expect(separators).toEqual(expected);
      }
    );
  });
});
