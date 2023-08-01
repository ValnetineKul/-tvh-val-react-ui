import getFileExtension from './getFileExtension';

describe('getFileExtension', () => {
  describe('Should get file extension', () => {
    const cases = [
      ['image.png', 'png'],
      ['test.jpg', 'jpg'],
      ['text.pdf', 'pdf'],
    ];
    test.each(cases)('given %p, returns %p', (input: string, expected: string) => {
      expect(getFileExtension(input)).toBe(expected);
    });
  });
});
