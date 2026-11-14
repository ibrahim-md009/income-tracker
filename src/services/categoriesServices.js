import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

const getCategoriesCollection = (uid) =>
  collection(db, "users", uid, "categories");

export const subToCategories = (uid, onData) => {
  const unsub = onSnapshot(getCategoriesCollection(uid), (snapshot) => {
    const data = snapshot.docs.map((category) => ({
      ...category.data(),
      id: category.id,
    }));
    onData(data);
  });
  return unsub;
};

export const addCategory = async (uid, draft) => {
  const add = await addDoc(getCategoriesCollection(uid), draft);

  return { ...draft, id: add.id };
};

export const updateCategory = async (uid, draft) => {
  const { id, ...data } = draft;
  await updateDoc(doc(getCategoriesCollection(uid), id), { ...data });
};

export const deleteCategory = async (uid, docid) => {
  await deleteDoc(doc(getCategoriesCollection(uid), docid));
};
