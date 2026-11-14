import { useState } from "react";
import NotificationBell from "../../components/layout/NotificationBell";
import Chart from "../../components/ui/Chart";
import { useStore } from "../../store/useStore";
import {
  getMonthlyTransactionsData,
  getMonthsTotals,
  getMonthTransactions,
} from "../../utils/stats";
import Expenses from "../home/body/Expenses";
import { getCurrentMonthKey } from "../../utils/dates";

const tabs = [
  { title: "3أشهر", value: 3 },
  { title: "6أشهر", value: 6 },
  { title: "12أشهر", value: 12 },
  // { title: "مخصص" },
];

const Reports = () => {
  const [numOfMonths, setNumOfMonths] = useState(tabs[0].value);
  const transactionsLog = useStore((s) => s.transactionsLog);
  const selectedMonthKey = useStore((s) => s.selectedMonthKey);

  const { totalIncome, totalExpenses } = getMonthsTotals(
    transactionsLog,
    selectedMonthKey,
    numOfMonths,
  );

  const topCardsData = [
    {
      title: "متوسط الدخل الشهري",
      value: (totalIncome / numOfMonths).toFixed(),
    },
    {
      title: "متوسط الصرف الشهري",
      value: (totalExpenses / numOfMonths).toFixed(),
    },
    {
      title: "نسبة الادخار",
      value: "28%",
    },
    {
      title: "أكبر تصنيف",
      value: "طعام",
      percentage: "35%",
    },
  ];

  return (
    <main className="mr-[20%] min-h-screen w-[80%] p-3">
      <div className="flex flex-col gap-5">
        <div className="header flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="text-fg text-h1">التقارير</h2>
            <small className="text-fg-muted text-body-s">{`نظرة على أخر ${numOfMonths} شهور`}</small>
          </div>
          <div className="flex gap-7">
            <div className="flex gap-3">
              {tabs.map((tab) => (
                <button
                  key={tab.title}
                  onClick={() => setNumOfMonths(tab.value)}
                  className={`text-fg rounded-control text-body-s p-2 ${tab.value === numOfMonths ? "bg-card" : ""}`}
                >
                  {tab.title}
                </button>
              ))}
            </div>
            <NotificationBell />
          </div>
        </div>

        <div className="flex gap-5">
          {topCardsData.map((card) => {
            return (
              <div
                key={card.title}
                className="border-accent bg-card text-fg-muted text-body-s flex flex-1 flex-col gap-1 rounded-lg border p-3"
              >
                <h3>{card.title}</h3>
                <div className="flex items-center">
                  <b className="text-money-in text-h1">{card.value}</b>
                  {card.percentage && <small>{card.percentage}</small>}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex h-100 gap-5">
          <Chart
            chartData={getMonthlyTransactionsData(
              transactionsLog,
              selectedMonthKey,
              numOfMonths,
            )}
          />
          <Expenses
            log={getMonthTransactions(
              transactionsLog,
              getCurrentMonthKey(),
              numOfMonths,
            )}
          />
        </div>
      </div>
    </main>
  );
};
export default Reports;
