import { useEffect } from "react";
import StatCard from "../../../components/ui/StatCard";
import { useStore } from "../../../store/useStore";
import { getMonthlyChanges } from "../../../utils/stats";
import { ArrowDown, ArrowUpLeft } from "lucide-react";

const Statistics = () => {
  const transactionsLog = useStore((s) => s.transactionsLog);
  const selectedMonthKey = useStore((s) => s.selectedMonthKey);
  const addNotification = useStore((s) => s.addNotification);

  const { expensesMom, incomeMom, currentIncome, currentExpenses } =
    getMonthlyChanges(transactionsLog, selectedMonthKey);

  useEffect(() => {
    if (currentIncome > 0) {
      const expenseRatio = ((currentExpenses / currentIncome) * 100).toFixed();
      const nots = [50, 70, 100];

      nots.forEach((ratio) => {
        if (Number(expenseRatio) >= ratio) {
          const notificationTitle = `أنفقت ${ratio}% من دخلك`;
          const notificationKey = `expense-${ratio}`;

          addNotification(notificationTitle, notificationKey);
        }
      });
    }
  }, [currentIncome, currentExpenses, addNotification]);

  const statistics = [
    {
      title: "المتبقي من دخل الشهر",
      value: currentIncome - currentExpenses,
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
    <div className="grid h-[20%] grid-cols-[minmax(0,1fr)_300px_300px] gap-3">
      {statistics.map((statis) => {
        return <StatCard key={statis.title} {...statis} />;
      })}
    </div>
  );
};
export default Statistics;
