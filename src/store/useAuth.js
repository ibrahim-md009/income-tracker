import { create } from "zustand";
import { updateName } from "../services/authService";

export const useAuth = create((set) => ({
  user: null,
  isAuthReady: false,

  setUser: (user) =>
    set({
      user: user
        ? { uid: user.uid, email: user.email, displayName: user.displayName }
        : null,
      isAuthReady: true,
    }),

  changeName: async (name) => {
    await updateName(name);
    set((state) => ({
      user: { ...state.user, displayName: name },
    }));
  },
}));
