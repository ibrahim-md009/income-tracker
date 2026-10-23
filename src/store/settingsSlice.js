export const createSettingsSlice = (set) => ({
  settings: {
    profile: {
      name: "user",
      email: "hfhdk@gmail.com",
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
  },

  updateSettings: (section, changes) =>
    set((state) => ({
      settings: {
        ...state.settings,
        [section]: { ...state.settings[section], ...changes },
      },
    })),
});
