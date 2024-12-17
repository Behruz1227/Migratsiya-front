import React from "react";

const SelectInput = ({
  label,
  value,
  handleChange,
  options,
  className,
}: {
  label?: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  className?: string;
}) => {
  return (
    <div className={className}>
      {label && <label className="block text-gray-700 mb-2">{label}</label>}
      <select
        value={value}
        onChange={handleChange}
        className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5"
      >
        <option value="" disabled>
          Tanlang
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
