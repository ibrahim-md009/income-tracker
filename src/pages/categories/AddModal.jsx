import Button from "../../components/ui/Button";
import { useStore } from "../../store/useStore";
import Input from "../../components/ui/Input";
import { useDraft } from "../../hooks/useDraft";

const catTypes = [{ title: "مصروف" }, { title: "دخل" }];

const initialCat = {
  type: "مصروف",
  title: "",
  color: "#92400e",
};

const AddModal = ({ setIsOpen }) => {
  const categories = useStore((s) => s.categories);
  const catEditingId = useStore((s) => s.catEditingId);
  const addCategory = useStore((s) => s.addCategory);
  const updateCategory = useStore((s) => s.updateCategory);

  const initial =
    categories.find((cat) => cat.id === catEditingId) ?? initialCat;
  const { draft, setField, reset } = useDraft(initial);

  const catUnderEditing = catEditingId !== "";

  const toggleType = (type) => {
    setField("type", type);
  };
  const clearCategoriesForm = () => {
    reset();
  };

  return (
    <div className="bg-raised absolute bottom-0 left-1/2 flex w-[70%] translate-x-[-50%] flex-col gap-3 rounded-lg p-3">
      <div className="header flex justify-between">
        <h2 className="text-h2 text-fg">إضافة تصنيف</h2>
        <button
          className="text-h1 text-fg-muted"
          onClick={() => {
            (setIsOpen(false), clearCategoriesForm());
          }}
        >
          ×
        </button>
      </div>

      <Input
        label={"اسم التصنيف"}
        autoFocus
        onFocus={(e) => e.target.select()}
        value={draft.title}
        onChange={(e) => setField("title", e.target.value)}
        placeholder="مثال:مواصلات"
      />

      <div>
        <label>النوع</label>
        <div className="my-3 flex items-center gap-2 p-1">
          {catTypes.map((cat) => (
            <Button
              key={cat.title}
              className={`flex w-full items-center justify-center px-5 py-2 ${cat.title === draft.type ? " border-white text-white" : "bg-gray-400 text-gray-700"}`}
              onClick={() => toggleType(cat.title)}
              text={cat.title}
            />
          ))}
        </div>
      </div>

      <Input
        label={"لون التصنيف"}
        type="color"
        value={draft.color}
        onChange={(e) => setField("color", e.target.value)}
        className="p-0!"
      />

      <div className="flex gap-3">
        <Button
          text={catUnderEditing ? "تعديل" : "إضافة"}
          className="w-full"
          onClick={() => {
            catUnderEditing ? updateCategory(draft) : addCategory(draft);
            clearCategoriesForm();
            setIsOpen(false);
          }}
        />
        <Button
          text="إلغاء"
          className="w-1/5 bg-gray-400 text-gray-700"
          onClick={() => {
            (setIsOpen(false), clearCategoriesForm());
          }}
        />
      </div>
    </div>
  );
};
export default AddModal;
