import createAltText from './createAltText';

describe('createDefaultFileName', () => {
  it('Should create a default alt text for image', () => {
    expect(createAltText(5)).toBe('file preview 5');
  });
});
