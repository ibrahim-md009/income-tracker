import { Link } from "react-router-dom";
import { useStore } from "../../../store/useStore";
import { filterByMonth } from "../../../utils/stats";

const Transactions = () => {
  const transactionsLog = useStore((s) => s.transactionsLog);
  const selectedMonthKey = useStore((s) => s.selectedMonthKey);

  const monthTransactions = filterByMonth(transactionsLog, selectedMonthKey);

  return (
    <div className="bg-card rounded-card border-line flex flex-col gap-3 border p-3">
      <div className="flex justify-between">
        <h3 className="text-fg text-h3">آخر المعاملات</h3>
        <Link to={"/transactions"}>عرض الكل</Link>
      </div>

      <div>
        {monthTransactions.slice(0, 10).map((tran) => {
          return (
            <div
              key={tran.id}
              className="border-line rounde flex justify-between border-y p-2"
            >
              <div className="flex flex-col">
                <span className="text-fg text-body">{tran.name}</span>
                <div className="flex gap-1">
                  <small>{tran.cat}</small>
                </div>
              </div>
              <b
                className={`text-body ${tran.kind === "مصروف" ? "text-money-out" : "text-money-in"}`}
              >{`${tran.amount} ${tran.kind === "مصروف" ? "-" : "+"}`}</b>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Transactions;
