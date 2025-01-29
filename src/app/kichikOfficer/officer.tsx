import React, {useEffect, useState} from "react";
import {Tab} from "../../helpers/constants/types";
import InfoCreate from "../officer/officer/infoCreate/infoCreate";
import MigrantTable from "../officer/officer/infoCreate/migrantTable";
import FilterInput from "../../components/inputs/filterInput";
import TextInput from "../../components/inputs/text-input";
import TabsMigrant from "../../components/tabs/tab";
import useFilterStore from "../../helpers/state-managment/filterStore/filterStore";
import {useTranslation} from "react-i18next";
import {DatePicker} from 'antd';
import {optionGender} from "../../helpers/constants/const.ts";
import AntdSelect from "../../components/inputs/antd-select.tsx";
import {toast} from "sonner";

const {RangePicker} = DatePicker;

const KichikOfficer: React.FC = () => {
    const {t} = useTranslation()
    const {
        filterName, setFilterName, departureCountryFilter, setDepartureCountryFilter, departureRegionFilter,
        setDepartureRegionFilter, departureDistrictFilter, setDepartureDistrictFilter, departureStartFilter,
        setDepartureStartFilter, setBirthDateRange, departureFinish, setDepartureFinish, setCurrentStatusFilter,
        currentStatusFilter, setClickHandler, setPage, lastName, setLastName, middleName, setMiddleName,
        birthDateRange, resetFilter, workPlace, setWorkPlace, genderFilter, setGenderFilter, disconnect, setDisconnect,
        disconnectDateList, setDisconnectDateList, reasonReturning, setReasonReturning, knowForeignLanguage,
        setKnowForeignLanguage, currentStatusRet, setCurrentStatusRet
    } = useFilterStore();
    const [filterVisible, setFilterVisible] = useState<boolean>(false);
    const [idIn, setIdIn] = useState<number>(0);

    useEffect(() => {
        if (idIn === 1) setFilterVisible(false);
    }, [idIn]);

    const options = [
        {value: "QIDIRUVDA", label: t("Qidiruvda")},
        {value: "BIRIGADIR", label: t("Brigadeler")},
        {value: "BOSHQA", label: t("Boshqa")},
    ];

    const returnOptionType = [
        {value: "UZ_XOXISHI_BILAN_QAYTGAN", label: t("O‘z xohishi bilan qaytganlar")},
        {value: "DEPORTASIYA_BULIB_QAYTGAN", label: t("Deport bo‘lib qaytganlar")},
        {value: "VATANGA_QAYTISH_GUVOHNOMASI_BILAN_QAYTGAN", label: t("Vatanga qaytish guvohnomasi bilan qaytganlar")},
        {value: "MAVSUMIY_QAYTGAN", label: t("Mavsumiy qaytganlar")},
        {value: "BOSHQA", label: t("Boshqa")},
    ];

    const tabs: Tab[] = [
        {
            id: 1,
            title: t("Migrant qo’shish"),
            content: <InfoCreate/>
        },
        {
            id: 2,
            title: t("Horijdagi Migrantlar"),
            content: <MigrantTable/>
        },
    ];

    const enterClickHandler = () => {
        const hasDisconnectDates = disconnectDateList && disconnectDateList.length > 0;

        if (disconnect === 'true' && !hasDisconnectDates)
            return toast.error(t("Aloqasi uzilgan bo'lsa vaqt oralig'ini xam kiritish majburiy"));

        if (disconnect === 'false' && hasDisconnectDates)
            return toast.error(t("Aloqasi uzilgan bo'lsa vaqt oralig'ini xam kiritish majburiy"));

        setPage(0);
        setClickHandler(true);
    }

    return (
        <div className="flex justify-center min-h-screen bg-gray-100 pt-20">
            <div className="w-full max-w-[1250px] container mt-6 px-4 md:px-8 lg:px-16">
                {/* Filter Input */}
                {idIn === 2 && (
                    <div className={'flex flex-col sm:flex-row gap-3'}>
                        <FilterInput
                            name="max"
                            placeholder={t("Malumotlarni izlash")}
                            value={filterName}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterName(e.target.value)}
                            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                if (e.key === "Enter") enterClickHandler();
                                if (e.key === "+" || e.key === "-") e.preventDefault();
                            }}
                            color="text-black"
                            onFilterClick={() => setFilterVisible(!filterVisible)}
                        />
                        <button
                            className={'bg-[#0086D1] text-white py-1.5 px-8 rounded-xl'}
                            onClick={() => enterClickHandler()}
                        >
                            {t("Qidirish")}
                        </button>
                        <button
                            className={'bg-red-500 text-white rounded-xl py-1.5 px-5'}
                            onClick={() => resetFilter()}
                        >
                            {t("FilterReset")}
                        </button>
                    </div>
                )}

                {/* Conditional Filter Form */}
                {filterVisible && (
                    <div className="mt-6">
                        <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                            <TextInput
                                label={t("Ism buyicha")}
                                value={filterName}
                                handleChange={(e) => setFilterName(e.target.value)}
                                placeholder={t("Ism buyicha")}
                                handleOnKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                    if (e.key === "Enter") enterClickHandler()
                                }}
                            />
                            <TextInput
                                label={t("Familiya buyicha")}
                                value={lastName}
                                handleChange={(e) => setLastName(e.target.value)}
                                placeholder={t("Familiya buyicha")}
                                handleOnKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                    if (e.key === "Enter") enterClickHandler()
                                }}
                            />
                            <TextInput
                                label={t("Sharfi buyicha")}
                                value={middleName}
                                handleChange={(e) => setMiddleName(e.target.value)}
                                placeholder={t("Sharfi buyicha")}
                                handleOnKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                    if (e.key === "Enter") enterClickHandler()
                                }}
                            />
                            <TextInput
                                label={t("Migrant ketgan davlat")}
                                value={departureCountryFilter}
                                handleChange={(e) => setDepartureCountryFilter(e.target.value)}
                                placeholder={t("Migrant ketgan davlat")}
                                handleOnKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                    if (e.key === "Enter") enterClickHandler()
                                }}
                            />
                            <TextInput
                                label={t("Migrant ketgan viloyat")}
                                value={departureRegionFilter}
                                handleChange={(e) => setDepartureRegionFilter(e.target.value)}
                                placeholder={t("Migrant ketgan viloyat")}
                                handleOnKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                    if (e.key === "Enter") enterClickHandler()
                                }}
                            />
                            <TextInput
                                label={t("Migrant ketgan tuman")}
                                value={departureDistrictFilter}
                                handleChange={(e) => setDepartureDistrictFilter(e.target.value)}
                                placeholder={t("Migrant ketgan tuman")}
                                handleOnKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                    if (e.key === "Enter") enterClickHandler()
                                }}
                            />
                            <TextInput
                                label={t("Ish joyi")}
                                value={workPlace}
                                handleChange={(e) => setWorkPlace(e.target.value)}
                                placeholder={t("Ish joyi")}
                                handleOnKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                    if (e.key === "Enter") enterClickHandler()
                                }}
                            />
                            <div className="w-full">
                                <label className="block text-gray-700">{t("Migrant ketgan sana")}</label>
                                <RangePicker
                                    className="p-2 w-full"
                                    allowClear
                                    value={departureStartFilter}
                                    placeholder={[`${t('Boshlanish')}`, `${t('Tugash')}`]}
                                    onChange={(dates) => setDepartureStartFilter(dates)}
                                    format="YYYY-MM-DD"
                                    onKeyDown={e => {
                                        if (e.key === "Enter") enterClickHandler()
                                    }}
                                />
                            </div>
                            <div className="w-full">
                                <label className="block text-gray-700">{t("Migrant kelgan sana")}</label>
                                <RangePicker
                                    className="p-2 w-full"
                                    allowClear
                                    value={departureFinish}
                                    placeholder={[`${t('Boshlanish')}`, `${t('Tugash')}`]}
                                    onChange={(dates) => setDepartureFinish(dates)}
                                    format="YYYY-MM-DD"
                                    onKeyDown={e => {
                                        if (e.key === "Enter") enterClickHandler()
                                    }}
                                />
                            </div>
                            <div className="w-full">
                                <label className="block text-gray-700">{t("Tug'ilgan yil oralig'i")}</label>
                                <RangePicker
                                    className="p-2 w-full"
                                    value={birthDateRange}
                                    allowClear
                                    placeholder={[`${t('Boshlanish')}`, `${t('Tugash')}`]}
                                    onChange={(dates) => setBirthDateRange(dates)}
                                    format="YYYY-MM-DD"
                                    onKeyDown={e => {
                                        if (e.key === "Enter") enterClickHandler()
                                    }}
                                />
                            </div>
                            <AntdSelect
                                label={t("Statusni tanlang")}
                                value={currentStatusFilter}
                                handleChange={(e) => setCurrentStatusFilter(e)}
                                options={options}
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
                                    onKeyDown={e => {
                                        if (e.key === "Enter") enterClickHandler()
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

                {/* Tabs and Content */}
                <TabsMigrant tabs={tabs} setIdIn={setIdIn}/>
            </div>
        </div>
    );
};

export default KichikOfficer;
