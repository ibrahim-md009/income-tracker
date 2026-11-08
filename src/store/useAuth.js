import { create } from "zustand";

export const useAuth = create((set) => ({
  user: null,
  isAuthReady: false,

  setUser: (user) =>
    set(() => ({
      user: user,
      isAuthReady: true,
    })),
}));
