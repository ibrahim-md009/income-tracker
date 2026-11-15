import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

const getTransactionsCollection = (uid) =>
  collection(db, "users", uid, "transactionsLog");

export const subToTransactionsLog = (uid, onData, onError) => {
  const q = query(getTransactionsCollection(uid), orderBy("date", "desc"));
  const unsub = onSnapshot(
    q,
    (snapshot) => {
      const data = snapshot.docs.map((transaction) => ({
        ...transaction.data(),
        id: transaction.id,
      }));
      onData(data);
    },
    onError,
  );
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
