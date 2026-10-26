import { useStore } from "../store/useStore";
import { initialSettings } from "../store/settingsSlice";

export const exportData = () => {
  const today = new Date().toISOString().slice(0, 10);

  const { transactionsLog, categories, settings, notifications } =
    useStore.getState();
  const data = JSON.stringify({
    transactionsLog,
    categories,
    settings,
    notifications,
  });

  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `backup-${today}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

export const deleteData = () => {
  useStore.setState({
    transactionsLog: [],
    settings: initialSettings,
    categories: [],
    notifications: [],
  });
};

export const importData = (file) => {
  useStore.setState({
    transactionsLog: file.transactionsLog,
    settings: file.settings,
    categories: file.categories,
    notifications: file.notifications,
  });
};
