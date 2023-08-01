import { getFilePath } from './getFilePath';

describe('getFilePath', () => {
  it('Should work correctly', () => {
    expect(getFilePath('iconFileName', 'icons/svg')).toBe('icons/svg/iconFileName.svg');
  });

  it('Should work correctly with another extension', () => {
    expect(getFilePath('iconFileName', 'icons/svg', '.png')).toBe('icons/svg/iconFileName.png');
  });
});
