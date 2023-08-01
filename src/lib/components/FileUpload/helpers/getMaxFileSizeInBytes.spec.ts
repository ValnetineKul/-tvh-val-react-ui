import type { MaxFileSize } from '../FileUpload.constants';
import getMaxFileSizeInBytes from './getMaxFileSizeInBytes';

describe('getMaxFileSizeInBytes', () => {
  describe('Should convert file size in bytes', () => {
    const cases = [
      ['1KB', 1024],
      ['1MB', 1048576],
    ];
    test.each(cases)('given %p, returns %p', (input: MaxFileSize, expected: number) => {
      expect(getMaxFileSizeInBytes(input)).toBe(expected);
    });
  });
});
