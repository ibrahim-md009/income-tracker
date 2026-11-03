import { getMonthKey, getMonthName } from "./dates";

export const sumByKind = (log, kind) => {
  return log
    .filter((transaction) => transaction.kind === kind)
    .reduce((acc, transaction) => acc + Number(transaction.amount), 0);
};

export const filterByMonth = (log, month) => {
  return log.filter((tran) => tran.date.slice(0, 7) === month);
};

export const getMonthTotal = (log, month, kind) => {
  return sumByKind(filterByMonth(log, month), kind);
};

export const percentChange = (first, second) => {
  if (second === 0 || first === 0) {
    return "ـــ";
  }

  const result = (((first - second) / second) * 100).toFixed();

  return Number(result);
};

export const getChartData = (log, count) => {
  return Array.from({ length: count }, (_, index) => {
    const monthKey = getMonthKey(count - 1 - index);
    const name = getMonthName(monthKey);

    return {
      month: name,
      income: getMonthTotal(log, monthKey, "دخل"),
      expense: getMonthTotal(log, monthKey, "مصروف"),
    };
  });
};

export const getMonthComparsion = (log) => {
  const currentExpenses = getMonthTotal(log, getMonthKey(0), "مصروف");
  const previousExpenses = getMonthTotal(log, getMonthKey(1), "مصروف");
  const currentIncome = getMonthTotal(log, getMonthKey(0), "دخل");
  const previousIncome = getMonthTotal(log, getMonthKey(1), "دخل");

  const expensesMom = percentChange(currentExpenses, previousExpenses);
  const incomeMom = percentChange(currentIncome, previousIncome);

  return {
    expensesMom,
    incomeMom,
  };
};
