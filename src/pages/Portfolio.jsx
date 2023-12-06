import { About, Contact, Social, Experience, Feedbacks, Hero, Works, Tech, Transition, Transition2 } from '../components';

// The Portfolio component for rendering the portfolio page
const Portfolio = () => {
  return (
    // Main container with default background and off overflow-width
    <div className="z-0 bg-primary bg-black overflow-x-hidden">
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

export default Portfolio;