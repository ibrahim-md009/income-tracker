import { Tag } from "lucide-react";
import { useStore } from "../../../store/useStore";
import Button from "../../../components/ui/Button";

const formTabs = [{ title: "دخل" }, { title: "مصروف" }];

const Form = () => {
  const {
    activeTab,
    name,
    amount,
    cat,
    date,
    categories,
    underEditing,
    toggleActiveTab,
    addTransaction,
    clearForm,
    onChange,
    updateTransaction,
  } = useStore();

  const inputs = [
    {
      label: "اسم العملية",
      type: "text",
      value: name,
      placeholder: "راتب شهري",
      tran: "name",
    },
    {
      label: "المبلغ",
      type: "number",
      value: amount,
      placeholder: "0.00",
      tran: "amount",
    },
    {
      label: "التاريخ",
      type: "date",
      value: date,
      placeholder: "",
      tran: "date",
    },
  ];

  const incomeCategories = categories.filter((cat) => cat.type === "دخل");
  const expensesCategories = categories.filter((cat) => cat.type === "مصروف");
  const secCats = activeTab === "دخل" ? incomeCategories : expensesCategories;

  return (
    <div className="w-[20%] rounded-lg border border-amber-800 bg-cyan-100 p-3">
      <h3 className="font-bold">إضافة معاملة جديدة</h3>

      <div className="my-3 flex items-center gap-2 p-1">
        {formTabs.map((tab) => (
          <button
            key={tab.title}
            className={`flex w-full items-center justify-center rounded-lg px-5 py-2 ${tab.title === activeTab ? " border border-white bg-amber-800 text-white" : "bg-gray-400 text-gray-700"}`}
            onClick={() => toggleActiveTab(tab.title)}
          >
            {tab.title}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3.5">
        {inputs.map((inp, index) => {
          return (
            <div key={index}>
              <label className="mb-1 font-medium">{inp.label}</label>
              <input
                autoFocus={index === 0}
                className="w-full rounded-lg border border-amber-800 py-1.5 pr-3"
                type={inp.type}
                value={inp.value}
                onChange={(e) => onChange(inp.tran, e.target.value)}
                placeholder={inp.placeholder}
              />
            </div>
          );
        })}

        <div className="relative w-full">
          <div className="flex flex-col">
            <h3 className="mb-1 font-medium">التصنيف</h3>
            <Tag className="absolute right-3 bottom-2 w-6 rounded-lg bg-gray-300 p-1" />

            <select
              name="cat-select"
              id="cat-select"
              value={cat}
              onChange={(e) => onChange("cat", e.target.value)}
              required
              className="flex appearance-none items-center rounded-lg border border-amber-800 py-1.5 pr-12 invalid:text-gray-400"
            >
              <option value="" hidden>
                اختر التصنيف
              </option>
              {secCats.map((cat, i) => {
                return (
                  <option key={i} value={cat.value}>
                    {cat.title}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Button
            onClick={() => {
              underEditing ? updateTransaction() : addTransaction();
              clearForm();
            }}
            className="bg-amber-800 text-white"
            text={underEditing ? "تعديل" : "إضافة"}
          ></Button>

          {underEditing ? (
            <Button
              className="bg-amber-800 text-white"
              onClick={() => clearForm()}
              text="إلغاء"
            ></Button>
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default Form;
