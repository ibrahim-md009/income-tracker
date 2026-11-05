import Input from "../../components/ui/Input";
import SettingsLayout from "../../components/layout/SettingsLayout";
import Toggle from "../../components/ui/Toggle";
import { useStore } from "../../store/useStore";

const Notifications = () => {
  const notifications = useStore((s) => s.settings.notifications);
  const setSettings = useStore((s) => s.setSettings);

  const notificationOptions = [
    {
      id: "dailyReminder",
      title: "تذكير يومي",
      subtitle: "تذكير بتسجيل معاملات اليوم",
      enable: notifications.dailyReminder,
    },
    {
      id: "budgetAlert",
      title: "تجاوز الميزانية",
      subtitle: "تنبيه عند اقتراب المصروفات من الحد",
      enable: notifications.budgetAlert,
    },
    {
      id: "weeklySummary",
      title: "ملخص أسبوعي",
      subtitle: "ملخص الدخل والمصروفات كل أسبوع",
      enable: notifications.weeklySummary,
    },
    {
      id: "monthlySummary",
      title: "ملخص شهري",
      subtitle: "تقرير نهاية كل شهر",
      enable: notifications.monthlySummary,
    },
  ];

  return (
    <SettingsLayout
      title="الإشعارات"
      subTitle="إدارة تنبيهاتك وتفضيلاتك"
      section="notifications"
    >
      <div className="flex flex-col gap-3 rounded-lg bg-cyan-50 p-3">
        {notificationOptions.map((item, index) => (
          <div key={item.id} className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <h3 className="text-fg text-h3">{item.title}</h3>
                <small className="text-fg-muted text-body-s">
                  {item.subtitle}
                </small>
              </div>
              <Toggle
                enabled={item.enable}
                onChange={(value) =>
                  setSettings("notifications", item.id, value)
                }
              />
            </div>
            {index !== notificationOptions.length - 1 && (
              <hr className="text-line" />
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-1">
        <label>وقت التذكير اليومي</label>
        <Input
          type="time"
          value={notifications.reminderTime || "21:00"}
          onChange={(e) => useStore.setState({ reminderTime: e.target.value })}
        />
      </div>
    </SettingsLayout>
  );
};

export default Notifications;
