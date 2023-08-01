import checkDateValidity from './checkDateValidity';
import getSafeDateOfMonth from './getSafeDateOfMonth';

describe('getSafeDateOfMonth', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  describe('Should return a valid date for month', () => {
    const cases = [-1, 0, 1, 2, 12, 13];
    test.each(cases)('given %p, returns a valid date', (input: number) => {
      const date = getSafeDateOfMonth(input);
      expect(checkDateValidity(date)).toBeTruthy();
    });
  });
});
