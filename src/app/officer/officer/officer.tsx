import React, {useEffect, useState} from "react";
import {Tab} from "../../../helpers/constants/types";
import TabsMigrant from "../../../components/tabs/tab";
import FilterInput from "../../../components/inputs/filterInput";
import MigrantTable from "./infoCreate/migrantTable";
import TextInput from "../../../components/inputs/text-input";
import useFilterStore from "../../../helpers/state-managment/filterStore/filterStore";
import SelectInput from "../../../components/inputs/selectInput"
import {useTranslation} from "react-i18next";
import {DatePicker} from 'antd';
import {useGlobalRequest} from "../../../helpers/functions/universal.tsx";
import {getTuman} from "../../../helpers/api/api.tsx";

const {RangePicker} = DatePicker;

const Officer: React.FC = () => {
    const {t} = useTranslation()
    const {
        filterName, setFilterName, departureCountryFilter, setDepartureCountryFilter, departureRegionFilter,
        setDepartureRegionFilter, departureDistrictFilter, setDepartureDistrictFilter, departureStartFilter,
        setDepartureStartFilter, setDepartureFinish, departureFinish, setCurrentStatusFilter, currentStatusFilter,
        setBirthDateRange, setClickHandler, setLastName, setMiddleName, birthDateRange, lastName, middleName,
        resetFilter, workPlace, setWorkPlace, liveDistrictId, setLiveDistrictId, setLiveDistrict
    } = useFilterStore();
    const [filterVisible, setFilterVisible] = useState<boolean>(false);

    const districtList = useGlobalRequest(getTuman, "GET");

    useEffect(() => {
        districtList?.globalDataFunc();
    }, []);

    const options = [
        {value: "QIDIRUVDA", label: `${t('Qidiruv')}`},
        {value: "BIRIGADIR", label: `${t('Brigadeler')}`},
        {value: "BOSHQA", label: `${t('Boshqa')}`},
    ];

    const districtOp: any[] = districtList?.response?.map((item: any) => ({
        value: item.id, label: item.name
    })) || [];

    const tabs: Tab[] = [
        {
            id: 2,
            title: `${t("Horijdagi Migrantlar")}`,
            content: <MigrantTable/>
        },
    ];

    return (
        <div className="flex justify-center min-h-screen bg-gray-100 pt-20 ">
            <div className="w-full max-w-[1250px] container mt-6 px-4 md:px-8 lg:px-16">
                {/* Filter Input */}
                <div className={'flex flex-col sm:flex-row gap-3 mb-5'}>
                    <FilterInput
                        name="max"
                        placeholder={t("Malumotlarni izlash")}
                        value={filterName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterName(e.target.value)}
                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                            if (e.key === "Enter") setClickHandler(true)
                            if (e.key === "+" || e.key === "-") e.preventDefault();
                        }}
                        color="text-black"
                        onFilterClick={() => setFilterVisible(!filterVisible)}
                    />
                    <button
                        className={'bg-[#0086D1] text-white py-1.5 px-8 rounded-xl'}
                        onClick={() => setClickHandler(true)}
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

                {/* Conditional Filter Form */}
                {filterVisible && (
                    <div className="mt-6">
                        <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                            <TextInput
                                className="w-full"
                                label={t("Ism buyicha")}
                                value={filterName}
                                handleChange={(e) => setFilterName(e.target.value)}
                                placeholder={t("Ism buyicha")}
                                handleOnKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                    if (e.key === "Enter") setClickHandler(true)
                                }}
                            />
                            <TextInput
                                className="w-full"
                                label={t("Familiya buyicha")}
                                value={lastName}
                                handleChange={(e) => setLastName(e.target.value)}
                                placeholder={t("Familiya buyicha")}
                                handleOnKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                    if (e.key === "Enter") setClickHandler(true)
                                }}
                            />
                            <TextInput
                                className="w-full"
                                label={t("Sharfi buyicha")}
                                value={middleName}
                                handleChange={(e) => setMiddleName(e.target.value)}
                                placeholder={t("Sharfi buyicha")}
                                handleOnKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                    if (e.key === "Enter") setClickHandler(true)
                                }}
                            />
                            <TextInput
                                className="w-full"
                                label={t("Migrant ketgan davlat")}
                                value={departureCountryFilter}
                                handleChange={(e) => setDepartureCountryFilter(e.target.value)}
                                placeholder={t("Migrant ketgan davlat")}
                                handleOnKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                    if (e.key === "Enter") setClickHandler(true)
                                }}
                            />
                            <TextInput
                                className="w-full"
                                label={t("Migrant ketgan viloyat")}
                                value={departureRegionFilter}
                                handleChange={(e) => setDepartureRegionFilter(e.target.value)}
                                placeholder={t("Migrant ketgan viloyat")}
                                handleOnKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                    if (e.key === "Enter") setClickHandler(true)
                                }}
                            />
                            <TextInput
                                className="w-full"
                                label={t("Migrant ketgan tuman")}
                                value={departureDistrictFilter}
                                handleChange={(e) => setDepartureDistrictFilter(e.target.value)}
                                placeholder={t("Migrant ketgan tuman")}
                                handleOnKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                    if (e.key === "Enter") setClickHandler(true)
                                }}
                            />
                            <TextInput
                                className="w-full"
                                label={t("Ish joyi")}
                                value={workPlace}
                                handleChange={(e) => setWorkPlace(e.target.value)}
                                placeholder={t("Ish joyi")}
                                handleOnKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                    if (e.key === "Enter") setClickHandler(true)
                                }}
                            />
                            <div className="w-full">
                                <label className="block text-gray-700">{t("Migrant ketgan sana")}</label>
                                <RangePicker
                                    className="p-3 w-full"
                                    allowClear
                                    value={departureStartFilter}
                                    placeholder={[`${t('Boshlanish')}`, `${t('Tugash')}`]}
                                    onChange={(dates) => setDepartureStartFilter(dates)}
                                    format="YYYY-MM-DD"
                                    onKeyDown={e => {
                                        if (e.key === "Enter") setClickHandler(true)
                                    }}
                                />
                            </div>
                            <div className="w-full">
                                <label className="block text-gray-700">{t("Migrant kelgan sana")}</label>
                                <RangePicker
                                    className="p-3 w-full"
                                    allowClear
                                    value={departureFinish}
                                    placeholder={[`${t('Boshlanish')}`, `${t('Tugash')}`]}
                                    onChange={(dates) => setDepartureFinish(dates)}
                                    format="YYYY-MM-DD"
                                    onKeyDown={e => {
                                        if (e.key === "Enter") setClickHandler(true)
                                    }}
                                />
                            </div>
                            <div className="w-full">
                                <label className="block text-gray-700">{t("Tug'ilgan yil oralig'i")}</label>
                                <RangePicker
                                    className="p-3 w-full"
                                    allowClear
                                    value={birthDateRange}
                                    placeholder={[`${t('Boshlanish')}`, `${t('Tugash')}`]}
                                    onChange={(dates) => setBirthDateRange(dates)}
                                    format="YYYY-MM-DD"
                                    onKeyDown={e => {
                                        if (e.key === "Enter") setClickHandler(true)
                                    }}
                                />
                            </div>
                            <SelectInput
                                label={t("Tuman tanlang")}
                                value={liveDistrictId}
                                handleChange={(e) => {
                                    const name: string | any = e.target.options[e.target.selectedIndex].textContent
                                    setLiveDistrict(name)
                                    setLiveDistrictId(e.target.value);
                                }}
                                options={districtOp}
                                className="w-full"
                            />
                            <div className="relative w-full">
                                <SelectInput
                                    label={t("Statusni tanlang")}
                                    value={currentStatusFilter}
                                    handleChange={(e) => setCurrentStatusFilter(e.target.value)}
                                    options={options}
                                    className="w-full"
                                />

                                {/* X tugmasi faqat tanlangan qiymat bo'lsa ko'rsatiladi */}
                                {currentStatusFilter && (
                                    <button
                                        onClick={() => setCurrentStatusFilter("")}
                                        className="absolute top-10 right-5"
                                    >
                                        ✖
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                <div className="w-full">
                    <TabsMigrant tabs={tabs}/>
                </div>
            </div>
        </div>
    );
};

export default Officer;
