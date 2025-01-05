import React from "react";
import { useTranslation } from "react-i18next";

const NotFoundDiv: React.FC = () => {
  const {t} = useTranslation()
  return (
    <div
      className={`rounded-lg border border-[#0086D1] flex justify-center items-center p-4 transition-colors ${"bg-white hover:shadow-md"}`}
    >
      {t('Malumot topilmadi')}
    </div>
  );
};

export default NotFoundDiv;
