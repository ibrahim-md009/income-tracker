import { User, Moon, Bell, Globe, Cloud, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const settings = [
  {
    title: "الملف الشخصي",
    desc: "تعديل بياناتك الشخصية وصورتك",
    icon: User,
    path: "/settings/profile",
  },
  {
    title: "المظهر",
    desc: "تغيير الثيم والألوان",
    icon: Moon,
    path: "/settings/view",
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

const HomeSettings = () => {
  return (
    <main className="relative mr-[15%] h-screen w-[85%] px-3 py-3">
      <div className="flex h-screen flex-col justify-center gap-8">
        <div className="header">
          <div>
            <h2>الإعدادات</h2>
            <small>قم بتخصيص تجربتك في التطبيق</small>
          </div>
        </div>

        <div className="flex h-full flex-wrap justify-center gap-3">
          {settings.map((s, index) => {
            return (
              <Link
                to={s.path}
                key={index}
                className="flex h-30 w-[45%] items-center justify-between gap-8 rounded-lg bg-cyan-50 p-5"
              >
                <div className="flex gap-3">
                  <span className="flex items-center justify-center rounded-lg bg-gray-200 p-2">
                    <s.icon />
                  </span>
                  <div className="flex flex-col">
                    <h3>{s.title}</h3>
                    <small>{s.desc}</small>
                  </div>
                </div>
                <span>{">"}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
};
export default HomeSettings;
