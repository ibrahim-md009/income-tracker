import { Routes, Route } from "react-router-dom";
import {
  User,
  Moon,
  Bell,
  Globe,
  Cloud,
  ShieldCheck,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import Profile from "./Profile";
import Appearance from "./Appearance";
import LangCurrency from "./LangCurrency";
import BackUp from "./BackUp";
import Security from "./Security";
import Notifications from "./Notifications";
import { logOut } from "../../services/authService";

const settings = [
  {
    title: "الملف الشخصي",
    desc: "تعديل بياناتك الشخصية وصورتك",
    icon: User,
    path: "/settings",
  },
  {
    title: "المظهر",
    desc: "تغيير الثيم والألوان",
    icon: Moon,
    path: "/settings/appearance",
  },
  {
    title: "الإشعارات",
    desc: "إدارة تنبيهاتك وتفضيلاتك",
    icon: Bell,
    path: "/settings/notifications",
  },
  {
    title: "العملة واللغة",
    desc: "تحديد العملة واللغة المفضلة",
    icon: Globe,
    path: "/settings/language-currency",
  },
  {
    title: "البيانات والنسخ الاحتياطي",
    desc: "تصدير بياناتك أو إنشاء نسخة احتياطية",
    icon: Cloud,
    path: "/settings/backup",
  },
  {
    title: "الأمان",
    desc: "تغيير كلمة المرور وتفعيل الحماية",
    icon: ShieldCheck,
    path: "/settings/security",
  },
];

const Settings = () => {
  return (
    <main className="relative min-h-screen w-full px-3 py-3 pb-36 lg:mr-[20%] lg:h-screen lg:w-[80%] lg:pb-3">
      <div className="flex flex-col gap-5 lg:mt-10 lg:h-screen lg:justify-center">
        <h2 className="text-fg text-h1">الإعدادات</h2>

        {/* موبايل: أقسام الإعدادات كشريط أفقي */}
        <nav className="-mx-3 flex gap-2 overflow-x-auto px-3 pb-1 lg:hidden">
          {settings.map((s) => (
            <NavLink
              key={s.path}
              to={s.path}
              end
              className={({ isActive }) =>
                `rounded-control text-body-s flex shrink-0 items-center gap-2 border px-3 py-2 font-medium transition-colors ${
                  isActive
                    ? "border-action bg-action-soft text-action"
                    : "border-line bg-card text-fg-body"
                }`
              }
            >
              <s.icon size={16} />
              {s.title}
            </NavLink>
          ))}
        </nav>

        <div className="flex flex-col gap-5 lg:h-screen lg:flex-row lg:justify-center">
          <div className="hidden h-full w-100 flex-col gap-3 lg:flex">
            {settings.map((s, index) => {
              return (
                <NavLink
                  to={s.path}
                  key={index}
                  end
                  className={({ isActive }) =>
                    `rounded-control flex h-20 w-full gap-8 border-s-4 p-5 ${
                      isActive
                        ? "bg-action-soft text-action border-action"
                        : "text-fg-body hover:bg-page border-transparent"
                    }`
                  }
                >
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center rounded-lg bg-gray-200 p-2 dark:bg-line">
                      <s.icon />
                    </span>
                    <div className="flex flex-col">
                      <h3 className="text-fg text-h3">{s.title}</h3>
                      <small className="text-fg-muted text-caption">
                        {s.desc}
                      </small>
                    </div>
                  </div>
                </NavLink>
              );
            })}
          </div>
          <Routes>
            <Route index element={<Profile />} />
            <Route path="appearance" element={<Appearance />} />
            <Route path="language-currency" element={<LangCurrency />} />
            <Route path="backup" element={<BackUp />} />
            |<Route path="security" element={<Security />} />
            <Route path="notifications" element={<Notifications />} />
          </Routes>

          {/* موبايل: تسجيل الخروج (في الديسكتوب موجود في السايدبار) */}
          <button
            type="button"
            onClick={() => logOut()}
            className="border-money-out text-money-out rounded-control flex h-11 w-full items-center justify-center gap-2 border font-semibold lg:hidden"
          >
            <LogOut size={18} />
            تسجيل الخروج
          </button>
        </div>
      </div>
    </main>
  );
};
export default Settings;
