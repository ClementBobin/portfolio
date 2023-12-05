// Importing necessary React components and utilities
import React from 'react';
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';

// Importing styles and data generation functions
import { styles } from '../../styles';
import generateData from '../../constants';

// Importing motion-related utility functions
import { fadeIn, textVariant } from '../../utils/motion';

// Importing a higher-order component for section styling
import { SectionWrapper } from '../../hoc';

// Individual service card component
const ServiceCard = ({ index, title, icon, iconFallback }) => {
  return (
    // Tilt effect for card using react-tilt
    <Tilt className="xs:w-[250px] w-full">
      {/* Framer Motion animation for fading in */}
      <motion.div 
        variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
        className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
      >
        {/* Content of the service card */}
        <div
          options={{
            max: 45,
            scale: 1,
            speed: 450,
          }}
          className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'
        >
          <img src={icon} alt={title} className='w-16 h-16 object-contain' loading="lazy" />
          <h3 className='text-textColor text-[20px] font-bold text-center'>{title}</h3>
        </div>
      </motion.div>
    </Tilt>
  );
};

// Main component for the "About" section
const About = () => {
  // Generating data for services
  const { services } = generateData();

  return (
    // Section wrapper with Framer Motion animations
    <section className='h-[100vh]'>
      {/* Framer Motion animations for section heading */}
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>
      {/* Framer Motion animation for introductory paragraph */}
      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        Exemple
      </motion.p>
      {/* Displaying service cards generated from data */}
      <div className="mt-20 flex flex-wrap gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </section>
  );
};

// Exporting the "About" section with styling applied by the higher-order component
export default SectionWrapper(About, "about");