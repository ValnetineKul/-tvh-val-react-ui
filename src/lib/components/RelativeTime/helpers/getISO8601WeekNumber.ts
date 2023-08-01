const getISO8601WeekNumber = (date: Date): number => {
  const timestamp = date.valueOf();
  const dateCopy = new Date(timestamp);

  // Weeks start on Monday (ISO): Sunday (6), Monday (0)...
  const dayNumber = (date.getDay() + 6) % 7;

  // Set nearest Thursday: current date - current day number + 3
  dateCopy.setDate(dateCopy.getDate() - dayNumber + 3);
  const targetWeekThursdayTimestamp = dateCopy.valueOf();

  // Set first day of year (January 1st)
  dateCopy.setMonth(0, 1);
  if (dateCopy.getDay() !== 4) {
    // Correct the date to the next Thursday
    dateCopy.setMonth(0, 1 + ((4 - dateCopy.getDay() + 7) % 7));
  }

  const weekMiliseconds = 7 * 24 * 3600 * 1000;
  const firstThursdayTimestamp = dateCopy.valueOf();
  return 1 + Math.ceil((targetWeekThursdayTimestamp - firstThursdayTimestamp) / weekMiliseconds);
};

export default getISO8601WeekNumber;
