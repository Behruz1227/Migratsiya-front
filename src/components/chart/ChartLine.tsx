import React, { useState, useEffect } from 'react';
import ApexCharts from 'react-apexcharts';

const ApexBarChart = () => {
  const [sortOrder, setSortOrder] = useState("o'sish");

  const handleSortChange = (e: any) => {
    setSortOrder(e.target.value);
  };

  const originalData = [
    { name: 'Ish', data: [30, 40, 35, 50, 49, 60] },
    { name: 'Turizm', data: [23, 12, 54, 61, 32, 56] },
    { name: "O'qish", data: [34, 41, 55, 62, 33, 52] },
    { name: 'Davolanish', data: [12, 15, 20, 25, 18, 30] },
    { name: 'Boshqa', data: [45, 33, 50, 48, 40, 45] }
  ];

  // Sort the data based on the selected order
  const sortData = (order: string) => {
    const sortedData = [...originalData];
    const sortOrderFactor = order === "o'sish" ? 1 : -1;

    // Sort series based on the sum of data values in each category
    sortedData.forEach((item) => {
      item.total = item.data.reduce((acc, value) => acc + value, 0);
    });

    sortedData.sort((a, b) => (a.total - b.total) * sortOrderFactor);

    // Return the sorted series and categories
    const sortedCategories = ['Russia', 'USA', 'Germany', 'South Korea', 'Australia', 'UAE'];
    return { series: sortedData, categories: sortedCategories };
  };

  const { series, categories } = sortData(sortOrder);

  const options = {
    series: series.map(item => ({ name: item.name, data: item.data })),
    chart: {
      type: 'bar',
      height: 380,
      stacked: true
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          position: 'center'
        },
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#fff'
      }
    },
    colors: ['#FF6384', '#4D73FF', '#FFCE56', '#36A2EB', '#AA65CC'],
    dataLabels: {
      enabled: true,
      textAnchor: 'start',
      style: {
        colors: ['#fff']
      },
      formatter: function (val) {
        return val + '%';
      },
      offsetX: 0,
      dropShadow: {
        enabled: true
      }
    },
    stroke: {
      width: 1,
      colors: ['#fff']
    },
    xaxis: {
      categories: categories,
    },
    yaxis: {
      labels: {
        show: true
      },
      // Disable the grid lines on the y-axis
      grid: {
        show: false
      }
    },
    title: {
      text: 'Migratsiyaning ketish sabablari',
      align: 'center',
      floating: true
    },
    tooltip: {
      theme: 'dark',
      x: {
        show: true
      },
      y: {
        title: {
          formatter: function (seriesName) {
            return seriesName + ': ';
          }
        }
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      markers: {
        fillColors: ['#FF6384', '#4D73FF', '#FFCE56', '#36A2EB', '#AA65CC'],
        borderColor: '#fff',
        borderWidth: 2
      }
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '10px', textAlign: 'right' }}>
        <label htmlFor="sort">Tartibi: </label>
        <select id="sort" value={sortOrder} onChange={handleSortChange}>
          <option value="o'sish">O'sish</option>
          <option value="kamayish">Kamayish</option>
        </select>
      </div>
      <div id="chart">
        <ApexCharts options={options} series={options.series} type="bar" height={380} />
      </div>
    </div>
  );
};

export default ApexBarChart;
