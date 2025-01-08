import { useEffect, useState } from "react";
import FilterInput from "../../../components/inputs/filterInput";
import TabsMigrant from "../../../components/tabs/tab";
import { Tab } from "../../../helpers/constants/types";
import useFilterStore from "../../../helpers/state-managment/filterStore/filterStore";
import Brigaderlar from "./tabs/brigaderlar";
import Horijdagi from "./tabs/horijdagi";
import OxirgiUchOylik from "./tabs/OxirgiUchOylik";
import QashqadaryoBuyicha from "./tabs/qashqadaryoBo'yicha";
import Qidiruv from "./tabs/qidiruv";
import Uzbekistondagilar from "./tabs/uzbekistondagilar";
import TextInput from "../../../components/inputs/text-input";
import DateInput from "../../../components/inputs/date-input";
import SelectInput from "../../../components/inputs/selectInput";
import { all_migrants, getMigrate } from "../../../helpers/api/api";
import { useGlobalRequest } from "../../../helpers/functions/universal";
import { DatePicker } from "antd";
import { useTranslation } from "react-i18next";
import Accordion, { UserCardData } from "../../../components/acardion/acardion";
import MigrationCard from "../../../components/migration/migration";
const { RangePicker } = DatePicker;


function Dashboard() {
  const { t } = useTranslation()
  const { filterName, setFilterName, departureCountryFilter, setDepartureCountryFilter,
    departureRegionFilter, setDepartureRegionFilter, departureDistrictFilter, setDepartureDistrictFilter,
    departureStartFilter, setDepartureStartFilter, setDepartureFinish, departureFinish, setCurrentStatusFilter, currentStatusFilter } = useFilterStore();

  const [filterVisible, setFilterVisible] = useState<boolean>(false);
  const [duobleDateList, setDuobleDateList] = useState<any>([]);
  const [page, setPage] = useState<number>(0);
  const [isFilter, setIsFilter] = useState<boolean>(false);

  const options = [
    { value: "QIDIRUVDA", label: "Qidiruvda" },
    { value: "BIRIGADIR", label: "Brigadir" },
    { value: "BOSHQA", label: "Boshqa" },
  ];

  const getDynamicUrl = () => {
    const queryParams: string = [
      filterName ? `fio=${filterName}` : '',
      departureCountryFilter ? `departureCountry=${departureCountryFilter}` : '',
      departureRegionFilter ? `departureRegion=${departureRegionFilter}` : '',
      departureDistrictFilter ? `departureDistrict=${departureDistrictFilter}` : '',
      departureStartFilter ? `departureStart=${departureStartFilter}` : '',
      datePicker(0) ? `birthStart=${datePicker(0)}` : '',
      datePicker(1) ? `birthFinish=${datePicker(1)}` : '',
      currentStatusFilter ? `currentStatus=${currentStatusFilter}` : '',
      page ? `page=${page}` : '',
    ]
      .filter(Boolean) // Bo'sh qiymatlarni chiqarib tashlash
      .join('&');

    return `${getMigrate}?${queryParams ? `${queryParams}&` : ''}`;
  };
  const dynamicUrl = getDynamicUrl();
  const MigrateGet = useGlobalRequest(dynamicUrl, "GET");
  const getAllMigrant = useGlobalRequest(all_migrants, "GET");

  useEffect(() => {
    if (MigrateGet.response && MigrateGet.response?.object?.length > 0) {
      setIsFilter(true);
    } else {
      setIsFilter(false);
    }
  }, [MigrateGet.error, MigrateGet.response])

  useEffect(() => {
    // Dependensiyalar o'zgarganda `MigrateGet.globalDataFunc()` chaqiriladi
    if (
      filterName ||
      departureCountryFilter ||
      departureRegionFilter ||
      departureDistrictFilter ||
      departureStartFilter ||
      currentStatusFilter ||
      datePicker(1) || datePicker(0)
    ) {
      MigrateGet.globalDataFunc();
    }
  }, [
    filterName,
    departureCountryFilter,
    departureRegionFilter,
    departureDistrictFilter,
    departureStartFilter,
    currentStatusFilter,
    datePicker(1), datePicker(0)
  ]);

  const userDate: UserCardData[] =
    MigrateGet?.response?.object?.map((item: any) => ({
      additionalAddress: item?.birthVillage || "--", // Added fallback for missing values
      birthDate: item?.birthDate || "--",
      birthDistrict: item?.birthVillage || "--",
      departureArea: `${item?.departureCountry || ""} ${item?.departureRegion || ""} ${item?.departureDistrict || ""}`,
      departureDate: item?.leavingCountryDate || "--",
      disconnectedTime: item?.disconnectedTime || "--",
      migrateFirstName: item?.firstName || "--", // Ensure you're using the correct fields
      migrateId: item?.id || "--",
      migrateLastName: item?.lastName || "--",
      migrateMiddleName: item?.middleName || "--",
      phoneNumber: item?.homeNumber || "--", // Correcting the field name to `homeNumber`
      suspiciousCases: item?.suspiciousCases || "--",
      typeOfActivity: item?.typeOfActivity || "--",
    })) || [];

  const tabs: Tab[] = [
    {
      id: 1,
      title: `${t('Horijdagi Migrantlar')}`,
      content: (
        <>
          <Horijdagi />
        </>
      ),
    },
    {
      id: 2,
      title: `${t('Qashqadaryo bo‘yicha')}`,
      content: (
        <QashqadaryoBuyicha />
      ),
    },
    {
      id: 3,
      title: `${t('Oxirgi 3 oyda qaytganlar')}`,
      content: (
        <OxirgiUchOylik />
      ),
    },
    {
      id: 4,
      title: `${t('Hozirda O‘zbekistondagilar')}`,
      content: (
        <Uzbekistondagilar />
      ),
    },
    {
      id: 5, title: `${t('Brigadeler')}`, content: (
        <Brigaderlar />
      ),
    },
    // { id: 6, title: "O/I", content: "O/I bo‘yicha ma'lumotlar" },
    {
      id: 7,
      title: `${t('Qidiruv')}`,
      content: (
        <Qidiruv />
      ),
    },
  ];

  function datePicker(num: number) {
    let date, month, year;

    if (duobleDateList && duobleDateList[0]) {
      date = duobleDateList[num].date();
      month = duobleDateList[num].month() + 1;
      year = duobleDateList[num].year();

      if (month > 0 && month < 10) month = `0${month}`;
      if (date > 0 && date < 10) date = `0${date}`;

      return `${date}/${month}/${year}`;
    }
  }

  return (
    <div className="pt-20 flex flex-col items-center">
      <div className="w-full max-w-[1250px]  mt-6 px-4 md:px-8 lg:px-16">
        <FilterInput
          name="max"
          placeholder={t('Malumotlarni izlash')}
          value={filterName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterName(e.target.value)}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "+" || e.key === "-") e.preventDefault();
          }}
          color="text-black"
          onFilterClick={() => setFilterVisible(!filterVisible)}
        />

        {filterVisible && (
          <div className="mt-6 w-full  flex flex-col items-center">
            <div className="mb-6 flex flex-col w-full max-w-[1100px] md:flex-row md:space-x-4 space-y-4 md:space-y-0">
              <TextInput
                className="w-full"
                label={t('Ism va familiya')}
                value={filterName}
                handleChange={(e) => setFilterName(e.target.value)}
                placeholder={t('Ism va familiya')}
              />
              <TextInput
                className="w-full"
                label={t('Migrant ketgan davlat')}
                value={departureCountryFilter}
                handleChange={(e) => setDepartureCountryFilter(e.target.value)}
                placeholder={t('Migrant ketgan davlat')}
              />
              <TextInput
                className="w-full"
                label={t('Migrant ketgan viloyat')}
                value={departureRegionFilter}
                handleChange={(e) => setDepartureRegionFilter(e.target.value)}
                placeholder={t('Migrant ketgan viloyat')}
              />
              <TextInput
                className="w-full"
                label={t('Migrant ketgan tuman')}
                value={departureDistrictFilter}
                handleChange={(e) => setDepartureDistrictFilter(e.target.value)}
                placeholder={t('Migrant ketgan tuman')}
              />
            </div>
            <div className="mb-6 flex flex-col w-full max-w-[1100px]  md:flex-row md:space-x-4 space-y-4 md:space-y-0">
              <DateInput
                className="w-full"
                label={t('Migrant ketgan sana')}
                value={departureStartFilter}
                handleChange={(e) => setDepartureStartFilter(e.target.value)}
                placeholder={t('Migrant ketgan sana')}
              />
              <DateInput
                className="w-full"
                label={t('Migrant kelgan sana')}
                value={departureFinish}
                handleChange={(e) => setDepartureFinish(e.target.value)}
                placeholder={t('Migrant kelgan sana')}
              />
              <div className="flex flex-col w-full">
                <label className="block text-gray-700  ">{t("Tug'ilgan yil oralig'i")}</label>
                <RangePicker
                  placeholder={[`${t('Boshlanish')}`, `${t('Tugash')}`]}
                  // value={birthFinishFilter}
                  className={`w-full h-12`}
                  onChange={(date) => setDuobleDateList(date)}
                />
              </div>
              {/* <DateInput
                label={"Tug'ilgan kun"}
                value={birthStartFilter}
                handleChange={(e) => setBirthStartFilter(e.target.value)}
                placeholder={"Migrant tug'ilgan kun"}
              />
              <DateInput
                label={"Tug'ilgan kun"}
                value={birthFinishFilter}
                handleChange={(e) => setBirthFinishFilter(e.target.value)}
                placeholder={"Migrant tug'ilgan kun"}
              /> */}
              <div className="relative w-full">
                <SelectInput
                  label={t('Statusni tanlang')}
                  value={currentStatusFilter}
                  handleChange={(e) => setCurrentStatusFilter(e.target.value)}
                  options={options}
                  className="w-full"
                />

                {/* X tugmasi faqat tanlangan qiymat bo'lsa ko'rsatiladi */}
                {currentStatusFilter && (
                  <button
                    onClick={() => setCurrentStatusFilter("")}
                    className="absolute top-10 right-5   "
                  >
                    ✖
                  </button>
                )}
              </div>

            </div>
          </div>
        )}
      </div>

      {
        isFilter ? (
          <div className="w-full max-w-6xl mx-auto mt-4">
            <MigrationCard
              id={"0"}
              flag="https://vectorflags.s3.amazonaws.com/flags/uz-circle-01.png"
              title={t("Jami migrantlarimiz soni")}
              count={getAllMigrant?.response || 0}
              isActive={false}
              onClick={() => { }}
            />
            <div className="mt-4">
              {userDate?.map((user, index) => (
                <Accordion key={index} userData={user} />
              ))}
            </div>
            {/* <div className="flex justify-center mt-5">
            <Pagination
              defaultCurrent={1}
              current={currentPage + 1}
              total={userSearch?.totalElements || 0}
              pageSize={10}
              onChange={async (pageNumber: number) => {
                await setCurrentPage(pageNumber - 1);
                await MigrateGet.globalDataFunc();
              }}
              showSizeChanger={false}
            />
          </div> */}
          </div>
        ) : (
          <TabsMigrant tabs={tabs} />
        )
      }


    </div>
  );
}

export default Dashboard;
