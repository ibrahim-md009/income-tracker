import { ArrowDown, ArrowUpLeft, Wallet } from "lucide-react";
import { useStore } from "../../../store/useStore";
import { useEffect } from "react";
import { sumByKind } from "../../../utils/sumByKind";
import { getMonthComparsion } from "../../../utils/getMonthComparsion";

const Statistics = () => {
  const transactionsLog = useStore((s) => s.transactionsLog);
  const addNotification = useStore((s) => s.addNotification);
  const currency = useStore((s) => s.settings.languageAndCurrency.currency);

  const totalIncome = sumByKind(transactionsLog, "دخل");
  const totalExpenses = sumByKind(transactionsLog, "مصروف");

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

  const { expensesMom, incomeMom } = getMonthComparsion(transactionsLog);

  const statistics = [
    {
      title: "إجمالي الدخل",
      num: totalIncome + currency,
      comparedLastMonth: incomeMom,
      icon: ArrowUpLeft,
    },
    {
      title: "إجمالي المصروفات",
      num: totalExpenses + currency,
      comparedLastMonth: expensesMom,
      icon: ArrowDown,
    },
    {
      title: "الرصيد المتبقي",
      num: totalIncome - totalExpenses + currency,
      icon: Wallet,
    },
  ];

  return (
    <div className="flex h-[20%] gap-3">
      {statistics.map((statis) => {
        return (
          <div
            key={statis.title}
            className="flex w-full flex-col rounded-lg border border-amber-900 bg-blue-100 p-2"
          >
            <div className="flex justify-between">
              <h3 className="text-lg">{statis.title}</h3>
              {statis.icon && (
                <i className="bg-accent rounded-lg p-1">
                  <statis.icon className="text-white" />
                </i>
              )}
            </div>

            <h1 className="text-2xl font-black">{statis.num}</h1>
            {statis.comparedLastMonth && (
              <div className="flex items-center justify-between">
                <small className="text-green-500">مقارنة بالشهر الماضي</small>
                <b className="text-green-500">{statis.comparedLastMonth}</b>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
export default Statistics;
