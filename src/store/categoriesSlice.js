import {
  addCategory as addCategoryToDb,
  updateCategory as updateCategoryInDb,
  deleteCategory,
} from "../services/categoriesServices";

export const createCategoriesSlice = (set) => ({
  categories: [],
  setCategories: (value) =>
    set(() => ({
      categories: value,
    })),
  catEditingId: "",

  addCategory: async (draft) => {
    await addCategoryToDb(draft);
  },

  updateCategory: async (draft) => {
    await updateCategoryInDb(draft);
  },

  delCategory: async (catId) => {
    await deleteCategory(catId);
  },
});
