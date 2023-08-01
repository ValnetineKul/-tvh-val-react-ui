import mapFontFields from './mapFontFields';

describe('mapFontFields', () => {
  it('Should map fontWeight', () => {
    expect(mapFontFields('fontWeight', 'Ultra Italic')).toEqual({ fontStyle: 'italic', fontWeight: '900' });
    expect(mapFontFields('fontWeight', 'Bold')).toEqual({ fontWeight: '700' });
  });

  it('Should map the rest fields', () => {
    expect(mapFontFields('textCase', 'uppercase')).toEqual({ textTransform: 'uppercase' });
    expect(mapFontFields('textCase', 'none')).toEqual({});
  });
});
