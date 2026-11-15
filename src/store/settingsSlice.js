import { saveSettings } from "../services/settingsServices";
import { useAuth } from "./useAuth";
export const initialSettings = {
  profile: {
    image: "/default-user-image.jpg",
  },
  languageAndCurrency: {
    language: "ar",
    currency: "EGP",
    startFiscalMonth: "1",
  },
  appearance: {
    theme: "light",
    accentColor: "#92400e",
    fontSize: "16",
    radius: "8",
  },
  notifications: {
    dailyReminder: true,
    budgetAlert: true,
    weeklySummary: false,
    monthlySummary: true,
    reminderTime: "21:00",
  },
};

export const createSettingsSlice = (set) => ({
  settings: initialSettings,

  replaceSettings: (value) => set(() => ({ settings: value })),

  updateSettings: async (section, changes) => {
    const uid = useAuth.getState().user?.uid;
    if (!uid) return;
    await saveSettings(uid, { [section]: changes });
  },
});
