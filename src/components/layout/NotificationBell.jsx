import { DollarSign, Bell } from "lucide-react";
import { useStore } from "../../store/useStore";
import { useState, useEffect, useRef } from "react";

const NotificationBell = () => {
  const notifications = useStore((s) => s.notifications);
  const setNotification = useStore((s) => s.setNotification);
  const readAll = useStore((s) => s.readAll);
  const deleteAll = useStore((s) => s.deleteAll);

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
    <div
      ref={wrapperRef}
      className="bg-card rounded-card border-line-strong relative flex items-center justify-center border p-2.5"
    >
      <button className="relative" onClick={() => toggleBell()}>
        <Bell width={20} color="#171A2B" />
        {unReadCount > 0 ? (
          <span className="bg-action absolute -top-2 left-3 flex size-3.5 items-center justify-center rounded-full text-[10px] text-white">
            {unReadCount}
          </span>
        ) : null}
      </button>
      {isOpen && (
        <div className="bg-raised border-line-strong absolute top-full left-0 z-100 flex w-80 flex-col gap-5 rounded-lg border p-3">
          <div className="flex justify-between">
            <h3 className="text-h3 text-fg">الإشعارات</h3>
            <div className="flex flex-col gap-1">
              <button
                className="text-action text-body-s"
                onClick={() => readAll()}
              >
                تعيين الكل كمقروء
              </button>
              <button
                className="text-cat-clay text-body-s"
                onClick={() => deleteAll()}
              >
                حذف الكل
              </button>
            </div>
          </div>

          <div className="flex max-h-72 flex-col gap-3 overflow-y-auto">
            {notifications.map((notification) => {
              let since = (dateNow - notification.date) / 1000;

              let timeSuffex;
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
                  className={`border-line flex items-center justify-between border-y p-1 ${notification.isRead && "bg-card"}`}
                >
                  <div className="flex gap-1">
                    <DollarSign />
                    <div className="flex flex-col">
                      <span className="text-fg text-body-s">
                        {notification.title}
                      </span>
                      <small className="text-fg-muted text-caption">{`منذ ${Math.floor(since)} ${timeSuffex}`}</small>
                    </div>
                  </div>
                  {!notification.isRead && (
                    <span className="bg-action size-2 rounded-full"></span>
                  )}
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
