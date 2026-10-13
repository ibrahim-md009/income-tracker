import { Routes, Route } from "react-router-dom";
import HomeSettings from "./HomeSettings";
import Profile from "./Profile";
import View from "./View";
import LangCurrency from "./LangCurrency";

const Settings = () => {
  return (
    <Routes>
      <Route index element={<HomeSettings />} />
      <Route path="profile" element={<Profile />} />
      <Route path="view" element={<View />} />
      <Route path="language-currency" element={<LangCurrency />} />
    </Routes>
  );
};
export default Settings;
