import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

const categoriesCollection = collection(db, "categories");

export const subToCategories = (onData) => {
  const unsub = onSnapshot(categoriesCollection, (snapshot) => {
    const data = snapshot.docs.map((category) => ({
      ...category.data(),
      id: category.id,
    }));
    onData(data);
  });
  return unsub;
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
