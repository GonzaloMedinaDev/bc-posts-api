export const DateFrom = (days: number): string => {
  const today = new Date();
  const fromDate = new Date(new Date().setDate(today.getDate() - days));

  const year = fromDate.getFullYear();
  const month = (fromDate.getMonth() + 1).toString().padStart(2, '0');
  const day = fromDate.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};
