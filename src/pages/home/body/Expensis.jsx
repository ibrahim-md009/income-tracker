import { useStore } from "../../../store/useStore";

const Expensis = () => {
  const { transactionsLog, categories } = useStore();

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
  const catTotal = Object.values(categoryTotals).reduce(
    (acc, val) => acc + val,
    0,
  );
  const expensesCategories = categories.filter((cat) => cat.type === "مصروف");
  return (
    <div className="flex flex-1 justify-between overflow-y-scroll rounded-lg bg-cyan-100 p-3">
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
                <span>{exp.title}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Expensis;
