import React, {useState} from "react";
import {Tab} from "../../helpers/constants/types";
import InfoCreate from "../officer/officer/infoCreate/infoCreate";
import MigrantTable from "../officer/officer/infoCreate/migrantTable";
import FilterInput from "../../components/inputs/filterInput";
import TextInput from "../../components/inputs/text-input";
import DateInput from "../../components/inputs/date-input";
import SelectInput from "../../components/inputs/selectInput";
import TabsMigrant from "../../components/tabs/tab";
import useFilterStore from "../../helpers/state-managment/filterStore/filterStore";
import {useTranslation} from "react-i18next";
import {DatePicker} from 'antd';

const {RangePicker} = DatePicker;

const KichikOfficer: React.FC = () => {
    const {t} = useTranslation()
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
        setBirthDateRange,
        departureFinish,
        setDepartureFinish,
        setCurrentStatusFilter,
        currentStatusFilter,
        setClickHandler,
        setPage,
        lastName,
        setLastName,
        middleName,
        setMiddleName,
        birthDateRange,
    } = useFilterStore();
    const [filterVisible, setFilterVisible] = useState<boolean>(false);
    const [idIn, setIdIn] = useState<number>(0);

    const options = [
        {value: "QIDIRUVDA", label: t("Qidiruvda")},
        {value: "BIRIGADIR", label: t("Brigadeler")},
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
        setPage(0);
        setClickHandler(true);
    }

    const resetFilter = () => {
        setFilterName('');
        setLastName('');
        setMiddleName('');
        setDepartureCountryFilter('');
        setDepartureRegionFilter('');
        setDepartureDistrictFilter('');
        setDepartureStartFilter('');
        setDepartureFinish('');
        setBirthDateRange(null);
        setCurrentStatusFilter('');
        setClickHandler(true);
    }

    return (
        <div className="flex justify-center min-h-screen bg-gray-100 pt-20">
            <div className="w-full max-w-[1250px] container mt-6 px-4 md:px-8 lg:px-16">
                {/* Filter Input */}
                {idIn === 2 && (
                    <div className={'flex flex-row gap-3'}>
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
                            className={'bg-[#0086D1] text-white px-8 rounded-xl'}
                            onClick={() => enterClickHandler()}
                        >
                            {t("Qidirish")}
                        </button>
                        <button
                            className={'bg-red-500 text-white rounded-xl px-5'}
                            onClick={() => resetFilter()}
                        >
                            {t("FilterReset")}
                        </button>
                    </div>
                )}

                {/* Conditional Filter Form */}
                {filterVisible && (
                    <div className="mt-6">
                        <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                            <TextInput
                                className="w-full"
                                label={t("Ism buyicha")}
                                value={filterName}
                                handleChange={(e) => setFilterName(e.target.value)}
                                placeholder={t("Ism buyicha")}
                                handleOnKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                    if (e.key === "Enter") enterClickHandler()
                                }}
                            />
                            <TextInput
                                className="w-full"
                                label={t("Familiya buyicha")}
                                value={lastName}
                                handleChange={(e) => setLastName(e.target.value)}
                                placeholder={t("Familiya buyicha")}
                                handleOnKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                    if (e.key === "Enter") enterClickHandler()
                                }}
                            />
                            <TextInput
                                className="w-full"
                                label={t("Sharfi buyicha")}
                                value={middleName}
                                handleChange={(e) => setMiddleName(e.target.value)}
                                placeholder={t("Sharfi buyicha")}
                                handleOnKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                    if (e.key === "Enter") enterClickHandler()
                                }}
                            />
                            <TextInput
                                className="w-full"
                                label={t("Migrant ketgan davlat")}
                                value={departureCountryFilter}
                                handleChange={(e) => setDepartureCountryFilter(e.target.value)}
                                placeholder={t("Migrant ketgan davlat")}
                                handleOnKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                    if (e.key === "Enter") enterClickHandler()
                                }}
                            />
                            <TextInput
                                className="w-full"
                                label={t("Migrant ketgan viloyat")}
                                value={departureRegionFilter}
                                handleChange={(e) => setDepartureRegionFilter(e.target.value)}
                                placeholder={t("Migrant ketgan viloyat")}
                                handleOnKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                    if (e.key === "Enter") enterClickHandler()
                                }}
                            />
                            <TextInput
                                className="w-full"
                                label={t("Migrant ketgan tuman")}
                                value={departureDistrictFilter}
                                handleChange={(e) => setDepartureDistrictFilter(e.target.value)}
                                placeholder={t("Migrant ketgan tuman")}
                                handleOnKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                    if (e.key === "Enter") enterClickHandler()
                                }}
                            />
                            <DateInput
                                className="w-full"
                                label={t("Migrant ketgan sana")}
                                value={departureStartFilter}
                                handleChange={(e) => setDepartureStartFilter(e.target.value)}
                                placeholder={t("Migrant ketgan sana")}
                                handleOnKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                    if (e.key === "Enter") enterClickHandler()
                                }}

                            />
                            <DateInput
                                className="w-full"
                                label={t("Migrant kelgan sana")}
                                value={departureFinish}
                                handleChange={(e) => setDepartureFinish(e.target.value)}
                                placeholder={t("Migrant kelgan sana")}
                                handleOnKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                    if (e.key === "Enter") enterClickHandler()
                                }}
                            />
                            <div className="w-full">
                                <label className="block text-gray-700">{t("Tug'ilgan yil oralig'i")}</label>
                                <RangePicker
                                    className="p-3 w-full"
                                    value={birthDateRange}
                                    allowClear
                                    placeholder={['Tug\'ilgan kundan', 'Tug\'ilgan kungacha']}
                                    onChange={(dates) => setBirthDateRange(dates)}
                                    format="YYYY-MM-DD"
                                />
                            </div>
                            <div className="relative w-full">
                                <SelectInput
                                    label={t("Statusni tanlang")}
                                    value={currentStatusFilter}
                                    handleChange={(e) => setCurrentStatusFilter(e.target.value)}
                                    options={options}
                                    className="w-full"
                                />
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

                {/* Tabs and Content */}
                <TabsMigrant tabs={tabs} setIdIn={setIdIn}/>
            </div>
        </div>
    );
};

export default KichikOfficer;
