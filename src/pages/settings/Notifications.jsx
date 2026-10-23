import { ToggleLeft } from "lucide-react";
import Input from "../../components/ui/Input";
import { useSettingsForm } from "../../hooks/useSettingsForm";
import SettingsLayout from "../../components/layout/SettingsLayout";

const Notifications = () => {
  const { draft, setField } = useSettingsForm("notifications");

  const notificationOptions = [
    {
      id: "dailyReminder",
      title: "تذكير يومي",
      subtitle: "تذكير بتسجيل معاملات اليوم",
    },
    {
      id: "budgetAlert",
      title: "تجاوز الميزانية",
      subtitle: "تنبيه عند اقتراب المصروفات من الحد",
    },
    {
      id: "weeklySummary",
      title: "ملخص أسبوعي",
      subtitle: "ملخص الدخل والمصروفات كل أسبوع",
    },
    {
      id: "monthlySummary",
      title: "ملخص شهري",
      subtitle: "تقرير نهاية كل شهر",
    },
  ];

  return (
    <SettingsLayout
      title="الإشعارات"
      subTitle="إدارة تنبيهاتك وتفضيلاتك"
      section="notifications"
      draft={draft}
    >
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
              <hr className="text-accent" />
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-1">
        <label>وقت التذكير اليومي</label>
        <Input
          type="time"
          value={draft.reminderTime || "21:00"}
          onChange={(e) => setField("reminderTime", e.target.value)}
        />
      </div>
    </SettingsLayout>
  );
};

export default Notifications;
