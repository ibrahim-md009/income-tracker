import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

const transactionsCollection = collection(db, "transactionsLog");
export const getTransactionsLog = async () => {
  const transactionsSnapshot = await getDocs(transactionsCollection);

  return transactionsSnapshot.docs.map((transaction) => ({
    ...transaction.data(),
    id: transaction.id,
  }));
};

export const addTransaction = async (draft) => {
  const add = await addDoc(transactionsCollection, { ...draft });
  return { ...draft, id: add.id };
};

export const updateTransaction = async (draft) => {
  const { id, ...data } = draft;
  await updateDoc(doc(transactionsCollection, id), { ...data });
};

export const deleteTransaction = async (id) => {
  await deleteDoc(doc(transactionsCollection, id));
};
