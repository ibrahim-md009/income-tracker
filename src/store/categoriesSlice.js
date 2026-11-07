export const createCategoriesSlice = (set) => ({
  categories: [],
  catEditingId: "",

  addCategory: (draft) =>
    set((state) => ({
      categories: [...state.categories, { ...draft, id: crypto.randomUUID() }],
    })),

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
