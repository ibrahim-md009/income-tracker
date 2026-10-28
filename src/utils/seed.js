// utils/seed.js
import { useStore } from "../store/useStore";

const categories = [
  {
    id: crypto.randomUUID(),
    type: "دخل",
    title: "راتب",
    value: "راتب",
    color: "#16a34a",
  },
  {
    id: crypto.randomUUID(),
    type: "دخل",
    title: "عمل حر",
    value: "عمل حر",
    color: "#0d9488",
  },
  {
    id: crypto.randomUUID(),
    type: "مصروف",
    title: "طعام",
    value: "طعام",
    color: "#6366f1",
  },
  {
    id: crypto.randomUUID(),
    type: "مصروف",
    title: "مواصلات",
    value: "مواصلات",
    color: "#10b981",
  },
  {
    id: crypto.randomUUID(),
    type: "مصروف",
    title: "فواتير",
    value: "فواتير",
    color: "#f59e0b",
  },
];

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const randomDate = () => {
  const d = new Date();
  d.setDate(d.getDate() - Math.floor(Math.random() * 60));
  return d.toISOString().slice(0, 10);
};

export const seedData = (count = 40) => {
  const transactionsLog = Array.from({ length: count }, () => {
    const kind = Math.random() < 0.3 ? "دخل" : "مصروف";
    const cat = pick(categories.filter((c) => c.type === kind));
    return {
      id: crypto.randomUUID(),
      name: `${cat.title} ${Math.floor(Math.random() * 100)}`,
      amount: String(Math.floor(Math.random() * 2000) + 50),
      cat: cat.value,
      date: randomDate(),
      kind,
    };
  });

  useStore.setState({ categories, transactionsLog });
};

window.seedData = seedData;
