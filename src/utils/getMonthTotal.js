import { filterByMonth } from "./filterByMonth.js";
import { sumByKind } from "./sumByKind.js";

export const getMonthTotal = (log, month, kind) =>
  sumByKind(filterByMonth(log, month), kind);
