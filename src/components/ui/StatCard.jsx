import { ArrowUp, ArrowDown } from "lucide-react";
import { getMonthKey, getMonthName } from "../../utils/dates";
import { useStore } from "../../store/useStore";

const f = new Intl.NumberFormat("ar-u-nu-latn", {
  style: "currency",
  currency: "EGP",
  maximumFractionDigits: 0,
});

const StatCard = ({ title, value, mom, icon: Icon, higherIsBetter = true }) => {
  const selectedMonthKey = useStore((s) => s.selectedMonthKey);
  const hasMom = typeof mom === "number" && mom !== 0;
  const isGood = higherIsBetter ? mom > 0 : mom < 0;
  const MomIcon = mom > 0 ? ArrowUp : ArrowDown;

  return (
    <div
      className={`rounded-card flex w-full flex-col border border-amber-900 p-2 ${title === "المتبقي من دخل الشهر" ? "bg-inverse" : "bg-paper-50"}`}
    >
      <div className="flex justify-between">
        <h3
          className={`${title === "المتبقي من دخل الشهر" ? "text-on-inverse text-body-s" : "text-fg"}`}
        >
          {title}
        </h3>
        {Icon && (
          <i className="bg-money-in-soft rounded-control p-1">
            <Icon className="text-money-in" />
          </i>
        )}
      </div>

      <h1
        className={`${title === "المتبقي من دخل الشهر" ? "text-on-inverse text-display-l" : "text-fg text-h1"}`}
      >
        {f.format(value)}
      </h1>
      {hasMom && (
        <div className="flex items-center justify-between">
          <small className="text-money-in">{`مقارنة بـ${getMonthName(getMonthKey(selectedMonthKey, 1))}`}</small>
          <div className={`flex ${isGood ? "text-green-500" : "text-red-500"}`}>
            <b>{Math.abs(mom)}%</b>
            <MomIcon width={14} />
          </div>
        </div>
      )}
    </div>
  );
};
export default StatCard;
