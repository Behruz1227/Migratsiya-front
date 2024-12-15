import React from "react";

interface MigrationCardProps {
  flag?: string;
  title: string;
  count: string;
  isActive: boolean; // Active holat parent tomonidan boshqariladi
  onClick: () => void; // Click eventni handle qiladi
}

const MigrationCard: React.FC<MigrationCardProps> = ({ flag, title, count, isActive, onClick }) => {
  return (
    <div
      className={`rounded-xl transition-transform transform cursor-pointer ${
        isActive ? "bg-[#0086D1] text-white shadow-lg" : ""
      }`}
      onClick={onClick}
    >
      <div
        className={`rounded-lg border border-[#0086D1] flex items-center p-4 transition-colors ${
          isActive
            ? "bg-[#0086D1] text-white border-[#0086D1]"
            : "bg-white hover:shadow-md hover:bg-blue-300 hover:border-[#0086D1]"
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
            className={`font-bold text-lg ${
              isActive ? "text-white" : "text-[#0086D1]"
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
