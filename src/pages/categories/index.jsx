import { useState } from "react";
import Button from "../../components/ui/Button";
import { Edit } from "lucide-react";
import { Trash } from "lucide-react";
import { useStore } from "../../store/useStore";
import AddModal from "./AddModal";
import Header from "../../components/layout/Header";
import { filterCategoriesByKind, countByCategory } from "../../utils/stats";
import { getErrorMsg } from "../../utils/errors";
import EmptyCategories from "../../components/ui/EmptyCategories";

const Categories = () => {
  const transactionsLog = useStore((s) => s.transactionsLog);
  const categories = useStore((s) => s.categories);
  const delCategory = useStore((s) => s.delCategory);
  const setState = useStore((s) => s.setState);
  const setIsCategoriesFormOpen = useStore((s) => s.setIsCategoriesFormOpen);
  const isCategoriesFormOpen = useStore((s) => s.isCategoriesFormOpen);

  const [activeTab, setActiveTab] = useState("expenses");

  const expensesCategories = filterCategoriesByKind(categories, "مصروف");
  const incomeCategories = filterCategoriesByKind(categories, "دخل");

  const currentCats =
    activeTab === "expenses" ? expensesCategories : incomeCategories;

  const editCategory = (cat) => {
    setState("catEditingId", cat.id);
  };

  return (
    <main className="relative min-h-screen w-full px-3 py-3 pb-36 lg:mr-[20%] lg:h-screen lg:w-[80%] lg:pb-3">
      {categories.length === 0 ? (
        <EmptyCategories onAction={() => setIsCategoriesFormOpen(true)} />
      ) : (
        <div className="flex flex-col gap-6 lg:h-screen lg:gap-10">
          <Header title="التصنيفات" subTitle="تنظيم تصنيفات دخلك ومصروفاتك">
            <Button
              onClick={() => setIsCategoriesFormOpen(true)}
              className="w-30"
              text="+ إضافة تصنيف"
            />
          </Header>

          <div className="flex gap-3">
            <Button
              text={`مصروفات (${expensesCategories.length})`}
              onClick={() => setActiveTab("expenses")}
              className={`text-body-s rounded-control transition-all duration-200 ${
                activeTab === "expenses"
                  ? "bg-card text-fg! shadow-1"
                  : "text-fg-muted! bg-transparent opacity-70"
              }`}
            />

            <Button
              text={`دخل (${incomeCategories.length})`}
              onClick={() => setActiveTab("income")}
              className={`text-body-s rounded-control transition-all duration-200 ${
                activeTab === "income"
                  ? "bg-card text-fg! shadow-1"
                  : "text-fg-muted! bg-transparent opacity-70"
              }`}
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
            {currentCats.map((cat) => {
              return (
                <div
                  key={cat.title}
                  className="rounded-card bg-card border-line flex flex-col justify-between gap-4 border p-4"
                >
                  <div className="flex justify-between">
                    <div className="flex gap-2">
                      <span
                        className="size-7 shrink-0 rounded-full"
                        style={{ backgroundColor: cat.color }}
                      ></span>
                      <div className="flex flex-col">
                        <h3 className="text-fg text-h3">{cat.title}</h3>
                        <span className="text-fg-muted text-body-s">
                          {`${countByCategory(
                            transactionsLog,
                            cat.title,
                            cat.type,
                          )} معاملة`}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 border-t border-gray-400/30 pt-2">
                    <Edit
                      className="w-4.5 cursor-pointer transition-opacity hover:opacity-70"
                      onClick={() => {
                        editCategory(cat);
                        setIsCategoriesFormOpen(true);
                      }}
                    />
                    <Trash
                      className="w-4.5 cursor-pointer text-red-600 transition-opacity hover:opacity-70"
                      onClick={async () => {
                        try {
                          await delCategory(cat.id);
                        } catch (error) {
                          alert(getErrorMsg(error));
                        }
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {isCategoriesFormOpen && <AddModal />}
    </main>
  );
};
export default Categories;
