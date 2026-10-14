import {
  Home,
  LibrarySquareIcon,
  Tag,
  ChartColumn,
  Settings,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useStore } from "../../store/useStore";

const sideBar = [
  { title: "الرئيسية", icon: Home, path: "/" },
  { title: "المعاملات", icon: LibrarySquareIcon, path: "/transactions" },
  { title: "الفئات", icon: Tag, path: "/categories" },
  { title: "التقارير", icon: ChartColumn, path: "/reports" },
  { title: "الإعدادات", icon: Settings, path: "/settings" },
];

const SideBar = () => {
  const profile = useStore((s) => s.settings.profile);
  const name = profile.name;
  const email = profile.email;
  const image = profile.image;

  return (
    <aside className="fixed w-[15%] bg-amber-400">
      <div className="flex h-screen w-full flex-col justify-between bg-amber-950 p-4 text-white">
        <div>
          <h2 className="mb-5 font-bold">مُتابعي المالي</h2>

          <ul className="flex flex-col gap-2">
            {sideBar.map((element) => {
              return (
                <NavLink
                  key={element.title}
                  to={element.path}
                  className={({ isActive }) =>
                    `flex gap-1.5 rounded-lg bg-none p-1 ${isActive ? "border border-white bg-green-500" : ""}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <element.icon
                        className={`${isActive ? "fill-current" : ""}`}
                      />
                      {element.title}
                    </>
                  )}
                </NavLink>
              );
            })}
          </ul>
        </div>

        <div className="flex flex-col items-center justify-center gap-2">
          <img
            src={image}
            alt="user image"
            className="aspect-square w-8 rounded-full object-cover"
          />
          <span>{name}</span>
          <span>{email}</span>
        </div>
      </div>
    </aside>
  );
};
export default SideBar;
