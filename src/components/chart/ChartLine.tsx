import React, { useState, useEffect } from 'react';
import ApexCharts from 'react-apexcharts';
import { useGlobalRequest } from '../../helpers/functions/universal';
import { getStatisticByCountry } from '../../helpers/api/api';
import { Pagination } from "antd";
import { useTranslation } from 'react-i18next';
import { ApexOptions } from 'apexcharts';

interface DataItem {
  name: string;
  data: number[];
  total?: number;
}

const ApexBarChart: React.FC = () => {
  const { t } = useTranslation()
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [currentPage, setCurrentPage] = useState<number>(0);

  const chartStatisticas = useGlobalRequest(
    `${getStatisticByCountry}direction=${sortOrder}&page=${currentPage}&size=10`,
    "GET"
  );

  useEffect(() => {
    chartStatisticas.globalDataFunc();
  }, []);

  const originalData: DataItem[] = [
    { name: t('Ish'), data: chartStatisticas?.response?.object.map((item: any) => item.ish) || [] },
    { name: t('Turizm'), data: chartStatisticas?.response?.object.map((item: any) => item.turizm) || [] },
    { name: t("O'qish"), data: chartStatisticas?.response?.object.map((item: any) => item.oqish) || [] },
    { name: t('Davolanish'), data: chartStatisticas?.response?.object.map((item: any) => item.davolanish) || [] },
    { name: t('Boshqa'), data: chartStatisticas?.response?.object.map((item: any) => item.boshqa) || [] }
  ];

  const sortedData = originalData.map(item => ({
    ...item,
    total: item.data.reduce((sum, value) => sum + value, 0)
  })).sort((a, b) => {
    const sortFactor = sortOrder === "asc" ? 1 : -1;
    return (a.total! - b.total!) * sortFactor;
  });

  const categories = chartStatisticas?.response?.object.map((item: any) => item.country) || [];

  useEffect(() => {
    chartStatisticas.globalDataFunc();
  }, [currentPage, sortOrder])

  const options: ApexOptions = {
    series: sortedData.map(item => ({ name: item.name, data: item.data })),
    chart: {
      type: 'bar',
      height: 380,
      stacked: true
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 8,
        dataLabels: {
          position: 'center'
        }
      }
    },
    colors: ['#FF6384', '#4D73FF', '#FFCE56', '#36A2EB', '#AA65CC'],
    dataLabels: {
      enabled: true,
      formatter: (val: number) => `${val} ta`,
      style: { colors: ['#fff'] }
    },
    stroke: {
      width: 1,
      colors: ['#fff']
    },
    xaxis: {
      categories,
      labels: {
        show: false
      }
    },
    title: {
      text: t('Migrantlarning ketish sabablari'),
      align: 'center'
    },
    tooltip: {
      theme: 'dark',
      y: {
        title: {
          formatter: (seriesName: string) => `${seriesName}: `
        }
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left'
    }
  };

  return (
    <div className="flex justify-center">
      <div className='w-full max-w-[1200px]'>
        <div style={{ marginBottom: '10px', textAlign: 'right' }}>
          <label htmlFor="sort">{t("Tartibi")}: </label>
          <select id="sort" value={sortOrder} onChange={(e) => { setSortOrder(e.target.value); }}>
            <option value="asc">{t("O'sish")}</option>
            <option value="desc">{t("Kamayish")}</option>
          </select>
        </div>
        <div id="chart">
          <ApexCharts options={options} series={options.series} type="bar" height={380} />
        </div>
        <div className="flex justify-center mt-5">
          <Pagination
            defaultCurrent={1}
            current={currentPage + 1}
            total={chartStatisticas.response?.totalElements || 0}
            pageSize={10}
            onChange={(pageNumber: number) => setCurrentPage(pageNumber - 1)}
            showSizeChanger={false}
          />
          {/* <Pagination
                                        defaultCurrent={1}
                                        current={currentPage + 1}
                                        total={getSearchUsers.response?.totalElements || 0}
                                        pageSize={10}
                                        onChange={(pageNumber: number) => setCurrentPage(pageNumber - 1)}
                                        showSizeChanger={false}
                                    /> */}
        </div>
      </div>

    </div>
  );
};

export default ApexBarChart;
