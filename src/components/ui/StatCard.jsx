import { ArrowUp, ArrowDown } from "lucide-react";
import { getMonthKey, getMonthName } from "../../utils/dates";
import { useStore } from "../../store/useStore";

import { useFormatMoney } from "../../utils/money";

const StatCard = ({
  title,
  value,
  mom,
  icon: Icon,
  higherIsBetter = true,
  main = false,
}) => {
  const selectedMonthKey = useStore((s) => s.selectedMonthKey);
  const fmt = useFormatMoney();
  const hasMom = typeof mom === "number" && mom !== 0;
  const isGood = higherIsBetter ? mom > 0 : mom < 0;
  const MomIcon = mom > 0 ? ArrowUp : ArrowDown;
  const isMain = main;

  return (
    <div
      className={`rounded-card relative flex w-full flex-col justify-between gap-3 overflow-hidden border p-5 ${
        isMain
          ? "bg-inverse text-on-inverse border-inverse-line"
          : "bg-card border-line"
      }`}
    >
      {isMain && (
        <span className="bg-saffron/10 absolute -inset-e-10 -top-10 h-32 w-32 rounded-full" />
      )}

      <div className="relative flex items-center justify-between gap-3">
        <h3
          className={`text-body-s font-medium ${
            isMain ? "text-on-inverse/75" : "text-fg-muted"
          }`}
        >
          {title}
        </h3>
        {Icon && (
          <span
            className={`rounded-control grid h-9 w-9 place-items-center ${
              isGood || !hasMom
                ? "bg-money-in-soft text-money-in"
                : "bg-money-out-soft text-money-out"
            }`}
          >
            <Icon size={18} />
          </span>
        )}
      </div>

      <div
        dir="ltr"
        className={`relative text-end font-semibold tabular-nums ${
          isMain ? "text-display-m" : "text-h1 text-fg"
        }`}
      >
        {fmt(value)}
      </div>

      {hasMom && (
        <div className="relative flex items-center justify-between gap-2">
          <span className="text-fg-muted text-caption">
            {`مقارنة بـ${getMonthName(getMonthKey(selectedMonthKey, 1))}`}
          </span>
          <span
            className={`rounded-chip text-caption flex items-center gap-0.5 px-2 py-0.5 font-semibold ${
              isGood
                ? "bg-money-in-soft text-money-in"
                : "bg-money-out-soft text-money-out"
            }`}
          >
            {Math.abs(mom)}%
            <MomIcon size={12} />
          </span>
        </div>
      )}
    </div>
  );
};
export default StatCard;
