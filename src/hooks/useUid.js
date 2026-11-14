import { useAuth } from "../store/useAuth";

export const useUid = () => {
  const user = useAuth((a) => a.user);
  const uid = user?.uid;

  return uid;
};
