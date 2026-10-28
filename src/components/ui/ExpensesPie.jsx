import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const ExpensesPie = ({ pieData }) => {
  return (
    <div className="h-60 w-60">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            outerRadius={90}
          >
            {pieData.map((item) => (
              <Cell key={item.name} fill={item.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
export default ExpensesPie;
