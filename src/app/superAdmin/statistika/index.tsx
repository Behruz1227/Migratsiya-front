import { useEffect, useState } from "react";
import { ChartByRegion, DynamicBarChart } from "../../../components/chart/DynamicBarChart";
import DynamicLineChart, {
  LeaveInterface,
} from "../../../components/chart/DynamicLineChart";
import DynamicPieChart from "../../../components/chart/DynamicPieChart";
import TextInput from "../../../components/inputs/text-input";
import { useGlobalRequest } from "../../../helpers/functions/universal";
import {
  getArrive,
  getLeave,
  getMigratesStatistic,
  getStatisByRegion,
} from "../../../helpers/api/api";
import { debounce } from "lodash";
import { useTranslation } from "react-i18next";

function Statistika() {
  const { t } = useTranslation()
  const [year, setYear] = useState(new Date().getFullYear().toString())
  const getStatistika1 = useGlobalRequest(`${getLeave}?year=${year}`, "GET");
  const getStatistika2 = useGlobalRequest(`${getArrive}?year=${year}`, "GET");
  const getStatistika3 = useGlobalRequest(getMigratesStatistic, "GET");
  const getStatistika4 = useGlobalRequest(`${getStatisByRegion}?year=${year}`, "GET");

  useEffect(() => {
    getStatistika1.globalDataFunc();
    getStatistika2.globalDataFunc();
    getStatistika3.globalDataFunc();
    getStatistika4.globalDataFunc()
  }, []);

  const debouncedGetStats = debounce(() => {
    getStatistika1.globalDataFunc();
    getStatistika2.globalDataFunc();
    getStatistika3.globalDataFunc();
    getStatistika4.globalDataFunc();
  }, 2000);

  useEffect(() => {
    if (year.length === 4) {
      debouncedGetStats();
    }
  }, [year]);
  // { name: "Yanvar", Kelganlar: 400, Ketganlar: 240 },
  const MonthlyStats: ChartByRegion[] =
  getStatistika4?.response?.map((item: any) => ({
    name: item?.districtName || "--",
    Kelganlar: item?.leaving || 0,
    Ketganlar: item?.returning || 0,
  })) || [];

  const UserLeave: LeaveInterface[] =
    getStatistika1?.response?.map((item: any) => ({
      name: item?.month?.slice(0, 3) || "--",
      value: item?.migrantCount || 0,
    })) || [];
  // { name: "July", value: 1100 },

  const UserArrive: LeaveInterface[] =
    getStatistika2?.response?.map((item: any) => ({
      name: item?.month?.slice(0, 3) || "--",
      value: item?.migrantCount || 0,
    })) || [];

  const AllUsers = [
    { name: "O'zbekistonda", value: getStatistika3?.response?.uzbMigrant || 0 },
    { name: "Xorijda", value: getStatistika3?.response?.xorMigrant || 0 },
  ];

  return (
    <div className="bg-[#EBF8FF] w-full pt-20 flex justify-center items-center">
      <div className="container w-full grid lg:grid-cols-2 gap-10 mb-20">
        <div className="flex w-full justify-center col-span-2">
          <TextInput
            type="text"
            className="w-full max-w-2xl"
            handleChange={(e) => setYear(e.target.value.replace(/\D/g, "").substring(0, 4))}
            placeholder={t("Yilni kiriting")}
            label={t("Yil bo'yicha statistikani ko'rish")}
          />
        </div>
        <div className="App">
          <h1 className="my-4 text-lg font-semibold" style={{ textAlign: "center" }}>
            {t("Ketganlar")}
          </h1>
          {/* LineChart komponentiga ma'lumot va rang yuboriladi */}
          <DynamicLineChart data={UserLeave} lineColor="#7b68ee" />
        </div>
        <div className="App">
          <h1 className="my-4 text-lg font-semibold" style={{ textAlign: "center" }}>
            {t("Kelganlar")}
          </h1>
          {/* LineChart komponentiga ma'lumot va rang yuboriladi */}
          <DynamicLineChart data={UserArrive} lineColor="#FAE496" />
        </div>
        <div className="App">
          <h1 className="my-4 text-lg font-semibold" style={{ textAlign: "center" }}>
            {t("Jami migrantlar")}
          </h1>
          {/* PieChart komponentiga ma'lumotlar yuboriladi */}
          <DynamicPieChart data={AllUsers} />
        </div>
        <div className="App">
          <h1 className="my-4 text-lg font-semibold" style={{ textAlign: "center" }}>
            {t("Oylik statistika")}
          </h1>
          <DynamicBarChart data={MonthlyStats} />
        </div>
      </div>
    </div>
  );
}

export default Statistika;
