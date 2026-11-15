import { Edit, Trash, SearchX } from "lucide-react";
import { useStore } from "../../store/useStore";
import { filterByMonth } from "../../utils/stats";
import { getErrorMsg } from "../../utils/errors";
import EmptyCompact from "../../components/ui/EmptyCompact";

const Table = () => {
  const {
    transactionsLog,
    tranSearch,
    tranDate,
    tranKind,
    tranCat,
    deleteTransaction,
  } = useStore();
  const setState = useStore((s) => s.setState);
  const selectedMonthKey = useStore((s) => s.selectedMonthKey);

  const editTransaction = (tran) => {
    setState("editingId", tran.id);
  };

  const monthTransactions = filterByMonth(transactionsLog, selectedMonthKey);
  const filteredLog = monthTransactions
    .filter(
      (tran) =>
        tran.name.includes(tranSearch) &&
        tran.date.includes(tranDate) &&
        tran.kind.includes(tranKind) &&
        tran.cat.includes(tranCat),
    )
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="bg-card border-line rounded-card flex min-h-0 flex-1 flex-col overflow-hidden border">
      <div className="bg-page border-line text-fg-muted text-caption grid grid-cols-6 border-b px-5 py-3 text-center font-medium">
        <span className="text-start">الاسم</span>
        <span>المبلغ</span>
        <span>الفئة</span>
        <span>النوع</span>
        <span>التاريخ</span>
        <span>الإجراءات</span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
        {filteredLog.length === 0 ? (
          <EmptyCompact
            icon={SearchX}
            title="مفيش نتائج"
            text="جرّب تغيّر البحث أو تمسح الفلاتر."
          />
        ) : (
          filteredLog.map((tran) => {
            const isIncome = tran.kind === "دخل";
            return (
              <div
                key={tran.id}
                className="border-line hover:bg-page text-body-s grid grid-cols-6 items-center border-b px-5 py-3.5 text-center transition-colors last:border-b-0"
              >
                <span className="text-fg truncate text-start font-medium">
                  {tran.name}
                </span>

                <span
                  dir="ltr"
                  className={`font-semibold tabular-nums ${
                    isIncome ? "text-money-in" : "text-money-out"
                  }`}
                >
                  {isIncome ? "+" : "-"}
                  {tran.amount}
                </span>

                <span className="text-fg-body truncate">{tran.cat}</span>

                <span>
                  <span
                    className={`rounded-chip text-caption inline-block px-2.5 py-0.5 font-medium ${
                      isIncome
                        ? "bg-money-in-soft text-money-in"
                        : "bg-money-out-soft text-money-out"
                    }`}
                  >
                    {tran.kind}
                  </span>
                </span>

                <span className="text-fg-muted tabular-nums">{tran.date}</span>

                <div className="flex justify-center gap-1">
                  <button
                    type="button"
                    aria-label="تعديل"
                    onClick={() => editTransaction(tran)}
                    className="text-fg-muted hover:bg-action-soft hover:text-action rounded-control grid h-8 w-8 place-items-center transition-colors"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    type="button"
                    aria-label="حذف"
                    onClick={async () => {
                      try {
                        await deleteTransaction(tran.id);
                      } catch (error) {
                        alert(getErrorMsg(error));
                      }
                    }}
                    className="text-fg-muted hover:bg-money-out-soft hover:text-money-out rounded-control grid h-8 w-8 place-items-center transition-colors"
                  >
                    <Trash size={16} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
export default Table;
