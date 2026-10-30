import { getMonthTotal } from "./getMonthTotal";
import { percentChange } from "./percentChange";

export const getMonthComparsion = (log) => {
  const current = new Date().toISOString().slice(0, 7);
  const month = current.slice(5, 7);
  const year = current.slice(0, 4);
  const january = month === "01";
  const previous = `${january ? year - 1 : year}-${month <= 10 && !january ? 0 : ""}${january ? "12" : month - 1}`;

  const currentMonthName = new Date().toLocaleString("ar-EG", {
    month: "long",
  });
  const previousMonthName = new Date(`${previous}-01`).toLocaleString("ar", {
    month: "long",
  });

  const currentExpenses = getMonthTotal(log, current, "مصروف");
  const previousExpenses = getMonthTotal(log, previous, "مصروف");
  const currentIncome = getMonthTotal(log, current, "دخل");
  const previousIncome = getMonthTotal(log, previous, "دخل");

  const expensesMom = percentChange(currentExpenses, previousExpenses);
  const incomeMom = percentChange(currentIncome, previousIncome);

  const getChartData = (count) => {
    return Array.from({ length: count }, (_, index) => {
      const c = String(month - (count - 1 - index)).padStart(2, "0");
      const monthKey = `${c <= "00" ? year - 1 : year}-${c <= "00" ? String(Number(c) + 12).padStart(2, "0") : c}`;

      const name = new Date(`${monthKey}-01`).toLocaleString("ar", {
        month: "long",
        year: "2-digit",
      });

      return {
        month: name,
        income: getMonthTotal(log, monthKey, "دخل"),
        expense: getMonthTotal(log, monthKey, "مصروف"),
      };
    });
  };

  return {
    currentMonthName,
    previousMonthName,
    currentExpenses,
    previousExpenses,
    currentIncome,
    previousIncome,
    expensesMom,
    incomeMom,
    getChartData,
  };
};
