import React from "react";
import { useTranslation } from "react-i18next";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

// Props interfeysi
interface ChartData {
  name: string; // Kesim nomi
  value: number; // Kesim qiymati
}

interface DynamicPieChartProps {
  data: ChartData[]; // Dinamik ma'lumotlar
}

const COLORS = ["#87CEFA", "#0086D1"]; // Ranglar: doimiy o'zgarmas ranglar

const DynamicPieChart: React.FC<DynamicPieChartProps> = ({ data }) => {
  const { t } = useTranslation()
  const hasData = data.some(item => item.value !== 0);
  return (
    <div className="shadow-lg" style={{ width: "100%", height: 500, backgroundColor:"#fff", borderRadius: "1rem",  }}>
      {hasData ? (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={130}
              fill="#8884d8"
              paddingAngle={2}
              dataKey="value"
              label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="top" align="center" iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex justify-center items-center h-full">
          {t("Ma'lumot topilmadi")}
        </div>
      )}
    </div>
  );
};

export default DynamicPieChart;
