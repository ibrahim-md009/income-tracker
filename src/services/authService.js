import { createUserWithEmailAndPassword } from "firebase/auth";
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
