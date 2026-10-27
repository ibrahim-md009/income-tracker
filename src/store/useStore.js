import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createNotificationsSlice } from "./notificationsSlice";
import { createSettingsSlice } from "./settingsSlice";
import { createTransactionsSlice } from "./transactionsSlice";
import { createCategoriesSlice } from "./categoriesSlice";

export const useStore = create(
  persist(
    (set) => ({
      lastBackup: null,
      ...createNotificationsSlice(set),
      ...createSettingsSlice(set),
      ...createTransactionsSlice(set),
      ...createCategoriesSlice(set),
      setState: (state, value) =>
        set(() => ({
          [state]: value,
        })),
    }),

    {
      name: "incomeTracker",
      partialize: (state) => ({
        transactionsLog: state.transactionsLog,
        categories: state.categories,
        settings: state.settings,
        notifications: state.notifications,
        lastBackup: state.lastBackup,
      }),
    },
  ),
);
