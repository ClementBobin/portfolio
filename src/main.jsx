/* React Application Entry Point */

// Import necessary libraries and components
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';
import { SpeedInsights } from "@vercel/speed-insights/next"

// Render the React application using ReactDOM.createRoot
ReactDOM.createRoot(document.getElementById('root')).render(
  // Wrap the entire application in StrictMode for additional checks
  <React.StrictMode>
    {/* Provide internationalization support using i18next */}
    <I18nextProvider i18n={i18n}>
      {/* Render the main App component */}
      <App />
      <SpeedInsights />
    </I18nextProvider>
  </React.StrictMode>,
);
