export const createNotificationsSlice = (set) => ({
  notifications: [],
  addNotification: (title, key) =>
    set((state) => {
      const exsist = state.notifications.some((n) => n.key === key);
      if (exsist) return state;

      return {
        notifications: [
          ...state.notifications,
          {
            id: crypto.randomUUID(),
            title: title,
            key: key,
            date: Date.now(),
            isRead: false,
          },
        ],
      };
    }),
  setNotification: (id, field, value) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, [field]: value } : n,
      ),
    })),
});
