import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useGlobalRequest } from '../../helpers/functions/universal';
import { countryList, distListByQa, getStatisForBarChartByCountry, getStatisForBarChartByDistrict } from '../../helpers/api/api';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useTranslation } from 'react-i18next';

ChartJS.register(ArcElement, Tooltip, Legend);

const Charts = () => {
  const { t } = useTranslation();
   const [countryName, setCountryName] = useState('');
  const [regionName, setRegionName] = useState('');
  const getCountry = useGlobalRequest(countryList, 'GET');
  const getRegion = useGlobalRequest(distListByQa, 'GET');
  const getStatisticCountry = useGlobalRequest(
    `${getStatisForBarChartByCountry}?countryName=${countryName || ''}`,
    'GET'
  );

  const getStatisticDistrict = useGlobalRequest(
    `${getStatisForBarChartByDistrict}?districtName=${regionName || ''}`,
    'GET'
  );

  useEffect(() => {
    getCountry.globalDataFunc();
    getRegion.globalDataFunc();
  }, []);

  useEffect(() => {
    if (getCountry.response && !countryName) {
      setCountryName(getCountry.response[0]?.name || '');
    }
    if (getRegion.response && !regionName) {
      setRegionName(getRegion.response[0]?.name || '');
    }
  }, [getCountry.response, getRegion.response]);

  useEffect(() => {
    if (countryName) {
      getStatisticCountry.globalDataFunc();
    }
  }, [countryName]);

  useEffect(() => {
    if (regionName) {
      getStatisticDistrict.globalDataFunc();
    }
  }, [regionName]);

  const statistics = getStatisticCountry?.response || {
    countAge18: 0,
    countAge30: 0,
    countAge30Big: 0,
  };
  const statisticsRegion = getStatisticDistrict.response || {
    countAge18: 0,
    countAge30: 0,
    countAge30Big: 0,
  };

  const styles = {
    container: {
      display: 'flex' as const,
      flexWrap: 'wrap' as const,
      justifyContent: 'center' as const,
      alignItems: 'center' as const,
      gap: '40px',
      padding: '20px',
    },
    chartBox: {
      flex: '1 1 300px',
      maxWidth: '500px',
      maxheight: '100%',
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    title: { textAlign: 'center' as const },
    select: { width: '100%', padding: '8px', marginBottom: '15px' },
  };

  return (
    <div style={styles.container}>
      <div style={styles.chartBox}>
        <h3 style={styles.title}>{t("Davlatni tanlang")}</h3>
        <select
        className='mt-4'
          onChange={(e) => setCountryName(e.target.value)}
          style={styles.select}
          value={countryName}
        >
          {getCountry.response ? (
            getCountry.response.map((country: { id: string | number; name: string }) => (
              <option key={country.id} value={country.name}>
                {country.name}
              </option>
            ))
          ) : (
            <option value="">{t("Ma'lumot topilmadi")}</option>
          )}
        </select>
        <ReactApexChart
          type="donut"
          series={[statistics.countAge18, statistics.countAge30, statistics.countAge30Big]}
          options={{
            labels: [
              `0-18: ${statistics.countAge18} ${t("ta")}`,
              `19-30: ${statistics.countAge30} ${t("ta")}`,
              `30+: ${statistics.countAge30Big} ${t("ta")}`,
            ],
          }}
        />
      </div>

      <div style={styles.chartBox}>
        <h3 style={styles.title}>{t("Tuman tanlang")}</h3>
        <select
        className='mt-4'
          onChange={(e) => setRegionName(e.target.value)}
          style={styles.select}
          value={regionName}
        >
          {getRegion.response ? (
            getRegion.response.map((region: { id: string | number; name: string }) => (
              <option key={region.id} value={region.name}>
                {region.name}
              </option>
            ))
          ) : (
            <option value="">{t("Ma'lumot topilmadi")}</option>
          )}
        </select>
        <ReactApexChart
          type="donut"
          series={[statisticsRegion.countAge18, statisticsRegion.countAge30, statisticsRegion.countAge30Big]}
          options={{
            labels: [
              `0-18: ${statisticsRegion.countAge18} ${t("ta")}`,
              `19-30: ${statisticsRegion.countAge30} ${t("ta")}`,
              `30+: ${statisticsRegion.countAge30Big} ${t("ta")}`,
            ],
          }}
        />
      </div>
    </div>
  );
};

export default Charts;
