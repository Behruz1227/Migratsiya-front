import React from "react";
import {useTranslation} from "react-i18next";

const SelectInput = (
    {
        label,
        value,
        handleChange,
        options,
        className,
        disabled,
        pad
    }: {
        label?: string;
        value?: string | number | null; // null qo'llab-quvvatlanadi
        handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
        options: { value: string|any; label: string }[];
        className?: string;
        disabled?: boolean;
        pad?: string;
    }) => {
    const {t} = useTranslation();

    return (
        <div className={className}>
            {label && <label className="block text-gray-700">{label}</label>}
            <select
                value={value || ""}
                onChange={handleChange}
                className={`bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full ${pad ? pad : 'p-3'}`}
                disabled={disabled}
            >
                <option value="" disabled>
                    {t("Tanlang")}
                </option>
                {options &&
                    options.length &&
                    options.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}
            </select>
        </div>
    );
};

export default SelectInput;
