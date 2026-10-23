export const createCategoriesSlice = (set) => ({
  // categories form values
  categories: [],
  catTitle: "",
  catType: "مصروف",
  catUnderEditing: false,
  catEditingId: "",

  // categories actions
  toggleCatType: (catKind) =>
    set(() => ({
      catType: catKind,
    })),
  addCategory: (type) =>
    set((state) => ({
      categories: [
        ...state.categories,
        { type: type, title: state.catTitle, value: state.catTitle },
      ],
    })),
  clearCategoriesForm: () =>
    set(() => ({
      catTitle: "",
      catType: "مصروف",
      catUnderEditing: false,
    })),
  delCategory: (catTitle) =>
    set((state) => ({
      categories: state.categories.filter(
        (expCat) => expCat.title !== catTitle,
      ),
    })),
  editCategory: (cat) =>
    set(() => ({
      catTitle: cat.title,
      catType: cat.type,
      catEditingId: cat.title,
      catUnderEditing: true,
    })),
  updateCategory: () =>
    set((state) => ({
      categories: state.categories.map((cat) => {
        return cat.title === state.catEditingId
          ? { ...cat, title: state.catTitle, type: state.catType }
          : cat;
      }),
      catUnderEditing: false,
    })),
});
