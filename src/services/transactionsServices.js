import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  query,
  limit,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

const transactionsCollection = collection(db, "transactionsLog");

export const subToLatestTransactions = (count, onData) => {
  const q = query(
    transactionsCollection,
    orderBy("date", "desc"),
    limit(count),
  );

  const unsub = onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((transaction) => ({
      ...transaction.data(),
      id: transaction.id,
    }));

    onData(data);
  });
  return unsub;
};

export const subToTransactionsLog = (onData) => {
  const unsub = onSnapshot(transactionsCollection, (snapshot) => {
    const data = snapshot.docs.map((transaction) => ({
      ...transaction.data(),
      id: transaction.id,
    }));
    onData(data);
  });

  return unsub;
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
