import { Link } from "react-router-dom";
import { ReceiptText } from "lucide-react";
import { useStore } from "../../../store/useStore";
import { filterByMonth } from "../../../utils/stats";
import EmptyCompact from "../../../components/ui/EmptyCompact";

const Transactions = () => {
  const transactionsLog = useStore((s) => s.transactionsLog);
  const selectedMonthKey = useStore((s) => s.selectedMonthKey);
  const monthTransactions = filterByMonth(transactionsLog, selectedMonthKey)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);

  return (
    <div className="bg-card rounded-card border-line flex flex-col gap-2 border p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-fg text-h2">آخر المعاملات</h3>
        <Link
          to={"/transactions"}
          className="text-action text-body-s font-semibold hover:underline"
        >
          عرض الكل
        </Link>
      </div>

      {monthTransactions.length === 0 ? (
        <EmptyCompact
          icon={ReceiptText}
          title="مفيش معاملات في الشهر ده"
          text="أول ما تسجّل معاملة هتظهر هنا."
        />
      ) : (
        <div className="flex flex-col">
          {monthTransactions.map((tran) => {
            const isExpense = tran.kind === "مصروف";
            return (
              <div
                key={tran.id}
                className="border-line flex items-center justify-between gap-3 border-b py-3 last:border-b-0"
              >
                <div className="flex min-w-0 flex-col">
                  <span className="text-fg text-body truncate font-medium">
                    {tran.name}
                  </span>
                  <span className="bg-page text-fg-muted text-caption rounded-chip mt-1 w-fit px-2 py-0.5">
                    {tran.cat}
                  </span>
                </div>
                <b
                  dir="ltr"
                  className={`text-body flex-none tabular-nums ${
                    isExpense ? "text-money-out" : "text-money-in"
                  }`}
                >
                  {`${isExpense ? "-" : "+"}${tran.amount}`}
                </b>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default Transactions;
