import React, { useState } from "react";

interface MigrationCardProps {
  flag?: string; // Flag ixtiyoriy
  title: string;
  count: string;
}

const MigrationCard: React.FC<MigrationCardProps> = ({ flag, title, count }) => {
  const [isActive, setIsActive] = useState(false);

  const handleCardClick = () => {
    setIsActive(!isActive);
  };

  return (
    <div
      className={`rounded-xl transition-transform transform cursor-pointer ${
        isActive ? "bg-blue-500 text-white shadow-lg" : ""
      }`}
      onClick={handleCardClick}
    >
      <div
        className={`bg-white rounded-lg border flex items-center p-4 ${
          isActive
            ? "bg-blue-500 text-white border-blue-500"
            : "hover:shadow-md hover:bg-blue-300 hover:border-blue-400"
        }`}
      >
        {/* Flag - Agar flag mavjud bo'lsa chiqadi */}
        {flag && (
          <div className="w-15 h-10 flex-shrink-0">
            <img
              src={flag}
              alt="Country flag"
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        )}
        {/* Title */}
        <div className="flex-1 ml-4">
          <p className={`font-medium ${isActive ? "text-white" : "text-gray-700"}`}>{title}</p>
        </div>
        {/* Count */}
        <div>
          <p
            className={`font-bold text-lg hover:text-white ${
              isActive ? "text-white" : "text-blue-500"
            }`}
          >
            {count}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MigrationCard;
