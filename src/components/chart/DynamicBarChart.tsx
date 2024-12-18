import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Props interfeysi
export interface ChartByRegion {
  name: string; // Oylik nomi
  Ketganlar: number; // Ketganlar qiymati
  Kelganlar: number; // Kelganlar qiymati
}

interface DynamicBarChartProps {
  data: ChartByRegion[];
}

export const DynamicBarChart: React.FC<DynamicBarChartProps> = ({ data }) => {
  if (data.length === 0) {
    return (
      <div
        className="shadow-lg"
        style={{
          width: "100%",
          height: 500,
          backgroundColor: "#fff",
          borderRadius: "1rem",
        }}
      >
        <div className="flex h-full justify-center items-center">
          Ma'lumot topilmadi.
        </div>
      </div>
    );
  }
  return (
    <div
      className="shadow-lg"
      style={{
        width: "100%",
        height: 500,
        backgroundColor: "#fff",
        borderRadius: "1rem",
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            angle={-45}
            textAnchor="end"
            height={80}
            interval={0} // Har bir matn ko'rsatiladi
            tickFormatter={(value) =>
              value.length > 8 ? `${value.substring(0, 8)}...` : value
            }
          />
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

