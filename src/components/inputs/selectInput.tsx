import React from "react";
import { useTranslation } from "react-i18next";

const SelectInput = ({
  label,
  value,
  handleChange,
  options,
  className,
  disabled, // Added disabled prop

}: {
  label?: string;
  value?: string |number;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  className?: string;
  disabled?: boolean;
}) => {
  const { t } = useTranslation();
  return (
    <div className={className}>
      {label && <label className="block text-gray-700 ">{label}</label>}
      <select
        value={value}
        onChange={handleChange}
        className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-3"
        disabled={disabled}
      >
        <option nonce="" value="" disabled>
          {t("Tanlang")}
        </option>
        {options?.map((option) => (
          <option key={option.value} value={option.value} nonce={option.label}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
