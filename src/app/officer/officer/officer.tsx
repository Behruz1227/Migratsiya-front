import React, {useState} from "react";
import {Tab} from "../../../helpers/constants/types";
import TabsMigrant from "../../../components/tabs/tab";
import FilterInput from "../../../components/inputs/filterInput";
import MigrantTable from "./infoCreate/migrantTable";
import TextInput from "../../../components/inputs/text-input";
import useFilterStore from "../../../helpers/state-managment/filterStore/filterStore";
import DateInput from "../../../components/inputs/date-input";
import SelectInput from "../../../components/inputs/selectInput"
import {useTranslation} from "react-i18next";
import {DatePicker} from 'antd';

const {RangePicker} = DatePicker;

const Officer: React.FC = () => {
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
        setDepartureFinish,
        departureFinish,
        setCurrentStatusFilter,
        currentStatusFilter,
        setBirthDateRange,
        setClickHandler
    } = useFilterStore();
    const [filterVisible, setFilterVisible] = useState<boolean>(false);

    const options = [
        {value: "QIDIRUVDA", label: `${t('Qidiruv')}`},
        {value: "BIRIGADIR", label: `${t('Brigadeler')}`},
        {value: "BOSHQA", label: `${t('Boshqa')}`},
    ];

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
                <div className={'flex flex-row gap-3'}>
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
                        className={'bg-[#0086D1] text-white px-8 rounded-xl'}
                        onClick={() => setClickHandler(true)}
                    >
                        {t("Qidirish")}
                    </button>
                </div>

                {/* Conditional Filter Form */}
                {filterVisible && (
                    <div className="mt-6">
                        <div className="mb-6 flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                            <TextInput
                                className="w-full"
                                label={t('Ism va familiya')}
                                value={filterName}
                                handleChange={(e) => setFilterName(e.target.value)}
                                placeholder={t("Ism va familiya")}
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
                        </div>
                        <div className="mb-6 flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                            <DateInput
                                className="w-full"
                                label={t("Migrant ketgan sana")}
                                value={departureStartFilter}
                                handleChange={(e) => setDepartureStartFilter(e.target.value)}
                                placeholder={t("Migrant ketgan sana")}
                            />
                            <DateInput
                                className="w-full"
                                label={t("Migrant kelgan sana")}
                                value={departureFinish}
                                handleChange={(e) => setDepartureFinish(e.target.value)}
                                placeholder={t("Migrant kelgan sana")}
                            />
                            <div className="w-full">
                                <label className="block text-gray-700">{t("Tug'ilgan yil oralig'i")}</label>
                                <RangePicker
                                    className="p-3"
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

                <div className="w-full">
                    <TabsMigrant tabs={tabs}/>
                </div>
            </div>
        </div>
    );
};

export default Officer;
