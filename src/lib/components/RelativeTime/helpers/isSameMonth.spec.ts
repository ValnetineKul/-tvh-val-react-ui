import isSameMonth from './isSameMonth';

describe('isSameMonth', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });
  describe('Should return true if same month', () => {
    const cases = [
      [{ a: new Date(2021, 11, 31), b: new Date(2021, 11, 30) }, true],
      [{ a: new Date(2020, 11, 31), b: new Date(2021, 11, 30) }, false],
      [{ a: new Date(2021, 10, 30), b: new Date(2021, 11, 30) }, false],
    ];
    test.each(cases)('given %p, returns %p', (input: { a: Date; b: Date }, expected: boolean) => {
      expect(isSameMonth(input.a, input.b)).toEqual(expected);
    });
  });
});
