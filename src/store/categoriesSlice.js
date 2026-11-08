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
    const newCategory = await addCategoryToDb(draft);
    set((state) => ({
      categories: [...state.categories, { ...newCategory }],
    }));
  },

  updateCategory: async (draft) => {
    await updateCategoryInDb(draft);

    set((state) => ({
      categories: state.categories.map((cat) => {
        return cat.id === draft.id ? { ...cat, ...draft } : cat;
      }),
    }));
  },

  delCategory: async (catId) => {
    await deleteCategory(catId);
    set((state) => ({
      categories: state.categories.filter((cat) => cat.id !== catId),
    }));
  },
});
