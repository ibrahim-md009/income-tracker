import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase";

export const registerUser = async (name, email, password) => {
  const credintial = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  await updateProfile(credintial.user, { displayName: name });

  const user = credintial.user;
  return user;
};

export const updateName = async (name) => {
  if (auth.currentUser === null) return;
  await updateProfile(auth.currentUser, { displayName: name });
};

export const logIn = async (email, password) => {
  const credintial = await signInWithEmailAndPassword(auth, email, password);

  const user = credintial.user;
  return user;
};
export const logOut = () => signOut(auth);
