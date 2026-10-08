import { useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import Button from "../../components/ui/Button";
import { Edit } from "lucide-react";
import { Trash } from "lucide-react";
import { useStore } from "../../store/useStore";
import AddModal from "./AddModal";

const Categories = () => {
  const { categories, delCategory, editCategory } = useStore();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const expensesCategories = categories.filter((cat) => cat.type === "مصروف");
  const incomeCategories = categories.filter((cat) => cat.type === "دخل");

  return (
    <main className="relative mr-[15%] h-screen w-[85%] px-3 py-3">
      <div className="flex flex-col gap-10">
        <div className="header flex items-center justify-between">
          <Button
            onClick={() => setIsAddOpen(true)}
            className="w-30"
            text="+ إضافة تصنيف"
          />
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold">التصنيفات</h2>
            <p>تنظيم تصنيفات دخلك ومصروفاتك</p>
          </div>
        </div>

        <div className="flex justify-between gap-5">
          <div className="flex flex-1 flex-col gap-3">
            <div className="flex w-full items-center justify-between rounded-lg bg-gray-300 p-3">
              <div className="flex flex-col">
                <h3 className="text-xl font-bold">تصنيفات المصروفات</h3>
                <b className="text-3xl">{expensesCategories.length}</b>
                <small>تصنيف</small>
              </div>
              <div className="flex items-center justify-between rounded-full bg-gray-400 p-2">
                <ArrowDown className="text-red-600" />
              </div>
            </div>

            <div className="flex h-screen flex-col gap-3 rounded-lg bg-[#FAF9F6] p-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">تصنيفات المصروفات</h3>
                <Button
                  onClick={() => setIsAddOpen(true)}
                  text="إضافة +"
                  className="px-3"
                />
              </div>
              <div className="cat-table flex flex-col gap-2">
                {expensesCategories.map((cat) => {
                  return (
                    <div
                      key={cat.title}
                      className="cat flex justify-between rounded-lg bg-gray-300 p-2"
                    >
                      <div>
                        <span>{cat.title}</span>
                      </div>
                      <div className="flex gap-2">
                        <Edit
                          className="w-4"
                          onClick={() => {
                            (editCategory(cat), setIsAddOpen(true));
                          }}
                        />
                        <Trash
                          className="w-4"
                          onClick={() => delCategory(cat.title)}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-3">
            <div className="flex w-full items-center justify-between rounded-lg bg-gray-300 p-3">
              <div className="flex flex-col">
                <h3 className="text-xl font-bold">تصنيفات الدخل</h3>
                <b className="text-3xl">{incomeCategories.length}</b>
                <small>تصنيف</small>
              </div>
              <div className="flex items-center justify-between rounded-full bg-gray-400 p-2">
                <ArrowUp className="text-green-700" />
              </div>
            </div>

            <div className="flex h-screen flex-col gap-3 rounded-lg bg-[#FAF9F6] p-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">تصنيفات الدخل</h3>
                <Button
                  onClick={() => {
                    (useStore.setState({ catType: "دخل" }), setIsAddOpen(true));
                  }}
                  text="إضافة +"
                  className="px-3"
                />
              </div>
              <div className="cat-table flex flex-col gap-2">
                {incomeCategories.map((cat) => {
                  return (
                    <div
                      key={cat.title}
                      className="cat flex justify-between rounded-lg bg-gray-300 p-2"
                    >
                      <div>
                        <span>{cat.title}</span>
                      </div>
                      <div className="flex gap-2">
                        <Edit
                          className="w-4"
                          onClick={() => {
                            (editCategory(cat), setIsAddOpen(true));
                          }}
                        />
                        <Trash
                          className="w-4"
                          onClick={() => delCategory(cat.title)}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        {isAddOpen ? <AddModal setIsOpen={setIsAddOpen} /> : null}
      </div>
    </main>
  );
};
export default Categories;
