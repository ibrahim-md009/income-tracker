import { ToggleLeft } from "lucide-react";
import BackStep from "../../components/ui/BackStep";
import SaveBtn from "../../components/ui/SaveBtn";

const Notifications = () => {
  const notificationOptions = [
    {
      id: 1,
      title: "تذكير يومي",
      subtitle: "تذكير بتسجيل معاملات اليوم",
    },
    {
      id: 2,
      title: "تجاوز الميزانية",
      subtitle: "تنبيه عند اقتراب المصروفات من الحد",
    },
    {
      id: 3,
      title: "ملخص أسبوعي",
      subtitle: "ملخص الدخل والمصروفات كل أسبوع",
    },
    {
      id: 4,
      title: "ملخص شهري",
      subtitle: "تقرير نهاية كل شهر",
    },
  ];

  return (
    <main className="mr-[15%] min-h-screen w-[85%] p-3">
      <div className="flex h-screen flex-col gap-10">
        <div className="header flex items-center gap-2">
          <BackStep route="/settings" />
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold">الإشعارات</h2>
            <span>إدارة تنبيهاتك وتفضيلاتك</span>
          </div>
        </div>

        <div className="flex flex-1">
          <div className="flex w-full flex-col gap-4">
            <div className="flex flex-col gap-3 rounded-lg bg-cyan-50 p-3">
              {notificationOptions.map((item, index) => (
                <div key={item.id} className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <h3 className="text-xl font-bold">{item.title}</h3>
                      <small>{item.subtitle}</small>
                    </div>
                    <ToggleLeft />
                  </div>
                  {index !== notificationOptions.length - 1 && (
                    <hr className="text-amber-800" />
                  )}
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-1">
              <label>وقت التذكير اليومي</label>
              <input
                className="rounded-lg bg-cyan-50 p-2"
                type="time"
                defaultValue="21:00"
              />
            </div>

            <SaveBtn value={""} field={""} fieldValue={""} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Notifications;
