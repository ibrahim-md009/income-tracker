import { Calendar } from "lucide-react";
import { useStore } from "../../store/useStore";
import NotificationBell from "../../components/layout/NotificationBell";
import {
  getMonthKey,
  getMonthName,
  getCurrentMonthKey,
} from "../../utils/dates";
import FieldWithIcon from "../../components/ui/FieldWithIcon";

// const todayDate = new Date().toLocaleDateString("ar", {
//   day: "numeric",
//   month: "long",
//   year: "numeric",
// });

const Header = () => {
  const name = useStore((s) => s.settings.profile.name);

  const selectedMonthKey = useStore((s) => s.selectedMonthKey);

  return (
    <header className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div>
          {/* <p>بداية الشهر المالي يوم {startFiscalMonth}</p> */}
          <div className="flex flex-col gap-2">
            <h2 className="text-fg font-voice text-voice">{` مساء الخير  يا ${name}`}</h2>
            <p className="text-fg-muted text-sm">
              صرفت 62٪ من دخل أكتوبر · باقي 12 يوم على نهاية الشهر المالي
            </p>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <FieldWithIcon Icon={Calendar}>
            <select
              value={selectedMonthKey}
              onChange={(e) =>
                useStore.setState({ selectedMonthKey: e.target.value })
              }
              className="border-accent flex w-40 items-center rounded-lg border py-1.5 pr-12 invalid:text-gray-400"
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
          <NotificationBell />
        </div>
      </div>
    </header>
  );
};
export default Header;
