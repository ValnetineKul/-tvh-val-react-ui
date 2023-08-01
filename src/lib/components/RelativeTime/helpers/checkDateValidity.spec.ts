import checkDateValidity from './checkDateValidity';

describe('checkDateValidity', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });
  describe('Should return true for date and false for not a date', () => {
    const cases = [
      [new Date(2021, 11, 31), true],
      ['11/12/2022', true],
      ['NotADate', false],
    ];
    test.each(cases)('given %p, returns %p', (input: Date, expected: boolean) => {
      expect(checkDateValidity(input)).toEqual(expected);
    });
  });
});
