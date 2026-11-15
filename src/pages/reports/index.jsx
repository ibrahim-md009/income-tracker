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
import { useFormatMoney } from "../../utils/money";

const tabs = [
  { title: "3 أشهر", value: 3 },
  { title: "6 أشهر", value: 6 },
  { title: "12 شهر", value: 12 },
];

const Reports = () => {
  const [numOfMonths, setNumOfMonths] = useState(tabs[0].value);
  const transactionsLog = useStore((s) => s.transactionsLog);
  const selectedMonthKey = useStore((s) => s.selectedMonthKey);
  const fmt = useFormatMoney();

  const { totalIncome, totalExpenses } = getMonthsTotals(
    transactionsLog,
    selectedMonthKey,
    numOfMonths,
  );

  const topCardsData = [
    {
      title: "متوسط الدخل الشهري",
      value: fmt(totalIncome / numOfMonths),
    },
    {
      title: "متوسط الصرف الشهري",
      value: fmt(totalExpenses / numOfMonths),
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
    <main className="min-h-screen w-full p-4 pb-36 lg:mr-[20%] lg:w-[80%] lg:p-6 lg:pb-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-fg text-h1">التقارير</h2>
            <small className="text-fg-muted text-body-s">{`نظرة على أخر ${numOfMonths} شهور`}</small>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-page border-line rounded-control flex gap-1 border p-1">
              {tabs.map((tab) => (
                <button
                  type="button"
                  key={tab.title}
                  onClick={() => setNumOfMonths(tab.value)}
                  className={`rounded-chip text-body-s h-9 px-4 font-medium transition-colors ${
                    tab.value === numOfMonths
                      ? "bg-action shadow-1 text-on-solid"
                      : "text-fg-muted hover:text-fg"
                  }`}
                >
                  {tab.title}
                </button>
              ))}
            </div>
            <NotificationBell />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {topCardsData.map((card) => {
            return (
              <div
                key={card.title}
                className="bg-card border-line rounded-card flex flex-col gap-2 border p-5"
              >
                <h3 className="text-fg-muted text-body-s font-medium">
                  {card.title}
                </h3>
                <div className="flex items-baseline gap-2">
                  <b className="text-fg text-h1 tabular-nums">{card.value}</b>
                  {card.percentage && (
                    <small className="bg-money-in-soft text-money-in rounded-chip text-caption px-2 py-0.5 font-semibold">
                      {card.percentage}
                    </small>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col gap-4 lg:h-96 lg:flex-row">
          <div className="bg-card border-line rounded-card flex h-72 flex-none flex-col gap-3 border p-4 lg:h-auto lg:flex-1">
            <h3 className="text-fg text-h2">الدخل والمصروفات</h3>
            <Chart
              chartData={getMonthlyTransactionsData(
                transactionsLog,
                selectedMonthKey,
                numOfMonths,
              )}
            />
          </div>
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
