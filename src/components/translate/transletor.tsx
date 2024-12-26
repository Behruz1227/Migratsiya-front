import React from 'react';
import { lotinToKirill } from './translate';

// Tarjima komponenti uchun props tipi
interface TranslatorProps {
  text: string;
}

const Translator: React.FC<TranslatorProps> = ({ text }) => {
  const translatedText = lotinToKirill(text); 

  return (
    <div>
      {translatedText && ( 
        <p><strong className='text-gray-600'>Siz kiritgan matn:</strong> {translatedText}</p>
      )}
    </div>
  );
};

export default Translator;
