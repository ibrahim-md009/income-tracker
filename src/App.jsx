import { Routes, Route } from "react-router-dom";
import SideBar from "./components/layout/SideBar";
import Home from "./pages/home";
import Categories from "./pages/categories";
import Settings from "./pages/settings";

const App = () => {
  return (
    <div className="flex">
      <SideBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/settings/*" element={<Settings />} />
      </Routes>
    </div>
  );
};
export default App;
