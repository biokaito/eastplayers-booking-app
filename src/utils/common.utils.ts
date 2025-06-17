const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const getDaysInMonth = (year: number, month: number): { date: number; weekday: string }[] => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const result = [];
  for (let day = 1; day <= daysInMonth; day++) {
    const dateObj = new Date(year, month, day);
    result.push({
      date: day,
      weekday: weekdays[dateObj.getDay()], // 0 (Sunday) to 6 (Saturday)
    });
  }
  return result;
};