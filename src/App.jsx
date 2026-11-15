import { useEffect } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import SideBar from "./components/layout/SideBar";
import BottomBar from "./components/layout/BottomBar";
import Home from "./pages/home";
import Transactions from "./pages/transactions";
import Categories from "./pages/categories";
import Reports from "./pages/reports";
import Settings from "./pages/settings";
import { useStore } from "./store/useStore";
import { initialSettings } from "./store/settingsSlice";
import { resolveAccentId } from "./utils/theme";
import { auth } from "./firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useAuth } from "./store/useAuth";
import { subToTransactionsLog } from "./services/transactionsServices";
import { subToCategories } from "./services/categoriesServices";
import { subToSettings } from "./services/settingsServices";
import { subToNotifications } from "./services/notificationsService";
import { getErrorMsg } from "./utils/errors";
import Landing from "./pages/Landing";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import { Toaster } from "sonner";

const AppLayout = () => (
  <>
    <SideBar />
    <BottomBar />
    <Outlet />
  </>
);

const App = () => {
  const accentColor = useStore((s) => s.settings.appearance.accentColor);
  const fontSize = useStore((s) => s.settings.appearance.fontSize);
  const theme = useStore((s) => s.settings.appearance.theme);
  // false لحد ما إعدادات المستخدم توصل من Firestore (عشان ما يحصلش وميض)
  const settingsLoaded = useStore((s) => s.settings !== initialSettings);
  const user = useAuth((a) => a.user);
  const isAuthReady = useAuth((a) => a.isAuthReady);
  const setUser = useAuth((a) => a.setUser);
  const setTransactionsLog = useStore((s) => s.setTransactionsLog);
  const setCategories = useStore((s) => s.setCategories);
  const replaceSettings = useStore((s) => s.replaceSettings);
  const setNotifications = useStore((s) => s.setNotifications);

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return unSub;
  }, [setUser]);

  const uid = user?.uid;
  useEffect(() => {
    if (!uid) return;

    const unsub = subToCategories(uid, setCategories, (error) => {
      console.log(getErrorMsg(error));
    });
    return unsub;
  }, [uid, setCategories]);

  useEffect(() => {
    if (!uid) return;
    const unsub = subToTransactionsLog(uid, setTransactionsLog, (error) => {
      console.log(getErrorMsg(error));
    });
    return unsub;
  }, [uid, setTransactionsLog]);

  useEffect(() => {
    if (!uid) return;
    const unsub = subToSettings(uid, replaceSettings, (error) => {
      console.log(getErrorMsg(error));
    });
    return unsub;
  }, [uid, replaceSettings]);

  useEffect(() => {
    if (!uid) return;
    const unsub = subToNotifications(uid, setNotifications, (error) => {
      console.log(getErrorMsg(error));
    });
    return unsub;
  }, [uid, setNotifications]);

  useEffect(() => {
    if (!settingsLoaded) return;
    const id = resolveAccentId(accentColor);
    document.documentElement.dataset.accent = id;
    try {
      localStorage.setItem("it-accent", id);
    } catch {
      /* التخزين غير متاح */
    }
  }, [accentColor, settingsLoaded]);

  useEffect(() => {
    if (!settingsLoaded) return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const apply = () => {
      const mode =
        theme === "dark" || (theme === "system" && media.matches)
          ? "dark"
          : "light";
      document.documentElement.dataset.theme = mode;
      try {
        localStorage.setItem("it-theme", mode);
      } catch {
        /* التخزين غير متاح */
      }
    };

    apply();
    if (theme !== "system") return;
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, [theme, settingsLoaded]);

  useEffect(() => {
    document.documentElement.style.fontSize = Number(fontSize) + "px";
  }, [fontSize]);

  if (!isAuthReady) return null;

  return (
    <>
      <Routes>
        {user ? (
          <>
            <Route element={<AppLayout />}>
              <Route path="/home" element={<Home />} />
              <Route path="categories" element={<Categories />} />
              <Route path="settings/*" element={<Settings />} />
              <Route path="transactions" element={<Transactions />} />
              <Route path="reports" element={<Reports />} />
            </Route>
            <Route path="*" element={<Navigate to="/home" replace />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
      <Toaster
        position="top-center"
        duration={1000}
        closeButton
        richColors
        theme={theme}
        dir="rtl"
      />
    </>
  );
};
export default App;
