// Import necessary libraries and components
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Portfolio, Test, Default, Uses, Projects, Reminder, Articles, TechNews } from "./pages";
import KBar from './components/sub/KBar';
import { Analytics } from '@vercel/analytics/react';
import { Navbar } from './components';

const App = () => {
  return (
    <>
      {/* Set up BrowserRouter for client-side routing */}
      <BrowserRouter>
        {/* Include the KBar component for navigation */}
        <KBar />
        
        {/* Add analytics to track user interactions */}
        <Analytics />
        
        {/* Include the Navbar component for navigation links */}
        <Navbar />

        {/* Define routes for different pages using React Router */}
        <Routes>
          {/* Home route */}
          <Route path='/' element={<Default />} />

          {/* Portfolio routes */}
          <Route path='/portfolio' element={<Portfolio />} />
            <Route path='/portfolio/uses' element={<Uses />} />
            <Route path='/portfolio/projects' element={<Projects />} />
            <Route path='/portfolio/reminder' element={<Reminder />} />
            <Route path='/portfolio/articles' element={<Articles />} />
            <Route path='/portfolio/technews' element={<TechNews />} />

          {/* Test route */}
          <Route path='/test' element={<Test />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;