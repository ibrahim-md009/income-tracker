import { X } from "lucide-react";
import { useStore } from "../../store/useStore";
import Input from "../../components/ui/Input";
import { useDraft } from "../../hooks/useDraft";
import { getErrorMsg } from "../../utils/errors";

const catTypes = [
  { title: "مصروف", active: "bg-money-out text-white" },
  { title: "دخل", active: "bg-money-in text-white" },
];

const swatches = [
  "#c2612f",
  "#c99a1e",
  "#7c8a2e",
  "#1a8a8a",
  "#3b8ec4",
  "#6d6fd6",
  "#8452b8",
  "#d0537e",
  "#7a2e5b",
  "#5b6785",
];

const initialCat = {
  type: "مصروف",
  title: "",
  color: "#92400e",
};

const AddModal = () => {
  const categories = useStore((s) => s.categories);
  const catEditingId = useStore((s) => s.catEditingId);
  const addCategory = useStore((s) => s.addCategory);
  const updateCategory = useStore((s) => s.updateCategory);
  const setState = useStore((s) => s.setState);
  const setIsCategoriesFormOpen = useStore((s) => s.setIsCategoriesFormOpen);

  const initial =
    categories.find((cat) => cat.id === catEditingId) ?? initialCat;
  const { draft, setField, reset } = useDraft(initial);

  const catUnderEditing = catEditingId !== "";

  const toggleType = (type) => {
    setField("type", type);
  };

  const clearCategoriesForm = () => {
    reset();
    setState("catEditingId", "");
  };

  const close = () => {
    setIsCategoriesFormOpen(false);
    clearCategoriesForm();
  };

  return (
    <div
      onClick={close}
      className="bg-ink-900/50 fixed inset-0 z-50 flex items-end justify-center p-4 backdrop-blur-[2px] sm:items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-raised rounded-sheet shadow-3 animate-slide-up flex w-full max-w-md flex-col gap-6 p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-voice text-voice text-fg">
              {catUnderEditing ? "تعديل تصنيف" : "إضافة تصنيف"}
            </h2>
            <p className="text-fg-muted text-body-s mt-1">
              اختار اسم ونوع ولون يميّزه.
            </p>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="إغلاق"
            className="text-fg-muted hover:bg-page hover:text-fg rounded-control grid h-9 w-9 flex-none place-items-center transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <Input
          label={"اسم التصنيف"}
          autoFocus
          onFocus={(e) => e.target.select()}
          value={draft.title}
          onChange={(e) => setField("title", e.target.value)}
          placeholder="مثال: مواصلات"
        />

        <div>
          <span className="text-fg text-body-s mb-2 block font-medium">
            النوع
          </span>
          <div className="bg-page border-line rounded-control flex gap-1 border p-1">
            {catTypes.map((cat) => (
              <button
                type="button"
                key={cat.title}
                onClick={() => toggleType(cat.title)}
                className={`rounded-chip h-10 flex-1 font-semibold transition-colors ${
                  cat.title === draft.type
                    ? `${cat.active} shadow-1`
                    : "text-fg-muted hover:text-fg"
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="text-fg text-body-s mb-2 block font-medium">
            لون التصنيف
          </span>

          <div className="flex flex-wrap items-center gap-2.5">
            {swatches.map((c) => (
              <button
                type="button"
                key={c}
                onClick={() => setField("color", c)}
                aria-label={c}
                style={{ backgroundColor: c }}
                className={`size-8 rounded-full transition-transform hover:scale-110 ${
                  draft.color.toLowerCase() === c
                    ? "ring-action ring-offset-raised ring-2 ring-offset-2"
                    : ""
                }`}
              />
            ))}

            <label
              title="لون مخصص"
              className="border-line-strong relative size-8 cursor-pointer overflow-hidden rounded-full border-2 border-dashed"
            >
              <input
                type="color"
                value={draft.color}
                onChange={(e) => setField("color", e.target.value)}
                className="absolute -inset-2 h-12 w-12 cursor-pointer opacity-0"
              />
              <span className="text-fg-muted grid h-full w-full place-items-center text-lg leading-none">
                +
              </span>
            </label>
          </div>

          <div className="bg-page border-line rounded-control mt-3 flex items-center gap-3 border p-3">
            <span
              className="size-7 flex-none rounded-full"
              style={{ backgroundColor: draft.color }}
            />
            <span className="text-fg text-h3 flex-1 truncate">
              {draft.title || "اسم التصنيف"}
            </span>
            <span dir="ltr" className="text-fg-muted text-caption tabular-nums">
              {draft.color}
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            className="bg-action hover:bg-action-hover rounded-control h-12 flex-1 font-semibold text-white transition-colors"
            onClick={async () => {
              try {
                if (catEditingId) {
                  await updateCategory(draft);
                } else {
                  await addCategory(draft);
                }
                clearCategoriesForm();
                setIsCategoriesFormOpen(false);
              } catch (error) {
                alert(getErrorMsg(error));
              }
            }}
          >
            {catUnderEditing ? "حفظ التعديل" : "إضافة التصنيف"}
          </button>
          <button
            type="button"
            onClick={close}
            className="border-line-strong text-fg-body hover:bg-page rounded-control h-12 border px-6 font-semibold transition-colors"
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
};
export default AddModal;
