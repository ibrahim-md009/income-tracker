export const filterByMonth = (log, month) => {
  return log.filter((tran) => tran.date.slice(0, 7) === month);
};
