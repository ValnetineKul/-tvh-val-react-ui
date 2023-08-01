const getSafeDateOfMonth = (m: number) => {
  const today = new Date();
  const dayToday = today.getDate();
  const yearToday = today.getFullYear();

  const maxDaysInMonth = new Date(yearToday, m + 1, 0).getDate();
  return new Date(yearToday, m, Math.min(dayToday, maxDaysInMonth));
};

export default getSafeDateOfMonth;
