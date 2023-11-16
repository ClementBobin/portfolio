import { useState, useEffect } from 'react';

const useDarkMode = () => {
  const storedDarkMode = localStorage.getItem('darkMode');
  const [darkMode, setDarkMode] = useState(storedDarkMode === 'true');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.querySelectorAll('input[name="Theme"]').forEach((checkbox) => {
        checkbox.checked = false;
      });  
    } else {
      document.documentElement.classList.remove('dark');
      document.querySelectorAll('input[name="Theme"]').forEach((checkbox) => {
        checkbox.checked = true;
      }); 
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  return [darkMode, setDarkMode];
};

export default useDarkMode;
