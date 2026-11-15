import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

import { useFormatMoney } from "../../utils/money";

const ExpensesPie = ({ pieData }) => {
  const fmt = useFormatMoney();
  return (
    <div className="mx-auto h-60 w-60 lg:mx-0">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            innerRadius={55}
            outerRadius={80}
            stroke="var(--color-card)"
          >
            {pieData.map((item) => (
              <Cell key={item.name} fill={item.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(v) => fmt(v)}
            contentStyle={{
              backgroundColor: "var(--color-raised)",
              color: "var(--color-fg)",
            }}
            itemStyle={{ color: "var(--color-fg)" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
export default ExpensesPie;
