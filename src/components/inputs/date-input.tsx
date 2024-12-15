import React from "react";

const DateInput = ({label, value, handleChange, placeholder}: {
    label?: string,
    value?: string,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    placeholder: string
}) => {
    return (
        <>
            {label && <label className="block text-gray-700">{label}</label>}
            <div className="custom-date-input">
                <input
                    type="date"
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2"
                />
            </div>
        </>
    );
};

export default DateInput;
