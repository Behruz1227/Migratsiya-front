import React, {useEffect, useState} from "react";
import FilterInput from "../../../components/inputs/filterInput";
import TabsMigrant from "../../../components/tabs/tab";
import {Tab} from "../../../helpers/constants/types";
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
import {getMigrate} from "../../../helpers/api/api";
import {useGlobalRequest} from "../../../helpers/functions/universal";
import {DatePicker} from "antd";
import {useTranslation} from "react-i18next";
import Accordion, {UserCardData} from "../../../components/acardion/acardion";
import MigrationCard from "../../../components/migration/migration";
import {datePicker} from "../../../helpers/constants/const.ts";

const {RangePicker} = DatePicker;

function Dashboard() {
    const {t} = useTranslation();
    const {
        filterName,
        setFilterName,
        departureCountryFilter,
        setDepartureCountryFilter,
        departureRegionFilter,
        setDepartureRegionFilter,
        departureDistrictFilter,
        setDepartureDistrictFilter,
        departureStartFilter,
        setDepartureStartFilter,
        setDepartureFinish,
        departureFinish,
        setCurrentStatusFilter,
        currentStatusFilter
    } = useFilterStore();

    const [filterVisible, setFilterVisible] = useState<boolean>(false);
    const [duobleDateList, setDuobleDateList] = useState<any>([]);

    // const [page, _] = useState<number>(0);
    const [isFilter, setIsFilter] = useState<boolean>(false);
    const [_, setSearchData] = useState<any | null>(null)

    const options = [
        {value: "QIDIRUVDA", label: "Qidiruvda"},
        {value: "BIRIGADIR", label: "Brigadir"},
        {value: "BOSHQA", label: "Boshqa"},
    ];

    const getDynamicUrl = () => {
        const queryParams = [
            filterName ? `fio=${filterName}` : '',
            departureCountryFilter ? `departureCountry=${departureCountryFilter}` : '',
            departureRegionFilter ? `departureRegion=${departureRegionFilter}` : '',
            departureDistrictFilter ? `departureDistrict=${departureDistrictFilter}` : '',
            departureStartFilter ? `departureStart=${departureStartFilter}` : '',
            datePicker(0, duobleDateList) ? `birthStart=${datePicker(0, duobleDateList)}` : '',
            datePicker(1, duobleDateList) ? `birthFinish=${datePicker(1, duobleDateList)}` : '',
            currentStatusFilter ? `currentStatus=${currentStatusFilter}` : ''
        ].filter(Boolean).join('&');

        return `${getMigrate}?${queryParams ? `${queryParams}&` : ''}page=${0}&size=10`;
    };
    const MigrateGet = useGlobalRequest(getDynamicUrl(), "GET");

    useEffect(() => {
        if ((MigrateGet.response?.object?.length > 0) && (
            filterName ||
            departureCountryFilter ||
            departureRegionFilter ||
            departureDistrictFilter ||
            departureStartFilter ||
            currentStatusFilter ||
            datePicker(1, duobleDateList) ||
            datePicker(0, duobleDateList)
        )) setIsFilter(true);
        else {
            setIsFilter(false);
            setSearchData(null);
        }
    }, [
        MigrateGet.response,
        MigrateGet.error,
        filterName,
        departureCountryFilter,
        departureRegionFilter,
        departureDistrictFilter,
        departureStartFilter,
        currentStatusFilter,
        datePicker(1, duobleDateList),
        datePicker(0, duobleDateList)
    ])

    // useEffect(() => {
    //     MigrateGet.globalDataFunc().then(() => "");
    //     if (MigrateGet.response?.totalElements < 10) setPage(0);
    //     if (page >= 0 && isFilter) MigrateGet.globalDataFunc().then(() => "");
    // }, [page]);

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
            departureFinishDate: item?.returningUzbekistanDate || "--"
        })) || [];

    const tabs: Tab[] = [
        {
            id: 1,
            title: `${t('Horijdagi Migrantlar')}`,
            content: <Horijdagi/>
        },
        {
            id: 2,
            title: `${t('Qashqadaryo bo‘yicha')}`,
            content: <QashqadaryoBuyicha/>
        },
        {
            id: 3,
            title: `${t('Oxirgi 3 oyda qaytganlar')}`,
            content: <OxirgiUchOylik/>
        },
        {
            id: 4,
            title: `${t('Hozirda O‘zbekistondagilar')}`,
            content: <Uzbekistondagilar/>
        },
        {
            id: 5,
            title: `${t('Brigadeler')}`,
            content: <Brigaderlar/>
        },
        // { id: 6, title: "O/I", content: "O/I bo‘yicha ma'lumotlar" },
        {
            id: 7,
            title: `${t('Qidiruv')}`,
            content: <Qidiruv/>
        },
    ];

    return (
        <div className="pt-20 flex flex-col items-center">
            <div className="w-full max-w-[1250px]  mt-6 px-4 md:px-8 lg:px-16">
                <div className={'flex flex-row gap-3'}>
                    <FilterInput
                        name="max"
                        placeholder={t('Malumotlarni izlash')}
                        value={filterName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterName(e.target.value)}
                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                            if (e.key === 'Enter') {
                                // console.log("clicked")
                                MigrateGet.globalDataFunc().then(() => "")
                            }
                            if (e.key === "+" || e.key === "-") e.preventDefault();
                        }}
                        color="text-black"
                        onFilterClick={() => setFilterVisible(!filterVisible)}
                    />
                    <button
                        className={'bg-[#0086D1] text-white px-8 rounded-xl'}
                        onClick={() => MigrateGet.globalDataFunc().then(() => "")}
                    >
                        {t("Qidirish")}
                    </button>
                </div>

                {filterVisible && (
                    <div className="mt-6 w-full  flex flex-col items-center">
                        <div
                            className="mb-6 flex flex-col w-full max-w-[1100px] md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                            <TextInput
                                className="w-full"
                                label={t('Ism va familiya')}
                                value={filterName}
                                handleChange={(e) => setFilterName(e.target.value)}
                                placeholder={t('Ism va familiya')}
                                handleOnKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                    if (e.key === 'Enter') MigrateGet.globalDataFunc().then(() => "")
                                }}
                            />
                            <TextInput
                                className="w-full"
                                label={t('Migrant ketgan davlat')}
                                value={departureCountryFilter}
                                handleChange={(e) => setDepartureCountryFilter(e.target.value)}
                                placeholder={t('Migrant ketgan davlat')}
                                handleOnKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                    if (e.key === 'Enter') MigrateGet.globalDataFunc().then(() => "")
                                }}
                            />
                            <TextInput
                                className="w-full"
                                label={t('Migrant ketgan viloyat')}
                                value={departureRegionFilter}
                                handleChange={(e) => setDepartureRegionFilter(e.target.value)}
                                placeholder={t('Migrant ketgan viloyat')}
                                handleOnKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                    if (e.key === 'Enter') MigrateGet.globalDataFunc().then(() => "")
                                }}
                            />
                            <TextInput
                                className="w-full"
                                label={t('Migrant ketgan tuman')}
                                value={departureDistrictFilter}
                                handleChange={(e) => setDepartureDistrictFilter(e.target.value)}
                                placeholder={t('Migrant ketgan tuman')}
                                handleOnKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                    if (e.key === 'Enter') MigrateGet.globalDataFunc().then(() => "")
                                }}
                            />
                        </div>
                        <div
                            className="mb-6 flex flex-col w-full max-w-[1100px]  md:flex-row md:space-x-4 space-y-4 md:space-y-0">
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

            {isFilter ? (
                <div className="w-full max-w-6xl mx-auto mt-4">
                    <MigrationCard
                        id={"0"}
                        flag="https://vectorflags.s3.amazonaws.com/flags/uz-circle-01.png"
                        title={t("Jami migrantlarimiz soni")}
                        count={`${MigrateGet.response?.totalElements ? MigrateGet.response?.totalElements : 0}`}
                        isActive={false}
                    />
                    <div className="mt-4">
                        {userDate?.map((user, index) => <Accordion key={index} userData={user}/>)}
                    </div>
                    {/*<div className="flex justify-center my-5">*/}
                    {/*    <Pagination*/}
                    {/*        showSizeChanger={false}*/}
                    {/*        responsive={true}*/}
                    {/*        defaultCurrent={1}*/}
                    {/*        total={MigrateGet.response?.totalElements ? MigrateGet.response?.totalElements : 0}*/}
                    {/*        onChange={(p: number) => setPage(p - 1)}*/}
                    {/*        rootClassName={`mt-8 mb-5`}*/}
                    {/*    />*/}
                    {/*</div>*/}
                </div>
            ) : <TabsMigrant tabs={tabs}/>}
        </div>
    );
}

export default Dashboard;
