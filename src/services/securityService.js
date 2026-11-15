import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { auth } from "../firebase/firebase";

export const changePassword = async (currentPw, newPw) => {
  const user = auth.currentUser;
  if (!user) throw new Error("no-user");

  const credential = EmailAuthProvider.credential(user.email, currentPw);

  await reauthenticateWithCredential(user, credential);

  await updatePassword(user, newPw);
};
