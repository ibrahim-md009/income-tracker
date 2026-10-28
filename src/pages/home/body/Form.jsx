import { Tag } from "lucide-react";
import { useStore } from "../../../store/useStore";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { useDraft, emptyDraft } from "../../../hooks/useDraft";
import FieldWithIcon from "../../../components/ui/FieldWithIcon";
const formTabs = [{ title: "دخل" }, { title: "مصروف" }];

const Form = () => {
  const setState = useStore((s) => s.setState);
  const transactionsLog = useStore((s) => s.transactionsLog);
  const categories = useStore((s) => s.categories);
  const addTransaction = useStore((s) => s.addTransaction);
  const editingId = useStore((s) => s.editingId);
  const updateTransaction = useStore((s) => s.updateTransaction);

  const initial = transactionsLog.find((t) => t.id === editingId) ?? emptyDraft;
  const { draft, setField, reset } = useDraft(initial);

  const underEditing = editingId !== "";

  const toggleActiveTab = (tabTitle) => {
    setField("kind", tabTitle);
  };
  const clearForm = () => {
    reset();
    setState("editingId", "");
  };
  const inputs = [
    {
      label: "اسم العملية",
      type: "text",
      value: draft.name,
      placeholder: "راتب شهري",
      tran: "name",
    },
    {
      label: "المبلغ",
      type: "number",
      value: draft.amount,
      placeholder: "0.00",
      tran: "amount",
    },
    {
      label: "التاريخ",
      type: "date",
      value: draft.date,
      placeholder: "",
      tran: "date",
    },
  ];

  const incomeCategories = categories.filter((cat) => cat.type === "دخل");
  const expensesCategories = categories.filter((cat) => cat.type === "مصروف");
  const secCats = draft.kind === "دخل" ? incomeCategories : expensesCategories;

  return (
    <div className="border-accent w-[20%] rounded-lg border bg-cyan-100 p-3">
      <h3 className="font-bold">إضافة معاملة جديدة</h3>

      <div className="my-3 flex items-center gap-2 p-1">
        {formTabs.map((tab) => (
          <Button
            key={tab.title}
            className={`w-full p-2 ${tab.title === draft.kind ? " bg-accent border border-white text-white" : "bg-gray-400 text-gray-700"}`}
            onClick={() => toggleActiveTab(tab.title)}
            text={tab.title}
          />
        ))}
      </div>

      <div className="flex flex-col gap-3.5">
        {inputs.map((inp, index) => {
          return (
            <div key={index}>
              <label className="mb-1 font-medium">{inp.label}</label>
              <Input
                autoFocus={index === 0}
                type={inp.type}
                value={inp.value}
                onChange={(e) => setField(inp.tran, e.target.value)}
                placeholder={inp.placeholder}
              />
            </div>
          );
        })}

        <FieldWithIcon label={"ننن"} Icon={Tag}>
          <select
            value={draft.cat}
            onChange={(e) => setField("cat", e.target.value)}
            required
            className="border-accent flex appearance-none items-center rounded-lg border py-1.5 pr-12 invalid:text-gray-400"
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
        </FieldWithIcon>

        <div className="flex flex-col gap-3">
          <Button
            onClick={() => {
              underEditing ? updateTransaction(draft) : addTransaction(draft);
              clearForm();
            }}
            text={underEditing ? "تعديل" : "إضافة"}
          />

          {underEditing ? (
            <Button
              onClick={() => clearForm()}
              text="إلغاء"
              variant="outlined"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default Form;
