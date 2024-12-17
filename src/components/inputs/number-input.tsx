import React from "react";

const PhoneNumberInput = ({
  label,
  value,
  handleChange,
  placeholder,
  className,
}: {
  label?: string;
  value?: number | string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  className?: string;
}) => {
  // Enforce "+" prefix and allow only numbers after it
  const enforcePrefixAndNumbers = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;

    // Allow only "+" at the beginning and digits
    if (!/^\+?\d*$/.test(inputValue)) {
      return; // Stop input if the value doesn't match the pattern
    }

    // Ensure the "+" prefix remains
    if (!inputValue.startsWith("+")) {
      inputValue = "+" + inputValue.replace(/[^0-9]/g, "");
    }

    e.target.value = inputValue;
    handleChange(e);
  };

  return (
    <div className={className}>
      {label && <label className="block text-gray-700">{label}</label>}
      <input
        required
        type="tel"
        value={value}
        onChange={enforcePrefixAndNumbers}
        onKeyDown={(e) => {
          if (
            e.key === "e" ||
            e.key === "E" ||
            e.key === "-" ||
            e.key === " " ||
            e.key === "+"
          ) {
            e.preventDefault(); // Prevent invalid keys
          }
        }}
        className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5"
        placeholder={placeholder}
      />
    </div>
  );
};

export default PhoneNumberInput;
