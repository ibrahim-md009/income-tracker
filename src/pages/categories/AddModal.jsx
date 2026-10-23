import { X } from "lucide-react";
import Button from "../../components/ui/Button";
import { useStore } from "../../store/useStore";
import Input from "../../components/ui/Input";

const catTypes = [{ title: "مصروف" }, { title: "دخل" }];

const AddModal = ({ setIsOpen }) => {
  const {
    catTitle,
    setState,
    addCategory,
    catUnderEditing,
    updateCategory,
    clearCategoriesForm,
    catType,
    toggleCatType,
  } = useStore();
  return (
    <div className="absolute bottom-0 left-1/2 flex w-[70%] translate-x-[-50%] flex-col gap-3 rounded-lg bg-cyan-200 p-3">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold">إضافة تصنيف</h2>
        <X
          onClick={() => {
            (setIsOpen(false), clearCategoriesForm());
          }}
        />
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col">
          <label>اسم التصنيف</label>
          <Input
            autoFocus
            onFocus={(e) => e.target.select()}
            value={catTitle}
            onChange={(e) => setState("catTitle", e.target.value)}
            placeholder="مثال:مواصلات"
          />
        </div>

        <div>
          <label>النوع</label>
          <div className="my-3 flex items-center gap-2 p-1">
            {catTypes.map((cat) => (
              <Button
                key={cat.title}
                className={`flex w-full items-center justify-center px-5 py-2 ${cat.title === catType ? " border-white text-white" : "bg-gray-400 text-gray-700"}`}
                onClick={() => toggleCatType(cat.title)}
                text={cat.title}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <Button
          text={catUnderEditing ? "تعديل" : "إضافة"}
          className="w-full"
          onClick={() => {
            catUnderEditing ? updateCategory() : addCategory(catType);
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
