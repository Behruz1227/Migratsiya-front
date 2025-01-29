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
import SelectInput from "../../../components/inputs/selectInput";
import {getMigrate, getTuman, mfyList} from "../../../helpers/api/api";
import {useGlobalRequest} from "../../../helpers/functions/universal";
import {DatePicker, Pagination} from "antd";
import {useTranslation} from "react-i18next";
import Accordion, {UserCardData} from "../../../components/acardion/acardion";
import MigrationCard from "../../../components/migration/migration";
import {datePicker, optionGender} from "../../../helpers/constants/const.ts";
import moment from "moment";
import AntdSelect from "../../../components/inputs/antd-select.tsx";
import {toast} from "sonner";

const {RangePicker} = DatePicker;

function Dashboard() {
    const {t} = useTranslation();
    const {
        filterName, lastName, middleName, setLastName, setMiddleName, setFilterName, departureCountryFilter,
        setDepartureCountryFilter, departureRegionFilter, setDepartureRegionFilter, departureDistrictFilter,
        setDepartureDistrictFilter, setCurrentStatusFilter, currentStatusFilter, resetFilterAdmin, genderFilter,
        setGenderFilter, disconnect, setDisconnect, disconnectDateList, setDisconnectDateList, reasonReturning,
        setReasonReturning, knowForeignLanguage, setKnowForeignLanguage, currentStatusRet, setCurrentStatusRet
    } = useFilterStore();

    const [filterVisible, setFilterVisible] = useState<boolean>(false);
    const [doubleDateList, setDoubleDateList] = useState<any>([]);
    const [startDoubleDateList, setStartDoubleDateList] = useState<any>([]);
    const [endDoubleDateList, setEndDoubleDateList] = useState<any>([]);
    const [workplace, setWorkplace] = useState<any>("");
    const [liveDistrict, setLiveDistrict] = useState<any>("");
    const [liveDistrictId, setLiveDistrictId] = useState<any>("");
    const [liveVillage, setLiveVillage] = useState<any>("");
    const [liveVillageId, setLiveVillageId] = useState<any>("");
    const [page, setPage] = useState<number>(0);
    const [isFilter, setIsFilter] = useState<boolean>(false);

    const getDynamicUrl = () => {
        const queryParams = [
            filterName ? `firstName=${filterName}` : '',
            lastName ? `lastName=${lastName}` : '',
            middleName ? `middleName=${middleName}` : '',
            departureCountryFilter ? `departureCountry=${departureCountryFilter}` : '',
            departureRegionFilter ? `departureRegion=${departureRegionFilter}` : '',
            departureDistrictFilter ? `departureDistrict=${departureDistrictFilter}` : '',
            datePicker(0, startDoubleDateList) ? `departureStart=${datePicker(0, startDoubleDateList)}` : '',
            datePicker(1, startDoubleDateList) ? `departureFinish=${datePicker(1, startDoubleDateList)}` : '',
            datePicker(0, endDoubleDateList) ? `returningStart=${datePicker(0, endDoubleDateList)}` : '',
            datePicker(1, endDoubleDateList) ? `returningFinish=${datePicker(1, endDoubleDateList)}` : '',
            datePicker(0, doubleDateList) ? `birthStart=${datePicker(0, doubleDateList)}` : '',
            datePicker(1, doubleDateList) ? `birthFinish=${datePicker(1, doubleDateList)}` : '',
            currentStatusFilter ? `currentStatus=${currentStatusFilter}` : '',
            workplace ? `workplace=${workplace}` : '',
            liveDistrict ? `liveDistrict=${liveDistrict}` : '',
            liveVillage ? `liveVillage=${liveVillage}` : '',
            genderFilter ? `gender=${genderFilter}` : '',
            disconnect ? `disconnect=${disconnect}` : '',
            datePicker(0, disconnectDateList) ? `disconnectStart=${datePicker(0, disconnectDateList)}` : '',
            datePicker(1, disconnectDateList) ? `disconnectFinish=${datePicker(1, disconnectDateList)}` : '',
            reasonReturning ? `reasonReturning=${reasonReturning}` : '',
            knowForeignLanguage ? `knowForeignLanguage=${knowForeignLanguage}` : '',
            currentStatusRet ? `currentStatusRet=${currentStatusRet}` : '',
        ].filter(Boolean).join('&');

        return `${getMigrate}?${queryParams ? `${queryParams}&` : ''}page=${page}&size=10`;
    };
    const MigrateGet = useGlobalRequest(getDynamicUrl(), "GET");
    const districtList = useGlobalRequest(getTuman, "GET");
    const mfyLists = useGlobalRequest(`${mfyList}?districtId=${liveDistrictId}`, "GET");

    const options = [
        {value: "QIDIRUVDA", label: "Qidiruvda"},
        {value: "BIRIGADIR", label: "Brigadir"},
        {value: "BOSHQA", label: "Boshqa"},
    ];

    const districtOp: any[] = districtList?.response?.map((item: any) => ({
        value: item.id, label: item.name
    })) || [];

    const villageOp: any[] = mfyLists?.response?.data?.map((item: any) => ({
        value: item.id, label: item.name
    })) || [];

    const returnOptionType = [
        {value: "UZ_XOXISHI_BILAN_QAYTGAN", label: t("O‘z xohishi bilan qaytganlar")},
        {value: "DEPORTASIYA_BULIB_QAYTGAN", label: t("Deport bo‘lib qaytganlar")},
        {value: "VATANGA_QAYTISH_GUVOHNOMASI_BILAN_QAYTGAN", label: t("Vatanga qaytish guvohnomasi bilan qaytganlar")},
        {value: "MAVSUMIY_QAYTGAN", label: t("Mavsumiy qaytganlar")},
        {value: "BOSHQA", label: t("Boshqa")},
    ];

    useEffect(() => {
        if ((MigrateGet.response?.object?.length > 0) && (
            filterName || lastName || middleName || departureCountryFilter || departureRegionFilter ||
            departureDistrictFilter || datePicker(0, startDoubleDateList) || datePicker(1, startDoubleDateList) ||
            datePicker(0, endDoubleDateList) || datePicker(1, endDoubleDateList) || currentStatusFilter ||
            datePicker(1, doubleDateList) || datePicker(0, doubleDateList) || workplace || liveDistrict || liveVillage
            || genderFilter || disconnect || datePicker(0, disconnectDateList) || datePicker(1, disconnectDateList) ||
            reasonReturning || knowForeignLanguage || currentStatusRet
        )) setIsFilter(true);
        else setIsFilter(false);
    }, [
        MigrateGet.response, MigrateGet.error, filterName, lastName, middleName, departureCountryFilter,
        departureRegionFilter, departureDistrictFilter, datePicker(0, startDoubleDateList),
        datePicker(1, startDoubleDateList), datePicker(0, endDoubleDateList), datePicker(1, endDoubleDateList),
        currentStatusFilter, datePicker(1, doubleDateList), datePicker(0, doubleDateList), workplace, liveDistrict,
        liveVillage, genderFilter, disconnect || datePicker(0, disconnectDateList) || datePicker(1, disconnectDateList),
        reasonReturning || knowForeignLanguage || currentStatusRet
    ])

    useEffect(() => {
        if (MigrateGet.response?.totalElements < 10) setPage(0);
        if (page >= 0 && isFilter) MigrateGet.globalDataFunc().then(() => "");
    }, [page]);

    useEffect(() => {
        districtList.globalDataFunc().then(() => "");
    }, []);

    useEffect(() => {
        if (liveDistrictId) mfyLists.globalDataFunc().then(() => "");
    }, [liveDistrictId]);

    const userDate: UserCardData[] =
        MigrateGet?.response?.object?.map((item: any) => ({
            migrateFirstName: item?.firstName || null,
            migrateLastName: item?.lastName || null,
            migrateMiddleName: item?.middleName || null,
            birthDistrict: item?.birthDistrict || null,
            birthDate: item?.birthDate ? moment(item?.birthDate).format("DD.MM.YYYY") : null,
            departureDate: item?.leavingCountryDate ? moment(item?.leavingCountryDate).format("DD.MM.YYYY") : null,
            departureFinishDate: item?.returningUzbekistanDate ? moment(item?.returningUzbekistanDate).format("DD.MM.YYYY") : null,
            phoneNumber: item?.homeNumber ? item?.homeNumber : null,
            phoneNumberDeparture: item?.phoneNumberDeparture ? item?.phoneNumberDeparture : null,
            disconnectedTime: item?.disconnectedTime || null,
            birthVillage: item?.birthVillage || null,
            departureCountry: item?.departureCountry || null,
            departureRegion: item?.departureRegion || null,
            departureDistrict: item?.departureDistrict || null,
            additionalAddress: item?.additionalAddress || null,
            additionalInfo: item?.additionalInfo || null,
            workplace: item?.workplace || null,
            typeOfActivity: item?.typeOfActivity || null,
            suspiciousCases: item?.suspiciousCases || null,
            createdBy: item?.createdBy || null,
            createdAt: item?.createdAt ? moment(item?.createdAt).format("DD.MM.YYYY") : null,
            updatedBy: item?.updatedBy || null,
            updatedAt: item?.updatedAt ? moment(item?.updatedAt).format("DD.MM.YYYY") : null,
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

    const resetFilter = () => {
        setStartDoubleDateList([]);
        setEndDoubleDateList([]);
        setDoubleDateList([]);
        setWorkplace("");
        setLiveVillage("");
        setLiveDistrict("");
        setLiveDistrictId("");
        setLiveVillageId("");
    }

    const enterClickHandler = async () => {
        setPage(0);
        const hasDisconnectDates = disconnectDateList && disconnectDateList.length > 0;

        if (disconnect === 'true' && !hasDisconnectDates)
            return toast.error(t("Aloqasi uzilgan bo'lsa vaqt oralig'ini xam kiritish majburiy"));

        if (disconnect === 'false' && hasDisconnectDates)
            return toast.error(t("Aloqasi uzilgan bo'lsa vaqt oralig'ini xam kiritish majburiy"));

        await MigrateGet.globalDataFunc();
        setIsFilter(MigrateGet.response?.object?.length > 0);
    };

    return (
        <div className="pt-20 flex flex-col items-center">
            <div className="w-full max-w-[1250px] mt-6 px-4 md:px-8 lg:px-16">
                <div className={'flex flex-col sm:flex-row gap-3'}>
                    <FilterInput
                        name="max"
                        placeholder={t('Malumotlarni izlash')}
                        value={filterName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterName(e.target.value)}
                        onKeyDown={async (e: React.KeyboardEvent<HTMLInputElement>) => {
                            if (e.key === 'Enter') await enterClickHandler()
                            if (e.key === "+" || e.key === "-") e.preventDefault();
                        }}
                        color="text-black"
                        onFilterClick={() => setFilterVisible(!filterVisible)}
                    />
                    <button
                        className={'bg-[#0086D1] text-white py-1 sm:px-8 rounded-xl'}
                        onClick={enterClickHandler}
                    >
                        {t("Qidirish")}
                    </button>
                    <button
                        className={'bg-red-500 text-white rounded-xl py-1 sm:px-5'}
                        onClick={() => {
                            resetFilterAdmin();
                            resetFilter();
                            setIsFilter(false);
                        }}
                    >
                        {t("FilterReset")}
                    </button>
                </div>

                {filterVisible && (
                    <div className="mt-6 w-full">
                        <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                            <TextInput
                                className="w-full"
                                label={t('Ism buyicha')}
                                value={filterName}
                                handleChange={(e) => setFilterName(e.target.value)}
                                placeholder={t('Ism buyicha')}
                                handleOnKeyDown={async (e: React.KeyboardEvent<HTMLInputElement>) => {
                                    if (e.key === 'Enter') await enterClickHandler()
                                }}
                            />
                            <TextInput
                                className="w-full"
                                label={t('Familiya buyicha')}
                                value={lastName}
                                handleChange={(e) => setLastName(e.target.value)}
                                placeholder={t('Familiya buyicha')}
                                handleOnKeyDown={async (e: React.KeyboardEvent<HTMLInputElement>) => {
                                    if (e.key === 'Enter') await enterClickHandler()
                                }}
                            />
                            <TextInput
                                className="w-full"
                                label={t('Sharfi buyicha')}
                                value={middleName}
                                handleChange={(e) => setMiddleName(e.target.value)}
                                placeholder={t('Sharfi buyicha')}
                                handleOnKeyDown={async (e: React.KeyboardEvent<HTMLInputElement>) => {
                                    if (e.key === 'Enter') await enterClickHandler()
                                }}
                            />
                            <TextInput
                                className="w-full"
                                label={t('Migrant ketgan davlat')}
                                value={departureCountryFilter}
                                handleChange={(e) => setDepartureCountryFilter(e.target.value)}
                                placeholder={t('Migrant ketgan davlat')}
                                handleOnKeyDown={async (e: React.KeyboardEvent<HTMLInputElement>) => {
                                    if (e.key === 'Enter') await enterClickHandler()
                                }}
                            />
                            <TextInput
                                className="w-full"
                                label={t('Migrant ketgan viloyat')}
                                value={departureRegionFilter}
                                handleChange={(e) => setDepartureRegionFilter(e.target.value)}
                                placeholder={t('Migrant ketgan viloyat')}
                                handleOnKeyDown={async (e: React.KeyboardEvent<HTMLInputElement>) => {
                                    if (e.key === 'Enter') await enterClickHandler()
                                }}
                            />
                            <TextInput
                                className="w-full"
                                label={t('Migrant ketgan tuman')}
                                value={departureDistrictFilter}
                                handleChange={(e) => setDepartureDistrictFilter(e.target.value)}
                                placeholder={t('Migrant ketgan tuman')}
                                handleOnKeyDown={async (e: React.KeyboardEvent<HTMLInputElement>) => {
                                    if (e.key === 'Enter') await enterClickHandler()
                                }}
                            />
                            <TextInput
                                className="w-full"
                                label={t('Ish joyi')}
                                value={workplace}
                                handleChange={(e) => setWorkplace(e.target.value)}
                                placeholder={t('Ish joyi')}
                                handleOnKeyDown={async (e: React.KeyboardEvent<HTMLInputElement>) => {
                                    if (e.key === 'Enter') await enterClickHandler()
                                }}
                            />
                            <div className="flex flex-col w-full">
                                <label className="block text-gray-700  ">{t('Migrant ketgan sana')}</label>
                                <RangePicker
                                    placeholder={[`${t('Boshlanish')}`, `${t('Tugash')}`]}
                                    value={startDoubleDateList}
                                    className={`p-2`}
                                    onChange={(date) => setStartDoubleDateList(date)}
                                    onKeyDown={async e => {
                                        if (e.key === "Enter") await enterClickHandler()
                                    }}
                                />
                            </div>
                            <div className="flex flex-col w-full">
                                <label className="block text-gray-700  ">{t('Migrant kelgan sana')}</label>
                                <RangePicker
                                    placeholder={[`${t('Boshlanish')}`, `${t('Tugash')}`]}
                                    value={endDoubleDateList}
                                    className={`p-2`}
                                    onChange={(date) => setEndDoubleDateList(date)}
                                    onKeyDown={async e => {
                                        if (e.key === "Enter") await enterClickHandler()
                                    }}
                                />
                            </div>
                            <div className="flex flex-col w-full">
                                <label className="block text-gray-700  ">{t("Tug'ilgan yil oralig'i")}</label>
                                <RangePicker
                                    placeholder={[`${t('Boshlanish')}`, `${t('Tugash')}`]}
                                    value={doubleDateList}
                                    className={`p-2`}
                                    onChange={(date) => setDoubleDateList(date)}
                                    onKeyDown={async e => {
                                        if (e.key === "Enter") await enterClickHandler()
                                    }}
                                />
                            </div>
                            <AntdSelect
                                label={t('Statusni tanlang')}
                                value={currentStatusFilter}
                                handleChange={(e) => setCurrentStatusFilter(e)}
                                options={options}
                            />
                            <SelectInput
                                label={t('Tuman tanlang')}
                                value={liveDistrictId}
                                handleChange={(e) => {
                                    const name = e.target.options[e.target.selectedIndex]
                                    setLiveDistrict(name.textContent)
                                    setLiveDistrictId(e.target.value);
                                }}
                                options={districtOp}
                                pad={'p-2'}
                            />
                            <SelectInput
                                label={t('Mfy tanlang')}
                                value={liveVillageId}
                                handleChange={(e) => {
                                    const name = e.target.options[e.target.selectedIndex]
                                    setLiveVillage(name.textContent);
                                    setLiveVillageId(e.target.value);
                                }}
                                options={villageOp}
                                pad={'p-2'}
                            />
                            <AntdSelect
                                label={t("jins tanlang")}
                                value={genderFilter}
                                handleChange={(e) => setGenderFilter(e)}
                                options={optionGender}
                            />
                            <AntdSelect
                                options={[
                                    {value: 'true', label: t('Ha')},
                                    {value: 'false', label: t("Yo'q")}
                                ]}
                                value={disconnect}
                                handleChange={e => {
                                    if (disconnect !== 'true') setDisconnectDateList([])
                                    setDisconnect(e)
                                }}
                                label={t("Aloqasi uzilganmi")}
                            />
                            <div className="w-full">
                                <label className="block text-gray-700">{t("Aloqasi uzilgan vaqt oralig'i")}</label>
                                <RangePicker
                                    className="p-2 w-full"
                                    value={disconnectDateList}
                                    allowClear
                                    disabled={[disconnect !== 'true', disconnect !== 'true']}
                                    placeholder={[`${t('Boshlanish')}`, `${t('Tugash')}`]}
                                    onChange={(dates) => setDisconnectDateList(dates)}
                                    format="YYYY-MM-DD"
                                    onKeyDown={async e => {
                                        if (e.key === "Enter") await enterClickHandler()
                                    }}
                                />
                            </div>
                            <AntdSelect
                                label={t("status type")}
                                value={reasonReturning}
                                handleChange={(e) => setReasonReturning(e)}
                                options={returnOptionType}
                            />
                            <AntdSelect
                                options={[
                                    {value: 'true', label: t('Ha')},
                                    {value: 'false', label: t("Yo'q")}
                                ]}
                                value={knowForeignLanguage}
                                handleChange={e => setKnowForeignLanguage(e)}
                                label={t("Chet tilini biladimi")}
                            />
                            <AntdSelect
                                options={[
                                    {value: "BANDLIGI_TAMINLANGAN", label: t("Bandligi taminlangan")},
                                    {value: "VAQTINCHA_ISHSIZ", label: t("Vaqrincha ishsiz")},
                                    {value: "QAYTIB_KETISH_ISTAGIDA", label: t("Qaytib ketish istagida")}
                                ]}
                                handleChange={e => setCurrentStatusRet(e)}
                                value={currentStatusRet}
                                label={t("Qaytganlarni xozirgi xolati")}
                            />
                        </div>
                    </div>
                )}
            </div>

            {isFilter ? (
                <div className="w-full max-w-6xl mx-auto mt-4 p-5 md:p-4">
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
                    <div className="flex justify-center my-5">
                        <Pagination
                            showSizeChanger={false}
                            responsive={true}
                            defaultCurrent={1}
                            current={page + 1}
                            total={MigrateGet.response?.totalElements ? MigrateGet.response?.totalElements : 0}
                            onChange={(p: number) => setPage(p - 1)}
                            rootClassName={`mt-8 mb-5`}
                        />
                    </div>
                </div>
            ) : <TabsMigrant tabs={tabs}/>}
        </div>
    );
}

export default Dashboard;
