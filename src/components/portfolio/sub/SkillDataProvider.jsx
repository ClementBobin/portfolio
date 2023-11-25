import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// SkillDataProvider component with intersection observer and motion animation
const SkillDataProvider = ({ src, width, height, index }) => {
  // Intersection observer hook to determine if the component is in view
  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  // Animation variants for fading in the image
  const imageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  // Animation delay for staggering effect
  const animationDelay = 0.3;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      variants={imageVariants}
      animate={inView ? 'visible' : 'hidden'}
      custom={index}
      transition={{ delay: index * animationDelay }}
    >
      <img
        src={src}
        width={width}
        height={height}
        alt="skill image"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </motion.div>
  );
};

export default SkillDataProvider;