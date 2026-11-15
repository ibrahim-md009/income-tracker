import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const tick = { fill: "#656a7d", fontSize: 12 };

const Chart = ({ chartData }) => {
  return (
    <div className="flex min-h-0 flex-1 items-center justify-center" dir="ltr">
      <div className="h-full w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 5, right: 5, left: 0, bottom: 0 }}
            barGap={4}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#eae4d6"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tick={tick}
              axisLine={false}
              tickLine={false}
            />
            <YAxis width={50} tick={tick} axisLine={false} tickLine={false} />
            <Tooltip
              cursor={{ fill: "#f5f1e8" }}
              contentStyle={{
                borderRadius: 10,
                border: "1px solid #eae4d6",
                background: "#fbf9f4",
                fontSize: 13,
              }}
            />
            <Bar
              dataKey="income"
              name="الدخل"
              fill="#1b7a55"
              radius={[6, 6, 0, 0]}
            />
            <Bar
              dataKey="expense"
              name="المصروف"
              fill="#b83a3a"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default Chart;
