import { useStore } from "../../../store/useStore";
import { getMonthComparsion } from "../../../utils/getMonthComparsion";
import Chart from "../../../components/ui/Chart";

const Summary = () => {
  const transactionsLog = useStore((s) => s.transactionsLog);
  const { getChartData } = getMonthComparsion(transactionsLog);

  const chartData = getChartData(3);

  return (
    <div className="flex w-[40%] flex-col gap-3 rounded-lg bg-cyan-100 p-3">
      <div className="flex gap-5">
        <h3 className="font-bold">ملخص شهري</h3>
        <div className="flex flex-row items-center justify-center gap-6 rounded-lg bg-gray-50 p-2 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-[#10b981] shadow-sm" />
            <span className="text-sm font-medium text-gray-700">الدخل</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-[#ef4444] shadow-sm" />
            <span className="text-sm font-medium text-gray-700">المصروفات</span>
          </div>
        </div>
      </div>

      <Chart chartData={chartData} />
    </div>
  );
};
export default Summary;
