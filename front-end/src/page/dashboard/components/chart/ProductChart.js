import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

const ProductBrandChart = ({ dataSet }) => {
  console.log(dataSet);
  const data = [
    {
      subject: "Apple",
      quantity: dataSet.apple,
      totalQuantity: dataSet.totalQuantity,
    },
    {
      subject: "Oppo",
      quantity: dataSet.oppo,
      totalQuantity: dataSet.totalQuantity,
    },
    {
      subject: "Samsung",
      quantity: dataSet.samsung,
      totalQuantity: dataSet.totalQuantity,
    },

    {
      subject: "Xiaomi",
      quantity: dataSet.xiaomi,
      totalQuantity: dataSet.totalQuantity,
    },
    {
      subject: "Vivo",
      quantity: dataSet.vivo,
      totalQuantity: dataSet.totalQuantity,
    },
  ];
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis />
        <Radar
          name="Mike"
          dataKey="quantity"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default ProductBrandChart;
