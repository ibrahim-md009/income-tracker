import { List, Calendar } from "lucide-react";
import { useStore } from "../../../../store/useStore";
import Button from "../../../../components/ui/Button";

const TransactionsHeader = () => {
  const {
    categories,
    tranSearch,
    tranDate,
    tranKind,
    tranCat,
    changeFilter,
    clearFiltering,
    underFiltering,
  } = useStore();

  const selectItems = [
    {
      id: "select-2",
      title: "كل الأنواع",
      options: ["مصروف", "دخل"],
      value: tranKind,
      tran: "tranKind",
      icon: Calendar,
    },
    {
      id: "select-3",
      title: "كل الفئات",
      options: categories.map((cat) => cat.title),
      value: tranCat,
      tran: "tranCat",
      icon: Calendar,
    },
  ];
  const inputItems = [
    {
      type: "date",
      value: tranDate,
      placeholder: "",
      tran: "tranDate",
    },
    {
      type: "search",
      value: tranSearch,
      placeholder: "ابحث في المعاملات",
      tran: "tranSearch",
    },
  ];

  return (
    <div className="header flex gap-15">
      <div className="flex w-[20%]">
        <h3 className="flex gap-1 font-bold">
          <List />
          المعاملات الأخيرة
        </h3>
      </div>

      <div className="flex flex-1 gap-2">
        {underFiltering ? (
          <Button
            text="إلغاء"
            className="p-2"
            onClick={() => clearFiltering()}
          />
        ) : null}

        {selectItems.map((select) => {
          return (
            <div
              key={select.id}
              className="relative flex w-[33%] items-center justify-center"
            >
              <select.icon className="absolute top-[50%] right-2 w-4 translate-y-[-50%] rounded-lg" />

              <select
                className="border-accent flex w-full appearance-none items-center rounded-lg border py-1 pr-8 pl-3 invalid:text-[14px] invalid:text-gray-400"
                value={select.value}
                onChange={(e) => changeFilter(select.tran, e.target.value)}
                name={select.id}
                id={select.id}
                required
              >
                <option value="" hidden>
                  {select.title}
                </option>
                {select.options.map((option) => {
                  return (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  );
                })}
              </select>
            </div>
          );
        })}

        {inputItems.map((inp, i) => {
          return (
            <input
              key={i}
              type={inp.type}
              placeholder={inp.placeholder}
              onChange={(e) => changeFilter(inp.tran, e.target.value)}
              className="rounded-lg bg-gray-300 px-2 text-xs"
            />
          );
        })}
      </div>
    </div>
  );
};
export default TransactionsHeader;
