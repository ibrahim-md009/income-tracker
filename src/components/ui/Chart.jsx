import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const tick = { fill: "var(--color-fg-muted)", fontSize: 12 };

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
              stroke="var(--color-line)"
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
              cursor={{ fill: "var(--color-page)" }}
              contentStyle={{
                borderRadius: 10,
                border: "1px solid var(--color-line)",
                background: "var(--color-card)",
                color: "var(--color-fg)",
                fontSize: 13,
              }}
            />
            <Bar
              dataKey="income"
              name="الدخل"
              fill="var(--color-money-in)"
              radius={[6, 6, 0, 0]}
            />
            <Bar
              dataKey="expense"
              name="المصروف"
              fill="var(--color-money-out)"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default Chart;
