import { NavLink } from "react-router-dom";
import {
  Home,
  ArrowLeftRight,
  Tags,
  ChartColumn,
  Settings,
  Plus,
  X,
} from "lucide-react";
import { useStore } from "../../store/useStore";
import { useIsDesktop } from "../../hooks/useIsDesktop";
import Form from "../../pages/home/body/Form";

const items = [
  { title: "الرئيسية", icon: Home, path: "/home" },
  { title: "المعاملات", icon: ArrowLeftRight, path: "/transactions" },
  { title: "الفئات", icon: Tags, path: "/categories" },
  { title: "التقارير", icon: ChartColumn, path: "/reports" },
  { title: "الإعدادات", icon: Settings, path: "/settings" },
];

const BottomBar = () => {
  const isDesktop = useIsDesktop();
  const editingId = useStore((s) => s.editingId);
  const setState = useStore((s) => s.setState);
  const isTransactionFormOpen = useStore((s) => s.isTransactionFormOpen);
  const setIstransactionFormOpen = useStore((s) => s.setIstransactionFormOpen);

  if (isDesktop) return null;

  const open = isTransactionFormOpen || editingId !== "";

  const closeForm = () => {
    setState("editingId", "");
    setIstransactionFormOpen(false);
  };

  return (
    <>
      {/* شريط التنقل السفلي */}
      <nav
        aria-label="التنقل الرئيسي"
        className="bg-card/95 border-line fixed inset-x-0 bottom-0 z-40 border-t pb-[env(safe-area-inset-bottom)] backdrop-blur"
      >
        <ul className="mx-auto grid max-w-lg grid-cols-5">
          {items.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1 px-1 pt-2 pb-2.5 text-[0.6875rem] font-medium transition-colors ${
                    isActive ? "text-action" : "text-fg-muted"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`grid h-8 w-14 place-items-center rounded-full transition-colors ${
                        isActive ? "bg-action-soft" : ""
                      }`}
                    >
                      <item.icon
                        size={22}
                        strokeWidth={isActive ? 2.25 : 1.75}
                      />
                    </span>
                    {item.title}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* زر إضافة معاملة */}
      {!open && (
        <button
          type="button"
          aria-label="معاملة جديدة"
          onClick={() => setIstransactionFormOpen(true)}
          className="bg-action text-on-solid shadow-3 fixed end-4 bottom-[calc(5.25rem_+_env(safe-area-inset-bottom))] z-40 grid size-14 place-items-center rounded-full transition-transform active:scale-95"
        >
          <Plus size={26} />
        </button>
      )}

      {/* نافذة الفورم من تحت */}
      {open && (
        <div
          onClick={closeForm}
          className="bg-ink-900/50 fixed inset-0 z-50 flex items-end backdrop-blur-[2px]"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-card rounded-t-sheet shadow-3 animate-slide-up relative flex max-h-[92dvh] w-full flex-col overflow-y-auto p-5 pb-[max(2rem,env(safe-area-inset-bottom))]"
          >
            <span className="bg-line-strong mx-auto mb-4 h-1.5 w-10 flex-none rounded-full" />
            <button
              type="button"
              aria-label="إغلاق"
              onClick={closeForm}
              className="text-fg-muted hover:bg-page hover:text-fg rounded-control absolute end-4 top-4 grid h-9 w-9 place-items-center transition-colors"
            >
              <X size={18} />
            </button>
            <Form key={editingId} />
          </div>
        </div>
      )}
    </>
  );
};
export default BottomBar;
