import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

const transactionsCollection = collection(db, "transactionsLog");

export const addTransaction = async (draft) => {
  const add = await addDoc(transactionsCollection, { ...draft });
  return { ...draft, id: add.id };
};

export const getTransactionsLog = async () => {
  const transactionsSnapshot = await getDocs(transactionsCollection);

  return transactionsSnapshot.docs.map((transaction) => ({
    ...transaction.data(),
    id: transaction.id,
  }));
};
