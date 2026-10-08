import { Routes, Route } from "react-router-dom";
import HomeSettings from "./HomeSettings";
import Profile from "./Profile";
import View from "./View";

const Settings = () => {
  return (
    <Routes>
      <Route index element={<HomeSettings />} />
      <Route path="profile" element={<Profile />} />
      <Route path="view" element={<View />} />
    </Routes>
  );
};
export default Settings;
