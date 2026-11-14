import {
  doc,
  addDoc,
  collection,
  onSnapshot,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

const getNotificationsCollection = (uid) =>
  collection(db, "users", uid, "notifications");

export const subToNotifications = (uid, onData) => {
  const unsub = onSnapshot(getNotificationsCollection(uid), (snapshot) => {
    const data = snapshot.docs.map((n) => ({
      ...n.data(),
      id: n.id,
    }));
    onData(data);
  });
  return unsub;
};

export const addNotification = async (uid, o) => {
  const add = await addDoc(getNotificationsCollection(uid), o);
  return { ...o, id: add.id };
};

export const readNotification = async (uid, id) => {
  await updateDoc(doc(getNotificationsCollection(uid), id), { isRead: true });
};

export const readAll = async (uid, ids) => {
  const batch = writeBatch(db);
  ids.forEach((id) => {
    batch.update(doc(getNotificationsCollection(uid), id), { isRead: true });
  });
  await batch.commit();
};
