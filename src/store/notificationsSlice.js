import {
  addNotification as addNotificationToDb,
  readAll as readAllInDb,
  readNotification as readNotificationInDb,
} from "../services/notificationsService";
import { useAuth } from "./useAuth";

export const createNotificationsSlice = (set, get) => ({
  notifications: [],
  setNotifications: (value) => set(() => ({ notifications: value })),

  addNotification: async (title, key) => {
    const uid = useAuth.getState().user?.uid;
    if (!uid) return;
    const exists = get().notifications.some((n) => n.key === key);
    if (exists) return;
    await addNotificationToDb(uid, {
      title: title,
      key: key,
      date: Date.now(),
      isRead: false,
    });
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
      .notifications.filter((n) => n.isRead === false)
      .map((n) => n.id);
    if (ids.length === 0) return;

    await readAllInDb(uid, ids);
  },
});
