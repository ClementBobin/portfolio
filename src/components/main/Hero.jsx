// Importing necessary React components and utilities
import ParticlesContainer from '../sub/ParticlesContainer';
import Avatar from '../sub/Avatar';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// Importing fadeIn motion utility
import { fadeIn } from '../../utils/motion';

// Functional component for the "Hero" section
function Hero() {
  // Accessing translation function from i18next
  const { t } = useTranslation();
  
  // Rendering the "Hero" section
  return (
    <div className='bg-primary h-[100vh]'>
      <div className='w-full h-full bg-gradient-to-r from-primary via-black/30 to-black/10 invert dark:invert-0'>
        <div className='text-center flex flex-col xl:left-[-20vw] xl:pt-40 xl:text-left h-full container mx-auto'>
          {/* Animated heading with dynamic translation */}
          <motion.h1
            variants={fadeIn('down', 0.2)}
            initial="hidden"
            animate="show"
            exit='hidden'
            className='text-[35px] leading-tight md:text-[60px] md:leading-[1.3] mb-8 font-semibold'
          >
            {t('heroTitle')}<br />{t('heroLiason')}
            <span className='text-acentuation'>{t('heroAccentuation')}</span>
          </motion.h1>
          {/* Animated paragraph with dynamic translation */}
          <motion.p
           variants={fadeIn('down', 0.3)}
           initial="hidden"
           animate="show"
           exit='hidden'
           className='max-w-sm xl:max-w-xl mx-auto xl:mx-0 mb-10 xl:mb-16 leading-[1.8] text-white/60 font-light'
          >
            {t('heroContent')}
          </motion.p>
        </div>
      </div>
      <div className='w-[100%] h-full absolute right-0 bottom-0 overflow-hidden'>
        {/* Background elements, including particles container and avatar */}
        <div className='bg-none xl:bg-hero-pattern xl:bg-cover xl:bg-right right-24 xl:bg-no-repeat w-full h-full absolute mix-blend-color-dodge translate-z-0 scale-125'></div>
        <ParticlesContainer />
        {/* Animated Avatar with fadeIn effect */}
        <motion.div 
          variants={fadeIn('up', 0.2)}
          initial="hidden"
          animate="show"
          exit='hidden'
          transition={{duration: 1, ease: 'easeInOut'}}
          className='w-full h-full max-w-[737px] max-h-[678px] absolute bottom-32 lg:bottom-0 lg:right-[8%]'
        >
          <Avatar />
        </motion.div>
      </div>
    </div>
  );
}

// Exporting the "Hero" section
export default Hero;