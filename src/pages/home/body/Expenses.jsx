import { useStore } from "../../../store/useStore";
import ExpensesPie from "../../../components/ui/ExpensesPie";
import {
  getCatTotal,
  getCategoryTotals,
  getPieData,
} from "../../../utils/stats";

import { Tags } from "lucide-react";
import { useFormatMoney } from "../../../utils/money";
import EmptyCompact from "../../../components/ui/EmptyCompact";

const Expenses = ({ log = [] }) => {
  const categories = useStore((s) => s.categories);
  const fmt = useFormatMoney();

  const expensesCategories = categories.filter((cat) => cat.type === "مصروف");
  const catTotal = getCatTotal(log);
  return (
    <div className="bg-card rounded-card border-line flex w-full flex-col justify-between gap-4 border p-3 lg:w-[45%] lg:flex-row lg:gap-0">
      <div className="flex min-h-0 min-w-0 flex-col lg:flex-1">
        <h3 className="text-fg text-h2 mb-5">المصروفات حسب التصنيف</h3>

        {expensesCategories.length === 0 ? (
          <EmptyCompact
            icon={Tags}
            title="مفيش تصنيفات مصروفات"
            text="أضف تصنيفات علشان تشوف مصروفاتك متوزعة."
            actionLabel="إضافة تصنيف"
            to="/categories"
          />
        ) : (
          <div className="flex min-h-0 flex-col gap-4 overflow-y-auto pb-2 lg:flex-1">
            {expensesCategories.map((exp) => {
              const amount = getCategoryTotals(log)[exp.title] || 0;
              const rate =
                catTotal > 0
                  ? ((amount / catTotal) * 100).toFixed(0) + "%"
                  : "0%";

              return (
                <div
                  key={exp.title}
                  className="grid grid-cols-[40px_minmax(0,90px)_minmax(0,1fr)] gap-3 text-[12px]"
                >
                  <span>{rate}</span>
                  <span className="min-w-0 truncate">{fmt(amount)}</span>
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
        )}
      </div>

      {catTotal > 0 && (
        <ExpensesPie pieData={getPieData(log, expensesCategories)} />
      )}
    </div>
  );
  // return (
  //   <div className="bg-card rounded-card border-line flex w-[45%] justify-between border p-3">
  //     <div className="flex min-h-0 min-w-0 flex-1 flex-col">
  //       <h3 className="text-fg text-h2 mb-5">المصروفات حسب التصنيف</h3>

  //       {expensesCategories.length === 0 && (
  //         <div className="h-full w-full">
  //           <div>
  //             <h1>لا يوجد لديك تصنيفات للمصروفات حاليا</h1>
  //             <Button>
  //               <Link to={"/categories"}>اذهب لقسم التصنيفات</Link>
  //             </Button>
  //           </div>
  //         </div>
  //       )}

  //       <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto pb-2">
  //         {expensesCategories.map((exp) => {
  //           const amount = getCategoryTotals(log)[exp.title] || 0;
  //           const rate =
  //             catTotal > 0
  //               ? ((amount / catTotal) * 100).toFixed(0) + "%"
  //               : "0%";

  //           return (
  //             <div
  //               key={exp.title}
  //               className="grid grid-cols-[40px_60px_minmax(0,1fr)] gap-3 text-[12px]"
  //             >
  //               <span>{rate}</span>
  //               <span>{amount}</span>
  //               <div className="grid grid-cols-2">
  //                 <span>{exp.title}</span>
  //                 <span
  //                   className="h-4 w-4 shrink-0 rounded-full"
  //                   style={{ backgroundColor: exp.color }}
  //                 ></span>
  //               </div>
  //             </div>
  //           );
  //         })}
  //       </div>
  //     </div>
  //     <ExpensesPie pieData={getPieData(log, expensesCategories)} />
  //   </div>
  // );
};
export default Expenses;
