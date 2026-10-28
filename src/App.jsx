import { Routes, Route } from "react-router-dom";
import SideBar from "./components/layout/SideBar";
import Home from "./pages/home";
import Categories from "./pages/categories";
import Settings from "./pages/settings";
import { useStore } from "./store/useStore";
import { useEffect } from "react";
import Transactions from "./pages/transactions";

const App = () => {
  const accentColor = useStore((s) => s.settings.appearance.accentColor);
  const fontSize = useStore((s) => s.settings.appearance.fontSize);

  useEffect(() => {
    document.documentElement.style.setProperty("--accentColor", accentColor);
  }, [accentColor]);

  useEffect(() => {
    document.documentElement.style.fontSize = Number(fontSize) + "px";
  }, [fontSize]);

  return (
    <div className="flex">
      <SideBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/settings/*" element={<Settings />} />
        <Route path="/transactions" element={<Transactions />} />
      </Routes>
    </div>
  );
};
export default App;
