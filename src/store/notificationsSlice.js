import {
  addNotification as addNotificationToDb,
  readAll as readAllInDb,
  readNotification as readNotificationInDb,
} from "../services/notificationsService";
import { useAuth } from "./useAuth";

const pending = new Set();

export const createNotificationsSlice = (set, get) => ({
  notifications: [],
  setNotifications: (value) => set(() => ({ notifications: value })),

  addNotification: async (title, key) => {
    const uid = useAuth.getState().user?.uid;
    if (!uid) return;

    const exists = get().notifications.some((n) => n.key === key);
    if (exists || pending.has(key)) return;

    pending.add(key);
    try {
      await addNotificationToDb(uid, {
        title,
        key,
        date: Date.now(),
        isRead: false,
      });
    } finally {
      pending.delete(key);
    }
  },

  readNotification: async (id) => {
    const uid = useAuth.getState().user?.uid;
    if (!uid) return;
    await readNotificationInDb(uid, id);
  },

  readAll: async () => {
    const uid = useAuth.getState().user?.uid;
    if (!uid) return;

    const ids = get()
      .notifications.filter((n) => !n.isRead)
      .map((n) => n.id);
    if (ids.length === 0) return;

    await readAllInDb(uid, ids);
  },
});
