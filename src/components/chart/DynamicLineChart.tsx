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

// Props interfeysi

export interface LeaveInterface {
  name: string;
  value: string;
}


interface DynamicLineChartProps {
  data: LeaveInterface[]; // Dinamik ma'lumotlar
  lineColor: string; // Chiziqning rangi
}

const DynamicLineChart: React.FC<DynamicLineChartProps> = ({
  data,
  lineColor,
}) => {
  return (
    <div className="shadow-lg" style={{ width: "100%", height: 500, backgroundColor:"#fff", borderRadius: "1rem",  }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke={lineColor}
            strokeWidth={2}
            dot={{ r: 6, strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DynamicLineChart;
