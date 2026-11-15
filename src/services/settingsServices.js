import { db } from "../firebase/firebase";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { initialSettings } from "../store/settingsSlice";

export const subToSettings = (uid, onData, onError) => {
  const unsub = onSnapshot(
    doc(db, "users", uid),
    (docSnap) => {
      if (docSnap.exists()) {
        onData(docSnap.data());
      } else {
        setDoc(doc(db, "users", uid), initialSettings);
      }
    },
    onError,
  );
  return unsub;
};

export const saveSettings = (uid, changes) => {
  return setDoc(doc(db, "users", uid), changes, { merge: true });
};
