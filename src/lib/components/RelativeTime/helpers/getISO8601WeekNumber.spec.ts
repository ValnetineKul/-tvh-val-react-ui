import getISO8601WeekNumber from './getISO8601WeekNumber';

describe('getISO8601WeekNumber', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  describe('Should return correct week number', () => {
    const cases = [
      [new Date(2021, 11, 31), 52], // Dec 31, 2021
      [new Date(2022, 0, 1), 52], // Jan 01, 2022
      [new Date(2022, 0, 4), 1], // Jan 04, 2022
      [new Date(2020, 1, 29), 9], // Feb 29, 2020
    ];
    test.each(cases)('given %p, returns %p', (input: Date, expected: number) => {
      const week = getISO8601WeekNumber(input);
      expect(week).toEqual(expected);
    });
  });
});
