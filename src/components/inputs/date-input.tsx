import React from "react";

const DateInput = (
    {
        label,
        value,
        handleChange,
        placeholder,
        className,
        handleOnKeyDown
    }: {
        label?: string;
        value?: string | number;
        handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
        handleOnKeyDown?: (e: any) => void
        placeholder: string;
        className?: string
    }) => {
    return (
        <div className={className}>
            {/* Label will be placed above the input */}
            {label && <label className="block text-gray-700">{label}</label>}

            <div className="custom-date-input">
                <input
                    type="date"
                    value={value}
                    onChange={handleChange}
                    onKeyDown={handleOnKeyDown}
                    placeholder={placeholder}
                    className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2"
                />
            </div>
        </div>
    );
};

export default DateInput;
