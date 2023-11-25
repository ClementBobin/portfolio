import React from 'react';
import { About, Contact, Experience, Feedbacks, Hero, Navbar, Works, Tech, Transition, Transition2, Anchor } from '../components';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

// The Portfolio component for rendering the portfolio page
const Portfolio = () => {
  return (
    // Main container with default background and off overflow-width
    <div className="z-0 bg-primary overflow-x-hidden">
      <Hero />
      <Navbar />
      <Transition />
      <About />
      <Tech />
      <Experience />
      <Transition2 />
      <Works />
      <Feedbacks />
      {/* Relative container for the Contact component */}
      <div className="relative z-0 section">
        <Contact />
      </div>
      <Anchor />
    </div>
  );
}

function MyApp({ Component, pageProps }) {
  // Get the location from react-router-dom's useLocation
  const location = useLocation();

  return (
      <Layout>
          <AnimatePresence>
              {/* Use location.pathname instead of router.route */}
              <motion.div key={location.pathname} className='h-full'>
                  <Transition />
                  <Component {...pageProps} />
              </motion.div>
          </AnimatePresence>
      </Layout>
  )
}

export default Portfolio;

