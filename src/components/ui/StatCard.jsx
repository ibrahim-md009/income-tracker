import { ArrowUp, ArrowDown } from "lucide-react";
const f = new Intl.NumberFormat("ar-u-nu-latn", {
  style: "currency",
  currency: "EGP",
  maximumFractionDigits: 0,
});
const StatCard = ({ title, value, mom, icon: Icon, higherIsBetter = true }) => {
  const hasMom = typeof mom === "number" && mom !== 0;
  const isGood = higherIsBetter ? mom > 0 : mom < 0;
  const MomIcon = mom > 0 ? ArrowUp : ArrowDown;

  return (
    <div className="flex w-full flex-col rounded-lg border border-amber-900 bg-blue-100 p-2">
      <div className="flex justify-between">
        <h3 className="text-lg">{title}</h3>
        {Icon && (
          <i className="bg-accent rounded-lg p-1">
            <Icon className="text-white" />
          </i>
        )}
      </div>

      <h1 className="text-2xl font-black">{f.format(value)}</h1>
      {hasMom && (
        <div className="flex items-center justify-between">
          <small className="text-green-500">مقارنة بالشهر الماضي</small>
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
