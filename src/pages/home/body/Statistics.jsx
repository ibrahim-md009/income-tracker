import { ArrowDown, ArrowUpLeft, Wallet } from "lucide-react";
import { useStore } from "../../../store/useStore";

const Statistics = () => {
  const transactionsLog = useStore((s) => s.transactionsLog);
  const currency = useStore((s) => s.settings.languageAndCurrency.currency);

  const getTotalIncome = () => {
    return transactionsLog
      .filter((tran) => tran.kind === "دخل")
      .map((n) => n.amount)
      .reduce((acc, u) => Number(acc) + Number(u), 0);
  };
  const totalIncome = getTotalIncome();

  const getTotalExpenses = () => {
    return transactionsLog
      .filter((tran) => tran.kind === "مصروف")
      .map((n) => n.amount)
      .reduce((acc, u) => Number(acc) + Number(u), 0);
  };
  const totalExpenses = getTotalExpenses();

  const statistics = [
    {
      title: "إجمالي الدخل",
      num: totalIncome + currency,
      comparedLastMonth: "25%",
      icon: ArrowUpLeft,
    },
    {
      title: "إجمالي المصروفات",
      num: totalExpenses + currency,
      comparedLastMonth: "25%",
      icon: ArrowDown,
    },
    {
      title: "الرصيد المتبقي",
      num: totalIncome - totalExpenses + currency,
      comparedLastMonth: "25%",
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
              {statis.icon ? (
                <i className="rounded-lg bg-amber-800 p-1">
                  <statis.icon className="text-white" />
                </i>
              ) : (
                ""
              )}
            </div>

            <h1 className="text-2xl font-black">{statis.num}</h1>

            <div className="flex items-center justify-between">
              <small className="text-green-500">مقارنة بالشهر الماضي</small>
              <b className="text-green-500">{statis.comparedLastMonth}</b>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Statistics;
