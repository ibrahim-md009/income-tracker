import { addCategory as addCategoryToDb } from "../services/categoriesServices";

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
      categories: [...state.categories, newCategory],
    }));
  },
  // addCategory: (draft) =>
  //   set((state) => ({
  //     categories: [...state.categories, { ...draft, id: crypto.randomUUID() }],
  //   })),

  updateCategory: (draft) =>
    set((state) => ({
      categories: state.categories.map((cat) => {
        return cat.id === state.catEditingId ? { ...cat, ...draft } : cat;
      }),
    })),

  delCategory: (catId) =>
    set((state) => ({
      categories: state.categories.filter((cat) => cat.id !== catId),
    })),
});
