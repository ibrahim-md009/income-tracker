import {
  doc,
  collection,
  onSnapshot,
  updateDoc,
  writeBatch,
  runTransaction,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

const getNotificationsCollection = (uid) =>
  collection(db, "users", uid, "notifications");

export const subToNotifications = (uid, onData, onError) => {
  const unsub = onSnapshot(
    getNotificationsCollection(uid),
    (snapshot) => {
      const data = snapshot.docs.map((n) => ({
        ...n.data(),
        id: n.id,
      }));
      onData(data);
    },
    onError,
  );
  return unsub;
};

export const addNotification = async (uid, o) => {
  const ref = doc(getNotificationsCollection(uid), o.key);
  await runTransaction(db, async (tx) => {
    const snap = await tx.get(ref);
    if (!snap.exists()) tx.set(ref, o);
  });
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
