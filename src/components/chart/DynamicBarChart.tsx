import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Props interfeysi
interface ChartData {
  name: string; // Oylik nomi
  Erkaklar: number; // Erkaklar qiymati
  Ayollar: number; // Ayollar qiymati
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
          {/* Ayollar uchun bar */}
          <Bar dataKey="Ayollar" fill="#ffb6c1" name="Ayollar" />
          {/* Erkaklar uchun bar */}
          <Bar dataKey="Erkaklar" fill="#87cefa" name="Erkaklar" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DynamicBarChart;
