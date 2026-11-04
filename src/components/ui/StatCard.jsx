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
      className={`flex w-full flex-col rounded-lg border border-amber-900 p-2 ${title === "الرصيد المتبقي" ? "bg-inverse" : "bg-paper-50"}`}
    >
      <div className="flex justify-between">
        <h3 className="text-lg">{title}</h3>
        {Icon && (
          <i className="bg-accent rounded-lg p-1">
            <Icon className="text-white" />
          </i>
        )}
      </div>

      <h1
        className={`text-2xl ${title === "الرصيد المتبقي" ? "text-shadow-nila-50" : "text-ink-900"}`}
      >
        {f.format(value)}
      </h1>
      {hasMom && (
        <div className="flex items-center justify-between">
          <small className="text-green-500">{`مقارنة بـ${getMonthName(getMonthKey(selectedMonthKey, 1))}`}</small>
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
