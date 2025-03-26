import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const OrderLineChartRevenue = ({ dataLineChart }) => {
  const data = dataLineChart.map((lineChart, index) => {
    if (index == 0) {
      return {
        name: "Chủ nhật",
        revenue: lineChart.revenue,
      };
    }
    if (index === 1 && lineChart.day !== "") {
      return {
        name: "Thứ hai",
        revenue: lineChart.revenue,
      };
    } else if (index === 1 && lineChart.day === "") {
      return {
        name: "Thứ hai",
      };
    }
    if (index === 2 && lineChart.day !== "") {
      return {
        name: "Thứ ba",
        revenue: lineChart.revenue,
      };
    } else if (index === 2 && lineChart.day === "") {
      return {
        name: "Thứ ba",
      };
    }
    if (index === 3 && lineChart.day !== "") {
      return {
        name: "Thứ tư",
        revenue: lineChart.revenue,
      };
    } else if (index === 3 && lineChart.day === "") {
      return {
        name: "Thứ tư",
      };
    }
    if (index === 4 && lineChart.day !== "") {
      return {
        name: "Thứ năm",
        revenue: lineChart.revenue,
      };
    } else if (index === 4 && lineChart.day === "") {
      return {
        name: "Thứ năm",
      };
    }
    if (index === 5 && lineChart.day !== "") {
      return {
        name: "Thứ sáu",
        revenue: lineChart.revenue,
      };
    } else if (index === 5 && lineChart.day === "") {
      return {
        name: "Thứ 6",
      };
    }
    if (index === 6 && lineChart.day !== "") {
      return {
        name: "Thứ bảy",
        revenue: lineChart.revenue,
      };
    } else if (index == 6 && lineChart.day == "") {
      return {
        name: "Thứ bảy",
      };
    }
  });
  console.log(data);

  return (
    <div style={{ width: "600px", height: "300px" }}>
      <ResponsiveContainer width={600} height={300}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis
            width={100}
            tickFormatter={(tick) => tick.toLocaleString()} // Định dạng số để thêm dấu phẩy, hoặc có thể định dạng tiền tệ
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#8884d8"
            fill="#8884d8"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OrderLineChartRevenue;
