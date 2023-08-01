import isSameDay from './isSameDay';

describe('isSameDay', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });
  it('Should return true as 20 Jan 2022, 10am and 20 Jan 2022, 12am is the same day', () => {
    const a = new Date(2022, 0, 20, 10);
    const b = new Date(2022, 0, 20, 12);
    expect(isSameDay(a, b)).toBeTruthy();
  });
});
