export const initialSettings = {
  profile: {
    name: "user",
    email: "user@example.com",
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
    dailyReminder: false,
    budgetAlert: false,
    weeklySummary: false,
    monthlySummary: false,
    reminderTime: "21:00",
  },
};
export const createSettingsSlice = (set) => ({
  settings: initialSettings,

  updateSettings: (section, changes) =>
    set((state) => ({
      settings: {
        ...state.settings,
        [section]: { ...state.settings[section], ...changes },
      },
    })),
});
