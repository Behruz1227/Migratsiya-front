import React from 'react';
import { lotinToKirill } from './translate';
import {useTranslation} from "react-i18next";

// Tarjima komponenti uchun props tipi
interface TranslatorProps {
  text: string;
}

const Translator: React.FC<TranslatorProps> = ({ text }) => {
  const {t} = useTranslation()
  const translatedText = lotinToKirill(text); 

  return (
    <div>
      {translatedText && ( 
        <p><strong className='text-gray-600'>{t("Siz kiritgan matn")}:</strong> {translatedText}</p>
      )}
    </div>
  );
};

export default Translator;
