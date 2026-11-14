import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import SideBar from "./components/layout/SideBar";
import Signup from "./pages/Signin";
import Home from "./pages/home";
import Transactions from "./pages/transactions";
import Categories from "./pages/categories";
import Reports from "./pages/reports";
import Settings from "./pages/settings";
import { useStore } from "./store/useStore";
import { auth } from "./firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useAuth } from "./store/useAuth";
import {
  subToLatestTransactions,
  subToTransactionsLog,
} from "./services/transactionsServices";
import { subToCategories } from "./services/categoriesServices";

const App = () => {
  const accentColor = useStore((s) => s.settings.appearance.accentColor);
  const fontSize = useStore((s) => s.settings.appearance.fontSize);
  const user = useAuth((a) => a.user);
  const isAuthReady = useAuth((a) => a.isAuthReady);
  const setUser = useAuth((a) => a.setUser);
  const setTransactionsLog = useStore((s) => s.setTransactionsLog);
  const setLatestTransactions = useStore((s) => s.setLatestTransactions);
  const setCategories = useStore((s) => s.setCategories);

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return unSub;
  }, [setUser]);

  const uid = user?.uid;
  useEffect(() => {
    if (!uid) return;

    const unsub = subToLatestTransactions(5, setLatestTransactions);
    return unsub;
  }, [uid, setLatestTransactions]);

  useEffect(() => {
    if (!uid) return;

    const unsub = subToCategories(setCategories);
    return unsub;
  }, [uid, setCategories]);

  useEffect(() => {
    if (!uid) return;
    const unsub = subToTransactionsLog(setTransactionsLog);
    return unsub;
  }, [uid, setTransactionsLog]);

  useEffect(() => {
    document.documentElement.style.setProperty("--accentColor", accentColor);
  }, [accentColor]);

  useEffect(() => {
    document.documentElement.style.fontSize = Number(fontSize) + "px";
  }, [fontSize]);

  return (
    <div className="flex">
      {user && (
        <>
          <SideBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="categories" element={<Categories />} />
            <Route path="settings/*" element={<Settings />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="reports" element={<Reports />} />
          </Routes>
        </>
      )}
      {isAuthReady && !user && <Signup />}
    </div>
  );
};
export default App;
