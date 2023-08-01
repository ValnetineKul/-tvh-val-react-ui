const checkDateValidity = (date: Date | string) =>
  date instanceof Date ? !isNaN(date.getTime()) : !isNaN(new Date(date).getTime());

export default checkDateValidity;
