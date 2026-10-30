import { ArrowDown, ArrowUpLeft, Wallet } from "lucide-react";
import { useStore } from "../../../store/useStore";
import { useEffect } from "react";
import { sumByKind } from "../../../utils/sumByKind";
import { getMonthComparsion } from "../../../utils/getMonthComparsion";
import StatCard from "../../../components/ui/StatCard";

const Statistics = () => {
  const transactionsLog = useStore((s) => s.transactionsLog);
  const addNotification = useStore((s) => s.addNotification);

  const totalIncome = sumByKind(transactionsLog, "دخل");
  const totalExpenses = sumByKind(transactionsLog, "مصروف");

  const { expensesMom, incomeMom } = getMonthComparsion(transactionsLog);

  useEffect(() => {
    if (totalIncome > 0) {
      const expenseRatio = ((totalExpenses / totalIncome) * 100).toFixed();
      const nots = [50, 70, 100];

      nots.forEach((ratio) => {
        if (Number(expenseRatio) >= ratio) {
          const notificationTitle = `أنفقت ${ratio}% من دخلك`;
          const notificationKey = `expense-${ratio}`;

          addNotification(notificationTitle, notificationKey);
        }
      });
    }
  }, [totalIncome, totalExpenses, addNotification]);

  const statistics = [
    {
      title: "إجمالي الدخل",
      value: totalIncome,
      mom: incomeMom,
      higherIsBetter: true,
      icon: ArrowUpLeft,
    },
    {
      title: "إجمالي المصروفات",
      value: totalExpenses,
      mom: expensesMom,
      higherIsBetter: false,
      icon: ArrowDown,
    },
    {
      title: "الرصيد المتبقي",
      value: totalIncome - totalExpenses,
      icon: Wallet,
    },
  ];

  return (
    <div className="flex h-[20%] gap-3">
      {statistics.map((statis) => {
        return <StatCard key={statis.title} {...statis} />;
      })}
    </div>
  );
};
export default Statistics;
