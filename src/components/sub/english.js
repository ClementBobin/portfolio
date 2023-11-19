import { useState } from 'react';

const useLang = () => {
  const storedLang = localStorage.getItem('Lang');
  const [lang, setLang] = useState(storedLang || 'en'); // Default to 'en' if no language is stored

  const toggleLang = () => {
    const newLang = lang === 'en' ? 'fr' : 'en'; // Toggle between 'en' and 'fr'
    setLang(newLang);
    localStorage.setItem('Lang', newLang);
  };

  return { lang, toggleLang };
};

export default useLang;
