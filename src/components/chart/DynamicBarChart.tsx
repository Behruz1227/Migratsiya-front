import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Props interfeysi
interface ChartData {
  name: string; // Oylik nomi
  Ketganlar: number; // Ketganlar qiymati
  Kelganlar: number; // Kelganlar qiymati
}

interface DynamicBarChartProps {
  data: ChartData[];
}

const DynamicBarChart: React.FC<DynamicBarChartProps> = ({ data }) => {
  return (
    <div style={{ width: "100%", height: 500, backgroundColor:"#fff"  }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {/* Kelganlar uchun bar */}
          <Bar dataKey="Kelganlar" fill="#ffb6c1" name="Kelganlar" />
          {/* Ketganlar uchun bar */}
          <Bar dataKey="Ketganlar" fill="#87cefa" name="Ketganlar" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DynamicBarChart;
