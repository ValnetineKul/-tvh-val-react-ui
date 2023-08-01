import parseTypography from './parseTypography';

const mockObj = {
  global: {
    heading: {
      weight: { 900: { value: 'Ultra Italic', type: 'fontWeights' } },
      lineHeight: { 900: { value: '40', type: 'lineHeights' } },
    },
    textTransform: {
      uppercase: { value: 'uppercase', type: 'textCase' },
    },
  },
};

describe('parseTypography', () => {
  it('Should correctly parse typography', () => {
    expect(
      parseTypography({
        token: 'token',
        value: {
          fontFamily: 'Arial',
          fontWeight: '$heading.weight.900',
          lineHeight: '$lineHeight.900',
          fontSize: '$heading.size.900.screen.sm',
          letterSpacing: 'none',
          paragraphSpacing: 'none',
          textDecoration: 'none',
          textCase: '$textTransform.uppercase',
        },
        source: mockObj,
      })
    ).toEqual({
      fontFamily: 'Arial',
      fontStyle: 'italic',
      fontWeight: '900',
      lineHeight: '40px',
      textTransform: 'uppercase',
    });
  });
});
