import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

const categoriesCollection = collection(db, "categories");
export const getCategories = async () => {
  const categoriesSnapshot = await getDocs(categoriesCollection);

  return categoriesSnapshot.docs.map((cat) => ({
    ...cat.data(),
    id: cat.id,
  }));
};

export const addCategory = async (draft) => {
  const add = await addDoc(categoriesCollection, draft);

  return { ...draft, id: add.id };
};

export const updateCategory = async (draft) => {
  const { id, ...data } = draft;
  await updateDoc(doc(categoriesCollection, id), { ...data });
};

export const deleteCategory = async (id) => {
  await deleteDoc(doc(categoriesCollection, id));
};
