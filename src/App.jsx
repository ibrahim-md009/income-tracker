import { useEffect, useState } from "react";
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

const App = () => {
  const accentColor = useStore((s) => s.settings.appearance.accentColor);
  const fontSize = useStore((s) => s.settings.appearance.fontSize);
  const user = useAuth((a) => a.user);
  const setUser = useAuth((a) => a.setUser);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });
    return unSub;
  }, [setUser]);

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
            <Route path="signup" element={<Signup />} />
          </Routes>
        </>
      )}
      {!isLoading && !user && <Signup />}
    </div>
  );
};
export default App;
