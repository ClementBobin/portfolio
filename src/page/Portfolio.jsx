import React from 'react';
import { About, Contact, Experience, Feedbacks, Hero, Navbar, Works, Tech, Transition, Transition2, StarBackground } from '../components';

const Portfolio = () => {
  return (
    <div className="z-0 bg-primary overflow-x-hidden scroll-container">
      <Hero className="section" />
      <Navbar className="section" />
      <Transition className="section" />
      <About className="section" />
      <Tech className="section" />
      <Experience className="section" />
      <Transition2 className="section" />
      <Works className="section" />
      <Feedbacks className="section" />
      <div className="relative z-0 section">
        <Contact />
      </div>
      <StarBackground />
    </div>
  );
}

export default Portfolio;

