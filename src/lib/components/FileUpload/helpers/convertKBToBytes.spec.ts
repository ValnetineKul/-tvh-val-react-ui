import convertKBToBytes from './convertKBToBytes';

describe('convertKBToBytes', () => {
  it('Should calculates bytes from KB', () => {
    expect(convertKBToBytes(1)).toBe(1024);
  });
});
