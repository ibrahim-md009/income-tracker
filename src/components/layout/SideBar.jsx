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
    <aside className="fixed w-[15%]">
      <span className="bg-paper-300 absolute left-0 h-full w-[0.005rem]"></span>
      <div className="bg-paper-50 flex h-screen w-full flex-col justify-between p-4 text-white">
        <div>
          <h2 className="mb-5 font-bold">مُتابعي المالي</h2>

          <ul className="flex flex-col gap-2">
            {sideBar.map((element) => {
              return (
                <NavLink
                  key={element.title}
                  to={element.path}
                  className={({ isActive }) =>
                    `flex gap-1.5 rounded-lg bg-none p-1 ${isActive ? "bg-nila-50 border border-white" : ""}`
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

        <NavLink
          to={"/settings/profile"}
          className="flex flex-col items-center justify-center gap-2"
        >
          <img
            src={image}
            alt="user image"
            className="aspect-square w-8 rounded-full object-cover"
          />
          <span>{name}</span>
          <span>{email}</span>
        </NavLink>
      </div>
    </aside>
  );
};
export default SideBar;
