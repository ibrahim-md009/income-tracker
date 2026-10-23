import { DollarSign, Bell } from "lucide-react";
import { useStore } from "../../store/useStore";
import { useState, useEffect, useRef } from "react";

const NotificationBell = () => {
  const notifications = useStore((s) => s.notifications);
  const setNotification = useStore((s) => s.setNotification);

  const [isOpen, setIsOpen] = useState(false);
  const [dateNow, setDateNow] = useState(() => Date.now());
  const wrapperRef = useRef(null);

  const unReadCount = notifications.filter((n) => n.isRead === false).length;

  useEffect(() => {
    const handleClick = (e) => {
      if (!wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const toggleBell = () => {
    setIsOpen((prev) => !prev);
    setDateNow(Date.now());
  };

  return (
    <div ref={wrapperRef} className="relative">
      <button className="relative" onClick={() => toggleBell()}>
        <Bell />
        {unReadCount > 0 ? (
          <span className="absolute -top-3 left-4 flex size-5 items-center justify-center rounded-full bg-red-500 text-white">
            {unReadCount}
          </span>
        ) : null}
      </button>
      {isOpen && (
        <div className="bg-accent absolute top-full left-0 z-100 flex w-80 flex-col gap-5 rounded-lg p-3 text-white">
          <h3 className="text-2xl font-bold">الإشعارات</h3>

          <div className="flex max-h-72 flex-col gap-3 overflow-y-auto">
            {notifications.map((notification) => {
              let since = (dateNow - notification.date) / 1000;

              // eslint-disable-next-line no-useless-assignment
              let timeSuffex = "";
              if (since >= 86400) {
                since = Math.floor(since / 86400);
                timeSuffex = "يوم";
              } else if (since >= 3600) {
                since = Math.floor(since / 3600);
                timeSuffex = "ساعة";
              } else if (since >= 60) {
                since = Math.floor(since / 60);
                timeSuffex = "دقيقة";
              } else {
                timeSuffex = "ثانية";
              }

              return (
                <button
                  key={notification.id}
                  onClick={() =>
                    setNotification(notification.id, "isRead", true)
                  }
                  className={`${notification.isRead ? "bg-gray-300" : "bg-red-600"}`}
                >
                  <div className="flex gap-1">
                    <DollarSign />
                    <div className="flex flex-col">
                      <span>{notification.title}</span>
                      <small>{`منذ ${Math.floor(since)} ${timeSuffex}`}</small>
                    </div>
                  </div>
                  <hr />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
export default NotificationBell;
