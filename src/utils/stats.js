import { getMonthKey, getMonthName } from "./dates";

export const sumByKind = (log, kind) => {
  return log
    .filter((item) => item.kind === kind)
    .reduce((acc, item) => acc + Number(item.amount), 0);
};

export const filterByMonth = (log, monthkey) => {
  return log.filter((item) => item.date.slice(0, 7) === monthkey);
};

export const getMonthTransactions = (log, monthKey, count) => {
  return Array.from({ length: count }, (_, i) => {
    return filterByMonth(log, getMonthKey(monthKey, i));
  }).flat();
};

export const percentChange = (first, second) => {
  if (second === 0 || first === 0) {
    return "ـــ";
  }

  const result = (((first - second) / second) * 100).toFixed();

  return Number(result);
};

const getMonthTotal = (log, monthKey, kind) => {
  return sumByKind(filterByMonth(log, monthKey), kind);
};

export const getChartData = (log, selectedMonthKey, count) => {
  return Array.from({ length: count }, (_, index) => {
    const monthKey = getMonthKey(selectedMonthKey, count - 1 - index);
    const monthName = getMonthName(monthKey);

    return {
      month: monthName,
      income: getMonthTotal(log, monthKey, "دخل"),
      expense: getMonthTotal(log, monthKey, "مصروف"),
    };
  });
};

export const getMonthlyChanges = (log, monthKey) => {
  const currentExpenses = getMonthTotal(log, monthKey, "مصروف");
  const previousExpenses = getMonthTotal(
    log,
    getMonthKey(monthKey, 1),
    "مصروف",
  );
  const currentIncome = getMonthTotal(log, monthKey, "دخل");
  const previousIncome = getMonthTotal(log, getMonthKey(monthKey, 1), "دخل");

  const expensesMom = percentChange(currentExpenses, previousExpenses);
  const incomeMom = percentChange(currentIncome, previousIncome);

  return {
    currentIncome,
    currentExpenses,
    expensesMom,
    incomeMom,
  };
};

export const getCategoryTotals = (log) => {
  return log
    .filter((tran) => tran.kind === "مصروف")
    .reduce((acc, tran) => {
      const catName = tran.cat;
      const amount = Number(tran.amount) || 0;

      acc[catName] = (acc[catName] || 0) + amount;
      return acc;
    }, {});
};

export const getCatTotal = (log) => {
  return Object.values(getCategoryTotals(log)).reduce(
    (acc, val) => acc + val,
    0,
  );
};

export const getPieData = (log, expCats) => {
  return expCats.map((cat) => ({
    name: cat.title,
    color: cat.color,
    value: getCategoryTotals(log)[cat.title],
  }));
};

export const getMonthsTotals = (log, selectedMonthKey, count) => {
  const arr = getChartData(log, selectedMonthKey, count);

  const totalIncome = arr.reduce((acc, b) => acc + b.income, 0);
  const totalExpenses = arr.reduce((acc, b) => acc + b.expense, 0);

  return { totalIncome, totalExpenses };
};
