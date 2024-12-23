import React, { useEffect, useState } from "react";
import { Tab } from "../../../helpers/constants/types";
import TabsMigrant from "../../../components/tabs/tab";
import InfoCreate from "./infoCreate/infoCreate";
import FilterForm from "./infoCreate/filter";
import FilterInput from "../../../components/inputs/filterInput";
import MigrantTable from "./infoCreate/migrantTable";
import TextInput from "../../../components/inputs/text-input";
import useFilterStore from "../../../helpers/state-managment/filterStore/filterStore";
import DateInput from "../../../components/inputs/date-input";
import SelectInput from "../../../components/inputs/selectInput";

const Officer: React.FC = () => {
    const { filterName, setFilterName, departureCountryFilter, setDepartureCountryFilter,
        departureRegionFilter, setDepartureRegionFilter, departureDistrictFilter, setDepartureDistrictFilter,
        departureStartFilter, setDepartureStartFilter, setDepartureFinish, departureFinish, birthFinishFilter, setBirthFinishFilter
        , birthStartFilter, setBirthStartFilter, setCurrentStatusFilter, currentStatusFilter } = useFilterStore();
    const [inputValue, setInputValue] = useState<string>('');
    const [filterVisible, setFilterVisible] = useState<boolean>(false);

    const options = [
        { value: "QIDIRUVDA", label: "Qidiruvda" },
        { value: "BIRIGADIR", label: "Brigadir" },
        { value: "BOSHQA", label: "Boshqa" },
    ];


    const tabs: Tab[] = [
        // 
        {
            id: 2,
            title: "Horijdagi Migrantlar",
            content: (
                <div className="">
                    <MigrantTable />
                </div>
            )
        },
    ];
    return (
        <div className="flex justify-center min-h-screen bg-gray-100 pt-20 " >
            <div className="w-full container mt-6 px-4 md:px-8 lg:px-16">
                {/* Filter Input */}
                <FilterInput
                    name="max"
                    placeholder="Ma’lumotlarni izlash"
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
                                label={"Ism va familiya"}
                                value={filterName}
                                handleChange={(e) => setFilterName(e.target.value)}
                                placeholder={"Ism va familiya "}
                            />
                            <TextInput
                                label={"Migrant ketgan davlat"}
                                value={departureCountryFilter}
                                handleChange={(e) => setDepartureCountryFilter(e.target.value)}
                                placeholder={"Migrant ketgan davlat"}
                            />
                            <TextInput
                                label={"Migrant ketgan viloyat"}
                                value={departureRegionFilter}
                                handleChange={(e) => setDepartureRegionFilter(e.target.value)}
                                placeholder={"Migrant ketgan viloyat"}
                            />
                            <TextInput
                                label={"Migrant ketgan tuman"}
                                value={departureDistrictFilter}
                                handleChange={(e) => setDepartureDistrictFilter(e.target.value)}
                                placeholder={"Migrant ketgan tuman"}
                            />
                        </div>
                        <div className="mb-6 flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                            <DateInput
                                label={"Migrant ketgan sana"}
                                value={departureStartFilter}
                                handleChange={(e) => setDepartureStartFilter(e.target.value)}
                                placeholder={"Migrant ketgan sana"}
                            />
                            <DateInput
                                label={"Migrant kelgan sana"}
                                value={departureFinish}
                                handleChange={(e) => setDepartureFinish(e.target.value)}
                                placeholder={"Migrant kelgan sana"}
                            />
                            <DateInput
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
                            />
                            <div className="relative w-full">
                                <SelectInput
                                    label="Statusni tanlang"
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
                <TabsMigrant tabs={tabs} />
            </div>
        </div>
    );
};

export default Officer;
