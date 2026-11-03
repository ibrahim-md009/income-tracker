export const getMonthKey = (offset) => {
  const now = new Date();
  const date = new Date(now.getFullYear(), now.getMonth() - offset, 1);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
};

export const getMonthName = (month) =>
  new Date(`${month}-01`).toLocaleString("ar", {
    month: "long",
  });
