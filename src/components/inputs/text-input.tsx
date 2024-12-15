import React from "react";

const TextInput = ({label, value, handleChange, placeholder, type, className}: {
    label?: string,
    value?: string,
    type?: 'text' | 'password' | 'email'
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    placeholder: string,
    className?: string
}) => {
    return (
        <div className={className}>
            {label && <label className="block text-gray-700">{label}</label>}
            <input
                required
                type={type}
                value={value}
                onChange={handleChange}
                className={`bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5`}
                placeholder={placeholder}
            />
        </div>
    );
};

export default TextInput;
