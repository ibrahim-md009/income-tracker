import { Bell, CheckCheck, Wallet } from "lucide-react";
import { toast } from "sonner";
import { useStore } from "../../store/useStore";
import { getErrorMsg } from "../../utils/errors";
import { useState, useEffect, useRef } from "react";

const timeAgo = (date, now) => {
  const s = Math.max(0, Math.floor((now - date) / 1000));
  if (s >= 86400) return `منذ ${Math.floor(s / 86400)} يوم`;
  if (s >= 3600) return `منذ ${Math.floor(s / 3600)} ساعة`;
  if (s >= 60) return `منذ ${Math.floor(s / 60)} دقيقة`;
  return "الآن";
};

const NotificationBell = () => {
  const notifications = useStore((s) => s.notifications);
  const readNotification = useStore((s) => s.readNotification);
  const readAll = useStore((s) => s.readAll);

  const [isOpen, setIsOpen] = useState(false);
  const [dateNow, setDateNow] = useState(() => Date.now());
  const wrapperRef = useRef(null);

  const unReadCount = notifications.filter((n) => !n.isRead).length;

  useEffect(() => {
    if (!isOpen) return;

    const handleClick = (e) => {
      if (!wrapperRef.current?.contains(e.target)) setIsOpen(false);
    };
    const handleKey = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [isOpen]);

  const toggleBell = () => {
    setIsOpen((prev) => !prev);
    setDateNow(Date.now());
  };

  const run = async (fn) => {
    try {
      await fn();
    } catch (err) {
      toast.error(getErrorMsg(err));
    }
  };

  const sorted = [...notifications]
    .sort((a, b) => b.date - a.date)
    .slice(0, 20);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={toggleBell}
        aria-label="الإشعارات"
        className="bg-card border-line-strong rounded-control hover:bg-page relative grid size-11 place-items-center border transition-colors"
      >
        <Bell size={20} className="text-fg" />
        {unReadCount > 0 && (
          <span className="bg-money-out text-caption absolute -inset-e-1.5 -top-1.5 grid min-w-5 place-items-center rounded-full px-1 text-[10px] leading-5 font-semibold text-on-solid">
            {unReadCount > 9 ? "9+" : unReadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="bg-raised border-line rounded-card shadow-2 fixed inset-x-4 top-20 z-50 flex w-auto flex-col overflow-hidden border lg:absolute lg:inset-x-auto lg:top-full lg:left-0 lg:mt-2 lg:w-80">
          <div className="border-line flex items-center justify-between border-b px-4 py-3">
            <h3 className="text-fg text-h3">الإشعارات</h3>
            {unReadCount > 0 && (
              <button
                type="button"
                onClick={() => run(readAll)}
                className="text-action text-caption flex items-center gap-1 font-semibold hover:underline"
              >
                <CheckCheck size={14} />
                تعيين الكل كمقروء
              </button>
            )}
          </div>

          <div className="flex max-h-80 flex-col overflow-y-auto">
            {sorted.length === 0 ? (
              <div className="text-fg-muted text-body-s flex flex-col items-center gap-2 px-4 py-10 text-center">
                <Bell size={24} />
                مفيش إشعارات لسه
              </div>
            ) : (
              sorted.map((notification) => (
                <button
                  type="button"
                  key={notification.id}
                  onClick={() => run(() => readNotification(notification.id))}
                  className={`border-line hover:bg-page flex items-center gap-3 border-b px-4 py-3 text-start transition-colors last:border-b-0 ${
                    notification.isRead ? "" : "bg-action-soft/50"
                  }`}
                >
                  <span className="bg-action-soft text-action rounded-control grid size-9 flex-none place-items-center">
                    <Wallet size={16} />
                  </span>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="text-fg text-body-s truncate font-medium">
                      {notification.title}
                    </span>
                    <small className="text-fg-muted text-caption">
                      {timeAgo(notification.date, dateNow)}
                    </small>
                  </div>
                  {!notification.isRead && (
                    <span className="bg-action size-2 flex-none rounded-full" />
                  )}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default NotificationBell;
