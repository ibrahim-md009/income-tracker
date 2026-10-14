import { Routes, Route } from "react-router-dom";
import HomeSettings from "./HomeSettings";
import Profile from "./Profile";
import View from "./View";
import LangCurrency from "./LangCurrency";
import BackUp from "./BackUp";
import Security from "./Security";
import Notifications from "./Notifications";

const Settings = () => {
  return (
    <Routes>
      <Route index element={<HomeSettings />} />
      <Route path="profile" element={<Profile />} />
      <Route path="view" element={<View />} />
      <Route path="language-currency" element={<LangCurrency />} />
      <Route path="backup" element={<BackUp />} />
      |<Route path="security" element={<Security />} />
      <Route path="notifications" element={<Notifications />} />
    </Routes>
  );
};
export default Settings;
