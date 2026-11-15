import { useState } from "react";
import { Tag } from "lucide-react";
import { useStore } from "../../../store/useStore";
import Input from "../../../components/ui/Input";
import { getTodayDate } from "../../../utils/dates";
import { useDraft } from "../../../hooks/useDraft";
import FieldWithIcon from "../../../components/ui/FieldWithIcon";
import { getErrorMsg } from "../../../utils/errors";

const formTabs = [
  { title: "دخل", active: "bg-money-in text-on-solid" },
  { title: "مصروف", active: "bg-money-out text-on-solid" },
];

const today = getTodayDate();
const emptyDraft = {
  name: "",
  amount: "",
  cat: "",
  date: today,
  kind: "دخل",
};

const validate = (draft, secCats) => {
  const errors = {};
  const name = String(draft.name ?? "").trim();
  const amount = Number(draft.amount);

  if (!name) errors.name = "اكتب اسم المعاملة";
  else if (name.length > 60) errors.name = "الاسم طويل، الحد الأقصى 60 حرف";

  if (draft.amount === "" || draft.amount === null) {
    errors.amount = "اكتب المبلغ";
  } else if (!Number.isFinite(amount) || amount <= 0) {
    errors.amount = "المبلغ لازم يكون رقم أكبر من صفر";
  } else if (amount > 1_000_000_000) {
    errors.amount = "المبلغ كبير قوي";
  }

  if (!draft.date) errors.date = "اختر التاريخ";
  else if (Number.isNaN(new Date(draft.date).getTime()))
    errors.date = "التاريخ غير صحيح";

  if (!draft.cat) errors.cat = "اختر التصنيف";
  else if (!secCats.some((c) => (c.value ?? c.title) === draft.cat))
    errors.cat = "التصنيف مش مناسب لنوع المعاملة";

  return errors;
};

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
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const changeField = (field, value) => {
    setField(field, value);
    setErrors((e) => (e[field] ? { ...e, [field]: undefined } : e));
  };

  const toggleActiveTab = (tabTitle) => {
    setField("kind", tabTitle);
    // التصنيف مرتبط بنوع المعاملة، فنصفّره عند التبديل
    setField("cat", "");
    setErrors((e) => ({ ...e, cat: undefined }));
  };
  const clearForm = () => {
    reset();
    setErrors({});
    setState("editingId", "");
  };

  const inputs = [
    {
      label: "اسم المعاملة",
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
    <div className="bg-card flex h-full w-full flex-col gap-4 overflow-y-auto">
      <div>
        <h3 className="font-voice text-voice text-fg">
          {underEditing ? "تعديل معاملة" : "معاملة جديدة"}
        </h3>
        <p className="text-fg-muted text-caption mt-0.5">
          سجّل دخلك أو مصروفك في ثواني.
        </p>
      </div>

      <div className="bg-page border-line rounded-control flex gap-1 border p-1">
        {formTabs.map((tab) => (
          <button
            type="button"
            key={tab.title}
            onClick={() => toggleActiveTab(tab.title)}
            className={`rounded-chip h-10 flex-1 font-semibold transition-colors ${
              tab.title === draft.kind
                ? `${tab.active} shadow-1`
                : "text-fg-muted hover:text-fg"
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {inputs.map((inp, index) => (
          <Input
            key={inp.tran}
            label={inp.label}
            autoFocus={index === 0}
            type={inp.type}
            value={inp.value}
            onChange={(e) => changeField(inp.tran, e.target.value)}
            placeholder={inp.placeholder}
            error={errors[inp.tran]}
            {...(inp.tran === "amount"
              ? { min: "0", step: "any", inputMode: "decimal" }
              : {})}
            {...(inp.tran === "name" ? { maxLength: 60 } : {})}
          />
        ))}

        <FieldWithIcon label={"التصنيف"} Icon={Tag}>
          <select
            value={draft.cat}
            onChange={(e) => changeField("cat", e.target.value)}
            aria-invalid={errors.cat ? true : undefined}
            className={`${errors.cat ? "border-money-out!" : ""} border-line-strong bg-card text-fg rounded-control focus:border-action focus:ring-action/20 invalid:text-fg-muted h-11 w-full appearance-none border py-1.5 ps-11 pe-3.5 transition outline-none focus:ring-4`}
          >
            <option value="" hidden>
              اختر التصنيف
            </option>
            {secCats.map((cat, i) => (
              <option key={i} value={cat.value}>
                {cat.title}
              </option>
            ))}
          </select>
        </FieldWithIcon>
        {errors.cat && (
          <p className="text-money-out text-caption -mt-3">{errors.cat}</p>
        )}
      </div>

      <div className="mt-auto flex flex-col gap-2 pt-2">
        <button
          type="button"
          disabled={submitting}
          className="bg-action hover:bg-action-hover rounded-control h-12 w-full font-semibold text-on-solid transition-colors disabled:opacity-60"
          onClick={async () => {
            const found = validate(draft, secCats);
            setErrors(found);
            if (Object.keys(found).length > 0) return;

            const clean = {
              ...draft,
              name: draft.name.trim(),
              amount: Number(draft.amount),
            };

            setSubmitting(true);
            try {
              if (underEditing) {
                await updateTransaction(clean);
              } else {
                await addTransaction(clean);
              }
              clearForm();
            } catch (error) {
              alert(getErrorMsg(error));
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {underEditing ? "حفظ التعديل" : "إضافة المعاملة"}
        </button>

        {underEditing ? (
          <button
            type="button"
            onClick={() => clearForm()}
            className="border-line-strong text-fg-body hover:bg-page rounded-control h-12 w-full border font-semibold transition-colors"
          >
            إلغاء
          </button>
        ) : null}
      </div>
    </div>
  );
};
export default Form;
