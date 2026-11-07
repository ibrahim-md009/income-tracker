export const createCategoriesSlice = (set) => ({
  // categories form values
  categories: [],
  // catTitle: "",
  // catType: "مصروف",
  // catColor: "#92400e",
  // catUnderEditing: false,
  catEditingId: "",

  // categories actions
  // toggleCatType: (catKind) =>
  //   set(() => ({
  //     catType: catKind,
  //   })),
  addCategory: (draft) =>
    set((state) => ({
      categories: [...state.categories, { ...draft, id: crypto.randomUUID() }],
    })),
  // addCategory: (type) =>
  //   set((state) => ({
  //     categories: [
  //       ...state.categories,
  //       { type: type, title: state.catTitle, color: state.catColor },
  //     ],
  //   })),
  // clearCategoriesForm: () =>
  //   set(() => ({
  //     catTitle: "",
  //     catType: "مصروف",
  //     catUnderEditing: false,
  //   })),
  delCategory: (catId) =>
    set((state) => ({
      categories: state.categories.filter((cat) => cat.id !== catId),
    })),
  // editCategory: (cat) =>
  //   set(() => ({
  //     catTitle: cat.title,
  //     catColor: cat.color,
  //     catType: cat.type,
  //     catEditingId: cat.title,
  //     catUnderEditing: true,
  //   })),
  updateCategory: (draft) =>
    set((state) => ({
      categories: state.categories.map((cat) => {
        return cat.id === state.catEditingId ? { ...cat, ...draft } : cat;
      }),
    })),
  // catUnderEditing: false,
  // updateCategory: () =>
  //   set((state) => ({
  //     categories: state.categories.map((cat) => {
  //       return cat.title === state.catEditingId
  //         ? {
  //             ...cat,
  //             title: state.catTitle,
  //             color: state.catColor,
  //             type: state.catType,
  //           }
  //         : cat;
  //     }),
  //     catUnderEditing: false,
  //   })),
});
