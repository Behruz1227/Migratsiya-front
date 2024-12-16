import React, { useState } from "react";

import { Tab } from "../../../helpers/constants/types";
import TabsMigrant from "../../../components/tabs/tab";
import InfoCreate from "./infoCreate/infoCreate";
import FilterForm from "./infoCreate/filter";
import MigrantTable from "./infoCreate/migrantTable";
import FilterInput from "../../../components/inputs/filterInput";
import UserFilterInput from "../../../components/inputs/userFilterInput";

const Officer: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const [search, setSearch] = useState<string>('');
    const [inputTextColor] = useState<string>('text-black');
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
                    <div className="mb-4">
                        <UserFilterInput
                            name="max"
                            placeholder="Ma’lumotlarni izlash"
                            value={search}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                if (e.key === "+" || e.key === "-") e.preventDefault();
                            }}
                            color={inputTextColor}
                            onFilterClick={() => setFilterVisible(!filterVisible)}
                        />

                        {/* Conditional Filter Form */}
                        {filterVisible && (
                            <div className="p-6">
                                <FilterForm />
                            </div>
                        )}
                    </div>
                    <MigrantTable />
                </div>
            )
        },
    ];

    return (
        <div className="flex justify-center min-h-screen bg-gray-100">
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
                    color={inputTextColor}
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
