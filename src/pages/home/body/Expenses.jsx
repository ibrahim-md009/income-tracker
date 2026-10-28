import { useStore } from "../../../store/useStore";
import ExpensesPie from "../../../components/ui/ExpensesPie";
const Expenses = () => {
  const { transactionsLog, categories } = useStore();

  //بترجع اوبجكت فيه اسم الكاتيجوري ومجموع مصاريفها
  const getCategoryTotals = () => {
    return transactionsLog
      .filter((tran) => tran.kind === "مصروف")
      .reduce((acc, tran) => {
        const catName = tran.cat;
        const amount = Number(tran.amount) || 0;

        acc[catName] = (acc[catName] || 0) + amount;
        return acc;
      }, {});
  };
  const categoryTotals = getCategoryTotals();
  //مجموع المصروفات
  const catTotal = Object.values(categoryTotals).reduce(
    (acc, val) => acc + val,
    0,
  );
  const expensesCategories = categories.filter((cat) => cat.type === "مصروف");
  // [{name: "",value: 1000}]
  const pieData = expensesCategories.map((cat) => ({
    name: cat.title,
    color: cat.color,
    value: categoryTotals[cat.title],
  }));

  return (
    <div className="flex flex-1 justify-between overflow-y-auto rounded-lg bg-cyan-100 p-3">
      <div>
        <h3 className="mb-5 font-bold">المصروفات حسب التصنيف</h3>

        <div className="flex flex-col gap-5 pb-2">
          {expensesCategories.map((exp) => {
            const amount = categoryTotals[exp.title] || 0;
            const rate =
              catTotal > 0
                ? ((amount / catTotal) * 100).toFixed(0) + "%"
                : "0%";

            return (
              <div key={exp.title} className="flex gap-12 text-[12px]">
                <span>{rate}</span>
                <span>{amount}</span>
                <div className="flex gap-2">
                  <span>{exp.title}</span>
                  <span
                    className="h-4 w-4 rounded-full"
                    style={{ backgroundColor: exp.color }}
                  ></span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <ExpensesPie pieData={pieData} />
    </div>
  );
};
export default Expenses;
