import parseValues from './parseValues';

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

describe('parseValues', () => {
  it('Should correctly parse colors', () => {
    expect(
      parseValues({
        token: 'token',
        type: 'color',
        value: '$_color.black.100',
        source: mockObj,
      })
    ).toBe('#000000');

    expect(
      parseValues({
        token: 'token',
        type: 'color',
        value: '#333333',
        source: mockObj,
      })
    ).toBe('#333333');
  });

  it('Should correctly parse spacing', () => {
    expect(
      parseValues({
        token: 'token',
        type: 'spacing',
        value: '12',
        source: mockObj,
      })
    ).toBe('12px');
  });

  it('Should correctly parse borderRadius', () => {
    expect(
      parseValues({
        token: 'token',
        type: 'borderRadius',
        value: '4',
        source: mockObj,
      })
    ).toBe('4px');

    expect(
      parseValues({
        token: 'token',
        type: 'borderRadius',
        value: '100%',
        source: mockObj,
      })
    ).toBe('100%');
  });

  it('Should return "unknown" if type is not correct', () => {
    expect(
      parseValues({
        token: 'token',
        type: 'any_type',
        value: 'value',
        source: mockObj,
      })
    ).toBe('unknown');
  });
});
