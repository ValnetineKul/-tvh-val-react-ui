import createDefaultFileName from './createDefaultFileName';

describe('createDefaultFileName', () => {
  it('Should create a default image name', () => {
    const lastModified = 1679402828007;
    const date = new Date(lastModified);
    const blobNameWithExtension = 'image.png';
    expect(createDefaultFileName(date, blobNameWithExtension)).toBe('Screenshot_2023-2-2_at_12h47m8s.png');
  });
});
