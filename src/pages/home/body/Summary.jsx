import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useStore } from "../../../store/useStore";
import { getMonthComparsion } from "../../../utils/getMonthComparsion";

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

      <div
        className="flex min-h-0 flex-1 items-center justify-center"
        dir="ltr"
      >
        <div className="h-full w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 5, right: 5, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis width={50} />
              <Tooltip />
              <Bar
                dataKey="income"
                name="الدخل"
                fill="#10b981"
                radius={[6, 6, 0, 0]}
              />
              <Bar
                dataKey="expense"
                name="المصروف"
                fill="#ef4444"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
export default Summary;
