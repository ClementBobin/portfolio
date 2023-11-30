import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Portfolio, Cv, Test, Default, Uses, Projects, Reminder, Articles, TechNews } from "./pages";
import KBar from './components/sub/KBar';
import { Analytics } from '@vercel/analytics/react';
import { Navbar } from './components';

const App = () => {
  return (
    <>
      <BrowserRouter>
        {/* Include the KBar component for navigation */}
        <KBar />
        <Analytics />
        <Navbar />

        {/* Define routes for different pages */}
        <Routes>
          <Route path='/' element={<Default />} />
          <Route path='/portfolio' element={<Portfolio />}/>
            <Route path='/portfolio/uses' element={<Uses />}/>
            <Route path='/portfolio/projects' element={<Projects />}/>
            <Route path='/portfolio/reminder' element={<Reminder />}/>
            <Route path='/portfolio/articles' element={<Articles />}/>
            <Route path='/portfolio/technews' element={<TechNews />}/>
            <Route path='/portfolio/cv' element={<Cv />} />
          <Route path='/test' element={<Test />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App