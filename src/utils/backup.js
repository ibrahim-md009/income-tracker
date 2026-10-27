import { useStore } from "../store/useStore";
import { initialSettings } from "../store/settingsSlice";

export const exportData = () => {
  const today = new Date().toISOString().slice(0, 10);
  const incomeTrackerMark = {};

  const { transactionsLog, categories, settings, notifications } =
    useStore.getState();
  const data = JSON.stringify({
    incomeTrackerMark,
    version: 1,
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
  useStore.setState({ lastBackup: Date.now() });
};

export const importData = (file) => {
  if ("incomeTrackerMark" in file) {
    useStore.setState({
      transactionsLog: file.transactionsLog ?? [],
      settings: file.settings ?? initialSettings,
      categories: file.categories ?? [],
      notifications: file.notifications ?? [],
    });
  } else {
    window.alert(
      "الملف غير صالح تأكد أنه نفس الملف الذي قمت بتصديره عند عمل نسخة احتياطية ",
    );
  }
};

export const deleteData = () => {
  window.confirm("هل أنت متأكد من حذف جميع بياناتك ؟");
  useStore.setState({
    transactionsLog: [],
    settings: initialSettings,
    categories: [],
    notifications: [],
  });
};
