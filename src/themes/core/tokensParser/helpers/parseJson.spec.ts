import type { TreeData } from './parseJson';
import parseJson from './parseJson';

jest.mock('../constants', () => {
  const originalModule = jest.requireActual('../constants');

  return {
    __esModule: true,
    ...originalModule,
    fieldsToExclude: ['_color'],
    typesToExclude: ['letterSpacing'],
  };
});

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

const getExampleJson = (body: TreeData) => {
  return JSON.stringify({ record: { values: { ...body } } });
};

describe('parseJson', () => {
  it('Should correctly parse the json', () => {
    expect(parseJson(getExampleJson(mockObj))).toEqual({
      agri: {
        color: {
          'bg/backdrop/light': '#FFFFFF',
        },
      },
      global: {
        color: {
          'bg/backdrop/dark': '#000000',
        },
      },
      darkmode: {},
    });
  });

  it('Should exclude unnecessary fields', () => {
    expect('_color' in parseJson(getExampleJson(mockObj))).toBe(false);
  });

  it('Should collect root fields in the result object', () => {
    expect(Object.keys(parseJson(getExampleJson(mockObj)))).toEqual(['global', 'agri', 'darkmode']);
  });

  // it('Should throw an error if value has no type', () => {
  //   expect(() =>
  //     parseJson(getExampleJson({ ...mockObj, agri: { ...mockObj.agri, icon: { success: { value: 'value' } } } }))
  //   ).toThrow('process.exit');
  // });
});
