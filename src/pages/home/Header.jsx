import { Calendar } from "lucide-react";
import { useStore } from "../../store/useStore";
import Input from "../../components/ui/Input";
import NotificationBell from "../../components/layout/NotificationBell";
import {
  getMonthKey,
  getMonthName,
  getCurrentMonthKey,
} from "../../utils/dates";
import FieldWithIcon from "../../components/ui/FieldWithIcon";

const todayDate = new Date().toLocaleDateString("ar", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const Header = () => {
  const name = useStore((s) => s.settings.profile.name);
  const startFiscalMonth = useStore(
    (s) => s.settings.languageAndCurrency.startFiscalMonth,
  );
  const selectedMonthKey = useStore((s) => s.selectedMonthKey);

  return (
    <header className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div>
          <p>بداية الشهر المالي يوم {startFiscalMonth}</p>
          <p className="flex items-center gap-0.5 text-[12px]">
            <Calendar className="w-4" />
            {todayDate}
          </p>
        </div>

        <div className="flex items-center gap-8">
          <NotificationBell />
          <Input type="search" placeholder="ابحث عن معاملة أو تصنيف" />
        </div>
      </div>

      <div className="flex items-center justify-between px-8 pt-3">
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
        <div className="text-center">
          <h2 className="font-bold">{`مرحبا ${name}`}</h2>
          <p className="text-sm">إليك نظرة سريعة على وضعك المالي هذا الشهر </p>
        </div>
      </div>
    </header>
  );
};
export default Header;
