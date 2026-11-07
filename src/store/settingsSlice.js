export const initialSettings = {
  profile: {
    name: "user",
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

  setSettings: (section, field, value) =>
    set((state) => ({
      settings: {
        ...state.settings,
        [section]: { ...state.settings[section], [field]: value },
      },
    })),

  updateSettings: (section, changes) =>
    set((state) => ({
      settings: {
        ...state.settings,
        [section]: { ...state.settings[section], ...changes },
      },
    })),
});
