import getResource from './getResource';

const findResourceSpy = jest.spyOn(jest.requireActual('../findResource.ts'), 'default');

const mockObj = {
  global: {
    _color: {
      black: { 100: { value: '#000000', type: 'color' } },
      white: { 100: { value: '#FFFFFF', type: 'color' } },
    },
    heading: {
      weight: { 900: { value: 'Ultra Italic', type: 'fontWeights' } },
      lineHeight: { 900: { value: '40', type: 'lineHeights' } },
    },
    textTransform: {
      uppercase: { value: 'uppercase', type: 'textCase' },
    },
    bg: { backdrop: { dark: { value: '$_color.black.100', type: 'color' } } },
  },
  agri: {
    bg: { backdrop: { light: { value: '$_color.white.100', type: 'color' } } },
  },
  darkmode: 'darkmode',
};

describe('getResource', () => {
  it('Should accumulate resources', () => {
    expect(findResourceSpy).toHaveBeenCalledTimes(0);
    expect(getResource('$_color', mockObj, 'token')).toEqual({
      reference: '$_color',
      resource: {
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
      },
    });
    expect(findResourceSpy).toHaveBeenCalledTimes(1);
    expect(findResourceSpy).toHaveBeenCalledWith('_color', mockObj);

    getResource('$_color', mockObj, 'token');
    expect(findResourceSpy).toHaveBeenCalledTimes(1);

    expect(getResource('$heading', mockObj, 'token')).toEqual({
      reference: '$heading',
      resource: {
        lineHeight: {
          900: {
            type: 'lineHeights',
            value: '40',
          },
        },
        weight: {
          900: {
            type: 'fontWeights',
            value: 'Ultra Italic',
          },
        },
      },
    });
    expect(findResourceSpy).toHaveBeenCalledTimes(2);
    expect(findResourceSpy).toHaveBeenCalledWith('heading', mockObj);
  });

  // it('Should throw an error if the reference if incorrect', () => {
  //   expect(() => getResource('$incorrect_ref', mockObj, 'tokenName')).toThrow('process.exit');
  // });
});
