import getWeekDaysRange from './getWeekDaysRange';

describe('getWeekDaysRange', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  describe('Should return correct first and last days', () => {
    const cases = [
      [new Date(2021, 11, 31), { firstWeekDay: 27, lastWeekDay: 33 }],
      [new Date(2022, 0, 1), { firstWeekDay: -4, lastWeekDay: 2 }],
      [new Date(2022, 0, 4), { firstWeekDay: 3, lastWeekDay: 9 }],
      [new Date(2020, 1, 29), { firstWeekDay: 24, lastWeekDay: 30 }],
    ];
    test.each(cases)('given %p, returns %p', (input: Date, expected: { firstWeekDay: number; lastWeekDay: number }) => {
      const week = getWeekDaysRange(input);
      expect(week).toEqual(expected);
    });
  });
});
