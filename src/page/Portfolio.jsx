import React from 'react';
import { About, Contact, Experience, Feedbacks, Hero, Navbar, Works } from '../components';

const Portfolio = () => {
  return (
    <div className="relative z-0 bg-primary overflow-x-hidden">
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <Navbar />
        <Hero />
      </div>
      <About />
      <Experience />
      <Works />
      <Feedbacks />
      <div className="relative z-0">
        <Contact />
      </div>
    </div>
  );
}

export default Portfolio;

