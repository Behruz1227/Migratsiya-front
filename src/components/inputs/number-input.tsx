import React from "react";

const PhoneNumberInput = ({
  label,
  value,
  handleChange,
  placeholder,
  className,
}: {
  label?: string;
  value?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  className?: string;
}) => {
  const enforcePrefix = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!inputValue.startsWith("+")) {
      e.target.value = "+";
    }
    handleChange(e);
  };

  return (
    <>
      <div className={className}>
        {label && <label className="block text-gray-700">{label}</label>}
        <input
          required
          type="tel"
          value={value}
          onChange={enforcePrefix}
          onKeyDown={(e) => {
            if (
              e.key === "-" ||
              e.key === "e" ||
              e.key === "E" ||
              e.key === "+"
            )
              e.preventDefault();
          }}
          className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5"
          placeholder={placeholder}
        />
      </div>
    </>
  );
};

export default PhoneNumberInput;
