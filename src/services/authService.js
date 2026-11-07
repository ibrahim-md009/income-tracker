import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebase";

export const registerUser = async (email, password) => {
  const credintial = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );

  const user = credintial.user;
  return user;
};

export const logIn = async (email, password) => {
  const credintial = await signInWithEmailAndPassword(auth, email, password);

  const user = credintial.user;
  return user;
};
export const logOut = () => signOut(auth);
