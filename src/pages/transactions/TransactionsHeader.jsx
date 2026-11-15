import { ListFilter, Tag, X } from "lucide-react";
import { useStore } from "../../store/useStore";
import Input from "../../components/ui/Input";
import FieldWithIcon from "../../components/ui/FieldWithIcon";

const selectClass =
  "border-line-strong bg-card text-fg rounded-control focus:border-action focus:ring-action/20 invalid:text-fg-muted h-11 w-full appearance-none border ps-11 pe-3.5 text-body-s outline-none transition focus:ring-4";

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
      icon: ListFilter,
    },
    {
      id: "select-3",
      title: "كل الفئات",
      options: categories.map((cat) => cat.title),
      value: tranCat,
      tran: "tranCat",
      icon: Tag,
    },
  ];
  const inputItems = [
    {
      type: "search",
      value: tranSearch,
      placeholder: "ابحث في المعاملات",
      tran: "tranSearch",
      width: "min-w-56 flex-[2]",
    },
    {
      type: "date",
      value: tranDate,
      placeholder: "",
      tran: "tranDate",
      width: "min-w-40 flex-1",
    },
  ];

  return (
    <div className="bg-card border-line rounded-card flex flex-wrap items-center gap-3 border p-3">
      {inputItems.map((inp, i) => (
        <div key={i} className={inp.width}>
          <Input
            type={inp.type}
            placeholder={inp.placeholder}
            onChange={(e) => changeFilter(inp.tran, e.target.value)}
            className="text-body-s"
          />
        </div>
      ))}

      {selectItems.map((select) => (
        <div key={select.id} className="min-w-40 flex-1">
          <FieldWithIcon Icon={select.icon}>
            <select
              className={selectClass}
              value={select.value}
              onChange={(e) => changeFilter(select.tran, e.target.value)}
              name={select.id}
              id={select.id}
              required
            >
              <option value="" hidden>
                {select.title}
              </option>
              {select.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </FieldWithIcon>
        </div>
      ))}

      {underFiltering ? (
        <button
          type="button"
          onClick={() => clearFiltering()}
          className="text-money-out hover:bg-money-out-soft rounded-control text-body-s flex h-11 items-center gap-1.5 px-3 font-semibold transition-colors"
        >
          <X size={16} />
          مسح الفلاتر
        </button>
      ) : null}
    </div>
  );
};
export default TransactionsHeader;
