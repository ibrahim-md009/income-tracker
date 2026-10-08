import { Edit, Trash } from "lucide-react";
import { useStore } from "../../../../store/useStore";

const Table = () => {
  const {
    transactionsLog,
    tranSearch,
    tranDate,
    tranKind,
    tranCat,
    deleteTransaction,
    editTransaction,
  } = useStore();

  const filteredLog = transactionsLog.filter(
    (tran) =>
      tran.name.includes(tranSearch) &&
      tran.date.includes(tranDate) &&
      tran.kind.includes(tranKind) &&
      tran.cat.includes(tranCat),
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-6 rounded-lg bg-gray-300 px-5 py-2 text-center">
        <span className="text-right">الاسم</span>
        <span>المبلغ</span>
        <span>الفئة</span>
        <span>النوع</span>
        <span>التاريخ</span>
        <span>الإجراءات</span>
      </div>

      <div className="flex flex-col gap-3">
        {filteredLog.map((tran) => {
          return (
            <div key={tran.id} className="flex flex-col gap-1">
              <div className="grid grid-cols-6 px-5 text-center">
                <span className="text-right">{tran.name}</span>
                <span className="flex items-center justify-center gap-1">
                  {tran.amount}
                  <span className="w-5 rounded-lg bg-amber-800 text-center text-white">
                    {tran.kind === "دخل" ? "+" : "-"}
                  </span>
                </span>
                <span>{tran.cat}</span>
                <span>{tran.kind}</span>
                <span>{tran.date}</span>

                <div className="flex justify-center gap-2">
                  <Edit
                    className="w-4 cursor-pointer"
                    onClick={() => editTransaction(tran)}
                  />
                  <Trash
                    className="w-4 cursor-pointer"
                    onClick={() => deleteTransaction(tran.id)}
                  />
                </div>
              </div>
              <hr className="text-gray-300" />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Table;
