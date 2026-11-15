import { useStore } from "../../../store/useStore";
import { getMonthlyTransactionsData } from "../../../utils/stats";
import Chart from "../../../components/ui/Chart";

const Summary = () => {
  const transactionsLog = useStore((s) => s.transactionsLog);
  const selectedMonthKey = useStore((s) => s.selectedMonthKey);
  const chartData = getMonthlyTransactionsData(
    transactionsLog,
    selectedMonthKey,
    3,
  );

  return (
    <div className="bg-card border-line rounded-card flex h-72 flex-none flex-col gap-3 border p-4 lg:h-auto lg:flex-1">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-fg text-h2">ملخص شهري</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="bg-money-in size-2.5 rounded-full" />
            <span className="text-fg-body text-caption">الدخل</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-money-out size-2.5 rounded-full" />
            <span className="text-fg-body text-caption">المصروفات</span>
          </div>
        </div>
      </div>

      <Chart chartData={chartData} />
    </div>
  );
};
export default Summary;
