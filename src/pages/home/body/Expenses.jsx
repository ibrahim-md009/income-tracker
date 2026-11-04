import { useStore } from "../../../store/useStore";
import ExpensesPie from "../../../components/ui/ExpensesPie";
import { Link } from "react-router-dom";
import Button from "../../../components/ui/Button";
import {
  // filterByMonth,
  getCatTotal,
  getCategoryTotals,
  getPieData,
} from "../../../utils/stats";

const Expenses = ({ log = [] }) => {
  // const transactionsLog = useStore((s) => s.transactionsLog);
  const categories = useStore((s) => s.categories);
  // const selectedMonthKey = useStore((s) => s.selectedMonthKey);

  // const monthTransactions = filterByMonth(transactionsLog, selectedMonthKey);
  const expensesCategories = categories.filter((cat) => cat.type === "مصروف");
  const catTotal = getCatTotal(log);

  return (
    <div className="flex flex-1 justify-between rounded-lg bg-cyan-100 p-3">
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <h3 className="mb-5 font-bold">المصروفات حسب التصنيف</h3>

        {expensesCategories.length === 0 && (
          <div className="h-full w-full">
            <div>
              <h1>لا يوجد لديك تصنيفات للمصروفات حاليا</h1>
              <Button>
                <Link to={"/categories"}>اذهب لقسم التصنيفات</Link>
              </Button>
            </div>
          </div>
        )}

        <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto pb-2">
          {expensesCategories.map((exp) => {
            const amount = getCategoryTotals(log)[exp.title] || 0;
            const rate =
              catTotal > 0
                ? ((amount / catTotal) * 100).toFixed(0) + "%"
                : "0%";

            return (
              <div
                key={exp.title}
                className="grid grid-cols-[40px_60px_minmax(0,1fr)] gap-3 text-[12px]"
              >
                <span>{rate}</span>
                <span>{amount}</span>
                <div className="grid grid-cols-2">
                  <span>{exp.title}</span>
                  <span
                    className="h-4 w-4 shrink-0 rounded-full"
                    style={{ backgroundColor: exp.color }}
                  ></span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <ExpensesPie pieData={getPieData(log, expensesCategories)} />
    </div>
  );
};
export default Expenses;
