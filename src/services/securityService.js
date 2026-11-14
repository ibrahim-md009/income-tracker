import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";

export const changePassword = async (user, currentPassword, newPassWord) => {
  const credential = EmailAuthProvider.credential(user.email, currentPassword);

  await reauthenticateWithCredential(user, credential);

  await updatePassword(user, newPassWord);
};
