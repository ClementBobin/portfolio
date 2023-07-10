import React from 'react';
import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, StarsCanvas, Chat } from '../components';

const Portfolio = () => {
  return (
    <div className="relative z-0 bg-primary overflow-x-hidden">
      <audio src="Ark Patrol - Let go (Slowed - Instrumental - 8D).mp3" loop autoPlay />
      <Chat />
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <Navbar />
        <Hero />
      </div>
      <About />
      <Experience />
      <Tech />
      <Works />
      <Feedbacks />
      <div className="relative z-0">
        <Contact />
        <StarsCanvas />
      </div>
    </div>
  );
}

export default Portfolio;

