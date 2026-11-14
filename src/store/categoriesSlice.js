import {
  addCategory as addCategoryToDb,
  updateCategory as updateCategoryInDb,
  deleteCategory,
} from "../services/categoriesServices";
import { useAuth } from "./useAuth";

export const createCategoriesSlice = (set) => ({
  categories: [],
  setCategories: (value) =>
    set(() => ({
      categories: value,
    })),
  catEditingId: "",

  addCategory: async (draft) => {
    const uid = useAuth.getState().user?.uid;
    if (!uid) return;
    await addCategoryToDb(uid, draft);
  },

  updateCategory: async (draft) => {
    const uid = useAuth.getState().user?.uid;
    if (!uid) return;
    await updateCategoryInDb(uid, draft);
  },

  delCategory: async (catId) => {
    const uid = useAuth.getState().user?.uid;
    if (!uid) return;
    await deleteCategory(uid, catId);
  },
});
