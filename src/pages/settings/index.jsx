import { Routes, Route } from "react-router-dom";
import { User, Moon, Bell, Globe, Cloud, ShieldCheck } from "lucide-react";
import { NavLink } from "react-router-dom";
import Profile from "./Profile";
import Appearance from "./Appearance";
import LangCurrency from "./LangCurrency";
import BackUp from "./BackUp";
import Security from "./Security";
import Notifications from "./Notifications";

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
    <main className="relative mr-[20%] h-screen w-[80%] px-3 py-3">
      <div className="mt-10 flex h-screen flex-col justify-center gap-5">
        <h2 className="text-fg text-h1">الإعدادات</h2>

        <div className="flex h-screen justify-center gap-5">
          <div className="flex h-full w-100 flex-col gap-3">
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
                    <span className="flex items-center justify-center rounded-lg bg-gray-200 p-2">
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
        </div>
      </div>
    </main>
  );
};
export default Settings;
