const getWeekDaysRange = (date: Date) => {
  const daysFromMonday = date.getDay() === 0 ? 6 : date.getDay() - 1;
  const firstWeekDay = date.getDate() - daysFromMonday;
  const lastWeekDay = firstWeekDay + 6;
  return { firstWeekDay, lastWeekDay };
};

export default getWeekDaysRange;
