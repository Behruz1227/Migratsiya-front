import React, { useState, useEffect } from 'react';
import ApexCharts from 'react-apexcharts';
import { useGlobalRequest } from '../../helpers/functions/universal';
import { getStatisticByCountry } from '../../helpers/api/api';

interface DataItem {
  name: string;
  data: number[];
  total?: number;
}

const ApexBarChart = () => {
  const [sortOrder, setSortOrder] = useState("asc");
  const [chartData, setChartData] = useState<DataItem[]>([]);

  const chartStaisticas = useGlobalRequest(
    `${getStatisticByCountry}direction=${sortOrder}&page=0&size=10`,
    "GET"
  );

  const handleSortChange = (e: any) => {
    setSortOrder(e.target.value === "o'sish" ? "asc" : "desc");
  };

  useEffect(() => {
    chartStaisticas.globalDataFunc();
  }, []);

  useEffect(() => {
    if (chartStaisticas?.response?.object) {
      const fetchedData = chartStaisticas.response.object;
      const transformedData = fetchedData.map((item: any) => ({
        name: item.country,
        data: [
          item.ish,
          item.turizm,
          item.oqish,
          item.davolanish,
          item.boshqa,
        ],
        total: [
          item.ish,
          item.turizm,
          item.oqish,
          item.davolanish,
          item.boshqa,
        ].reduce((acc, val) => acc + val, 0),
      }));
      setChartData(transformedData);
    }
  }, [chartStaisticas?.response]);

  const sortData = () => {
    return chartData
      .slice()
      .sort((a, b) => (sortOrder === "asc" ? a.total! - b.total! : b.total! - a.total!));
  };

  const sortedData = sortData();

  const options = {
    chart: {
      type: 'bar',
      height: 400,
      stacked: true,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '70%',
        dataLabels: {
          position: 'center',
        },
        borderRadius: 5,
      },
    },
    colors: ['#FF6384', '#36A2EB', '#FFCE56', '#4D73FF', '#AA65CC'],
    dataLabels: {
      enabled: true,
      formatter: (val: number) => `${val}%`,
      style: {
        fontSize: '12px',
        colors: ['#000'],
      },
    },
    xaxis: {
      categories: sortedData.map((item) => item.name),
      labels: { style: { fontSize: '12px' } },
    },
    yaxis: {
      labels: {
        style: { fontSize: '12px' },
      },
    },
    tooltip: {
      y: {
        formatter: (val: number) => `${val}%`,
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
    },
  };

  const series = sortedData.map((item) => ({
    name: item.name,
    data: item.data,
  }));

  return (
    <div>
      <div style={{ marginBottom: '10px', textAlign: 'right' }}>
        <label htmlFor="sort">Tartibi: </label>
        <select id="sort" value={sortOrder === "asc" ? "o'sish" : "kamayish"} onChange={handleSortChange}>
          <option value="o'sish">O'sish</option>
          <option value="kamayish">Kamayish</option>
        </select>
      </div>
      <div id="chart">
        <ApexCharts options={options} series={series} type="bar" height={400} />
      </div>
    </div>
  );
};

export default ApexBarChart;
