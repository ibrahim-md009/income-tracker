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

const getTransactionsCollection = (uid) =>
  collection(db, "users", uid, "transactionsLog");

export const subToLatestTransactions = (uid, count, onData) => {
  const q = query(
    getTransactionsCollection(uid),
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

export const subToTransactionsLog = (uid, onData) => {
  const unsub = onSnapshot(getTransactionsCollection(uid), (snapshot) => {
    const data = snapshot.docs.map((transaction) => ({
      ...transaction.data(),
      id: transaction.id,
    }));
    onData(data);
  });

  return unsub;
};

export const addTransaction = async (uid, draft) => {
  const add = await addDoc(getTransactionsCollection(uid), { ...draft });
  return { ...draft, id: add.id };
};

export const updateTransaction = async (uid, draft) => {
  const { id, ...data } = draft;
  await updateDoc(doc(getTransactionsCollection(uid), id), { ...data });
};

export const deleteTransaction = async (uid, docid) => {
  await deleteDoc(doc(getTransactionsCollection(uid), docid));
};
