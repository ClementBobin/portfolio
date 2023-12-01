import { About, Contact, Social, Experience, Feedbacks, Hero, Works, Tech, Transition, Transition2 } from '../components';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

// The Portfolio component for rendering the portfolio page
const Portfolio = () => {
  return (
    // Main container with default background and off overflow-width
    <div className="z-0 bg-primary overflow-x-hidden">
      {/* Hero section */}
      <Hero />
      
      {/* Initial transition */}
      <Transition />

      {/* About Me section */}
      <About />

      {/* Technical skills section */}
      <Tech />

      {/* Professional Experience section */}
      <Experience />

      {/* Second transition */}
      <Transition2 />

      {/* Portfolio Works section */}
      <Works />

      {/* User Feedbacks section */}
      <Feedbacks />

      {/* Relative container for the Contact component */}
      <div className="relative z-0 section">
        <Contact />
      </div>

      {/* Social links section */}
      <Social />
    </div>
  );
}

// Work in progress to replace with transition
function MyApp({ Component, pageProps }) {
  // Get the location from react-router-dom's useLocation
  const location = useLocation();

  return (
    // Layout component wraps the entire application
    <Layout>
      {/* AnimatePresence for page transition animations */}
      <AnimatePresence>
        {/* Motion div for page transition animations */}
        {/* Use location.pathname instead of router.route */}
        <motion.div key={location.pathname} className='h-full'>
          {/* Initial transition */}
          <Transition />
          
          {/* Render the specific component based on the route */}
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
}

export default Portfolio;