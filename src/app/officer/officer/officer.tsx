import React, { useEffect, useState } from "react";
import { Tab } from "../../../helpers/constants/types";
import TabsMigrant from "../../../components/tabs/tab";
import InfoCreate from "./infoCreate/infoCreate";
import FilterForm from "./infoCreate/filter";
import Tables, { IThead } from "../../../components/table";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useGlobalRequest } from "../../../helpers/functions/universal";
import { getMigrate } from "../../../helpers/api/api";
import FilterInput from "../../../components/inputs/filterInput";
import MigrantTable from "./infoCreate/migrantTable";

const Officer: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const [filterVisible, setFilterVisible] = useState<boolean>(false);
    const tabs: Tab[] = [
        {
            id: 1,
            title: "Migrant qo’shish",
            content: (
                <div>
                    <InfoCreate />
                </div>
            )
        },
        {
            id: 2,
            title: "Horijdagi Migrantlar",
            content: (
                <div className="">
                    {/* Filter Form */}
                    <div className="mb-4">
                        {filterVisible && (
                            <div className="p-6">
                                <FilterForm />
                            </div>
                        )}
                    </div>
                    {/* Migrant Table */}
                    <MigrantTable/>
                </div>
            )
        },
    ];

    return (
        <div className="flex justify-center min-h-screen bg-gray-100 pt-20">
            <div className="w-full container mt-6 px-4">
                {/* Filter Input */}
                <FilterInput
                    name="max"
                    placeholder="Ma’lumotlarni izlash"
                    value={inputValue}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === "+" || e.key === "-") e.preventDefault();
                    }}
                    color="text-black"
                    onFilterClick={() => setFilterVisible(!filterVisible)}
                />

                {/* Conditional Filter Form */}
                {filterVisible && (
                    <div className="p-6">
                        <FilterForm />
                    </div>
                )}

                {/* Tabs and Content */}
                <TabsMigrant tabs={tabs} />
            </div>
        </div>
    );
};

export default Officer;
