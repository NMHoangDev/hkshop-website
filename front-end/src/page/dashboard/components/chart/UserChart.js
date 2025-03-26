import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

// Functional Component
const UserChart = ({ dataNew }) => {
  console.log(dataNew);
  const data = [
    { name: "Đã mua hàng tại HK Shop", value: Math.ceil(dataNew.have) },
    { name: "Chưa mua hàng tại HK Shop", value: Math.ceil(dataNew.noHave) },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const RADIAN = Math.PI / 180;

  // Hàm render label tùy chỉnh
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  console.log(dataNew);
  return (
    <div style={{ width: "300px", height: "300px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={300} height={300}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend
            layout="horizontal" // Chú thích theo chiều ngang
            verticalAlign="bottom" // Đặt chú thích ở dưới
            align="left"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserChart;
