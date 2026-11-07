import { useState } from "react";
import {
  Home,
  LibrarySquareIcon,
  Tag,
  ChartColumn,
  Settings,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useStore } from "../../store/useStore";
import Button from "../ui/Button";
import Form from "../../pages/home/body/Form";

const sideBar = [
  { title: "الرئيسية", icon: Home, path: "/" },
  { title: "المعاملات", icon: LibrarySquareIcon, path: "/transactions" },
  { title: "الفئات", icon: Tag, path: "/categories" },
  { title: "التقارير", icon: ChartColumn, path: "/reports" },
  { title: "الإعدادات", icon: Settings, path: "/settings" },
];

const SideBar = () => {
  const profile = useStore((s) => s.settings.profile);
  const editingId = useStore((s) => s.editingId);
  const setState = useStore((s) => s.setState);
  const { name, email, image } = profile;

  const [isOpen, setIsOpen] = useState(false);
  const open = isOpen || editingId !== "";

  const toggleForm = () => {
    if (open) {
      setState("editingId", "");
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  return (
    <aside className="fixed w-[20%]">
      <div className="bg-card border-line flex h-screen w-full flex-col border p-4">
        <div>
          <h2 className="text-fg font-voice text-voice mb-5 font-bold">
            مُتابعي المالي
          </h2>
          <Button
            text={open ? "إلغاء" : "+معاملة جديدة"}
            variant={open ? "outlined" : undefined}
            className="w-full"
            onClick={toggleForm}
          />
        </div>

        <div className="relative mt-5 min-h-0 flex-1">
          <div className="flex h-full flex-col justify-between">
            <nav className="flex flex-col gap-2">
              {sideBar.map((element) => (
                <NavLink
                  key={element.title}
                  to={element.path}
                  end={element.path === "/"}
                  className={({ isActive }) =>
                    `rounded-control flex gap-1.5 border-s-4 p-1.5 ${
                      isActive
                        ? "bg-action-soft text-action border-action"
                        : "text-fg-body hover:bg-page border-transparent"
                    }`
                  }
                >
                  <element.icon />
                  {element.title}
                </NavLink>
              ))}
            </nav>

            <NavLink to="/settings" className="flex items-center gap-2">
              <img
                src={image}
                alt="user image"
                className="aspect-square w-9 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <span className="text-fg text-body-s">{name}</span>
                <span className="text-fg-muted text-caption">{email}</span>
              </div>
            </NavLink>
          </div>

          {open && (
            <div className="bg-card animate-slide-up absolute inset-0 z-10">
              <Form key={editingId} />
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
export default SideBar;
