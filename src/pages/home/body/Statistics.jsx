import { useEffect } from "react";
import StatCard from "../../../components/ui/StatCard";
import { useStore } from "../../../store/useStore";
import { getMonthlyChanges } from "../../../utils/stats";
import { getCurrentMonthKey } from "../../../utils/dates";
import { ArrowDown, ArrowUpLeft } from "lucide-react";

const Statistics = () => {
  const transactionsLog = useStore((s) => s.transactionsLog);
  const selectedMonthKey = useStore((s) => s.selectedMonthKey);
  const addNotification = useStore((s) => s.addNotification);

  const { expensesMom, incomeMom, currentIncome, currentExpenses } =
    getMonthlyChanges(transactionsLog, selectedMonthKey);

  useEffect(() => {
    if (selectedMonthKey !== getCurrentMonthKey()) return;

    if (currentIncome > 0) {
      const expenseRatio = (currentExpenses / currentIncome) * 100;

      [50, 70, 100].forEach((ratio) => {
        if (expenseRatio >= ratio) {
          addNotification(
            `أنفقت ${ratio}% من دخلك`,
            `expense-${selectedMonthKey}-${ratio}`,
          );
        }
      });
    }
  }, [currentIncome, currentExpenses, selectedMonthKey, addNotification]);

  const statistics = [
    {
      title: "المتبقي من دخل الشهر",
      value: currentIncome - currentExpenses,
      main: true,
    },
    {
      title: "إجمالي الدخل",
      value: currentIncome,
      mom: incomeMom,
      higherIsBetter: true,
      icon: ArrowUpLeft,
    },
    {
      title: "إجمالي المصروفات",
      value: currentExpenses,
      mom: expensesMom,
      higherIsBetter: false,
      icon: ArrowDown,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {statistics.map((statis) => {
        return <StatCard key={statis.title} {...statis} />;
      })}
    </div>
  );
};
export default Statistics;
