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
        currentStatusFilter
    } = useFilterStore();
    const [filterVisible, setFilterVisible] = useState<boolean>(false);
    // const [inputValue, setInputValue] = useState<string>('');

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

    return (
        <div className="flex justify-center min-h-screen bg-gray-100 pt-20">
            <div className="w-full max-w-[1250px] container mt-6 px-4 md:px-8 lg:px-16">
                {/* Filter Input */}
                <FilterInput
                    name="max"
                    placeholder={t("Malumotlarni izlash")}
                    value={filterName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterName(e.target.value)}
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === "+" || e.key === "-") e.preventDefault();
                    }}
                    color="text-black"
                    onFilterClick={() => setFilterVisible(!filterVisible)}
                />

                {/* Conditional Filter Form */}
                {filterVisible && (
                    <div className="mt-6">
                        <div className="mb-6 flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                            <TextInput
                                className="w-full"
                                label={t("Ism va familiya")}
                                value={filterName}
                                handleChange={(e) => setFilterName(e.target.value)}
                                placeholder={t("Ism va familiya")}
                            />
                            <TextInput
                                className="w-full"

                                label={t("Migrant ketgan davlat")}
                                value={departureCountryFilter}
                                handleChange={(e) => setDepartureCountryFilter(e.target.value)}
                                placeholder={t("Migrant ketgan davlat")}
                            />
                            <TextInput
                                className="w-full"

                                label={t("Migrant ketgan viloyat")}
                                value={departureRegionFilter}
                                handleChange={(e) => setDepartureRegionFilter(e.target.value)}
                                placeholder={t("Migrant ketgan viloyat")}
                            />
                            <TextInput
                                className="w-full"

                                label={t("Migrant ketgan tuman")}
                                value={departureDistrictFilter}
                                handleChange={(e) => setDepartureDistrictFilter(e.target.value)}
                                placeholder={t("Migrant ketgan tuman")}
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
                                    className="p-3 w-full"
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

                {/* Tabs and Content */}
                <TabsMigrant tabs={tabs}/>
            </div>
        </div>
    );
};

export default KichikOfficer;
