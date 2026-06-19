

export const getDaysInMonth = (year, month) => {
    
  return new Date(year, month + 1, 0).getDate();
};

export const generateMonthDates = (year, month) => {
  const totalDays = getDaysInMonth(year, month);

  return Array.from(
    { length: totalDays },
    (_, index) => index + 1
  );
};

export const getFirstDay = (year, month) => {
  return new Date(year, month, 1).getDay();
};