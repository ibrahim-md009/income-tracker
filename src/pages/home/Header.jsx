import { useAuth } from "../../store/useAuth";
import { useStore } from "../../store/useStore";
import { Calendar } from "lucide-react";
import NotificationBell from "../../components/layout/NotificationBell";
import {
  getMonthKey,
  getMonthName,
  getCurrentMonthKey,
} from "../../utils/dates";
import FieldWithIcon from "../../components/ui/FieldWithIcon";

const Header = () => {
  const name = useAuth((a) => a.user?.displayName);

  const selectedMonthKey = useStore((s) => s.selectedMonthKey);

  return (
    <header className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-col gap-1.5">
        <h2 className="text-fg font-voice text-voice">{` مساء الخير  يا ${name}`}</h2>
        <p className="text-fg-muted text-body-s">
          إليك نظرة سريعة على مصاريفك هذا الشهر
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-44">
          <FieldWithIcon Icon={Calendar}>
            <select
              value={selectedMonthKey}
              onChange={(e) =>
                useStore.setState({ selectedMonthKey: e.target.value })
              }
              className="border-line-strong bg-card text-fg rounded-control focus:border-action focus:ring-action/20 text-body-s h-11 w-full appearance-none border ps-11 pe-3.5 transition outline-none focus:ring-4"
            >
              {Array.from({ length: 12 }, (_, i) =>
                getMonthKey(getCurrentMonthKey(), i),
              ).map((monthKey) => {
                return (
                  <option key={monthKey} value={monthKey}>
                    {getMonthName(monthKey)}
                  </option>
                );
              })}
            </select>
          </FieldWithIcon>
        </div>
        <NotificationBell />
      </div>
    </header>
  );
};
export default Header;
