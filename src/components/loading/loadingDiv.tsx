import React from "react";
import Loading from "./loading";
import { useTranslation } from "react-i18next";

const LoadingDiv: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div
      className={`rounded-lg border border-[#0086D1] flex justify-center items-center p-4 transition-colors ${"bg-white hover:shadow-md"}`}
    >
      <Loading/>
    </div>
  );
};

export default LoadingDiv;
