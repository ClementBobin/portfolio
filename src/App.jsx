// Import necessary libraries and components
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Portfolio, Test, Default, Uses, Projects, Reminder, Articles, TechNews } from "./pages";
import MyTransition from './components/sub/InterPage';
import KBar from './components/sub/KBar';
import { Analytics } from '@vercel/analytics/react';
import { Navbar } from './components';
import Loading from './components/libStyleCompo/loading.jsx';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate an asynchronous operation (e.g., fetching data)
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulating a delay

      // Once the data is loaded, set isLoading to false
      setIsLoading(false);
    };
    
    fetchData();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  if (isLoading) {
    return <Loading />;
  }

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
              <Route path='/default' element={<><MyTransition /><Default /></>} />

              {/* Portfolio routes */}
              <Route path='/' element={<><MyTransition /><Portfolio /></>} />

              <Route path='/' element={<><MyTransition /><Portfolio /></>} />
                <Route path='/portfolio/uses' element={<><MyTransition /><Uses /></>} />
                <Route path='/portfolio/projects' element={<><MyTransition /><Projects /></>} />
                <Route path='/portfolio/reminder' element={<><MyTransition /><Reminder /></>} />
                <Route path='/portfolio/articles' element={<><MyTransition /><Articles /></>} />
                <Route path='/portfolio/technews' element={<><MyTransition /><TechNews /></>} />

              {/* Test route */}
              <Route path='/test' element={<Test />} />
              {/* Error page */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;