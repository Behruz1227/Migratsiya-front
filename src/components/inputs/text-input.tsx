import React from "react";

const TextInput = ({label, value, handleChange, placeholder, type, className, disabled, handleOnKeyDown}: {
    label?: string,
    value?: string,
    type?: 'text' | 'password' | 'email'
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleOnKeyDown?: (e: any) => void,
    placeholder: string,
    className?: string
    disabled?: boolean
}) => {
    return (
        <div className={className}>
            {label && <label className="block text-gray-700">{label}</label>}
            <input
                required
                type={type}
                disabled={disabled}
                value={value}
                onChange={handleChange}
                onKeyDown={handleOnKeyDown}
                className={`bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5`}
                placeholder={placeholder}
            />
        </div>
    );
};

export default TextInput;
