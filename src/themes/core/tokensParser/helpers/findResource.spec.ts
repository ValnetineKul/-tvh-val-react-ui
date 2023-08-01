import findResource from './findResource';

const mockObj = {
  global: {
    _color: {
      black: { 100: { value: '#000000', type: 'color' } },
      white: { 100: { value: '#FFFFFF', type: 'color' } },
    },
    bg: { backdrop: { dark: { value: '$_color.black.100', type: 'color' } } },
  },
  agri: {
    bg: { backdrop: { light: { value: '$_color.white.100', type: 'color' } } },
  },
  darkmode: 'darkmode',
};

describe('findResource', () => {
  it('Should find resource by field name which starts with $', () => {
    expect(findResource('$_color', mockObj)).toEqual({
      black: {
        100: {
          type: 'color',
          value: '#000000',
        },
      },
      white: {
        100: {
          type: 'color',
          value: '#FFFFFF',
        },
      },
    });
  });

  it('Should find resource by field name', () => {
    expect(findResource('_color', mockObj)).toEqual({
      black: {
        100: {
          type: 'color',
          value: '#000000',
        },
      },
      white: {
        100: {
          type: 'color',
          value: '#FFFFFF',
        },
      },
    });
  });
});
