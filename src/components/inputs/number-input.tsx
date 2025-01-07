import React, { useEffect, useState } from "react";

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
  const [inputValue, setInputValue] = useState<string>(value ? value : "");

  useEffect(() => {
    if (!value) {
      // setInputValue("+");
    }
  }, [value]);

  // Enforce "+" prefix and allow only numbers after it
  const enforcePrefixAndNumbers = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;

    // Allow only "+" at the beginning and digits
    if (!/^\+?\d*$/.test(newValue)) {
      return; // Stop input if the value doesn't match the pattern
    }

    // Ensure the "+" prefix remains
    if (!newValue.startsWith("+")) {
      newValue = "+" + newValue.replace(/[^0-9]/g, "");
    }

    setInputValue(newValue);
    e.target.value = newValue;
    handleChange(e);
  };

  return (
    <div className={className}>
      {label && <label className="block text-gray-700">{label}</label>}
      <input
        required
        type="tel"
        value={inputValue}
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
