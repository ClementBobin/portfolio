import { useState, useEffect } from 'react';

const useDarkMode = () => {
  // Retrieve dark mode preference from local storage
  const storedDarkMode = localStorage.getItem('darkMode');
  
  // Set dark mode state with the stored preference or default to false
  const [darkMode, setDarkMode] = useState(storedDarkMode == 'true');

  useEffect(() => {
    // Apply or remove 'dark' class to the HTML element based on the dark mode state
    if (darkMode) {
      document.documentElement.classList.add('dark');
      // Uncheck all input checkboxes with name "Theme"
      document.querySelectorAll('input[name="Theme"]').forEach((checkbox) => {
        checkbox.checked = false;
      });
    } else {
      document.documentElement.classList.remove('dark');
      // Check all input checkboxes with name "Theme"
      document.querySelectorAll('input[name="Theme"]').forEach((checkbox) => {
        checkbox.checked = true;
      });
    }

    // Store the current dark mode state in local storage
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  // Return the dark mode state and the function to toggle it
  return [darkMode, setDarkMode];
};

export default useDarkMode;