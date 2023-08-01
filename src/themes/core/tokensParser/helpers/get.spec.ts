import get from './get';

const mockObj = {
  a: {
    b: {
      c: 'value',
    },
  },
};

describe('get', () => {
  it('Should return value by path', () => {
    expect(get('a.b.c', mockObj)).toBe('value');
  });

  it('Should return undefined if path is incorrect', () => {
    expect(get('a.b.d', mockObj)).not.toBeDefined();
  });

  it('Should return undefined if target object is undefined', () => {
    expect(get('a.b.d', undefined)).not.toBeDefined();
  });
});
