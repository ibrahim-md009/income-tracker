import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

const categoriesCollection = collection(db, "categories");

export const addCategory = async (draft) => {
  const add = await addDoc(categoriesCollection, draft);
  return { ...draft, id: add.id };
};

export const getCategories = async () => {
  const categoriesSnapshot = await getDocs(categoriesCollection);

  return categoriesSnapshot.docs.map((cat) => ({
    ...cat.data(),
    id: cat.id,
  }));
};
