import React from "react";

const PhoneNumberInput = ({label, value, handleChange, placeholder}: {
    label?: string,
    value?: string,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    placeholder: string
}) => {
    return (
        <>
            {label && <label className="block text-gray-700">{label}</label>}
            <input
                required
                type={`number`}
                value={value}
                onChange={handleChange}
                onKeyDown={(e) => {
                    if (e.key === "-" || e.key === "e" || e.key === "E" || e.key === "+") e.preventDefault();
                }}
                className={`bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5`}
                placeholder={placeholder}
            />
        </>
    );
};

export default PhoneNumberInput;
