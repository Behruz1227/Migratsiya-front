import React, { useState } from "react";
interface LanguageOption {
  value: string;
  label: string;
  img: string;
}

const languages: LanguageOption[] = [
  {
    value: "uz",
    label: "Uzbek",
    img:
      "https://vectorflags.s3.amazonaws.com/flags/uz-circle-01.png",
  },
  {
    value: "ru",
    label: "Russian",
    img:
      "https://vectorflags.s3.amazonaws.com/flags/ru-circle-01.png",
  },
  {
    value: "en",
    label: "English",
    img: "https://vectorflags.s3.amazonaws.com/flags/uk-circle-01.png",
  },
];

const LanguageSelect: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    languages[0].value
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleChange = (value: string) => {
    setSelectedLanguage(value);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div className="flex justify-center items-center">
        <div className="w-[30px] h-[30px] rounded-full overflow-hidden flex justify-center items-center">
          <img
            className="object-contain w-full"
            src={languages.find((lang) => lang.value === selectedLanguage)?.img}
            alt="."
          />
        </div>
        <button
          type="button"
          className="w-full bg-transparent text-white focus:outline-none  flex justify-between items-center gap-2 px-3 py-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {languages.find((lang) => lang.value === selectedLanguage)?.label}
          <svg
            className={`w-5 h-5 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l4 4 4-4" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-[#0086D1] text-white   rounded-lg shadow-lg transition-transform duration-300 transform scale-100 origin-top">
          {languages.map((lang) => (
            <button
              key={lang.value}
              onClick={() => handleChange(lang.value)}
              className="flex gap-3 w-full px-4 py-2 text-left hover:bg-[#579bc3]     rounded-lg focus:outline-none"
            >
              <div className="w-[30px] h-[30px] rounded-full overflow-hidden flex justify-center items-center">
                <img
                  className="w-[30px] h-[30px] object-contain"
                  src={
                    lang.img
                  }
                  alt="."
                />
              </div>

              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelect;
